"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

function generateQuestion(grade: string) {
  const max = grade === "1st" ? 10 : 20;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * (max - a)) + 1;
  return { a, b, answer: a + b };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function AdventureAddition({ onCorrect, onIncorrect, score }: Props) {
  const [question, setQuestion] = useState(() => generateQuestion("2nd"));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion(score > 5 ? "2nd" : "1st"));
    setUserAnswer("");
    setFeedback(null);
  }, [score]);

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

  const handleNext = () => {
    if (feedback === "correct") next();
    else {
      setFeedback("correct");
      onCorrect();
      setUserAnswer(String(question.answer));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-6xl mb-2">🌉</div>
      <p className="text-lg font-medium">Help the explorer cross the bridge!</p>
      <div className="flex items-center gap-4 text-3xl font-bold">
        <span className="gradient-text">{question.a}</span>
        <span>+</span>
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
            Go!
          </Button>
        )}
      </form>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ Correct! {question.a} + {question.b} = {question.answer}</p>
          <Button onClick={handleNext} className="mt-3">
            Next Question →
          </Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ Not quite! The answer was {question.answer}</p>
          <Button onClick={handleNext} variant="outline" className="mt-3">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
