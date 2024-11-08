import { Link } from "react-router-dom";

const PopularContest = () => {
  return (
    <div className="p-2  ">
      <h2 className="text-2xl uppercase font-bold text-center p-4 text-[#37c5bd]">
        popular contest section
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="card bg-base-100 w-96 shadow-xl p-2">
          <div>
            <figure>
              <img
                src="https://replydam.discoveryreplymedia.com/production/24/88/263fc3f8-7871-a154-d7cb-ccaa3562bdf1/b5f41101-619d-4d10-9b16-922afb931e1a.jpg"
                alt="Shoes"
              />
            </figure>
            <div>
              <div className="flex justify-between p-2">
                <h2 className="card-title">ContestName: 4</h2>
                <h2>Participation Count: 5</h2>
              </div>
              <div>
                <p>Challenge your knowledge with trivia questions...</p>
              </div>
              <div className="card-actions p-2">
                <Link to="/viewDetails" className="btn bg-[#37c5bd]">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularContest;
