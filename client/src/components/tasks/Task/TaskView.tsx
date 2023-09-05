import React from "react";
import { TaskType as TaskType } from "../../../features/tasks/taskTypes";

interface TaskViewProps {
    task: TaskType;
    onDelete: () => void;
    onEdit: () => void;
}

const TaskView: React.FC<TaskViewProps> = ({ task, onDelete, onEdit }) => {
    return <li className="list-group-item text-light bg-transparent" style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center">
                <div className="fw-bold">{task.title}</div>
                <p>{task.description}</p>
                <p className="small">
                    created on 
                    {new Date(task.createDate).toLocaleDateString()}&nbsp;
                    at &nbsp; 
                    {new Date(task.createDate).toLocaleTimeString(
                        [], { hour: "2-digit", minute: "2-digit" })}
                </p>
            </div>

            <div className="d-flex flex-column justify-content-center m-2">
                <button className="btn btn-danger btn-sm mb-2" onClick={onDelete}>Delete</button>
                <button className="btn btn-success btn-sm" onClick={onEdit}>Edit</button>
            </div>
        </div>
    </li>;
};

export default TaskView;
