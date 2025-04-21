import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Car, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Available Spots',
      value: '24',
      description: 'Out of 50 total spots',
      icon: <Car className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: 'Your Reservations',
      value: '2',
      description: 'Active reservations',
      icon: <Calendar className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: 'Next Reservation',
      value: 'Today',
      description: '3:00 PM - 5:00 PM',
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
          <p className="text-muted-foreground">Here's an overview of your car park reservations</p>
        </div>
        <Button onClick={() => navigate('/reserve')}>Reserve a Spot</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>Car Park Map</CardTitle>
            <CardDescription>Current parking spot availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-md border-2 border-dashed border-muted flex items-center justify-center">
              <p className="text-muted-foreground">Interactive car park map will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent parking activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Spot B12 Reserved</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Reservation Extended</p>
                  <p className="text-xs text-muted-foreground">3 days ago, 4:15 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Spot A5 Reserved</p>
                  <p className="text-xs text-muted-foreground">Last week, 10:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;