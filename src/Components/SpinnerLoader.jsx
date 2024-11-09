import React from "react";
import { FadeLoader } from "react-spinners";

const SpinnerLoader = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex flex-col justify-center items-center`}
    >
      <FadeLoader size={100} color="#37c5bd" />
    </div>
  );
};

export default SpinnerLoader;
