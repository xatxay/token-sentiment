import { Navigate } from "react-router-dom";
import { AuthenticatedRouteProps } from "../utils/interface";

const AuthenticatedRoute = ({
  isAuthenticated,
  children,
}: AuthenticatedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthenticatedRoute;
