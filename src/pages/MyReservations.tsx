import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, Clock, MapPin, Car, AlertCircle } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

interface Reservation {
  id: string;
  spot: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

const MyReservations = () => {
  const { toast } = useToast();
  
  // Mock data for reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      spot: 'B5',
      date: 'Today',
      startTime: '15:00',
      endTime: '17:00',
      status: 'upcoming',
    },
    {
      id: '2',
      spot: 'A3',
      date: 'Tomorrow',
      startTime: '09:00',
      endTime: '11:00',
      status: 'upcoming',
    },
    {
      id: '3',
      spot: 'C2',
      date: 'Yesterday',
      startTime: '14:00',
      endTime: '16:00',
      status: 'completed',
    },
    {
      id: '4',
      spot: 'B10',
      date: '3 days ago',
      startTime: '10:00',
      endTime: '12:00',
      status: 'completed',
    },
  ]);

  const cancelReservation = (id: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: 'cancelled' as const } : res
    ));
    
    toast({
      title: 'Reservation Cancelled',
      description: 'Your reservation has been cancelled successfully',
    });
  };

  const extendReservation = (id: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, endTime: (parseInt(res.endTime) + 1).toString().padStart(2, '0') + ':00' } : res
    ));
    
    toast({
      title: 'Reservation Extended',
      description: 'Your reservation has been extended by 1 hour',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-500 bg-blue-50';
      case 'active':
        return 'text-green-500 bg-green-50';
      case 'completed':
        return 'text-gray-500 bg-gray-50';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const renderReservationCard = (reservation: Reservation) => (
    <Card key={reservation.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">Spot {reservation.spot}</h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{reservation.date}</span>
              <Clock className="h-4 w-4 ml-3 mr-1" />
              <span className="text-sm">{reservation.startTime} - {reservation.endTime}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Section {reservation.spot.charAt(0)}, Level 1</span>
          <Car className="h-4 w-4 ml-3 mr-1" />
          <span>{reservation.spot.charAt(0) === 'A' ? 'Compact' : reservation.spot.charAt(0) === 'B' ? 'Standard' : 'Large'}</span>
        </div>
        
        {(reservation.status === 'upcoming' || reservation.status === 'active') && (
          <div className="flex space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">Cancel</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this reservation? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, keep it</AlertDialogCancel>
                  <AlertDialogAction onClick={() => cancelReservation(reservation.id)}>
                    Yes, cancel it
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button 
              size="sm" 
              onClick={() => extendReservation(reservation.id)}
            >
              Extend by 1 hour
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const upcomingReservations = reservations.filter(res => res.status === 'upcoming' || res.status === 'active');
  const pastReservations = reservations.filter(res => res.status === 'completed' || res.status === 'cancelled');

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-6">My Reservations</h2>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingReservations.length > 0 ? (
            upcomingReservations.map(renderReservationCard)
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle>No Upcoming Reservations</CardTitle>
                <CardDescription>You don't have any upcoming parking reservations</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => window.location.href = '/reserve'}>Reserve a Spot</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastReservations.length > 0 ? (
            pastReservations.map(renderReservationCard)
          ) : (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle>No Past Reservations</CardTitle>
                <CardDescription>You don't have any past parking reservations</CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReservations;