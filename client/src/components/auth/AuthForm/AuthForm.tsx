import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthFormProps, AuthFormOptions, AuthResponseType, FormFields } from "../../../features/auth/authTypes";
import { registerUser } from "../../../features/auth/api/register";
import { loginUser } from "../../../features/auth/api/login";
import AuthFormView from "../AuthFormView/AuthFormView";
import { authFailed, authSuccess, endAuth, startAuth } from "../../../features/auth/slices/authSlice";
import { setUser } from "../../../features/auth/slices/userSlice";
import { RootState } from "../../../app/store";

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const [formData, setFormData] = useState<FormFields>({ fName: "", lName: "", email: "", password: "" });

    
    useEffect(() => {
        setFormData({ fName: "", lName: "", email: "", password: "" });
    }, [mode]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        dispatch(startAuth());

        try {
            let response: AuthResponseType | null = null;
            
            if (mode === AuthFormOptions.Register) {
                response = await registerUser(formData.fName, formData.lName, formData.email, formData.password);

                if (response.user) {
                    navigate('/login');
                    dispatch(endAuth());
                }
            } else if (mode === AuthFormOptions.Login) {
                response = await loginUser(formData.email, formData.password);

                if (response.token) {
                    dispatch(authSuccess(response.token));
                    navigate('/tasks');
                }
            }

            if (response && response.user) {
                dispatch(setUser({ fName: response.user.fName, lName: response.user.lName, email: response.user.email }));
            }
        } catch (error) {
            const errorMessage = mode === AuthFormOptions.Register ? "Registration failed" : "Login failed";
            dispatch(authFailed(errorMessage));
        }
        
    };

    return <AuthFormView 
        fName={formData.fName}
        lName={formData.lName}
        email={formData.email}
        password={formData.password}
        handleChange={handleInputChange}
        onSubmit={handleSubmit}
        mode={mode}
        isLoading={isLoading} 
    />
};

export default AuthForm;