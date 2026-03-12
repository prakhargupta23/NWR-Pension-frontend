import { fetchWrapper } from "../helpers/fetch-wrapper";
import { config } from "../shared/constants/config";
import axios from "axios";
import { getUserData } from "./user.service";

/// Exporting all the function for the ab testing -----------------------/
export const sqlService = {
  fetchBasicAndCommutationData,
  fetchAgeData,
  fetchNewPensionerData,
  fetchStoppedPensionerData,
  downloadTrendCsvData,
  fetchActivePensionerData,
  downloadTotalCsvData,
  fetchFamilyPensionTransitionData,
  fetchFamilyPensionData,
  fetchAgeBracketData,
  downloadCsvData,
  downloadDynamicCsvData,
  downloadPieCsvData,
  getTransactionData,
};

//// Funciton for fetching all the experiments ---------------------------/
async function fetchBasicAndCommutationData(category: string, month?: string, year?: string) {
  console.log("fetchBasicAndCommutationData called");
  let url = `${config.apiUrl}/api/get-basic-data?category=${category}`;
  if (month) url += `&month=${month}`;
  if (year) url += `&year=${year}`;

  const response = await fetch(url, {
    // method: "GET",
    // credentials: "include",
  });
  const data = await response.json();
  console.log("response from the sql service", data);
  return data;
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchAgeData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-age-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchNewPensionerData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-newPensioner-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchStoppedPensionerData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-stoppedPensioner-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchActivePensionerData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-activePensioners-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchFamilyPensionTransitionData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-familyTransitionPensioners-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchFamilyPensionData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-family-pension`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}
//// Funciton for fetching all the experiments ---------------------------/
async function fetchAgeBracketData(month?: string, year?: string) {
  let url = `${config.apiUrl}/api/get-agebracketgraph-data`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return fetchWrapper.get(url);
}

//// Funciton for fetching all the experiments ---------------------------/
async function downloadCsvData() {
  // const userData = JSON.parse(localStorage.getItem("user"));
  // const username = userData?.username;
  console.log("downloadDynamicCsvData called");
  const username = getUserData().username;
  console.log("Username:", username);
  return fetchWrapper.postZip(`${config.apiUrl}/api/download-csv-data`, { username });
}

//// Funciton for deleting graph data ---------------------------/
async function downloadDynamicCsvData() {
  console.log("downloadDynamicCsvData calledkjvndjz");
  return fetchWrapper.postZip(`${config.apiUrl}/api/download-csv-data`, {});
}

//// Funciton for downloading the pie csv data ---------------------------/
async function downloadPieCsvData(data: any) {
  return fetchWrapper.post(`${config.apiUrl}/api/get-piecsv-data`, { data });
}

async function downloadTrendCsvData(data: any) {
  return fetchWrapper.post(`${config.apiUrl}/api/get-trenddownload-data`, {
    data,
  });
}
//// Function for downloading the total csv data -----------------------/
async function downloadTotalCsvData(month: any) {
  return fetchWrapper.get(
    `${config.apiUrl}/api/get-comparisoncsv-data?month=${month}`
  );
}

async function getTransactionData(type: string) {
  try {
    const response = await axios.get(`${config.apiUrl}/get-transaction-data?type=${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    throw error;
  }
}
