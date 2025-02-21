"use client";

import React from "react";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import LoginForm from "../../../components/forms/LoginForm";
import HelpButton from "../../../components/ui/HelpButton";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="bg-[#0077B6] w-full max-w-[400px] mx-auto rounded-[20px] p-8">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-8 text-center">
            Login
          </h3>
          <LoginForm />
        </div>
      </div>
      <Footer />
      <HelpButton />
    </div>
  );
};

export default LoginPage;
