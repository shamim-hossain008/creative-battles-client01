import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data?.email, data?.password).then((res) => {
      const loggedUser = res?.user;
      console.log("logged user", loggedUser);

      updateUserProfile(data?.displayName, data?.photoURL).then((res) => {
        // create user entry in the data base
        const userInfo = {
          name: data?.displayName,
          image: data?.photoURL,
          email: data?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
            reset();
            toast.success("User created successfully");
            navigate("/");
          }
        });
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Creative-Battles | SignUp </title>
      </Helmet>
      <section className="hero h-[700px]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-600 lg:max-w-4xl p-4">
          <div class="flex items-center h-full lg:px-20 ">
            <div>
              <h2 className="  text-2xl py-20 font-bold text-white sm:text-3xl">
                <span className="text-[#37c5bd]">Creative</span>-
                <span className="">Battles</span>
              </h2>

              <p class="max-w-xl text-white">
                Sign up to start discovering and participating in exciting
                challenges.
              </p>
            </div>
          </div>
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full px-6 py-8 md:px-8 lg:w-1/2"
            >
              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Sign Up
              </p>

              <SocialLogin />

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-500 lg:w-1/4"></span>

                <a
                  href="#"
                  className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or Sign Up with email
                </a>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="LoggingEmailAddress"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  name="name"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-600"> Email is required </span>
                )}
              </div>

              <div className="mt-4">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    for="loggingPassword"
                  >
                    Password
                  </label>
                </div>

                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /[A-Za-z]/,
                  })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  name="password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password not more then 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one uppercase, one lower case
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Photo URL
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="url"
                  name="photoURL"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <Link
                  to="/login"
                  className="text-xs text-[#37c5bd] uppercase hover:underline"
                >
                  Or sign In
                </Link>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </form>
          </>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
