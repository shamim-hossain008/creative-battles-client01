import { Helmet } from "react-helmet";

import useAuth from "../../../hooks/useAuth";
import CreatorContest from "../../../Components/CreatedContestManage/CreatorContest";

const MyCreatedContest = () => {
  const { user } = useAuth();
  return (
    <div>
      <Helmet>
        <title>My Created Contest | Dashboard </title>
      </Helmet>

      <CreatorContest />
    </div>
  );
};

export default MyCreatedContest;
