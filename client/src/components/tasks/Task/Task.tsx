import React from "react";
import { TaskProps } from "../../../features/tasks/taskTypes";
import { useAppDispatch } from "../../../shared/hooks/appDispatch";
import { removeExistingTask } from "../../../features/tasks/taskThunks";
import { setEditingTask } from "../../../features/tasks/taskSlice";
import TaskView from "./TaskView";

const Task: React.FC<TaskProps> = ({ task }) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(removeExistingTask(task.id));
    };

    const handleEdit = () => {
        dispatch(setEditingTask(task));
    };

    return <TaskView
        task={task}
        onDelete={handleDelete}
        onEdit={handleEdit}
    />;
};

export default Task;
