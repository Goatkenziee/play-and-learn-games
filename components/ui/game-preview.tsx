"use client";

import React from "react";

interface GamePreviewProps {
  gameId: string;
  subject: string;
  title: string;
}

/**
 * Inline SVG game preview illustrations — no external images needed.
 * Each preview is a unique, colorful mini-scene representing the game.
 */
export function GamePreview({ gameId, subject, title }: GamePreviewProps) {
  return (
    <div className="w-full aspect-[16/9] rounded-t-xl overflow-hidden bg-gradient-to-br">
      {renderPreview(gameId, subject)}
    </div>
  );
}

function renderPreview(gameId: string, subject: string) {
  switch (gameId) {
    case "count-the-objects":
      return <CountObjectsPreview />;
    case "adventure-addition":
      return <AdventureAdditionPreview />;
    case "subtraction-splash":
      return <SubtractionSplashPreview />;
    case "multiplication-mountain":
      return <MultiplicationMountainPreview />;
    case "shape-sorter":
      return <ShapeSorterPreview />;
    case "phonics-fun":
      return <PhonicsFunPreview />;
    case "sight-word-safari":
      return <SightWordSafariPreview />;
    case "spelling-bee":
      return <SpellingBeePreview />;
    case "word-families":
      return <WordFamiliesPreview />;
    default:
      return <DefaultPreview subject={subject} />;
  }
}

/* ── Count the Objects ── */
function CountObjectsPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#e0f2fe" />
      <circle cx="60" cy="70" r="18" fill="#facc15" />
      <circle cx="110" cy="60" r="18" fill="#f87171" />
      <circle cx="160" cy="75" r="18" fill="#34d399" />
      <circle cx="80" cy="120" r="18" fill="#60a5fa" />
      <circle cx="140" cy="115" r="18" fill="#a78bfa" />
      <text x="220" y="80" fontSize="14" fill="#475569" textAnchor="middle" fontWeight="bold">Count the</text>
      <text x="220" y="100" fontSize="14" fill="#475569" textAnchor="middle" fontWeight="bold">objects!</text>
      <rect x="40" y="150" rx="8" width="50" height="22" fill="#3b82f6" />
      <rect x="100" y="150" rx="8" width="50" height="22" fill="#3b82f6" />
      <rect x="160" y="150" rx="8" width="50" height="22" fill="#3b82f6" />
      <text x="65" y="164" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">3</text>
      <text x="125" y="164" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">4</text>
      <text x="185" y="164" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">5</text>
    </svg>
  );
}

/* ── Adventure Addition ── */
function AdventureAdditionPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#d1fae5" />
      {/* Bridge */}
      <rect x="20" y="100" width="280" height="12" rx="4" fill="#92400e" />
      {/* River */}
      <rect x="20" y="112" width="280" height="30" fill="#60a5fa" opacity={0.5} />
      {/* Explorer */}
      <circle cx="80" cy="70" r="16" fill="#fbbf24" />
      <rect x="68" y="80" width="24" height="20" rx="4" fill="#f97316" />
      <text x="80" y="96" fontSize="10" fill="white" textAnchor="middle">😊</text>
      {/* Problem */}
      <rect x="180" y="40" rx="10" width="110" height="40" fill="white" stroke="#34d399" strokeWidth="2" />
      <text x="235" y="65" fontSize="18" fill="#059669" textAnchor="middle" fontWeight="bold">3 + 5 = ?</text>
      <text x="160" y="150" fontSize="10" fill="#6b7280" textAnchor="middle">Solve to cross!</text>
    </svg>
  );
}

/* ── Subtraction Splash ── */
function SubtractionSplashPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#e0f2fe" />
      {/* Splashes */}
      <circle cx="60" cy="50" r="20" fill="#93c5fd" opacity={0.6} />
      <circle cx="80" cy="40" r="14" fill="#bfdbfe" opacity={0.8} />
      <circle cx="200" cy="60" r="22" fill="#93c5fd" opacity={0.5} />
      <circle cx="230" cy="45" r="12" fill="#bfdbfe" opacity={0.7} />
      {/* Duck */}
      <circle cx="120" cy="100" r="18" fill="#facc15" />
      <ellipse cx="120" cy="115" rx="14" ry="8" fill="#facc15" />
      <circle cx="112" cy="95" r="3" fill="#1e293b" />
      <polygon points="130,98 140,100 130,102" fill="#f97316" />
      {/* Problem */}
      <rect x="180" y="90" rx="10" width="100" height="36" fill="white" stroke="#3b82f6" strokeWidth="2" />
      <text x="230" y="114" fontSize="16" fill="#2563eb" textAnchor="middle" fontWeight="bold">8 - 3 = ?</text>
      <text x="160" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">💦 Splash!</text>
    </svg>
  );
}

