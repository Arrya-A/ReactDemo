import React from "react";
import axiosInstance from "../../utils/AxiosInstance";
const useAuth = () => {
  const loginUser = async (inputData) => {
    const reqData = new FormData();
    reqData.append("email", inputData.email);
    reqData.append("password", inputData.password);
    try {
      const { data, status } = await axiosInstance.post("/login", reqData);
      if (status === 200) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      console.log("inside hook ", data);
    } catch (err) {
      console.log(err);
    }
  };
  return loginUser;
};

export default useAuth;
