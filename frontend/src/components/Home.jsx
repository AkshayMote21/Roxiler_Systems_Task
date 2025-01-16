import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import Api from '../axios config/baseURL';
import { getStatistics, getTransactions } from '../axios config/allURLs';

function Home() {

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [month, setMonth] = useState("March");

  const [statistics, setStatistics] = useState({});
   
  const fetchStatistics = async () => {
    const data = await getStatistics(month);
    setStatistics(data);
  };
  const fetchtransactionData = async () => {
    const response = await Api.get("/transaction/initialize-db");
    const message = response.data.message;
    console.log("message",message);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    fetchtransactionData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      // console.log(month,"month");
      const data = await getTransactions(month, search, page);
      // console.log("data",data);
      // console.log("count",data.count);
      // console.log("transaction",data.transactions);
      setTransactions(data.transactions);
      setTotalPages(data.count % 10 !== 0 ? Math.floor(data.count / 10) + 1 : Math.floor(data.count / 10));

    };
    fetchTransactions();
  }, [month, search, page]);

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (

    <div id='fullPage'>

      <h1 style={{color:"#009879"}}>Transactions Dashboard</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search transactions"
      />
      <select value={month} onChange={handleMonthChange}>
        <option value="All">All</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price % 1 === 0 ? transaction.price : transaction.price.toFixed(2)}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td><img id='image' alt='imageOfProduct' src={transaction.image}/></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id='pageNav'>
        <p id='p1'>Page No : <span style={{color:"#009879"}}>{page}</span></p>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages}>
        
          Next
        </button>
        <p id='p2'>Per Page : 10</p>
      </div>
      
      <div style={{marginBottom:"50px"}}>
        <h2>Statistics - <span style={{color:"#009879"}}>{month}</span></h2>
        <div id='staticsBox'>
          <p>Total Sale Amount : ${statistics.totalAmount}</p>
          <p>Total Sold Items : {statistics.totalSoldItems}</p>
          <p>Total Not Sold Items : {statistics.totalNotSoldItems}</p>
        </div>
      </div>

    </div>
    
  
  )
} 

export default Home;