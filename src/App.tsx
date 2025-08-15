import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import HomePage from "./pages/home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/landing" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
