import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store"; 
import { useAppDispatch } from "../../../shared/hooks/appDispatch";
import { fetchTasks } from "../../../features/tasks/taskThunks";
import { FilterTypes, TaskType, TaskFilterOpts } from "../../../features/tasks/taskTypes";
import TasksListView from "./TaskListView";

const TasksList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
    const dispatch = useAppDispatch();
    const [filterBy, setFilterBy] = useState<TaskFilterOpts>(FilterTypes.Date);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;

    const filterTasks = (tasks: TaskType[]): TaskType[] => {
        let sortedTasks = [...tasks];
      
        if (filterBy === FilterTypes.Date) {
            sortedTasks.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
        } else if (filterBy === FilterTypes.Title) {
            sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
        }
      
        return sortedTasks;
    };

    return (
        <TasksListView 
            tasks={filterTasks(tasks)} 
            filterBy={filterBy} 
            onFilterChange={setFilterBy} 
        />
    );
}

export default TasksList;
