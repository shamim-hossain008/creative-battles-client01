import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="card card-body text-center items-center mx-auto mt-4 bg-[#37C5BD] w-1/2 h-full rounded-2xl">
      <h2>MY Profile</h2>
      <div className="avatar inline-flex justify-center">
        <div className="w-24 rounded-full">
          <img
            className="overflow-hidden content-center"
            src={user?.photoURL}
          />
        </div>
      </div>

      <h2>Name: {user?.displayName}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default MyProfile;
