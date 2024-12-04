import React from "react";

const ParticipatedTableRow = ({ participated, refetch }) => {
  return (
    <tr className="text-center border px-4 py-2">
      <td>${participated?.price}</td>
      <td>{participated?.date}</td>
      <td>{new Date(participated?.participationDate).toLocaleDateString()}</td>
      <td>{participated?.transactionId}</td>

      <td className="border px-4 py-2 text-center text-red-400 ">
        {participated.status === "completed" ? "Completed" : "Pending.."}
      </td>
    </tr>
  );
};

export default ParticipatedTableRow;
