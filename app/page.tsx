"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error" | "">("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      setMessage("登入成功");
      setMessageType("success");
    } catch (error) {
      console.error(error);

      setMessage("登入失敗，請確認帳號或密碼");
      setMessageType("error");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      setMessage("");
      setMessageType("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      setMessage("註冊成功");
      setMessageType("success");

      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.error(error);

      setMessage("註冊失敗，請確認 Email 與密碼");
      setMessageType("error");
    }
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>React 練習專案</h1>

        <p>歡迎光臨記帳頁面</p>

        <div className="auth-container">

        {user ? (
          <section className="logged-in-section">
            <p>
              您已經使用 <strong>{user.email}</strong> 登入
            </p>

            <div className="logged-in-actions">
              <button
                type="button"
                className="start-link"
                onClick={() => router.push("/accounting")}
              >
                立即開始
              </button>

              <button
                type="button"
                className="auth-button"
                onClick={handleLogout}
              >
                登出
              </button>
            </div>
          </section>
        ) : (

          <section className="auth-section">
            <h2>登入系統</h2>

            <div className="auth-field">
              <label htmlFor="login-email">電郵:</label>

              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">    
              <label htmlFor="login-password">密碼:</label>

              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>  

            <button
              type="button"
              className="auth-button"
              onClick={handleLogin}
            >
              登入
            </button>
          </section>
        )}

          <section className="auth-section">
            <h2>註冊帳戶</h2>

            <div className="auth-field">
              <label htmlFor="register-email">電郵:</label>

              <input
                id="register-email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">密碼:</label>

              <input
                id="register-password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>

              <button
                type="button"
                className="auth-button"
                onClick={handleRegister}
              >
                註冊
              </button>
          </section>
        </div>

        {message && (
          <p className={`auth-message ${messageType}`}>
        {message}
          </p>
        )}

      </section>
    </main>
  );
}