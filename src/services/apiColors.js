import axiosInstance from "../utilities/axiosInstance";

export async function getColors() {
  try {
    const req = await axiosInstance.get("/GeneralData/Colors");
    return req?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
