import React, { useState } from "react";
import AddContestForm from "../../../Components/Form/AddContestForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";

import { useMutation } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  const { mutateAsync } = useMutation({
    mutationFn: async (contestData) => {
      const { data } = await axiosSecure.post(`/add-contest`, contestData);
      return data;
    },
    onSuccess: () => {
      // console.log("Data Saved SuccessFully");
      toast.success("Add Contest Successfully");
      navigate("/dashboard/my-created-contest");
      setLoading(false);
    },
  });

  // Form handler
  const handleAddContest = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const contestName = form.contestName.value;
    const category = form.category.value;
    const price = form.price.value;
    const date = startDate;

    const image = form.image.files[0];
    const prize = form.prize.value;
    const instruction = form.instruction.value;
    const description = form.description.value;
    const creator = {
      name: user?.displayName || "Anonymous Creator",
      image: user?.photoURL,
      email: user?.email,
    };
    setLoading(true);
    // console.log("User object:", user); // To check all user properties

    //image upload and save to imgbb
    try {
      const image_url = await imageUpload(image);
      const contestData = {
        contestName,
        category,
        price,
        date,
        image: image_url,
        prize,
        instruction,
        description,
        creator,
      };

      // Post Request to server
      await mutateAsync(contestData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  // HandleImage change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Contest | Dashboard </title>
      </Helmet>
      {/* {Form} */}
      <AddContestForm
        handleAddContest={handleAddContest}
        startDate={startDate}
        setStartDate={setStartDate}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </>
  );
};

export default AddContest;
