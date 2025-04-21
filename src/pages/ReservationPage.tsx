import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Car } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../components/ui/use-toast';
import ParkingMap from '../components/ParkingMap';

const ReservationPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleType, setVehicleType] = useState('standard');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1) {
      if (!date || !startTime || !endTime) {
        toast({
          title: 'Missing information',
          description: 'Please select date and time for your reservation',
          variant: 'destructive',
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedSpot) {
        toast({
          title: 'No spot selected',
          description: 'Please select a parking spot',
          variant: 'destructive',
        });
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: 'Reservation Confirmed',
      description: `You have reserved spot ${selectedSpot} on ${format(date!, 'PPP')} from ${startTime} to ${endTime}`,
    });
    navigate('/my-reservations');
  };

  const timeOptions = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Reserve a Parking Spot</h2>
      
      <div className="mb-8">
        <div className="flex items-center">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2",
            step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground"
          )}>
            1
          </div>
          <Separator className="flex-1 mx-2" />
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2",
            step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground"
          )}>
            2
          </div>
          <Separator className="flex-1 mx-2" />
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2",
            step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground"
          )}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Select Date & Time</span>
          <span>Choose Parking Spot</span>
          <span>Confirm Reservation</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Date and Time</CardTitle>
            <CardDescription>Choose when you need the parking spot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem 
                        key={time} 
                        value={time}
                        disabled={startTime && time <= startTime}
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <RadioGroup value={vehicleType} onValueChange={setVehicleType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">Compact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large / SUV</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={handleNext}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Parking Spot</CardTitle>
            <CardDescription>Choose an available spot from the map</CardDescription>
          </CardHeader>
          <CardContent>
            <ParkingMap selectedSpot={selectedSpot} onSelectSpot={setSelectedSpot} />
            
            {selectedSpot && (
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="font-medium">Spot {selectedSpot} selected</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {vehicleType === 'standard' ? 'Standard' : vehicleType === 'compact' ? 'Compact' : 'Large'} vehicle spot
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Reservation</CardTitle>
            <CardDescription>Review the details of your parking reservation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Date</h3>
                <p>{format(date!, 'PPP')}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Time</h3>
                <p>{startTime} - {endTime}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Parking Spot</h3>
                <p>Spot {selectedSpot}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Vehicle Type</h3>
                <p className="capitalize">{vehicleType}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Pricing</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Hourly rate</span>
                  <span className="text-sm">$2.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="text-sm">{parseInt(endTime) - parseInt(startTime)} hours</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(2.5 * (parseInt(endTime) - parseInt(startTime))).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            <Button onClick={handleSubmit}>Confirm Reservation</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ReservationPage;