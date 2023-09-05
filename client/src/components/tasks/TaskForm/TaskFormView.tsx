import React from "react";

interface TaskFormViewProps {
    title: string;
    description: string;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (desc: string) => void;
    onSubmit: (evt: React.FormEvent) => void;
    isEditing: boolean;
}

const TaskFormView: React.FC<TaskFormViewProps> = ({ title, description, onTitleChange, onDescriptionChange, onSubmit, isEditing }) => {
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-4">
                        <input 
                            type="text" 
                            className="form-control bg-dark text-light border border-secondary" 
                            value={title} 
                            onChange={evt => onTitleChange(evt.target.value)} 
                            required
                            minLength={3}
                            placeholder="Title"
                        />
                    </div>

                    <div className="mb-4">
                        <textarea 
                            className="form-control bg-dark text-light border border-secondary" 
                            rows={2}
                            value={description} 
                            onChange={evt => onDescriptionChange(evt.target.value)}
                            placeholder="Description..."
                        ></textarea>
                    </div>

                    <div>
                        <button className="btn btn-primary" type="submit">
                            {isEditing ? "Update Task" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormView;
