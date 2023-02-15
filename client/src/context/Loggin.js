import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Loggin = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();
    if (currentUser) {
        return <Navigate to="/" state={{ path: location.pathname }} />;

    }
    return children

};

export default Loggin