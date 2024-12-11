import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateContestForm from "../../Form/UpdateContestForm";

const EditContestModal = ({ setIsEditModalOpen, isOpen, contest, refetch }) => {
  const [date, setDate] = useState(contest?.date);
  const [loading, setLoading] = useState();
  const [contestData, setContestData] = useState(contest);
  const axiosSecure = useAxiosSecure();

  //   Date handler
  const handleDate = (item) => {
    setDate(item.selection);
  };
  // HandleImage change
  const handleImage = async (image) => {
    setLoading(true);
    try {
      // upload image
      const image_url = await imageUpload(image);
      console.log(image_url);
      setContestData({ ...contestData, image: image_url });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  //
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const updatedContestData = Object.assign({}, contestData);
    delete updatedContestData._id;

    // Fetch Contest
    try {
      const { data } = await axiosSecure.put(
        `/contest/update/${contest?._id}`,
        updatedContestData
      );
      console.log("from Update", data);
      refetch();
      setIsEditModalOpen(false);
      setLoading(false);
      toast.success("Contes Update Info Update done!!");
    } catch (error) {
      console.error("Error fetching users", error.message);
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Contest Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update Contest Form */}
                  <UpdateContestForm
                    handleSubmit={handleSubmit}
                    date={date}
                    handleDate={handleDate}
                    setDate={setDate}
                    loading={loading}
                    setLoading={setLoading}
                    contestData={contestData}
                    setContestData={setContestData}
                    handleImage={handleImage}
                    refetch={refetch}
                  />
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditContestModal;
