function DatePicker({ handleChange, value, isDisabled }) {
  const defaultValue = value || "";
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="flex flex-col">
      <label className="text-label">Date of Birth</label>
      <div className="flex items-center">
        <input
          type="date"
          id="date-input"
          disabled={isDisabled}
          className={`text-input text-black placeholder-gray-400 flex-1 mr-2 ${
            isDisabled && "cursor-not-allowed"
          }`}
          name="DateOfBirth"
          onChange={(e) => handleChange(e)}
          value={defaultValue}
          max={today}
        />
        <style jsx>{`
          #date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}

export default DatePicker;
