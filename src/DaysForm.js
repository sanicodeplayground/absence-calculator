import React, { useState } from "react";

function DaysForm() {
  const [daysData, setDaysData] = useState([]);
  const [country, setCountry] = useState("");
  const [days, setDays] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // setDaysData([...daysData, { country, days, month, year }]);
    event.preventDefault();
    const newEntry = { country, days: parseInt(days), month, year };
    setDaysData([...daysData, newEntry]);
    setCountry("");
    setDays("");
    setMonth("");
    setYear("");
  };

  //   const calculateDays = (data) => {
  //     let months = {};
  //     data.forEach((entry) => {
  //       const key = `${entry.year}-${entry.month}`;
  //       months[key] = (months[key] || 0) + parseInt(entry.days);
  //     });

  //     let maxDays = 0;
  //     const monthKeys = Object.keys(months);
  //     monthKeys.forEach((key, index) => {
  //       let totalDays = months[key];
  //       for (let i = 1; i < 12 && index + i < monthKeys.length; i++) {
  //         totalDays += months[monthKeys[index + i]];
  //       }
  //       maxDays = Math.max(maxDays, totalDays);
  //     });

  //     return maxDays;
  //   };

  const calculateDays = (data) => {
    data.sort((a, b) => new Date(`${b.year}-${b.month}`) - new Date(`${a.year}-${a.month}`));

    const monthlyAbsences = {};
    data.forEach((absence) => {
      const key = `${absence.year}-${absence.month}`;
      monthlyAbsences[key] = (monthlyAbsences[key] || 0) + absence.days;
    });

    const monthKeys = Object.keys(monthlyAbsences);
    let maxAbsence = 0;

    monthKeys.forEach((key, index) => {
      let totalAbsence = 0;
      for (let i = 0; i < 12 && index + i < monthKeys.length; i++) {
        totalAbsence += monthlyAbsences[monthKeys[index + i]];
      }
      maxAbsence = Math.max(maxAbsence, totalAbsence);
    });

    return maxAbsence;
  };

  const handleCalculate = () => {
    const maxAbsence = calculateDays(daysData);
    setResult(maxAbsence);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <div>Total days away in 12-months period: {result}</div>}
    </div>
  );
}

export default DaysForm;
