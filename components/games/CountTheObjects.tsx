"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const emojis = ["🐶", "🐱", "⭐", "🌈", "🌸", "🍎", "🚀", "🐝", "🌻", "🦋"];

function generateQuestion() {
  const count = Math.floor(Math.random() * 9) + 1; // 1-9
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const options = new Set<number>();
  options.add(count);
  while (options.size < 4) {
    let wrong = count + Math.floor(Math.random() * 7) - 3;
    if (wrong < 1) wrong = 1;
    if (wrong > 9) wrong = 9;
    options.add(wrong);
  }
  return {
    count,
    emoji,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function CountTheObjects({ onCorrect, onIncorrect, score }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setFeedback(null);
  }, []);

  const handleAnswer = (n: number) => {
    if (feedback) return;
    if (n === question.count) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  useEffect(() => {
    if (feedback === "correct") {
      const t = setTimeout(next, 1200);
      return () => clearTimeout(t);
    }
  }, [feedback, next]);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <p className="text-lg font-medium">How many do you see?</p>
      <div className="flex flex-wrap justify-center gap-3 text-4xl">
        {Array.from({ length: question.count }, (_, i) => (
          <span key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            {question.emoji}
          </span>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {question.options.map((n) => (
          <Button
            key={n}
            variant={feedback === null ? "default" : feedback === "correct" && n === question.count ? "default" : "ghost"}
            className={`text-xl w-16 h-16 ${
              feedback === "incorrect" && n === question.count
                ? "ring-2 ring-green-400 bg-green-400/20"
                : feedback === "incorrect"
                  ? "opacity-40"
                  : ""
            }`}
            onClick={() => handleAnswer(n)}
            disabled={feedback !== null}
          >
            {n}
          </Button>
        ))}
      </div>
      {feedback === "correct" && (
        <p className="text-green-400 font-bold text-lg animate-fade-up">✅ Correct!</p>
      )}
      {feedback === "incorrect" && (
        <p className="text-red-400 font-bold text-lg animate-fade-up">
          ❌ Not quite — the answer was {question.count}
        </p>
      )}
    </div>
  );
}
