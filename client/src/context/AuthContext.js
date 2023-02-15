import { React, useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const user = localStorage.getItem("user");
    const logout = () => {
        localStorage.clear();
    };

    useEffect(() => {
        async function getuser() {

            await setCurrentUser(JSON.parse(user));
            await setLoading(false);

        }
        getuser();
    }, [user]);
    return (
        <AuthContext.Provider
            value={{
                currentUser,
                logout

            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;