import axiosInstance from "../utilities/axiosInstance";

export async function getCurrencies() {
  try {
    const req = await axiosInstance.get("/GeneralData/Currencies");
    return req?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTaxes() {
  try {
    const req = await axiosInstance.get("/GeneralData/Taxes");
    return req?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
