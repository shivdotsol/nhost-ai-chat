import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        </div>
    );
}
