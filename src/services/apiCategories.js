import axiosInstance from "../utilities/axiosInstance";

export async function getItemsCategories() {
  try {
    const req = await axiosInstance.get("/GeneralData/ItemCategories");
    return req?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
