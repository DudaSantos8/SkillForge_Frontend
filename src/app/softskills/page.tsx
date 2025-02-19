"use client";

import React, { useState } from 'react';

const softskills: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#FFA500] shadow-[0_6px_2px_rgba(0,0,0,0.3)] h-[60px] flex items-center justify-between px-8">
        <h1 className="text-white text-xl font-bold">SkillForge</h1>
        <p className="text-white text-xl font-bold">Sobre nós</p>
        <div className="relative flex items-center space-x-4">
          {/* Ícone de usuário redondo com desenho vazado */}
          <div
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 015 15.5V15a4 4 0 014-4h6a4 4 0 014 4v.5a4 4 0 01-.121 2.304M15 11a4 4 0 10-6 0m6 0a4 4 0 01-6 0"
              />
            </svg>
          </div>
          {/* Menu suspenso */}
          {showMenu && (
            <div className="absolute right-0 top-[60px] bg-[#FFD166] shadow-lg rounded-lg w-48">
              <ul className="py-2">
                <li className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer">
                  Perfil
                </li>
                <li className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer">
                  Configurações
                </li>
                <li className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer">
                  Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {/* Conteúdo Principal */}
      <div className="p-8 flex-grow">
        {/* Ícone de Menu, Texto Skill Forge e Ícone de Interrogação */}
        <div className="flex items-center justify-between mb-8 px-8">
          <img alt="Ícone de Menu" className="h-8 w-8" />
          <h2 className="text-3xl font-bold text-gray-800">Skill Forge</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
        </div>
        {/* Box Central */}
        <div className="bg-[#0077B6] w-[800px] h-[300px] mx-auto rounded-[20px] flex flex-col items-center justify-center">
          <h3 className="text-white text-2xl font-bold mb-8">
            Jogos com Cenários do Dia a Dia
          </h3>
          {/* Botões alinhados verticalmente */}
          <div className="flex flex-col space-y-4">
            <button className="bg-[#00B4D8] text-white w-[300px] h-[50px] rounded-[10px] text-lg hover:bg-[#009ec3]">
              Raça
            </button>
            <button className="bg-[#00B4D8] text-white w-[300px] h-[50px] rounded-[10px] text-lg hover:bg-[#009ec3]">
              Genêro
            </button>
            <button className="bg-[#00B4D8] text-white w-[300px] h-[50px] rounded-[10px] text-lg hover:bg-[#009ec3]">
              Raking
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#003F5C] text-white text-center py-4">
        <p>
          @2025 by Maria Santos & Alicia Feliciano |{' '}
          <a
            href="https://facebook.com"
            className="text-[#00B4D8] hover:underline"
          >
            Linkedin
          </a>{' '}
          |{' '}
          <a
            href="https://twitter.com"
            className="text-[#00B4D8] hover:underline"
          >
            Linkedin
          </a>
        </p>
      </footer>
    </div>
  );
};

export default softskills;