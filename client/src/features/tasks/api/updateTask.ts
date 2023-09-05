import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { TaskType, UpdateTaskParams } from "../taskTypes";

export const updateTask = async (taskData: UpdateTaskParams): Promise<TaskType> => {
    const response = await fetchAPIInstace<TaskType>(`/tasks/update/${taskData.id}`, {
        method: "PUT",
        body: JSON.stringify(taskData)
    });

    return response.data;
};