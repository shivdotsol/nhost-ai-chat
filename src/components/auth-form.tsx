"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent,
        mode: "signin" | "signup"
    ) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log(`${mode} attempt:`, { email, password });
        setIsLoading(false);
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

            <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                    <Card>
                        {/* <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader> */}
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

                <TabsContent value="signup">
                    <Card>
                        {/* <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account to get started
                            </CardDescription>
                        </CardHeader> */}
                        <CardContent>
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
            </Tabs>
        </div>
    );
}
