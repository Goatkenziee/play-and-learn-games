"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GamePreview } from "@/components/ui/game-preview";
import { GameWrapper } from "@/components/games/GameWrapper";
import { games, subjectFilters, gradeFilters, type SubjectFilter, type GradeFilter } from "@/lib/games";
import {
  Sparkles,
  School,
  Brain,
  Star,
  Search,
  ChevronRight,
  Trophy,
  ArrowLeft,
} from "lucide-react";

export default function HomePage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter | null>(null);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (selectedSubject && game.subject !== selectedSubject) return false;
      if (selectedGrade && !game.grades.includes(selectedGrade)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          game.title.toLowerCase().includes(q) ||
          game.description.toLowerCase().includes(q) ||
          game.skills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedSubject, selectedGrade, searchQuery]);

  if (activeGame) {
    const game = games.find((g) => g.id === activeGame);
    if (!game) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game not found</h2>
            <Button onClick={() => setActiveGame(null)}>Back to Games</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => setActiveGame(null)}
            className="mb-6 gap-2 hover:bg-background/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
          <GameWrapper game={game} onBack={() => setActiveGame(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              K-3rd Grade Learning
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="gradient-text">Play & Learn</span>
              <br />
              <span className="text-foreground">Educational Games</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover fun, curriculum-based games for Kindergarten through 3rd Grade.
              Math, reading, phonics, and more — all aligned with school standards.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 text-sm">
                <School className="w-4 h-4 text-primary" />
                <span>9 Games</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 text-sm">
                <Brain className="w-4 h-4 text-primary" />
                <span>K-3rd Grade</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 text-sm">
                <Trophy className="w-4 h-4 text-primary" />
                <span>All Subjects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {subjectFilters.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedSubject(selectedSubject === subject ? null : subject)
                }
                className="rounded-full"
              >
                {subject}
              </Button>
            ))}
            {gradeFilters.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedGrade(selectedGrade === grade ? null : grade)
                }
                className="rounded-full"
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No games found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject(null);
                setSelectedGrade(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map((game, index) => (
              <Card
                key={game.id}
                className="group hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-up p-0"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setActiveGame(game.id)}
              >
                {/* Game Preview Image */}
                <GamePreview gameId={game.id} subject={game.subject} title={game.title} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{game.emoji}</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${game.color} text-white`}
                    >
                      {game.subject}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                    {game.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {game.grades.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium"
                      >
                        Grade {g}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {game.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {game.skills.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground">
                        +{game.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/40 transition-all" />
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold gradient-text">Play & Learn</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Making learning fun for K-3rd Grade students with curriculum-based educational games.
          </p>
        </div>
      </footer>
    </div>
  );
}
