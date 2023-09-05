import { Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm/AuthForm";
import Home from "./components/main/Home/Home";
import Layout from "./components/main/Layout";
import { AuthFormOptions } from "./features/auth/authTypes";
import TasksList from "./components/tasks/TaskList/TaskList";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const App = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated, navigate]);
    
    return <div className="container-fluid bg-dark vh-100" style={{ overflowY: "auto" }}>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<AuthForm mode={AuthFormOptions.Register} />} />
                <Route path="/login" element={<AuthForm mode={AuthFormOptions.Login} />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/tasks" element={<TasksList />} />
                </Route>
            </Routes>
        </Layout>
    </div>; 
};

export default App;