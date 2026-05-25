import { Menu } from "lucide-react";

function Topbar({ setSidebarOpen, setOpenModal }) {

  return (

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div className="flex items-center gap-4">

        <button onClick={() => setSidebarOpen(true)} className="md:hidden bg-white p-3 rounded-2xl border border-slate-200"><Menu /></button>

        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>

          <p className="text-slate-500 mt-2">Manage your tasks efficiently</p>

        </div>

      </div>


      <div className="flex flex-col sm:flex-row gap-3">

        <select className="border border-slate-300 bg-white px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500">

          <option>All Tasks</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Completed</option>

        </select>



        <button onClick={() => setOpenModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all">+ Create Task</button>

      </div>

    </div>
  );
}

export default Topbar;