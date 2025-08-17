import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NhostProvider } from "@nhost/react";
import { nhost } from "./utils/nhost.ts";

createRoot(document.getElementById("root")!).render(
    <NhostProvider nhost={nhost}>
        <App />
    </NhostProvider>
);
