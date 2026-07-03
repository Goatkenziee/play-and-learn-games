"use client";

import { useState, useMemo } from "react";
import { gamesList } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameWrapper } from "@/components/games/GameWrapper";
import {
  Sparkles,
  Star,
  Trophy,
  BookOpen,
  Calculator,
  Palette,
  Music,
  ChevronRight,
  Home,
  RefreshCw,
  Heart,
  Sun,
  Moon,
  Smile,
  PartyPopper,
} from "lucide-react";

type Grade = "all" | "K" | "1" | "2" | "3";
type Subject =
  | "all"
  | "math"
  | "reading"
  | "phonics"
  | "shapes"
  | "spelling"
  | "sight-words"
  | "word-families";

const gradeColors: Record<Grade, string> = {
  all: "from-pink-400 to-purple-400",
  K: "from-yellow-400 to-orange-400",
  "1": "from-green-400 to-emerald-400",
  "2": "from-blue-400 to-cyan-400",
  "3": "from-purple-400 to-pink-400",
};

const gradeEmojis: Record<Grade, string> = {
  all: "🌟",
  K: "🌈",
  "1": "⭐",
  "2": "🚀",
  "3": "🏆",
};

const subjectEmojis: Record<string, string> = {
  math: "🔢",
  reading: "📚",
  phonics: "🔤",
  shapes: "⬛",
  spelling: "✏️",
  "sight-words": "👀",
  "word-families": "🏠",
};

const subjectLabels: Record<string, string> = {
  all: "All Subjects",
  math: "Math 🧮",
  reading: "Reading 📖",
  phonics: "Phonics 🔤",
  shapes: "Shapes 🔷",
  spelling: "Spelling ✏️",
  "sight-words": "Sight Words 👀",
  "word-families": "Word Families 🏠",
};

const gradeLabels: Record<Grade, string> = {
  all: "All Grades",
  K: "Kindergarten",
  "1": "1st Grade",
  "2": "2nd Grade",
  "3": "3rd Grade",
};

const floatingEmojis = ["🌟", "⭐", "🌈", "🦋", "🌸", "🎈", "💖", "✨", "🎀", "🍭", "🎵", "🪁", "🐶", "🐱", "🌸"];

