import { useSignOut, useUserData } from "@nhost/react";
import { MessageCircle, LogOut, User } from "lucide-react";
import ChatList from "@/components/ChatList";

export default function Home() {
    const { signOut } = useSignOut();
    const user = useUserData();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
            <main>
                <ChatList />
            </main>
        </div>
    );
}
