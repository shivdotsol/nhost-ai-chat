import { Link, useNavigate } from "react-router-dom";
import { useSignOut, useUserData } from "@nhost/react";
import { Plus, MessageCircle, LogOut, User, Trash2, Clock } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
    const { signOut } = useSignOut();
    const user = useUserData();

    const handleSignOut = () => {
        signOut();
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else if (diffInHours < 168) {
            // 7 days
            return date.toLocaleDateString([], { weekday: "short" });
        } else {
            return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <MessageCircle className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Your Chats
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">
                                {user?.displayName || user?.email || "User"}
                            </span>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}
