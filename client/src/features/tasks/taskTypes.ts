export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
};

export interface TaskType {
    id: string;
    title: string;
    description: string;
    createDate: string;
}

export interface TasksState {
    tasks: TaskType[];
    editingTask: TaskType | null;
    isLoading: boolean;
    error: string | null | undefined;
}

export interface CreateTaskParams {
    title: string;
    description: string;
    createDate: string;
}

export interface UpdateTaskParams extends TaskType {}

export interface TaskProps {
    task: TaskType;
}

export enum FilterTypes {
    Date = "Date",
    Title = "Title"
}

export type TaskFilterOpts = FilterTypes.Date | FilterTypes.Title;