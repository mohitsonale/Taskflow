import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TaskCard({ task, fetchTasks, setOpenModal, setEditTask }) {
  const { token, backendUrl } = useContext(AuthContext);

  const getStatusStyle = (status) => {

    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-200 text-slate-700";
  };

  const deleteTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`${backendUrl}/api/tasks/${task.id}`, { headers: { Authorization: `Bearer ${token}`, }, });

      toast.success("Task deleted");

      fetchTasks();

    } catch (error) {
      toast.error("Failed to delete task");
      console.log(error);
    }
  };


  return (

    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div>

          <h3 className="text-xl font-semibold text-slate-800">{task.title}</h3>

          <p className="text-slate-500 mt-3 leading-7">{task.description}</p>

        </div>

        <span className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle(task.status)}`}>{task.status}</span>

      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">

        <p className="text-sm text-slate-500">Due Date:

          <span className="font-medium ml-2">{task.due_date}</span>

        </p>



        <div className="flex gap-3">

          <button onClick={() => { setEditTask(task); setOpenModal(true); }} className="border border-slate-300 hover:bg-slate-100 px-5 py-2 rounded-xl transition-all">Edit</button>

          <button onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteTask();
            }
          }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}




export default TaskCard;