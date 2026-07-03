"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface WordItem {
  word: string;
  emoji: string;
  hint: string;
}

const words: WordItem[] = [
  { word: "cat", emoji: "🐱", hint: "A furry pet that purrs" },
  { word: "dog", emoji: "🐶", hint: "A pet that barks" },
  { word: "sun", emoji: "☀️", hint: "It shines in the sky" },
  { word: "hat", emoji: "🎩", hint: "You wear it on your head" },
  { word: "ball", emoji: "⚽", hint: "You throw and catch it" },
  { word: "fish", emoji: "🐟", hint: "It swims in water" },
  { word: "bird", emoji: "🐦", hint: "It flies in the sky" },
  { word: "book", emoji: "📚", hint: "You read it" },
  { word: "tree", emoji: "🌳", hint: "It has leaves and branches" },
  { word: "star", emoji: "⭐", hint: "It twinkles at night" },
  { word: "moon", emoji: "🌙", hint: "You see it at night" },
  { word: "rain", emoji: "🌧️", hint: "Water falling from clouds" },
  { word: "cake", emoji: "🎂", hint: "A sweet birthday treat" },
  { word: "bell", emoji: "🔔", hint: "It rings" },
  { word: "duck", emoji: "🦆", hint: "A bird that quacks" },
];

function generateQuestion() {
  const item = words[Math.floor(Math.random() * words.length)];
  return item;
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function SpellingBee({ onCorrect, onIncorrect }: Props) {
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
    if (userAnswer.toLowerCase().trim() === question.word) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-8xl mb-2 animate-fade-up">{question.emoji}</div>
      <p className="text-lg font-medium">Spell what you see!</p>
      <p className="text-sm text-muted-foreground">Hint: {question.hint}</p>
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type the word..."
          className="w-48 h-14 rounded-xl border bg-card text-center text-2xl font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={feedback !== null}
          autoFocus
        />
        {feedback === null && (
          <Button type="submit" className="h-14 px-6 text-lg">
            Buzz!
          </Button>
        )}
      </form>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ Buzz-tastic! The word is "{question.word}"</p>
          <Button onClick={next} className="mt-3">Next Word →</Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ The word was "{question.word}"</p>
          <Button onClick={next} variant="outline" className="mt-3">Try Another</Button>
        </div>
      )}
    </div>
  );
}
