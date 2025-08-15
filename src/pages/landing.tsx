import { AuthForm } from "@/components/auth-form";
import { HeroSection } from "@/components/hero-section";

function Landing() {
    return (
        <div className="min-h-screen flex">
            {/* Hero Section - Left Side */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background to-muted p-8 lg:p-12">
                <HeroSection />
            </div>

            {/* Auth Form - Right Side */}
            <div className="flex-1 flex items-center justify-center bg-card p-8 lg:p-12">
                <AuthForm />
            </div>
        </div>
    );
}

export default Landing;
