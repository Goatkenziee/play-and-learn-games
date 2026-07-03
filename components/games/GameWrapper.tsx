"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { games } from "@/lib/games";
import { CountTheObjects } from "./CountTheObjects";
import { AdventureAddition } from "./AdventureAddition";
import { SubtractionSplash } from "./SubtractionSplash";
import { MultiplicationMountain } from "./MultiplicationMountain";
import { ShapeSorter } from "./ShapeSorter";
import { PhonicsFun } from "./PhonicsFun";
import { SightWordSafari } from "./SightWordSafari";
import { SpellingBee } from "./SpellingBee";
import { WordFamilies } from "./WordFamilies";

interface GameWrapperProps {
  gameId: string;
  gameComponent: string;
}

const componentMap: Record<string, React.FC<{ onCorrect: () => void; onIncorrect: () => void; score: number }>> = {
  CountTheObjects,
  AdventureAddition,
  SubtractionSplash,
  MultiplicationMountain,
  ShapeSorter,
  PhonicsFun,
  SightWordSafari,
  SpellingBee,
  WordFamilies,
};

export function GameWrapper({ gameId, gameComponent }: GameWrapperProps) {
  const game = games.find((g) => g.id === gameId);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  if (!game) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-bold">Game not found</p>
      </div>
    );
  }

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setAttempts((a) => a + 1);
  };

  const handleIncorrect = () => {
    setAttempts((a) => a + 1);
  };

  const resetScore = () => {
    setScore(0);
    setAttempts(0);
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 100;

  const GameComponent = componentMap[gameComponent];

  return (
    <div className="space-y-6">
      {/* Score Bar */}
      <div className="flex items-center justify-between rounded-xl border bg-card/50 px-5 py-3">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{game.emoji}</span>
          <div>
            <h3 className="font-semibold text-sm">{game.title}</h3>
            <p className="text-xs text-muted-foreground">
              {game.subject} &middot; Grades {game.grades.join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-bold gradient-text">{score}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-muted-foreground">{accuracy}%</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</div>
          </div>
          <Button variant="ghost" onClick={resetScore} className="text-xs h-8 px-3">
            Reset
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-xs h-8 px-3"
          >
            {showInstructions ? "Hide Help" : "Help"}
          </Button>
        </div>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <Card className="bg-primary/5 border-primary/20 p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">How to play:</span> {game.instructions}
          </p>
        </Card>
      )}

      {/* Game Content */}
      <div className="min-h-[300px]">
        {GameComponent ? (
          <GameComponent onCorrect={handleCorrect} onIncorrect={handleIncorrect} score={score} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading game...</p>
          </div>
        )}
      </div>
    </div>
  );
}
