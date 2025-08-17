import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing";
import HomePage from "./pages/home";
import Protected from "./components/Protected";
import Chat from "./pages/Chat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/home"
                    element={
                        <Protected>
                            <HomePage />
                        </Protected>
                    }
                />
                <Route path="/" element={<Landing />} />
                <Route path="/chat" element={<Navigate to="/" replace />} />
                <Route
                    path="/chat/:chatId"
                    element={
                        <Protected>
                            <Chat />
                        </Protected>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
