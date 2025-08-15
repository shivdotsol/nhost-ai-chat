import { MessageCircle, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
    return (
        <div className="max-w-lg space-y-8">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                    nhost ai chat
                </h1>
            </div>

            <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Chat with AI, <span className="text-accent">Smarter</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Experience the next generation of AI conversations. Get
                    instant, intelligent responses powered by advanced AI
                    technology.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-foreground">
                        Intelligent conversations
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-foreground">
                        Lightning-fast responses
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-foreground">
                        Natural language processing
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
            </div>
        </div>
    );
}
