import { useState } from "react";
import { nhost } from "./utils/nhost";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await nhost.auth.signUp({
            email,
            password,
        });
        console.log(res);
    };
    return (
        <>
            <div className="container">
                <form onSubmit={handleSignup}>
                    <div className="flex col">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default App;
