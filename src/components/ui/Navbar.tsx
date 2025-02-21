"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se há um token no localStorage para determinar a autenticação
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="bg-[#FFA500] shadow-[0_6px_2px_rgba(0,0,0,0.3)] h-[60px] flex items-center justify-between px-8">
      <h1
        className="text-white text-xl md:text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        SkillForge
      </h1>
      <p className="text-white text-xl md:text-2xl font-bold">Sobre Nós</p>
      <div className="relative flex items-center space-x-4">
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
        {showMenu && (
          <div className="absolute right-0 top-[52px] bg-[#FFA500] shadow-lg rounded-lg w-48">
            <ul className="py-2">
              {isAuthenticated ? (
                <>
                  <li
                    className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Meu Perfil
                  </li>
                  <li
                    className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer"
                    onClick={() => router.push("/settings")}
                  >
                    Configurações
                  </li>
                  <li
                    className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer"
                    onClick={() => {
                      // Aqui você pode implementar o logout (ex: remover token)
                      localStorage.removeItem("token");
                      setIsAuthenticated(false);
                      router.push("/");
                    }}
                  >
                    Sair
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </li>
                  <li
                    className="px-4 py-2 text-white hover:text-[#00B4D8] cursor-pointer"
                    onClick={() => router.push("/auth/register")}
                  >
                    Cadastrar
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
