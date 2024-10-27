import React, { useState } from "react";
import AddContestForm from "../../../Components/Form/AddContestForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";

import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  // Form handler
  const handleAddContest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
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
    console.log("User object:", user); // To check all user properties

    //image upload and save to imgbb
    try {
      const image_url = await imageUpload(image);
      const contestData = {
        name,
        category,
        price,
        date,
        image: image_url,
        prize,
        instruction,
        description,
        creator,
      };

      console.table(contestData, "form add Contest page");
    } catch (error) {
      console.log(error);
    }
  };

  // HandleImage change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <div>
      <AddContestForm
        handleAddContest={handleAddContest}
        startDate={startDate}
        setStartDate={setStartDate}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
      />
    </div>
  );
};

export default AddContest;
