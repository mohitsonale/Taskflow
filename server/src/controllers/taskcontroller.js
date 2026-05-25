const pool = require("../config/db");

const getTasks = async (req, res) => {

    try {
        const { status } = req.query;
        let query = "SELECT * FROM tasks WHERE user_id=$1";
        let value = [req.user.id];

        if (status) {
            query += " AND status=$2";
            value.push(status);
        }
        query += " ORDER BY created_at DESC";
        const tasks = await pool.query(query, value);
        res.status(200).json({ success: true, tasks: tasks.rows, });
    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const createTask = async (req, res) => {

    try {

        const { title, description, status, due_date } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required", });
        }

        const task = await pool.query(`INSERT INTO tasks(title,description,status,due_date,user_id)VALUES($1,$2,$3,$4,$5)RETURNING *`,
            [title, description, status, due_date, req.user.id,]
        );

        res.status(201).json({ success: true, message: "Task created successfully", task: task.rows[0], });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, description, status, due_date, } = req.body;

        const updatedTask = await pool.query(`UPDATE tasks SET title=$1,description=$2,status=$3,due_date=$4 WHERE id=$5 AND user_id=$6 RETURNING *`,
            [title, description, status, due_date, id, req.user.id,]
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask.rows[0],
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query("DELETE FROM tasks WHERE id=$1 AND user_id=$2", [id, req.user.id]);

        res.status(200).json({ success: true, message: "Task deleted successfully", });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, };