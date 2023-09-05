import { fetchAPIInstace } from "../../../shared/fetchApiInstance";

export const deleteTask = async (taskId: string): Promise<void> => {
    await fetchAPIInstace(`/tasks/delete/${taskId}`, { method: "DELETE" });
};
