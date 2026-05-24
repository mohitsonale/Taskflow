import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Login() {

  const navigate = useNavigate();
  const { backendUrl, login }=useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/auth/login`,
        formData
      );

      login(res.data.token);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}

        <div className="hidden md:flex bg-slate-900 text-white p-12 flex-col justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              TaskFlow
            </h1>

            <p className="text-slate-400 mt-3">
              Productivity Dashboard
            </p>

            <div className="mt-20">

              <h2 className="text-5xl font-bold leading-tight">
                Organize Your Work Better 🚀
              </h2>

              <p className="mt-6 text-slate-300 leading-8 text-lg">
                Manage tasks, improve productivity,
                and stay focused every day.
              </p>

            </div>

          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

            <h3 className="text-2xl font-semibold">
              Stay Productive
            </h3>

            <p className="text-slate-400 mt-3 leading-7">
              Keep track of your work with a clean
              and modern dashboard.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">

          <div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-3">
              Login to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="text-sm font-medium text-slate-600">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="text-sm font-medium text-slate-600">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all"
            >

              {
                loading ? "Loading..." : "Login"
              }

            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-8">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-600 font-semibold ml-2"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;