const welcomeMessages = [
  "Welcome, superstar! 🌟 Ready to learn and play?",
  "Hi there, smarty pants! 🧠 Let's have some fun!",
  "Hey, learning hero! 🦸 Time for adventure!",
  "Welcome, little genius! 💡 Let's play some games!",
  "Hello, amazing learner! 🚀 Learning is an adventure!",
];

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gradeFilter, setGradeFilter] = useState<Grade>("all");
  const [subjectFilter, setSubjectFilter] = useState<Subject>("all");
  const [showConfetti, setShowConfetti] = useState(false);
  const [welcomeIndex] = useState(() => Math.floor(Math.random() * welcomeMessages.length));

  const filteredGames = useMemo(() => {
    return gamesList.filter((g) => {
      if (gradeFilter !== "all" && !g.grades.includes(gradeFilter)) return false;
      if (subjectFilter !== "all" && g.subject !== subjectFilter) return false;
      return true;
    });
  }, [gradeFilter, subjectFilter]);

  const handlePlay = (id: string) => {
    setSelectedGame(id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  const currentGame = selectedGame ? gamesList.find((g) => g.id === selectedGame) : null;

  if (selectedGame && currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-yellow-50 to-green-100">
        {/* Floating background emojis */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
          {floatingEmojis.slice(0, 8).map((emoji, i) => (
            <span
              key={i}
              className="absolute text-4xl animate-float"
              style={{
                left: `${5 + i * 12}%`,
                top: `${10 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-purple-700 hover:text-pink-500 font-semibold text-lg transition-all bg-white/90 rounded-2xl px-5 py-2.5 shadow-sm hover:shadow-md border-2 border-pink-200 hover:border-pink-400 hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Back to Games
            </button>
            <div className="flex items-center gap-3 text-2xl">
              <span className="animate-bounce-gentle">🎮</span>
              <span className="font-bold text-purple-800">
                {currentGame.emoji} {currentGame.title}
              </span>
            </div>
          </div>
          <GameWrapper gameId={selectedGame} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 via-purple-50 to-sky-100 overflow-hidden">
      {/* ── Floating animated background emojis ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingEmojis.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              left: `${3 + i * 6.5}%`,
              top: `${8 + (i % 5) * 18}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 4)}s`,
              opacity: 0.15,
            }}
          >
            {emoji}
          </span>
        ))}
        {/* Second layer for depth */}
        {floatingEmojis.slice(0, 6).map((emoji, i) => (
          <span
            key={`b-${i}`}
            className="absolute text-5xl animate-float"
            style={{
              left: `${50 + i * 8}%`,
              top: `${60 + (i % 3) * 12}%`,
              animationDelay: `${i * 0.8 + 1}s`,
              animationDuration: `${4 + (i % 3)}s`,
              opacity: 0.1,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* ── Top decorative bar ── */}
        <div className="flex justify-center gap-2 mb-4">
          {["🌸", "⭐", "🌈", "🎈", "💖", "🎀", "✨", "🦋"].map((e, i) => (
            <span
              key={i}
              className="animate-twinkle text-sm"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* ── Header ── */}
        <header className="text-center mb-8 animate-slide-up">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-5 shadow-lg border-2 border-pink-200 hover:border-purple-300 transition-all">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl animate-float">🎮</span>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text tracking-tight">
                Play & Learn
              </h1>
              <span className="text-5xl animate-float" style={{ animationDelay: "1.5s" }}>
                📚
              </span>
            </div>
            <p className="text-xl text-purple-600 font-medium animate-pulse-soft">
              {welcomeMessages[welcomeIndex]}
            </p>
            <p className="text-purple-400 mt-1 text-base">
              Fun educational games for K-3rd grade — all curriculum-based! 🎯
            </p>
          </div>
        </header>

        {/* ── Filters ── */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-md border-2 border-pink-200 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {/* Grade filter */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-purple-800 text-lg">Choose Your Grade</span>
              <span className="text-sm text-purple-400">(pick the one you're in!)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(gradeLabels) as Grade[]).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setGradeFilter(grade)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
                    gradeFilter === grade
                      ? `bg-gradient-to-r ${gradeColors[grade]} text-white shadow-md scale-105 border-transparent`
                      : "bg-white text-purple-600 border-pink-200 hover:border-purple-300 hover:bg-pink-50"
                  }`}
                >
                  {gradeEmojis[grade]} {gradeLabels[grade]}
                </button>
              ))}
            </div>
          </div>

          {/* Subject filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-purple-800 text-lg">Pick a Subject</span>
              <span className="text-sm text-purple-400">(what do you want to practice?)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "math", "reading", "phonics", "shapes", "spelling", "sight-words", "word-families"] as Subject[]).map(
                (subject) => (
                  <button
                    key={subject}
                    onClick={() => setSubjectFilter(subject)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${
                      subjectFilter === subject
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md scale-105 border-transparent"
                        : "bg-white text-purple-600 border-pink-200 hover:border-purple-300 hover:bg-pink-50"
                    }`}
                  >
                    {subjectLabels[subject]}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Games Grid ── */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              {filteredGames.length > 0
                ? `${filteredGames.length} awesome game${filteredGames.length !== 1 ? "s" : ""} for you!`
                : "No games found"}
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </h2>
            {(gradeFilter !== "all" || subjectFilter !== "all") && (
              <button
                onClick={() => {
                  setGradeFilter("all");
                  setSubjectFilter("all");
                }}
                className="flex items-center gap-1 text-purple-500 hover:text-pink-500 font-semibold text-sm transition-all hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                Show All
              </button>
            )}
          </div>

          {filteredGames.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-200">
              <div className="text-7xl mb-4 animate-float">🔍</div>
              <p className="text-2xl font-bold text-purple-700 mb-2">
                Hmm, no games found with those filters!
              </p>
              <p className="text-purple-500 mb-6">
                Try a different grade or subject! There are lots of fun games to discover! 🌟
              </p>
              <button
                onClick={() => {
                  setGradeFilter("all");
                  setSubjectFilter("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full hover:scale-105 transition-all shadow-md"
              >
                Show All Games 🎮
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGames.map((game, index) => (
                <Card
                  key={game.id}
                  className={`group relative overflow-hidden rounded-3xl border-2 border-pink-200 bg-white/90 backdrop-blur-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                  onClick={() => handlePlay(game.id)}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top color bar */}
                  <div
                    className={`h-2 bg-gradient-to-r ${game.color}`}
                  />

                  <div className="p-5 relative z-10">
                    {/* Emoji and subject badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-5xl animate-bounce-gentle group-hover:animate-wiggle">
                        {game.emoji}
                      </div>
                      <span className="text-xs font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full border border-purple-200">
                        Gr. {game.grades.join(", ")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-purple-800 mb-1 group-hover:text-pink-600 transition-colors">
                      {game.title}
                    </h3>

                    {/* Description */}
                    <p className="text-purple-500 text-sm mb-3 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {game.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full border border-pink-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Play button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                        {game.subject.charAt(0).toUpperCase() + game.subject.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold px-4 py-2 rounded-full text-sm group-hover:shadow-md transition-all group-hover:scale-105">
                        Play Now
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer className="bg-white/60 backdrop-blur-sm border-t-2 border-pink-200 mt-10 py-6 px-4 rounded-t-3xl">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-lg text-purple-500 mb-2">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              <span>Made with love for little learners</span>
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            </div>
            <p className="text-purple-400 text-sm">
              Play & Learn Games 🌈 • K-3rd Grade • Curriculum-Based Fun!
            </p>
            <div className="flex justify-center gap-3 mt-3 text-2xl opacity-40">
              <span className="animate-twinkle">🎮</span>
              <span className="animate-twinkle" style={{ animationDelay: "0.5s" }}>📚</span>
              <span className="animate-twinkle" style={{ animationDelay: "1s" }}>✏️</span>
              <span className="animate-twinkle" style={{ animationDelay: "1.5s" }}>🌟</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
