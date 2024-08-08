import { Link } from "react-router-dom";
import img2 from "../assets/developers-1.png";

const Advertises = () => {
  return (
    <>
      <div className="text-center p-4 ">
        <h2 className="text-3xl font-bold text-[#37c5bd] p-2">
          🏆 Join Our Exciting Contest! 🏆
        </h2>
        <p> Be Part of the Challenge and Win Amazing Prizes!</p>
      </div>
      <div className="divider mx-96"></div>
      <div className="flex-1 md:flex justify-around p-4">
        <div className="font-bold">
          <h2 className="text-xl">Current Contest Winner:</h2>
          <p>Name:</p>
          <p>Winning Entry:</p>
          <p>Prize:</p>
          <div className="divider"></div>
          <h2 className="text-xl">Contest Statistics:</h2>
          <ul>
            <li>Participants: 2,345</li>
            <li>Total Contest Winners: 150</li>
          </ul>
          <div className="divider"></div>
          <h2 className="text-xl"> Why Participate? </h2>
          <p>Participating in our contest is a chance to:</p>
          <ul>
            <li>Showcase your creativity.</li>
            <li>Compete with talented individuals.</li>
            <li>Win exciting prizes and gain recognition.</li>
          </ul>
          <div className="divider"></div>
          <h3 className="text-xl">How to Participate:</h3>
          <ul>
            <li>1. Register on our website.</li>
            <li>2. Submit your entry before the deadline.</li>
            <li>3. Wait for the announcement of the winners.</li>
          </ul>
          <div className="divider"></div>
          <h3 className="text-xl">Inspiration from Our Community:</h3>
          <p>
            "Winning this contest was a dream come true! <br /> It boosted my
            confidence and opened new opportunities." - John Smith, Previous
            Winner
          </p>
          <p>
            "I loved the challenge and the thrill of competition. <br />
            Can’t wait for the next one!" - Emily Davis, Contest Participant
          </p>
          <div className="divider"></div>
          <h3 className="mb-4 text-xl">
            Don’t miss out on the chance to be our next star! <br />
            <Link to="/signUp" className="text-[#37c5bd]">
              Register Now
            </Link>
            and let your talent shine!
          </h3>
        </div>
        <div>
          <img src={img2} alt="" />
        </div>
      </div>
    </>
  );
};

export default Advertises;
