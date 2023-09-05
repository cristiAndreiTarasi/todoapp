import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { TaskType } from "../taskTypes";

export const getTasks = async (): Promise<TaskType[]> => {
    const response = await fetchAPIInstace<TaskType[]>("/tasks/getAll");
    return response.data;
};
