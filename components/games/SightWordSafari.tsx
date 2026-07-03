"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const sightWords = [
  "the", "and", "is", "in", "it", "you", "that", "was", "for", "are",
  "with", "his", "they", "have", "this", "from", "one", "all", "can", "said",
  "her", "what", "there", "them", "when", "make", "like", "just", "over", "some",
];

function generateQuestion() {
  const word = sightWords[Math.floor(Math.random() * sightWords.length)];
  // Create a 5x5 grid of letters with the word hidden somewhere
  const gridSize = 5;
  const grid: string[][] = [];
  for (let r = 0; r < gridSize; r++) {
    grid[r] = [];
    for (let c = 0; c < gridSize; c++) {
      grid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
  }
  // Place the word horizontally at a random row
  const row = Math.floor(Math.random() * gridSize);
  const col = Math.floor(Math.random() * (gridSize - word.length));
  for (let i = 0; i < word.length; i++) {
    grid[row][col + i] = word[i];
  }
  return { word, grid, row, col };
}

interface Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  score: number;
}

export function SightWordSafari({ onCorrect, onIncorrect }: Props) {
  const [question, setQuestion] = useState(generateQuestion);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setSelectedCells([]);
    setFeedback(null);
  }, []);

  const handleCellClick = (r: number, c: number) => {
    if (feedback) return;
    const already = selectedCells.find(([rr, cc]) => rr === r && cc === c);
    if (already) {
      setSelectedCells((prev) => prev.filter(([rr, cc]) => !(rr === r && cc === c)));
      return;
    }
    const newSelected = [...selectedCells, [r, c] as [number, number]];
    setSelectedCells(newSelected);

    // Check if they selected the full word
    if (newSelected.length === question.word.length) {
      const sorted = [...newSelected].sort((a, b) => a[1] - b[1]);
      const selectedWord = sorted.map(([r, c]) => question.grid[r][c]).join("");
      if (selectedWord === question.word) {
        setFeedback("correct");
        onCorrect();
      } else {
        setFeedback("incorrect");
        onIncorrect();
      }
    }
  };

  const isSelected = (r: number, c: number) => selectedCells.some(([rr, cc]) => rr === r && cc === c);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-6xl">🦁</div>
      <p className="text-lg font-medium">
        Find the sight word: <strong className="text-2xl gradient-text">{question.word.toUpperCase()}</strong>
      </p>
      <p className="text-sm text-muted-foreground">Click the letters in order to spell the word!</p>
      <div className="grid grid-cols-5 gap-2">
        {question.grid.map((row, r) =>
          row.map((letter, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`w-14 h-14 rounded-xl border-2 text-lg font-bold uppercase transition ${
                isSelected(r, c)
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              } ${
                feedback === "correct" && r === question.row && c >= question.col && c < question.col + question.word.length
                  ? "border-green-400 bg-green-400/20 text-green-400"
                  : ""
              } ${
                feedback === "incorrect" ? "opacity-60" : ""
              }`}
              disabled={feedback !== null}
            >
              {letter}
            </button>
          ))
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-mono">{selectedCells.map(([r, c]) => question.grid[r][c]).join("") || "—"}</span>
      </p>
      {feedback === "correct" && (
        <div className="text-center animate-fade-up">
          <p className="text-green-400 font-bold text-lg">✅ You found "{question.word}"!</p>
          <Button onClick={next} className="mt-3">Next Word →</Button>
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-center animate-fade-up">
          <p className="text-red-400 font-bold text-lg">❌ Keep looking! The word is "{question.word}"</p>
          <Button onClick={next} variant="outline" className="mt-3">Next Word</Button>
        </div>
      )}
    </div>
  );
}
