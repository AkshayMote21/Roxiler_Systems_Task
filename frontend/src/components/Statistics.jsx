import React, { useEffect, useState } from "react";
import { getStatistics } from "../axios config/allURLs";

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  const fetchStatistics = async () => {
    const data = await getStatistics(month);
    setStatistics(data);
  };
  
  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <div>
        <p>Total Sale Amount: ${statistics.totalAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
