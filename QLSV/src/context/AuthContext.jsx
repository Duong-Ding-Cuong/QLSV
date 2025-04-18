import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState(() => {
        const storedStudent = localStorage.getItem("student");
        return storedStudent ? JSON.parse(storedStudent) : null;
    });

    useEffect(() => {
        const storedStudent = localStorage.getItem("student");
        if (storedStudent) {
            setStudent(JSON.parse(storedStudent));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("accessToken", userData.token);
        localStorage.setItem("student", JSON.stringify(userData));
        setStudent(userData);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("student");
        setStudent(null);
    };

    return (
        <AuthContext.Provider value={{ student, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
