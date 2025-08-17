import { AuthForm } from "@/components/auth-form";
import { HeroSection } from "@/components/hero-section";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthenticationStatus } from "@nhost/react";
import { Navigate } from "react-router-dom";

function Landing() {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();
    if (isLoading) return <LoadingSpinner />;
    if (isAuthenticated) return <Navigate to="/home" replace />;
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background to-muted p-8 lg:p-12">
                <HeroSection />
            </div>

            <div className="flex-1 flex items-center justify-center bg-card p-8 lg:p-12">
                <AuthForm />
            </div>
        </div>
    );
}

export default Landing;
