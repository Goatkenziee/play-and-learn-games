"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface LetterItem {
  letter: string;
  image: string;
  label: string;
}

const items: LetterItem[] = [
  { letter: "A", image: "🍎", label: "Apple" },
  { letter: "B", image: "🐻", label: "Bear" },
  { letter: "C", image: "🐱", label: "Cat" },
  { letter: "D", image: "🐶", label: "Dog" },
  { letter: "E", image: "🐘", label: "Elephant" },
  { letter: "F", image: "🐸", label: "Frog" },
  { letter: "G", image: "🦒", label: "Giraffe" },
  { letter: "H", image: "🏠", label: "House" },
  { letter: "I", image: "🍦", label: "Ice cream" },
  { letter: "J", image: "🪀", label: "Juggle" },
  { letter: "K", image: "🪁", label: "Kite" },
  { letter: "L", image: "🦁", label: "Lion" },
  { letter: "M", image: "🐭", label: "Mouse" },
  { letter: "N", image: "🪹", label: "Nest" },
  { letter: "O", image: "🐙", label: "Octopus" },
  { letter: "P", image: "🐷", label: "Pig" },
  { letter: "Q", image: "👑", label: "Queen" },
  { letter: "R", image: "🐰", label: "Rabbit" },
  { letter: "S", image: "☀️", label: "Sun" },
  { letter: "T", image: "🐢", label: "Turtle" },
  { letter: "U", image: "☂️", label: "Umbrella" },
  { letter: "V", image: "🎻", label: "Violin" },
  { letter: "W", image: "🐋", label: "Whale" },
  { letter: "X", image: "❌", label: "X-ray" },
  { letter: "Y", image: "🪀", label: "Yoyo" },
  { letter: "Z", image: "🦓", label: "Zebra" },
];

function generateQuestion() {
  const correct = items[Math.floor(Math.random() * items.length)];
  const others = items.filter((i) => i.letter !== correct.letter).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [correct, ...others].sort(() => Math.random() - 0.5);
  return { correct, options };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function PhonicsFun({ onCorrect, onIncorrect }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setFeedback(null);
  }, []);

  const handleAnswer = (item: LetterItem) => {
    if (feedback) return;
    if (item.letter === question.correct.letter) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <p className="text-lg font-medium">
        Which picture starts with the letter <strong className="text-3xl gradient-text">{question.correct.letter}</strong>?
      </p>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((item) => (
          <button
            key={item.letter}
            onClick={() => handleAnswer(item)}
            className={`w-36 h-36 rounded-2xl border-2 bg-card flex flex-col items-center justify-center gap-2 transition hover:border-primary/60 ${
              feedback === "correct" && item.letter === question.correct.letter
                ? "border-green-400 bg-green-400/10"
                : feedback === "incorrect" && item.letter === question.correct.letter
                  ? "border-green-400 bg-green-400/10"
                  : feedback === "incorrect" && feedback !== null
                    ? "opacity-40"
                    : ""
            }`}
            disabled={feedback !== null}
          >
            <span className="text-5xl">{item.image}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ {question.correct.label} starts with {question.correct.letter}!</p>
          <Button onClick={next} className="mt-3">Next Letter →</Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ {question.correct.label} starts with {question.correct.letter}</p>
          <Button onClick={next} variant="outline" className="mt-3">Try Again</Button>
        </div>
      )}
    </div>
  );
}
