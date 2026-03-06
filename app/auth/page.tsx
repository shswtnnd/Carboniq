"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from "@heroui/react";
import { motion } from "framer-motion";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "carboniq_users_v1";
const SESSION_KEY = "carboniq_session_v1";

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(name: string, email: string) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
}

export default function AuthPage() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");

  const goToNext = () => {
    if (typeof window === "undefined") {
      router.push("/dashboard");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next");
    const safePath = nextParam && nextParam.startsWith("/") ? nextParam : "/dashboard";
    router.push(safePath);
  };

  const handleSignup = () => {
    setError("");
    if (!signupName.trim()) return setError("enter your name to create your account.");
    if (!signupEmail.includes("@")) return setError("enter a valid email address.");
    if (signupPassword.length < 6) return setError("password must be at least 6 characters.");

    const users = loadUsers();
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === signupEmail.trim().toLowerCase(),
    );
    if (alreadyExists) return setError("this email already has an account. try log in.");

    const newUser: StoredUser = {
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
    };
    saveUsers([...users, newUser]);
    saveSession(newUser.name, newUser.email);
    goToNext();
  };

  const handleLogin = () => {
    setError("");
    const users = loadUsers();
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
        user.password === loginPassword,
    );
    if (!matchedUser) return setError("account not found. check details or sign up first.");
    saveSession(matchedUser.name, matchedUser.email);
    goToNext();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 py-14 text-[#E5E7EB]">
      <MinimalAmbientBackground className="opacity-65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.2),transparent_45%)]" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="border border-white/10 bg-[#0b1220]/90 shadow-[0_20px_80px_rgba(2,6,23,0.65)]">
          <CardHeader className="flex flex-col items-start gap-1 pb-0">
            <p className="text-xs uppercase tracking-[0.2em] text-[#86efac]">Carboniq Access</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
              welcome back
            </h1>
          </CardHeader>

          <CardBody className="pt-5">
            <Tabs
              aria-label="auth tabs"
              color="success"
              variant="underlined"
              classNames={{
                tabList: "gap-8",
                tab: "px-0 h-10",
                cursor: "bg-[#22C55E]",
                tabContent: "font-semibold data-[selected=true]:text-[#86efac]",
              }}
            >
              <Tab key="login" title="Log In">
                <div className="space-y-4 pt-4">
                  <Input
                    type="email"
                    label="Email"
                    value={loginEmail}
                    onValueChange={setLoginEmail}
                    classNames={{ inputWrapper: "bg-[#0f172a] border border-white/10" }}
                  />
                  <Input
                    type="password"
                    label="Password"
                    value={loginPassword}
                    onValueChange={setLoginPassword}
                    classNames={{ inputWrapper: "bg-[#0f172a] border border-white/10" }}
                  />
                  <Button
                    onPress={handleLogin}
                    className="mt-2 h-12 w-full rounded-xl bg-[#B6FF00] font-semibold text-black"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </Tab>

              <Tab key="signup" title="Sign Up">
                <div className="space-y-4 pt-4">
                  <Input
                    type="text"
                    label="Full Name"
                    value={signupName}
                    onValueChange={setSignupName}
                    classNames={{ inputWrapper: "bg-[#0f172a] border border-white/10" }}
                  />
                  <Input
                    type="email"
                    label="Email"
                    value={signupEmail}
                    onValueChange={setSignupEmail}
                    classNames={{ inputWrapper: "bg-[#0f172a] border border-white/10" }}
                  />
                  <Input
                    type="password"
                    label="Password"
                    value={signupPassword}
                    onValueChange={setSignupPassword}
                    classNames={{ inputWrapper: "bg-[#0f172a] border border-white/10" }}
                  />
                  <Button
                    onPress={handleSignup}
                    className="mt-2 h-12 w-full rounded-xl bg-[#22C55E] font-semibold text-black"
                  >
                    Create Account
                  </Button>
                </div>
              </Tab>
            </Tabs>

            {error ? <p className="mt-4 text-sm text-[#fca5a5]">{error}</p> : null}

            <p className="mt-6 text-center text-sm text-white/65">
              back to{" "}
              <Link href="/" className="text-[#86efac] underline-offset-4 hover:underline">
                home
              </Link>
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </main>
  );
}
