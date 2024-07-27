import banner from "../../../assets/banner.jpeg";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-[#37c5bd] text-5xl font-bold">
            Hello Developer
          </h1>
          <p className="mb-5">
            A Contest Platform is an innovative and dynamic online hub designed
            to facilitate the creation, management, and participation in various
            contests and competitions. Whether you're looking to host coding
            challenges, creative writing contests, art competitions, or any
            other type of contest, this platform offers a comprehensive solution
            tailored to your needs.
          </p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-[#37c5bd]"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-10 w-10 opacity-100"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Banner;
