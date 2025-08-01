import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateRangePickerProps {
  onDateRangeChange?: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
  const [value, setValue] = useState<Value>([new Date(2023, 9, 11), new Date(2025, 10, 11)]);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return format(date, 'MMM d, yyyy');
  };

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    // Close calendar when both dates are selected
    if (Array.isArray(newValue) && newValue[0] && newValue[1]) {
      setShowCalendar(false);
    }
    // Call the parent component's callback with the selected range
    if (Array.isArray(newValue) && newValue[0] && newValue[1]) {
      onDateRangeChange?.({
        startDate: newValue[0],
        endDate: newValue[1],
      });
    }
  };

  const getDisplayText = () => {
    if (!Array.isArray(value)) return 'Select date range';
    const [start, end] = value;
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  return (
    <div className="relative">
      <div
        className="font-open-sans font-semibold text-base !text-black cursor-pointer flex items-center gap-x-2"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarDays />
        {getDisplayText()}
      </div>
      
      {showCalendar && (
        <div className="absolute z-10 mt-1 right-1">
          <Calendar
            onChange={handleDateChange}
            value={value}
            selectRange={true}
            minDate={new Date(2023, 0, 1)}   
            maxDate={new Date(2025, 11, 31)} 
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;