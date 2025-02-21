"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HelpButton from "@/components/ui/HelpButton";
import Button from "@/components/ui/Button";

const GamePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = searchParams?.get("title");

  const [selectedOption, setSelectedOption] = useState<string>("");

  const questionTitle =
    title === "Comunicação Inclusiva"
      ? "Desafio: Transforme o Ambiente"
      : "Desafio: Código Limpo é Arte!";

  const questionText =
    title === "Comunicação Inclusiva"
      ? "Durante uma reunião, um colega é interrompido repetidamente. Escolha a estratégia ideal para transformar esse ambiente e promover a inclusão de forma impactante."
      : "Você se depara com um código desorganizado e confuso. Selecione a prática que vai transformar esse caos em uma obra de arte legível e eficiente.";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />

      <div
        className="flex-grow bg-cover bg-center flex justify-center items-center p-4"
        style={{ backgroundImage: 'url("/seu-background.jpg")' }}
      >
        <div className="bg-[#003F5C] bg-opacity-80 w-full max-w-[800px] p-6 md:p-8 rounded-md text-white shadow-md">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">{questionTitle}</h2>
          <p className="mb-6 text-base md:text-lg text-center">{questionText}</p>

          <div className="space-y-4">
            {["Opção A", "Opção B", "Opção C"].map((option, index) => (
              <label
                key={index}
                className="flex items-center bg-[#1f1f1f] bg-opacity-50 p-4 rounded-md cursor-pointer hover:bg-opacity-70"
              >
                <input
                  type="radio"
                  name="gameOption"
                  className="form-radio text-[#FFA500] mr-3"
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span className="text-base md:text-lg">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-8">
            <Button
              className="bg-[#FFA500] text-white w-full max-w-[200px] h-[50px] rounded-[10px] text-lg hover:bg-[#FF6F00] md:w-[150px] md:h-[40px] md:text-base"
            >
              VOLTAR
            </Button>
            <Button
              className="bg-[#0077B6] text-white w-full max-w-[200px] h-[50px] rounded-[10px] text-lg hover:bg-[#005b80] md:w-[150px] md:h-[40px] md:text-base"
            >
              PRÓXIMO
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      <HelpButton />
    </div>
  );
};

export default GamePage;
