import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing";
import HomePage from "./pages/home";
import Protected from "./components/Protected";
import Chat from "./pages/Chat";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo";
import { NhostProvider } from "@nhost/react";
import { nhost } from "./utils/nhost";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <NhostProvider nhost={nhost}>
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
                        <Route
                            path="/chat"
                            element={<Navigate to="/" replace />}
                        />
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
            </NhostProvider>
        </ApolloProvider>
    );
}

export default App;
