"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

function generateQuestion() {
  const a = Math.floor(Math.random() * 15) + 5; // 5-19
  const b = Math.floor(Math.random() * a) + 1; // 1 to a
  return { a, b, answer: a - b };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function SubtractionSplash({ onCorrect, onIncorrect }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setUserAnswer("");
    setFeedback(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) return;
    const num = parseInt(userAnswer);
    if (isNaN(num)) return;
    if (num === question.answer) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-6xl mb-2">💦</div>
      <p className="text-lg font-medium">Splash through subtraction!</p>
      <div className="flex items-center gap-4 text-3xl font-bold">
        <span className="gradient-text">{question.a}</span>
        <span>−</span>
        <span className="gradient-text">{question.b}</span>
        <span>=</span>
        <span className="text-muted-foreground">?</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-24 h-14 rounded-xl border bg-card text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={feedback !== null}
          autoFocus
        />
        {feedback === null && (
          <Button type="submit" className="h-14 px-6 text-lg">
            Splash!
          </Button>
        )}
      </form>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">
            ✅ Splash-tastic! {question.a} − {question.b} = {question.answer}
          </p>
          <Button onClick={next} className="mt-3">
            Next Question →
          </Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ Oops! The answer was {question.answer}</p>
          <Button onClick={next} variant="outline" className="mt-3">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
