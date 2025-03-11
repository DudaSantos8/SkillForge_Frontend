"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HelpButton from "@/components/ui/HelpButton";
import axios, { AxiosError } from "axios";

const AuthPage: React.FC<{ type: "login" | "register" }> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "register" && password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }
    if (type === "register" && password.length < 8) {
      setErrorMessage("Precisa ser maior que 8 caracteres!");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    try {
      if (type === "login") {
        const response = await axios.post("https://0.0.0.0:8000/login", { email, password });
        if (response.status === 200) {
          const { id, email } = response.data;
          localStorage.setItem("userId", id);
          localStorage.setItem("userEmail", email);

          router.push("/");
        }
      } else if (type === "register") {
        const response = await axios.post("https://0.0.0.0:8000/users", { email, password, confirmPassword });
        if (response.status === 200) {
          router.push("/auth/login");
        }
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(
        axiosError.response?.data?.message || "Erro ao processar a solicitação. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-4 md:p-8">
        <div className="bg-[#0077B6] w-full max-w-[400px] mx-auto rounded-[20px] p-8 shadow-md">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-8 text-center" id="auth-title">
            {type === "login" ? "Login" : "Cadastro"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="auth-title">
            <label htmlFor="email" className="text-white font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500] text-sm md:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
            <label htmlFor="password" className="text-white font-medium">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500] text-sm md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
            {type === "register" && (
              <>
                <label htmlFor="confirm-password" className="text-white font-medium">Confirme sua Senha</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirme sua senha"
                  className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500] text-sm md:text-base"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-required="true"
                />
              </>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm" role="alert" aria-live="polite">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#FFA500] text-white p-3 rounded-lg font-bold hover:bg-[#FF6F00] transition text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white"
              disabled={loading}
            >
              {loading ? "Carregando..." : type === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>
          {type === "login" ? (
            <p className="text-center text-white mt-4 text-sm md:text-base">
              Não tem uma conta?{" "}
              <Link href="/auth/register" className="text-[#FFD166] hover:underline focus:outline-none focus:ring-2 focus:ring-white">
                Cadastre-se
              </Link>
            </p>
          ) : (
            <p className="text-center text-white mt-4 text-sm md:text-base">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-[#FFD166] hover:underline focus:outline-none focus:ring-2 focus:ring-white">
                Faça login
              </Link>
            </p>
          )}
        </div>
      </div>
      <Footer />
      <HelpButton />
    </div>
  );
};

export default AuthPage;
