import axios from "axios";
import Transaction from "../models/transaction.model.js";

export const InitializeDB = async(req, res) => {
    try{
        const existingData = await Transaction.countDocuments();
        if(existingData > 0){
            return res.status(200).json({success:true,message:"Database Inilialized Successfully"})
        }else{
            const {data} = await axios.get(process.env.API_URL);
            await Transaction.insertMany(data);
            return res.status(200).json({success:true,message:"Database Inilialized Successfully"})
        }
    }catch(error){
        return res.status(500).json({ success: false, error });
    }
    

};

export const AllTransactions = async (req, res) => {
    
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    const monthMap = {
        All :0,
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };
    const selectedMonth = monthMap[month];

    const query = {
      $expr: {
        $and: [
            { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
        ],
      },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        ...(isNaN(Number(search)) ? [] : [{ price: Number(search) }]),
      ],
    };
    // console.log("query",query);
    if(month == "All"){
        const queryAll = {

            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              ...(isNaN(Number(search)) ? [] : [{ price: Number(search) }]),
            ],
          };
        const count = await Transaction.countDocuments();
        const transactions = await Transaction.find(queryAll)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
      return  res.status(200).json({transactions,count});
    }else{
        const count = await Transaction.countDocuments(query)
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
    
        // console.log("transactions",transactions);
      return  res.status(200).json({transactions,count});
    }
    
};
  
export const GetStatistics = async (req, res) => {
  const { month } = req.query;
  const monthMap = {
    All :0,
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  const selectedMonth = monthMap[month];

  if(month == "All"){
    const totalSales = await Transaction.aggregate([
      {
        $match: {
          sold: true, 
        },
      },
      {
        $group: {
          _id: null, 
          totalAmount: { $sum: "$price" }, 
          totalSoldItems: { $sum: 1 }, 
        },
      },
    ]);
    const totalNotSold = await Transaction.countDocuments({
      sold: false, 
    });
    res.status(200).json({
      totalAmount: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalSoldItems || 0,
      totalNotSoldItems: totalNotSold,
    });
    
  }else{
    const totalSales = await Transaction.aggregate([
      {$match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, selectedMonth] 
        },sold: true 
      }},
      { $group: { _id: null, totalAmount: { $sum: "$price" }, totalSoldItems: { $sum: 1 } } },
    ]);
  
    const matchCondition = selectedMonth === 0 ? { sold: false } : {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, selectedMonth]
        },
        sold: false
      };

    const totalNotSold = await Transaction.countDocuments(matchCondition);

    res.status(200).json({
      totalAmount: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalSoldItems || 0,
      totalNotSoldItems: totalNotSold,
    });
  }

};
