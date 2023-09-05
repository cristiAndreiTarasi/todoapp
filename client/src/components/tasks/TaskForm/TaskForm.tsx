import React, { useEffect, useState } from "react";
import { editTask, createNewTask, fetchTasks } from "../../../features/tasks/taskThunks";
import { useAppDispatch } from "../../../shared/hooks/appDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { clearEditingTask } from "../../../features/tasks/taskSlice";
import TaskFormView from "./TaskFormView";

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useAppDispatch();

    const editingTask = useSelector((state: RootState) => state.tasks.editingTask);

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        }
    }, [editingTask]);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        if (editingTask) {
            dispatch(editTask({
                ...editingTask,
                title: title,
                description: description
            }));
            dispatch(clearEditingTask());
        } else {
            dispatch(createNewTask({
                title, description,
                createDate: new Date().toISOString(),
            }));
        }

        setTitle("");
        setDescription("");
    };

    return <TaskFormView 
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        isEditing={!!editingTask}
    />;
};

export default TaskForm;
