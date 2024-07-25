import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "todo",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
