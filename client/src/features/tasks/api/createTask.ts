import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { CreateTaskParams, TaskType } from "../taskTypes";

export const createTask = async ({ title, description, createDate }: CreateTaskParams): Promise<TaskType> => {
    const response = await fetchAPIInstace<TaskType>("/tasks/create", {
        method: "POST",
        body: JSON.stringify({ title, description, createDate }),
    });

    return response.data;
};
