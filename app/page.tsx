"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("All");
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSubject = subjectFilter === "All" || game.subject === subjectFilter;
      const matchesGrade = gradeFilter === "All" || game.grades.includes(gradeFilter);
      const matchesSearch =
        !searchQuery ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSubject && matchesGrade && matchesSearch;
    });
  }, [subjectFilter, gradeFilter, searchQuery]);

  const activeGameData = useMemo(
    () => games.find((g) => g.id === activeGame),
    [activeGame]
  );

  // If a game is active, show the game screen
  if (activeGame && activeGameData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games</span>
            </button>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold gradient-text">Play & Learn</span>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <span className="text-6xl block mb-4">{activeGameData.emoji}</span>
            <h1 className="text-3xl font-bold mb-2">{activeGameData.title}</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {activeGameData.instructions}
            </p>
            <div className="flex gap-2 justify-center mt-3">
              {activeGameData.grades.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                  Grade {g}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {activeGameData.subject}
              </span>
            </div>
          </div>
          <GameWrapper gameId={activeGameData.id} gameComponent={activeGameData.component} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              K-3rd Grade Curriculum Games
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Play & Learn</span>
              <br />
              Where Learning is an Adventure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Interactive educational games for Kindergarten through 3rd Grade.
              Aligned with curriculum standards in math and reading. Fun, safe, and
              designed to build confidence.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                className="gap-2 text-base h-12 px-8"
                onClick={() =>
                  document
                    .getElementById("games-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Brain className="w-5 h-5" />
                Start Playing
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-base h-12 px-8"
                onClick={() =>
                  document
                    .getElementById("subjects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <School className="w-5 h-5" />
                Browse by Subject
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border/40 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "9", label: "Educational Games", icon: "🎮" },
              { number: "2", label: "Core Subjects", icon: "📚" },
              { number: "4", label: "Grade Levels", icon: "🎯" },
              { number: "∞", label: "Fun Guaranteed", icon: "⭐" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Choose Your Subject
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Every game is curriculum-aligned and designed by educators for
          maximum learning impact.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card className="p-8 text-center hover:border-primary/40 transition group cursor-pointer"
            onClick={() => { setSubjectFilter("Math"); document.getElementById("games-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔢</div>
            <h3 className="text-xl font-bold mb-2">Math Games</h3>
            <p className="text-muted-foreground text-sm">
              Counting, addition, subtraction, multiplication, shapes, and more.
              Building number sense from K through 3rd grade.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              {["Counting", "Addition", "Shapes", "Multiplication"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </Card>
          <Card className="p-8 text-center hover:border-primary/40 transition group cursor-pointer"
            onClick={() => { setSubjectFilter("Reading"); document.getElementById("games-grid")?.scrollIntoView({ behavior: "smooth" }); }}>
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📖</div>
            <h3 className="text-xl font-bold mb-2">Reading Games</h3>
            <p className="text-muted-foreground text-sm">
              Phonics, sight words, spelling, word families, and letter sounds.
              Building literacy from the ground up.
            </p>
            <div className="flex gap-2 justify-center mt-4">
              {["Phonics", "Sight Words", "Spelling", "Word Families"].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Games Grid */}
      <section id="games-grid" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">All Games</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-44 rounded-xl border bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {/* Subject Filter */}
            <div className="flex gap-1">
              {subjectFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSubjectFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    subjectFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Grade Filter */}
            <div className="flex gap-1">
              {gradeFilters.map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    gradeFilter === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-medium mb-2">No games found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSubjectFilter("All");
                setGradeFilter("All");
                setSearchQuery("");
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
                className="group hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setActiveGame(game.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{game.emoji}</span>
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
            Educational games for K-3rd Grade. Making learning fun, one game at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
