import { useAuthenticationStatus } from "@nhost/react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();
    const location = useLocation();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
