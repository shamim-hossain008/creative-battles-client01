import React from "react";
import AddContestForm from "../../../Components/Form/AddContestForm";
import useAuth from "../../../hooks/useAuth";

const AddContest = () => {
  const { user } = useAuth();
  // Form handler
  const handleAddContest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = form.price.value;
    const to = "";
    const from = "";
    const image = form.image.files[0];
    const prize = form.prize.value;
    const instruction = form.instruction.value;
    const description = form.description.value;
    const creator = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
  };

  return (
    <div>
      <h3>Add Contest Page</h3>
      <AddContestForm handleAddContest={handleAddContest} />
    </div>
  );
};

export default AddContest;
