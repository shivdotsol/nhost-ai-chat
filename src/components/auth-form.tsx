"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/react";

export function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
        signInEmailPassword,
        isLoading: isSigningIn,
        error: signInError,
    } = useSignInEmailPassword();
    const {
        signUpEmailPassword,
        isLoading: isSigningUp,
        error: signUpError,
        needsEmailVerification,
    } = useSignUpEmailPassword();

    const isLoading = isSigningIn || isSigningUp;
    const error = signInError || signUpError;

    const handleSubmit = async (
        e: React.FormEvent,
        mode: "signin" | "signup"
    ) => {
        e.preventDefault();

        if (mode === "signin") {
            await signInEmailPassword(email, password);
        } else {
            await signUpEmailPassword(email, password);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-card-foreground">
                    Welcome
                </h2>
                <p className="text-muted-foreground">
                    Sign in to your account or create a new one
                </p>
            </div>

            <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                    <Card>
                        <CardContent>
                            {needsEmailVerification && (
                                <div className="mb-2 text-red-700 border border-red-700 px-3 py-1 font-semibold">
                                    Verification email sent, please check inbox
                                    and spam.
                                </div>
                            )}
                            <form
                                onSubmit={(e) => handleSubmit(e, "signup")}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Creating account..."
                                        : "Sign Up"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signin">
                    <Card>
                        <CardContent>
                            <form
                                onSubmit={(e) => handleSubmit(e, "signin")}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="signin-email">Email</Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signin-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            {error && (
                <div className="border border-red-800 text-red-800 px-5 py-2">
                    {error.message}
                </div>
            )}
        </div>
    );
}
