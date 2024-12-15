import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signIn,  setUser, loading, setLoading, resetPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    signIn(email, password)
      .then((res) => {
        console.log("Success:", res);
        setUser(res.user);
        toast.success("User Login Successfully");
        navigate(from);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error("Logged in failed.....!");
      });
    setLoading(false);
  };

  // reset password
  const handleResetPassword = async () => {
    if (!email) return toast.error("Please write your email first");
    try {
      setLoading(true);
      await resetPassword(email);
      toast.success(
        "Request Success! Check your email for further process...."
      );
    } catch (error) {
      console.error("Reset password error:", error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  // const handleGoogleLogin = () => {
  //   googleLogin().then((res) => {
  //     setUser(res.user);
  //     toast.success("User logged in successfully");
  //     navigate(location?.state ? location.state : "/");
  //   });
  // };

  return (
    <>
      <Helmet>
        <title>Creative-Battles | Login</title>
      </Helmet>
      <div className="hero h-[700px]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-600 lg:max-w-4xl p-4">
          <div class="flex items-center h-full lg:px-20 ">
            <div>
              <h2 class="text-2xl py-20 font-bold text-white sm:text-3xl">
                <span className="text-[#37c5bd]">Creative</span>-
                <span className="">Battles</span>
              </h2>

              <p class="max-w-xl text-white">
                Enter your credentials to access your dashboard and stay updated
                on your contests.
              </p>
            </div>
          </div>
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </p>

            <SocialLogin />

            <form onSubmit={handleLogin}>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-500 lg:w-1/4"></span>

                <a
                  href="#"
                  className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or login with email
                </a>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  name="email"
                  onBlur={(e) => setEmail(e.target.value)}
                />
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
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  name="password"
                />
              </div>

              <div className="mt-6">
                <button
                  disabled={loading}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin m-auto text-green-600" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            <div className="space-y-1">
              <button
                onClick={handleResetPassword}
                className="text-xs hover:underline hover:text-[#37c5bd] text-gray-100"
              >
                Forget Password
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link
                to="/signUp"
                href="#"
                className="text-xs uppercase text-[#37c5bd] hover:underline"
              >
                or Sign Up
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