/* ── Multiplication Mountain ── */
function MultiplicationMountainPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#fef3c7" />
      {/* Mountain */}
      <polygon points="160,20 40,160 280,160" fill="#d97706" opacity={0.3} />
      <polygon points="160,40 70,160 250,160" fill="#f59e0b" opacity={0.2} />
      {/* Snow cap */}
      <polygon points="160,20 140,50 180,50" fill="white" />
      {/* Climber */}
      <circle cx="160" cy="70" r="10" fill="#ef4444" />
      <rect x="154" y="76" width="12" height="14" rx="3" fill="#dc2626" />
      {/* Flag */}
      <line x1="200" y1="50" x2="200" y2="20" stroke="#92400e" strokeWidth="2" />
      <polygon points="200,20 220,28 200,36" fill="#facc15" />
      {/* Problem */}
      <rect x="100" y="120" rx="8" width="120" height="30" fill="white" stroke="#f59e0b" strokeWidth="2" />
      <text x="160" y="140" fontSize="14" fill="#d97706" textAnchor="middle" fontWeight="bold">4 × 3 = ?</text>
      <text x="160" y="168" fontSize="9" fill="#92400e" textAnchor="middle">Climb to the top!</text>
    </svg>
  );
}

/* ── Shape Sorter ── */
function ShapeSorterPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#f3e8ff" />
      <circle cx="80" cy="60" r="25" fill="#a78bfa" opacity={0.7} />
      <rect x="130" y="35" width="50" height="50" rx="4" fill="#818cf8" opacity={0.7} />
      <polygon points="260,30 230,90 290,90" fill="#c084fc" opacity={0.7} />
      <polygon points="80,120 60,155 100,155" fill="#e879f9" opacity={0.6} />
      <polygon points="160,110 145,155 175,155" fill="#a78bfa" opacity={0.6} />
      <circle cx="240" cy="140" r="15" fill="#818cf8" opacity={0.6} />
      <text x="160" y="175" fontSize="11" fill="#7c3aed" textAnchor="middle" fontWeight="bold">Find the ⭐</text>
    </svg>
  );
}

/* ── Phonics Fun ── */
function PhonicsFunPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#ffe4e6" />
      {/* Big letter */}
      <circle cx="80" cy="80" r="35" fill="#f43f5e" />
      <text x="80" y="92" fontSize="36" fill="white" textAnchor="middle" fontWeight="bold">B</text>
      {/* Pictures */}
      <circle cx="190" cy="60" r="22" fill="#fbbf24" />
      <text x="190" y="66" fontSize="16" fill="white" textAnchor="middle">🍌</text>
      <circle cx="260" cy="60" r="22" fill="#34d399" />
      <text x="260" y="66" fontSize="16" fill="white" textAnchor="middle">🚗</text>
      <circle cx="190" cy="130" r="22" fill="#60a5fa" />
      <text x="190" y="136" fontSize="16" fill="white" textAnchor="middle">📖</text>
      <circle cx="260" cy="130" r="22" fill="#a78bfa" />
      <text x="260" y="136" fontSize="16" fill="white" textAnchor="middle">🐛</text>
      <text x="160" y="168" fontSize="10" fill="#e11d48" textAnchor="middle">Which starts with B?</text>
    </svg>
  );
}

/* ── Sight Word Safari ── */
function SightWordSafariPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#fef9c3" />
      {/* Lion */}
      <circle cx="70" cy="50" r="22" fill="#f59e0b" />
      <circle cx="70" cy="50" r="18" fill="#fbbf24" />
      <circle cx="62" cy="46" r="3" fill="#1e293b" />
      <circle cx="78" cy="46" r="3" fill="#1e293b" />
      <ellipse cx="70" cy="56" rx="4" ry="2" fill="#92400e" />
      <circle cx="56" cy="36" r="5" fill="#f59e0b" />
      <circle cx="84" cy="36" r="5" fill="#f59e0b" />
      {/* Grid */}
      <rect x="130" y="30" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <rect x="156" y="30" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <rect x="182" y="30" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <rect x="130" y="56" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <rect x="156" y="56" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <rect x="182" y="56" width="24" height="24" rx="3" fill="white" stroke="#d97706" strokeWidth="1" />
      <text x="142" y="47" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">t</text>
      <text x="168" y="47" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">h</text>
      <text x="194" y="47" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">e</text>
      <text x="142" y="73" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">c</text>
      <text x="168" y="73" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">a</text>
      <text x="194" y="73" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">t</text>
      <text x="160" y="115" fontSize="12" fill="#92400e" textAnchor="middle" fontWeight="bold">Find: "the"</text>
      <rect x="110" y="130" rx="6" width="100" height="20" fill="#f59e0b" />
      <text x="160" y="144" fontSize="9" fill="white" textAnchor="middle">Click letters in order</text>
    </svg>
  );
}

