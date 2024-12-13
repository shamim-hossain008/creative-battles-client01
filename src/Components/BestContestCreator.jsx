import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { useQuery } from "@tanstack/react-query";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SpinnerLoader from "./SpinnerLoader";

const BestContestCreator = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allContest = [], isLoading } = useQuery({
    queryKey: ["allContest"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-contest");
      return data;
    },
  });

  if (isLoading) return <SpinnerLoader />;
  return (
    <div className="p-4">
      <div className="text-center p-2">
        <h2 className="text-3xl text-[#37c5bd] font-bold">
          🌟 Top Contest Creators 🌟{" "}
        </h2>
        <p>Celebrating Creativity and Innovation</p>
      </div>
      <div className="flex-1 md:flex justify-around">
        <div>
          {/* box-1 text */}
          <h2 className="text-2xl fond-bold">Meet Our Star Creators:</h2>
          <div className="divider"></div>
          <h3 className="font-bold">1. Sarah Johnson</h3>
          <ul>
            <li>Contest: "Art Masterpiece Challenge"</li>
            <li>
              Description: An incredible journey through artistic expression,
              where participants showcase their best artwork.
            </li>
            <li> Participants: 1,200</li>
          </ul>
          <div className="divider"></div>
          {/*  */}
          <h3 className="font-bold">2. David Brown</h3>
          <ul>
            <li>Contest: "Art Masterpiece Challenge"</li>
            <li>
              Description: An incredible journey through artistic expression,
              where participants showcase their best artwork.
            </li>
            <li> Participants: 1,200</li>
          </ul>
          <div className="divider"></div>
          {/*  */}
          <h3 className="font-bold">3. Emily White</h3>
          <ul>
            <li>Contest: "Art Masterpiece Challenge"</li>
            <li>
              Description: An incredible journey through artistic expression,
              where participants showcase their best artwork.
            </li>
            <li> Participants: 1,200</li>
          </ul>
        </div>
        {/* box-2 Slider */}
        <div className="md:w-1/3 h-auto pt-4">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {allContest.map((contest) => (
              <SwiperSlide key={contest._id}>
                <img
                  className="w-full h-96 mx-auto rounded-xl  overflow-hidden object-cover"
                  src={contest.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BestContestCreator;
