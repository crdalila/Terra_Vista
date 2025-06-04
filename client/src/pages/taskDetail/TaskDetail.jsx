import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import "./TaskDetail.css";

function TaskDetail() {
    const task = useLoaderData();

    return (
        <section className="task-detail">
        </section>
    );
}

export default TaskDetail;