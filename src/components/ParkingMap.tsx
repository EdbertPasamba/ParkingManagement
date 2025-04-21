import { useState } from 'react';
import { cn } from '../lib/utils';

interface ParkingMapProps {
  selectedSpot: string | null;
  onSelectSpot: (spot: string) => void;
}

const ParkingMap = ({ selectedSpot, onSelectSpot }: ParkingMapProps) => {
  // Mock data for available and occupied spots
  const [parkingData] = useState({
    // A section (compact spots)
    A: {
      total: 10,
      occupied: ['A2', 'A5', 'A8'],
    },
    // B section (standard spots)
    B: {
      total: 15,
      occupied: ['B3', 'B7', 'B10', 'B12'],
    },
    // C section (large spots)
    C: {
      total: 5,
      occupied: ['C1'],
    },
  });

  const renderParkingSection = (section: string, total: number, occupied: string[]) => {
    const spots = [];
    
    for (let i = 1; i <= total; i++) {
      const spotId = `${section}${i}`;
      const isOccupied = occupied.includes(spotId);
      const isSelected = selectedSpot === spotId;
      
      spots.push(
        <div
          key={spotId}
          className={cn(
            "border rounded-md p-2 text-center cursor-pointer transition-colors",
            isOccupied ? "bg-muted text-muted-foreground cursor-not-allowed" : "hover:bg-accent",
            isSelected ? "bg-primary text-primary-foreground hover:bg-primary" : ""
          )}
          onClick={() => !isOccupied && onSelectSpot(spotId)}
        >
          {spotId}
        </div>
      );
    }
    
    return spots;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Parking Map</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white border rounded-sm"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-muted rounded-sm"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Section A - Compact</h4>
          <div className="grid grid-cols-5 gap-2">
            {renderParkingSection('A', parkingData.A.total, parkingData.A.occupied)}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Section B - Standard</h4>
          <div className="grid grid-cols-5 gap-2">
            {renderParkingSection('B', parkingData.B.total, parkingData.B.occupied)}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Section C - Large/SUV</h4>
          <div className="grid grid-cols-5 gap-2">
            {renderParkingSection('C', parkingData.C.total, parkingData.C.occupied)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingMap;