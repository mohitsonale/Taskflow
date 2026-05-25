import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskCard from "../components/Taskcard";
import CreateTaskModal from "../components/CreateTaskmodel";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Dashboard() {

  const [sidebarOpen, setSidebarOpen]=useState(false);
  const [openModal, setOpenModal]=useState(false);
  const [tasks, setTasks]=useState([]);
  const [loading, setLoading]=useState(true);
  const [filter, setFilter]=useState("All");
  const [editTask, setEditTask]=useState(null);
  const { token, backendUrl }=useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${backendUrl}/api/tasks`, { headers: { Authorization: `Bearer ${token}`, }, });

      setTasks(res.data.tasks);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {

    if (filter === "All") {
      return true;
    }

    return task.status === filter;
  });

  return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* TOPBAR */}

        <Topbar
          setSidebarOpen={setSidebarOpen}
          setOpenModal={setOpenModal}
          filter={filter}
          setFilter={setFilter}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">



          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">

            <h3 className="text-slate-500 text-sm font-medium">Total Tasks</h3>

            <h2 className="text-4xl font-bold text-slate-800 mt-4">{tasks.length}</h2>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">

            <h3 className="text-slate-500 text-sm font-medium">Completed</h3>

            <h2 className="text-4xl font-bold text-green-600 mt-4">

              {
                tasks.filter(
                  (task) => task.status === "Completed"
                ).length
              }

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">

            <h3 className="text-slate-500 text-sm font-medium">In Progress</h3>

            <h2 className="text-4xl font-bold text-yellow-500 mt-4">

              {
                tasks.filter(
                  (task) => task.status === "In Progress"
                ).length
              }

            </h2>

          </div>

        </div>

        <div className="mt-10">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">Your Tasks</h2>

              <p className="text-slate-500 mt-2">Manage and track your work</p>

            </div>

          </div>



          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            {
              loading ? (

                <div className="bg-white rounded-3xl p-10 border border-slate-200">

                  <h3 className="text-2xl font-semibold text-slate-700">Loading tasks...</h3>

                </div>

              ) : filteredTasks.length === 0 ? (

                <div className="bg-white rounded-3xl p-10 border border-slate-200">

                  <h3 className="text-2xl font-semibold text-slate-700">No Tasks Found</h3>

                  <p className="text-slate-500 mt-3">Create your first task 🚀</p>

                </div>

              ) : (

                filteredTasks.map((task) => (

                  <TaskCard
                    key={task.id}
                    task={task}
                    fetchTasks={fetchTasks}
                    setOpenModal={setOpenModal}
                    setEditTask={setEditTask}
                  />

                ))
              )
            }

          </div>

        </div>

      </main>


      <CreateTaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchTasks={fetchTasks}
        editTask={editTask}
        setEditTask={setEditTask}
      />


    </div>
  );
}

export default Dashboard;












