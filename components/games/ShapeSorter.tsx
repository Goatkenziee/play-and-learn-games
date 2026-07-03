"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const shapes = [
  { name: "Circle", svg: (size: number) => `<circle cx="${size/2}" cy="${size/2}" r="${size/2-4}" fill="none" stroke="currentColor" stroke-width="3"/>` },
  { name: "Square", svg: (size: number) => `<rect x="4" y="4" width="${size-8}" height="${size-8}" fill="none" stroke="currentColor" stroke-width="3"/>` },
  { name: "Triangle", svg: (size: number) => `<polygon points="${size/2},4 4,${size-4} ${size-4},${size-4}" fill="none" stroke="currentColor" stroke-width="3"/>` },
  { name: "Star", svg: (size: number) => {
    const cx = size/2, cy = size/2, r = size/2-6, r2 = r * 0.4;
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72 - 90) * Math.PI / 180;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      const angle2 = ((i * 72) + 36 - 90) * Math.PI / 180;
      pts.push(`${cx + r2 * Math.cos(angle2)},${cy + r2 * Math.sin(angle2)}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/>`;
  }},
  { name: "Diamond", svg: (size: number) => `<polygon points="${size/2},4 ${size-4},${size/2} ${size/2},${size-4} 4,${size/2}" fill="none" stroke="currentColor" stroke-width="3"/>` },
  { name: "Heart", svg: (size: number) => {
    const s = size/2;
    return `<path d="M${s},${size-8} C${s-20},${size-20} 4,${s+4} 4,${s-4} C4,${s-16} ${s-12},${s-20} ${s},${s-20} C${s+12},${s-20} ${size-4},${s-16} ${size-4},${s-4} C${size-4},${s+4} ${s+20},${size-20} ${s},${size-8}Z" fill="none" stroke="currentColor" stroke-width="3"/>`;
  }},
];

function generateQuestion() {
  const correct = shapes[Math.floor(Math.random() * shapes.length)];
  const options = shapes.sort(() => Math.random() - 0.5).slice(0, 4);
  if (!options.find((s) => s.name === correct.name)) {
    options[0] = correct;
  }
  return { correct, options: options.sort(() => Math.random() - 0.5) };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function ShapeSorter({ onCorrect, onIncorrect }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setFeedback(null);
  }, []);

  const handleAnswer = (name: string) => {
    if (feedback) return;
    if (name === question.correct.name) {
      setFeedback("correct");
      onCorrect();
    } else {
      setFeedback("incorrect");
      onIncorrect();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <p className="text-lg font-medium">Find the <strong className="gradient-text">{question.correct.name}</strong></p>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((shape) => (
          <button
            key={shape.name}
            onClick={() => handleAnswer(shape.name)}
            className={`w-28 h-28 rounded-2xl border-2 bg-card flex flex-col items-center justify-center gap-2 transition hover:border-primary/60 ${
              feedback === "correct" && shape.name === question.correct.name
                ? "border-green-400 bg-green-400/10"
                : feedback === "incorrect" && shape.name === question.correct.name
                  ? "border-green-400 bg-green-400/10"
                  : feedback === "incorrect" && feedback !== null
                    ? "opacity-40"
                    : ""
            }`}
            disabled={feedback !== null}
          >
            <svg viewBox="0 0 60 60" className="w-12 h-12 text-foreground" dangerouslySetInnerHTML={{ __html: shape.svg(60) }} />
            <span className="text-xs font-medium">{shape.name}</span>
          </button>
        ))}
      </div>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ That's the {question.correct.name}!</p>
          <Button onClick={next} className="mt-3">Next Shape →</Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ That was a {question.correct.name}</p>
          <Button onClick={next} variant="outline" className="mt-3">Try Again</Button>
        </div>
      )}
    </div>
  );
}
