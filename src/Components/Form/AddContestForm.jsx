import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddContestForm = ({ handleAddContest }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleAddContest}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Contest Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md "
                name="name"
                id="name"
                type="text"
                placeholder="Contest Name"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Contest Type
              </label>
              <select
                required
                className="w-full px-4 py-3 border-blue-300 focus:outline-blue-500 rounded-md"
                name="category"
              >
                <option disabled selected>
                  Image Design Contests
                </option>
                <option>Article Writing</option>
                <option>Marketing Strategy</option>
                <option>Digital Advertisement Contests</option>
                <option>Gaming Review</option>
                <option>Book Review</option>
                <option>Business Idea Contests</option>
                <option>Movie Review</option>
              </select>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Contest Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md "
                name="price"
                id="price"
                type="text"
                placeholder="Contest Price"
                required
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="prize" className="block text-gray-600">
                  Prize Money or Others
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md "
                  name="prize"
                  id="prize"
                  type="number"
                  placeholder="Prize Money or Others"
                  required
                />
              </div>

              <div className="space-y-1 text-sm text-center">
                <label htmlFor="deadline" className="block text-gray-600">
                  Contest Deadline
                </label>
                <DatePicker
                  className="text-xl text-center"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="instruction" className="block text-gray-600">
                Task Submission text instruction
              </label>
              <textarea
                className="w-full px-4 py-4 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md "
                name="instruction"
                id="instruction"
                type="text"
                required
              ></textarea>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800  border border-blue-300 focus:outline-blue-500 "
                name="description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContestForm;
