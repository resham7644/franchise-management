import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
