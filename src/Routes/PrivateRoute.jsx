import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


const PrivateRout = ({ children }) => {
   const location = useLocation();
  const { user,loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinner text="Loading User Access"></LoadingSpinner>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRout;