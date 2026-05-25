import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Signup() {

  const navigate=useNavigate();
  const { backendUrl, login }=useContext(AuthContext);

  const [formData, setFormData]=useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading]=useState(false);

  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try {

      setLoading(true);

     const res = await axios.post(`${backendUrl}/api/auth/register`,formData);

      toast.success("Account created");

      login(res.data.token);

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

   

        <div className="hidden md:flex bg-slate-900 text-white p-12 flex-col justify-between">

          <div>

            <h1 className="text-4xl font-bold"> TaskFlow</h1>

            <p className="text-slate-400 mt-3">Productivity Dashboard</p>

            <div className="mt-20">

              <h2 className="text-5xl font-bold leading-tight">Build Better Workflow</h2>

              <p className="mt-6 text-slate-300 leading-8 text-lg">Create tasks, track progress,and manage projects easily.</p>

            </div>

          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

            <h3 className="text-2xl font-semibold">Start Today</h3>

            <p className="text-slate-400 mt-3 leading-7">Organize your daily work with a modern productivity dashboard.</p>

          </div>

        </div>


        <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">

          <div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Create Account</h2>

            <p className="text-slate-500 mt-3">Sign up to continue</p>

          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div>

              <label className="text-sm font-medium text-slate-600">Name</label>

              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>

            </div>

            <div>

              <label className="text-sm font-medium text-slate-600">Email</label>

              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>

            </div>

            <div>

              <label className="text-sm font-medium text-slate-600">Password</label>

              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>

            </div>

            <button type="submit"className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all">

              {
                loading ? "Creating..." : "Create Account"
              }

            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?

            <Link
              to="/"
              className="text-blue-600 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;