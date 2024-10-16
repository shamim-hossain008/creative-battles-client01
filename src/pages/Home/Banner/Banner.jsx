import { CiSearch } from "react-icons/ci";
import banner from "../../../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="hero min-h-[60vh]"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="space-y-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Create Contests, Discover Talent
          </h1>
          <p className="text-sm md:text-lg">
            Build engaging competitions and find the brightest minds in any
            field with Creative Battles.
          </p>

          <div className="max-w-2xl mx-auto input input-bordered flex items-center text-black gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <CiSearch className="size-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
