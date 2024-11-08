import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

const SpinnerLoader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="fadeLoader  text-center text-[#37c5bd]">
      <FadeLoader />
    </div>
  );
};

export default SpinnerLoader;
