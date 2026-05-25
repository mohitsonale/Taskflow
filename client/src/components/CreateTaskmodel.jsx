import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function CreateTaskModal({ openModal, setOpenModal, fetchTasks, editTask, setEditTask, }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    due_date: "",
  });

  const { token, backendUrl } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    if (editTask) {

      setFormData({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        due_date: editTask.due_date,
      });
    }

  }, [editTask]);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!formData.title || !formData.description || !formData.due_date) {
      return toast.error("All fields are required");
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (editTask) {

        await axios.put(`${backendUrl}/api/tasks/${editTask.id}`, formData, { headers: { Authorization: `Bearer ${token}`, }, });

        toast.success("Task updated");

      } else {
        await axios.post(`${backendUrl}/api/tasks`, formData, { headers: { Authorization: `Bearer ${token}`, }, });

        toast.success("Task created");
      }

      fetchTasks();

      setOpenModal(false);

      setEditTask(null);

      setFormData({
        title: "",
        description: "",
        status: "Todo",
        due_date: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed"
      );

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const closeModal = () => {

    setOpenModal(false);

    setEditTask(null);

    setFormData({
      title: "",
      description: "",
      status: "Todo",
      due_date: "",
    });
  };



  if (!openModal) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">



      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 animate-fadeIn">

        {/* TOP */}

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">

            {
              editTask ? "Edit Task" : "Create Task"
            }

          </h2>

          <button onClick={closeModal} className="text-slate-500 text-xl hover:text-black transition-all">✕</button>

        </div>



        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>

            <label className="text-sm font-medium text-slate-600">Title</label>

            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter task title" className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-600">
              Description
            </label>

            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter task description" rows="4" className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-600">Status</label>

            <select name="status" value={formData.status} onChange={handleChange} className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>

            <label className="text-sm font-medium text-slate-600">Due Date</label>

            <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>

          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all disabled:opacity-50">
            {
              loading? "Saving...": editTask? "Update Task": "Create Task"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;









