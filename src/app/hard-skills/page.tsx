"use client";

import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HelpButton from "@/components/ui/HelpButton";

const HardSkillsPage: React.FC = () => {
  const router = useRouter();

  const handleGameStart = (title: string) => {
    router.push(`/game?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div className="bg-[#FFD166] flex justify-center space-x-4 py-4">
        <button
          className="text-lg md:text-xl font-bold px-4 py-2 rounded-[10px] border-[3px] border-transparent hover:border-[#FFA500]"
          onClick={() => handleGameStart("Nomeação de Variáveis")}
        >
          Nomeação de Variáveis
        </button>
        <button
          className="text-lg md:text-xl font-bold px-4 py-2 rounded-[10px] border-[3px] border-transparent hover:border-[#FFA500]"
          onClick={() => handleGameStart("Funções Simples e Pequenas")}
        >
          Funções Simples e Pequenas
        </button>
        <button
          className="text-lg md:text-xl font-bold px-4 py-2 rounded-[10px] border-[3px] border-transparent hover:border-[#FFA500]"
          onClick={() => handleGameStart("Comentários Necessários")}
        >
          Comentários Necessários
        </button>
        <button
          className="text-lg md:text-xl font-bold px-4 py-2 rounded-[10px] border-[3px] border-transparent hover:border-[#FFA500]"
          onClick={() => handleGameStart("Código Legível")}
        >
          Código Legível
        </button>
      </div>
      <Footer />
      <HelpButton />
    </div>
  );
};

export default HardSkillsPage;
