"use client";


import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import HelpButton from "../../../components/ui/HelpButton";


const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Cadastro realizado com:", { email, password });
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="bg-[#0077B6] w-full max-w-[400px] mx-auto rounded-[20px] p-8 shadow-md">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-8 text-center">
            Cadastro
          </h3>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirme a Senha"
              className="w-full p-3 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#FFA500]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#FFA500] text-white p-3 rounded-lg font-bold hover:bg-[#FF6F00] transition"
            >
              Cadastrar
            </button>
          </form>
          <p className="text-center text-white mt-4">
            Já tem uma conta? <Link href="/auth/login" className="text-[#FFD166] hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
      <Footer />
      <HelpButton />
    </div>
  );
};


export default RegisterPage;