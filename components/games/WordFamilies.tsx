"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface WordFamily {
  family: string;
  words: string[];
}

const families: WordFamily[] = [
  { family: "-at", words: ["cat", "hat", "bat", "rat", "mat"] },
  { family: "-an", words: ["can", "man", "fan", "pan", "van"] },
  { family: "-et", words: ["pet", "jet", "vet", "net", "set"] },
  { family: "-en", words: ["pen", "hen", "ten", "men", "den"] },
  { family: "-in", words: ["pin", "win", "tin", "fin", "bin"] },
  { family: "-op", words: ["top", "hop", "pop", "mop", "cop"] },
  { family: "-ug", words: ["bug", "rug", "hug", "mug", "jug"] },
  { family: "-ot", words: ["pot", "hot", "dot", "cot", "not"] },
];

function generateQuestion() {
  const family = families[Math.floor(Math.random() * families.length)];
  const correctWord = family.words[Math.floor(Math.random() * family.words.length)];
  const otherWords = families
    .filter((f) => f.family !== family.family)
    .flatMap((f) => f.words)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [correctWord, ...otherWords].sort(() => Math.random() - 0.5);
  return { family: family.family, correctWord, options };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function WordFamilies({ onCorrect, onIncorrect }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setFeedback(null);
  }, []);

  const handleAnswer = (word: string) => {
    if (feedback) return;
    if (word === question.correctWord) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-6xl">🏠</div>
      <p className="text-lg font-medium">
        Which word is in the <strong className="gradient-text">{question.family}</strong> family?
      </p>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((word) => (
          <button
            key={word}
            onClick={() => handleAnswer(word)}
            className={`w-32 h-16 rounded-xl border-2 bg-card text-xl font-bold uppercase transition hover:border-primary/60 ${
              feedback === "correct" && word === question.correctWord
                ? "border-green-400 bg-green-400/10"
                : feedback === "incorrect" && word === question.correctWord
                  ? "border-green-400 bg-green-400/10"
                  : feedback === "incorrect" && feedback !== null
                    ? "opacity-40"
                    : ""
            }`}
            disabled={feedback !== null}
          >
            {word}
          </button>
        ))}
      </div>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ "{question.correctWord}" belongs to the {question.family} family!</p>
          <Button onClick={next} className="mt-3">Next Family →</Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ "{question.correctWord}" is in the {question.family} family</p>
          <Button onClick={next} variant="outline" className="mt-3">Try Again</Button>
        </div>
      )}
    </div>
  );
}
