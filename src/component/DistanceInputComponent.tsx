import React from 'react';

interface DistanceInputProps {
  radius: number;
  setRadius: (radius: number) => void;
}

function DistanceInputComponent({ radius, setRadius }: DistanceInputProps) {
  

  return (
    <div className="content">
      <b>
        DISTANCE:
        <input
          type="number"
          id="radius"
          min="0"
          step="0.1"
          value={radius || ''}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
        />
        Km
      </b> 
      
      
    </div>
  );
}

export default React.memo(DistanceInputComponent);
