import axiosInstance from "../utilities/axiosInstance";

export async function getUnits() {
  try {
    const req = await axiosInstance.get("/GeneralData/ItemsCategories");
    return req?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
