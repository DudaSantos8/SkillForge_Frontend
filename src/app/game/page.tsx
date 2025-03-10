"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HelpButton from "@/components/ui/HelpButton";
import Button from "@/components/ui/Button";

interface Question {
  question: string;
  options: string[];
  correct_answer: number;
}

interface Feedback {
  score: number | null;
  title: string;
  feedback_summary: string;
  detailed_feedback: string[];
}

const softSkillsTitles = [
  "Empatia", "Comunicacao inclusiva", "Pessoas negras", "Respeito as diferencas",
  "Vies Inconsciente", "Interseccionalidade", "Diversidade Cultural",
  "Equidade De Genero", "Inclusao De PCD", "Racial E Etnica",
  "LGBTQIA E Inclusao", "Socioeconomica", "Religiao E Espiritualidade",
  "Saude Mental E Inclusao",
];

const hardSkillsTitles = [
  "Funcoes Simples", "Comentarios Uteis", "Codigo Legivel", "Nomes Significativos",
  "Formatacao de Codigo", "Principio DRY", "Principio SRP", "Tratamente de Erros",
  "Reducao de Dependencias", "Testabilidade", "Principio KISS",
  "Principio YAGNI", "Refatoracao Continua", "Boas Praticas de POO",
];

const GamePage: React.FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams?.get("title");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!title || hasFetched) return;

    setHasFetched(true);

    const category = softSkillsTitles.includes(title)
      ? "softskills"
      : hardSkillsTitles.includes(title)
      ? "hardskills"
      : null;

    if (!category) {
      console.error("Título não reconhecido:", title);
      setIsGameFinished(true);
      setFeedback({
        score: 0,
        title: "Erro",
        feedback_summary: "Título não reconhecido.",
        detailed_feedback: ["Por favor, tente novamente com um título válido."]
      });
      return;
    }

    fetch(`http://18.231.117.6:8000/${category}/questions?title=${title}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Erro ao buscar perguntas:", err));
  }, [title, hasFetched]);

  if (isGameFinished || questions.length === 0 || !questions[currentQuestionIndex]) {
    return <div className="text-center text-lg">Carregando perguntas...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const checkAnswer = (selectedOption: string) => {
    const correctOption = currentQuestion.options[currentQuestion.correct_answer];
    const isCorrect = selectedOption === correctOption;
    setAnswers((prevAnswers) => [...prevAnswers, isCorrect]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameFinished(true);
      sendFeedback();
    }
  };

  const getScore = () => answers.filter((answer) => answer).length;

  const sendFeedback = async (): Promise<void> => {
    const score = getScore();
    try {
      const response = await fetch(
        `http://18.231.117.6:8000/feedback?title=${title}&score=${score}`,
        { method: "GET" }
      );
      const data: Feedback = await response.json();
      setFeedback(data);
    } catch (err) {
      console.error("Erro ao buscar feedback:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Navbar />
      <div
        className="flex-grow bg-cover bg-center flex justify-center items-center p-4"
        style={{ backgroundImage: 'url("/seu-background.jpg")' }}
      >
        <div className="bg-[#003F5C] bg-opacity-80 w-full max-w-[800px] p-6 md:p-8 rounded-md text-white shadow-md">
          {!isGameFinished ? (
            <>
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">
                {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="block p-4 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                  >
                    <input
                      type="radio"
                      name="gameOption"
                      className="mr-3"
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={() => {
                  setSelectedOption(""); // Resetando a opção ao voltar
                  setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                }}>
                  VOLTAR
                </Button>
                <Button onClick={() => {
                  if (selectedOption) {
                    checkAnswer(selectedOption);
                  }
                  nextQuestion();
                }}>
                  PRÓXIMO
                </Button>
              </div>
            </>
          ) : feedback ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold">Jogo Finalizado</h2>
              <p>Pontuação final: {getScore()} de {questions.length}</p>
              <h3 className="text-xl font-bold mt-4">Feedback</h3>
              <p>{feedback.feedback_summary}</p>
              {feedback.detailed_feedback && feedback.detailed_feedback.length > 0 && (
                <ul className="mt-4">
                  {feedback.detailed_feedback.map((detail, index) => (
                    <li key={index} className="text-gray-300">{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="text-center text-lg">Carregando feedback...</div>
          )}
        </div>
      </div>
      <Footer />
      <HelpButton />
    </div>
  );
};

export default GamePage;
