function DatePicker({ handleChange, value }) {
  const defaultValue = value || "";
  return (
    <div className="flex flex-col">
      <label className="text-label">Date of Birth</label>
      <div className="flex items-center">
        <input
          type="date"
          id="date-input"
          className="text-input text-black placeholder-gray-400 flex-1 mr-2"
          name="DateOfBirth"
          onChange={(e) => handleChange(e)}
          value={defaultValue}
        />
        <style jsx>{`
          #date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: "pointer;
          }
        `}</style>
      </div>
    </div>
  );
}

export default DatePicker;
