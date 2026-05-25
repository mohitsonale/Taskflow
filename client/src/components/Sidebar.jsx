import { X, LayoutDashboard, CheckCircle2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({sidebarOpen,setSidebarOpen}) {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (

        <aside className={`fixed md:static top-0 left-0 z-50 h-screen w-72 bg-gray-800 text-white p-6 flex flex-col transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

           

            <div>

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">TaskFlow</h1>

                        <p className="text-slate-400 text-sm mt-1">Productivity Dashboard</p>

                    </div>

                    <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X /></button>

                </div>

                

                <div className="mt-12 space-y-3">

                    <button className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-2xl transition-all">Dashboard</button>

                    <button className="w-full flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-2xl transition-all text-slate-300">Tasks</button>

                </div>

            </div>


            <div className="mt-auto bg-slate-800 border border-slate-700 rounded-3xl p-5">

                <h3 className="text-xl font-semibold">Stay Productive</h3>

                <p className="text-slate-400 mt-3 leading-7 text-sm">
                    Organize your work and manage tasks
                    with a modern productivity dashboard.
                </p>

            </div>

            <button onClick={() => {logout();navigate("/");window.confirm("Are you sure you want to logout?")}} className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-all">Logout</button>

        </aside>
    );
}

export default Sidebar;