/* ── Spelling Bee ── */
function SpellingBeePreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#fff7ed" />
      {/* Bee */}
      <ellipse cx="80" cy="60" rx="20" ry="14" fill="#facc15" />
      <line x1="65" y1="60" x2="95" y2="60" stroke="#1e293b" strokeWidth="2" />
      <line x1="65" y1="67" x2="95" y2="67" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="80" cy="50" rx="12" ry="8" fill="#fbbf24" />
      <circle cx="74" cy="48" r="2" fill="#1e293b" />
      <circle cx="86" cy="48" r="2" fill="#1e293b" />
      <ellipse cx="60" cy="52" rx="10" ry="4" fill="#93c5fd" opacity={0.7} />
      <ellipse cx="100" cy="52" rx="10" ry="4" fill="#93c5fd" opacity={0.7} />
      {/* Emoji hint */}
      <rect x="180" y="40" rx="10" width="80" height="60" fill="white" stroke="#f97316" strokeWidth="2" />
      <text x="220" y="70" fontSize="22" textAnchor="middle">🐱</text>
      <text x="220" y="88" fontSize="9" fill="#9a3412" textAnchor="middle">A furry pet</text>
      {/* Input */}
      <rect x="100" y="125" rx="6" width="120" height="22" fill="white" stroke="#f97316" strokeWidth="1.5" />
      <text x="160" y="140" fontSize="10" fill="#d97706" textAnchor="middle">c _ t</text>
      <text x="160" y="168" fontSize="9" fill="#6b7280" textAnchor="middle">🐝 Buzz in your answer!</text>
    </svg>
  );
}

/* ── Word Families ── */
function WordFamiliesPreview() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill="#d1fae5" />
      {/* House */}
      <polygon points="80,30 30,70 130,70" fill="#34d399" />
      <rect x="55" y="70" width="50" height="50" rx="3" fill="#6ee7b7" />
      <rect x="65" y="90" width="12" height="30" rx="2" fill="#92400e" />
      <circle cx="90" cy="85" r="6" fill="#93c5fd" />
      {/* Word family */}
      <rect x="160" y="40" rx="8" width="120" height="30" fill="white" stroke="#059669" strokeWidth="2" />
      <text x="220" y="60" fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">-at</text>
      {/* Choices */}
      <rect x="160" y="85" rx="6" width="55" height="22" fill="white" stroke="#10b981" strokeWidth="1.5" />
      <text x="187" y="100" fontSize="10" fill="#047857" textAnchor="middle">cat</text>
      <rect x="222" y="85" rx="6" width="55" height="22" fill="white" stroke="#10b981" strokeWidth="1.5" />
      <text x="249" y="100" fontSize="10" fill="#047857" textAnchor="middle">dog</text>
      <rect x="160" y="115" rx="6" width="55" height="22" fill="white" stroke="#10b981" strokeWidth="1.5" />
      <text x="187" y="130" fontSize="10" fill="#047857" textAnchor="middle">bat</text>
      <rect x="222" y="115" rx="6" width="55" height="22" fill="white" stroke="#10b981" strokeWidth="1.5" />
      <text x="249" y="130" fontSize="10" fill="#047857" textAnchor="middle">sun</text>
      <text x="187" y="155" fontSize="9" fill="#6b7280" textAnchor="middle">Which word</text>
      <text x="187" y="165" fontSize="9" fill="#6b7280" textAnchor="middle">belongs?</text>
    </svg>
  );
}

/* ── Default fallback ── */
function DefaultPreview({ subject }: { subject: string }) {
  const bg = subject === "Math" ? "#dbeafe" : "#fce7f3";
  const accent = subject === "Math" ? "#3b82f6" : "#ec4899";
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full">
      <rect width="320" height="180" fill={bg} />
      <text x="160" y="80" fontSize="40" textAnchor="middle">{subject === "Math" ? "📐" : "📖"}</text>
      <text x="160" y="120" fontSize="14" fill={accent} textAnchor="middle" fontWeight="bold">
        {subject} Game
      </text>
      <text x="160" y="140" fontSize="10" fill="#6b7280" textAnchor="middle">
        Click to play!
      </text>
    </svg>
  );
}
