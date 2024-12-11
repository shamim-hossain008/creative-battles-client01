import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ImSpinner9 } from "react-icons/im";

const UpdateContestForm = ({
  handleSubmit,
  handleImage,
  date,
  setDate,
  loading,
  contestData,
  setContestData,
  refetch,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Contest Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md "
                name="contestName"
                id="contestName"
                type="text"
                placeholder="Contest Name"
                required
                value={contestData?.contestName}
                onChange={(e) =>
                  setContestData({
                    ...contestData,
                    contestName: e.target.value,
                  })
                }
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
                value={contestData?.category}
                onChange={(e) =>
                  setContestData({ ...contestData, category: e.target.value })
                }
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
                value={contestData?.price}
                onChange={(e) =>
                  setContestData({ ...contestData, price: e.target.value })
                }
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      onChange={(e) => handleImage(e.target.files[0])}
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                      {" "}
                      Upload Image
                      {/* {imageText.length > 20
                        ? imageText.split(".")[0].slice(0, 15) +
                          ".." +
                          imageText.split(".")[1]
                        : imageText} */}
                    </div>
                  </label>
                </div>
              </div>
              <div className="h-20 w-20 object-cover overflow-hidden flex items-center">
                {/* {imagePreview && <img src={imagePreview} />} */}
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
                  type="text"
                  placeholder="Prize Money or Others"
                  required
                  value={contestData?.prize}
                  onChange={(e) =>
                    setContestData({ ...contestData, prize: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1 text-sm text-center">
                <label htmlFor="deadline" className="block text-gray-600">
                  Contest Deadline
                </label>
                <DatePicker
                  className="text-xl text-center"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat={"dd/MM/yyy"}
                  minDate={new Date()}
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
                value={contestData?.instruction}
                onChange={(e) =>
                  setContestData({
                    ...contestData,
                    instruction: e.target.value,
                  })
                }
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
                required
                value={contestData?.description}
                onChange={(e) =>
                  setContestData({
                    ...contestData,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
        >
          {loading ? (
            <ImSpinner9 className="animate-spin m-auto text-green-600" />
          ) : (
            "Update Now"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateContestForm;
