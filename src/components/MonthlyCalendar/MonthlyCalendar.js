import React from 'react';
import './MonthlyCalendar.css';

const DayGrid = () => {
  // Array of days to highlight
  const greenHighlightedDays = [7, 8, 6, 10, 9];
  const redHighlightedDays = [29, 19, 24, 27, 20];

  return (
    <div className="day-grid">
      {Array.from({ length: 30 }, (_, index) => (
        <div
          key={index}
          className={`day ${greenHighlightedDays.includes(index + 1) ? 'green-highlighted' : ''} ${redHighlightedDays.includes(index + 1) ? 'red-highlighted' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default DayGrid;
