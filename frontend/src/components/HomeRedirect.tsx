import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingState from "./states/LoadingState";
const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState />;
  }

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/register" replace />
  );
};

export default HomeRedirect;
