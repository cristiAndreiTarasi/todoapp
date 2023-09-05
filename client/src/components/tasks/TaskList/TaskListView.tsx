import React from "react";
import { TaskType, TaskFilterOpts, FilterTypes } from "../../../features/tasks/taskTypes";
import TaskForm from "./../TaskForm/TaskForm";
import Task from "./../Task/Task";

interface TasksListViewProps {
    tasks: TaskType[];
    filterBy: TaskFilterOpts;
    onFilterChange: (filter: TaskFilterOpts) => void;
}

const TasksListView: React.FC<TasksListViewProps> = ({ tasks, filterBy, onFilterChange }) => {
    return (
        <div className="mt-5">
            <h1 className="text-light text-center mb-4">Tasks</h1>
            
            <div className="d-flex justify-content-center align-items-center mb-4 pt-2 pb-3">
                <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                <select 
                    className="select"
                    value={filterBy}
                    onChange={evt => onFilterChange(evt.target.value as TaskFilterOpts)}
                >
                    <option value={FilterTypes.Date}>Date</option>
                    <option value={FilterTypes.Title}>Title</option>
                </select>
            </div>
            
            <TaskForm />

            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <ul className="list-group flex-column justify-content-center ">
                        {tasks.map(task => <Task key={task.id} task={task} />)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TasksListView;
