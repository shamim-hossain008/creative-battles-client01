import useAxiosPublic from "../../hooks/useAxiosPublic";

//Image Upload
export const imageUpload = async (image) => {
  const axiosPublic = useAxiosPublic();
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axiosPublic.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};
