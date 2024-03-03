function DatePicker() {
  return (
    <div className="flex flex-col">
      <label className="text-label">Date of Birth</label>
      <div className="flex items-center">
        <input
          type="date"
          id="date-input"
          className="text-input text-black placeholder-[#646464] flex-1 mr-2"
        />
        <style jsx>{`
          #date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
          }
        `}</style>
      </div>
    </div>
  );
}

export default DatePicker;
