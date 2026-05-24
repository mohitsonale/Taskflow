import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";

function CreateTaskModal({
  openModal,
  setOpenModal,
  fetchTasks,
  editTask,
  setEditTask,
}) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    due_date: "",
  });

  const { token, backendUrl }=useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // PREFILL FORM FOR EDIT

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

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !formData.title ||
      !formData.description ||
      !formData.due_date
    ) {
      return toast.error("All fields are required");
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      // UPDATE TASK

      if (editTask) {

        await axios.put(
          `${backendUrl}/api/tasks/${editTask.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Task updated");

      } else {

        // CREATE TASK

        await axios.post(
          `${backendUrl}/api/tasks`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Task created");
      }

      // REFRESH TASKS

      fetchTasks();

      // CLOSE MODAL

      setOpenModal(false);

      // RESET EDIT STATE

      setEditTask(null);

      // RESET FORM

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

  // CLOSE MODAL FUNCTION

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

  // DON'T RENDER IF CLOSED

  if (!openModal) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      {/* MODAL */}

      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 animate-fadeIn">

        {/* TOP */}

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-slate-800">

            {
              editTask
                ? "Edit Task"
                : "Create Task"
            }

          </h2>

          <button
            onClick={closeModal}
            className="text-slate-500 text-xl hover:text-black transition-all"
          >
            ✕
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="text-sm font-medium text-slate-600">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="text-sm font-medium text-slate-600">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>

          {/* STATUS */}

          <div>

            <label className="text-sm font-medium text-slate-600">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option>Todo</option>

              <option>In Progress</option>

              <option>Completed</option>

            </select>

          </div>

          {/* DUE DATE */}

          <div>

            <label className="text-sm font-medium text-slate-600">
              Due Date
            </label>

            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all disabled:opacity-50"
          >

            {
              loading
                ? "Saving..."
                : editTask
                ? "Update Task"
                : "Create Task"
            }

          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;