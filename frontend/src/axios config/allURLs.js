import Api from "./baseURL";

export const getTransactions = async (month, search = "", page , perPage = 10) => {
    const response = await Api.get("/transaction/get-filtered-transactions", {
    params: { month, search, page, perPage },
    });
  return response.data;
};

export const getStatistics = async (month) => {
  const response = await Api.get("/transaction/get-statistics", {
    params: { month },
  });
  return response.data;
};

export const getBarChart = async (month) => {
  const response = await Api.get("/transaction/bar-chart", {
    params: { month },
  });
  return response.data;
};

export const getPieChart = async (month) => {
  const response = await Api.get("/transaction/pie-chart", {
    params: { month },
  });
  return response.data;
};

export const getCombinedData = async (month) => {
  const response = await Api.get("/transaction/combined-data", {
    params: { month },
  });
  return response.data;
};
