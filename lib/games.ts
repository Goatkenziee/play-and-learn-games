export interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
  subject: string;
  grades: string[];
  skills: string[];
  instructions: string;
  component: string;
  color: string;
}

export const games: Game[] = [
  {
    id: "count-the-objects",
    title: "Count the Objects",
    description: "Count fun emoji objects and pick the right number. Builds one-to-one correspondence and number sense.",
    emoji: "🔢",
    subject: "Math",
    grades: ["K", "1st"],
    skills: ["Counting", "Number recognition", "One-to-one correspondence"],
    instructions: "Look at the emoji objects on screen. Count how many there are, then click the correct number from the choices below.",
    component: "CountTheObjects",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "adventure-addition",
    title: "Adventure Addition",
    description: "Help the explorer cross bridges by solving addition problems. Gets harder as you level up!",
    emoji: "🌉",
    subject: "Math",
    grades: ["1st", "2nd"],
    skills: ["Addition", "Mental math", "Number bonds"],
    instructions: "Type the sum of the two numbers and press Go. Correct answers let you cross the bridge and advance!",
    component: "AdventureAddition",
    color: "from-emerald-400 to-teal-400",
  },
  {
    id: "subtraction-splash",
    title: "Subtraction Splash",
    description: "Splash through subtraction problems! Perfect for building subtraction fluency.",
    emoji: "💦",
    subject: "Math",
    grades: ["1st", "2nd"],
    skills: ["Subtraction", "Number sense", "Mental math"],
    instructions: "Solve each subtraction problem by typing the answer and pressing Splash! Each correct answer earns a point.",
    component: "SubtractionSplash",
    color: "from-sky-400 to-indigo-400",
  },
  {
    id: "multiplication-mountain",
    title: "Multiplication Mountain",
    description: "Climb the mountain by solving multiplication problems. Reach the summit at 10 correct answers!",
    emoji: "🏔️",
    subject: "Math",
    grades: ["2nd", "3rd"],
    skills: ["Multiplication", "Times tables", "Fact fluency"],
    instructions: "Solve each multiplication problem to climb higher up the mountain. Each correct answer gains 10 feet of elevation!",
    component: "MultiplicationMountain",
    color: "from-amber-400 to-orange-400",
  },
  {
    id: "shape-sorter",
    title: "Shape Sorter",
    description: "Identify circles, squares, triangles, stars and more. Builds geometry and visual discrimination skills.",
    emoji: "🔷",
    subject: "Math",
    grades: ["K", "1st"],
    skills: ["Shape recognition", "Geometry", "Visual discrimination"],
    instructions: "Read the shape name, then click the matching shape from the choices. Learn to recognize circles, squares, triangles, stars, diamonds, and hearts!",
    component: "ShapeSorter",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "phonics-fun",
    title: "Phonics Fun",
    description: "Match letters to pictures that start with their sound. A foundational reading skill builder.",
    emoji: "🔤",
    subject: "Reading",
    grades: ["K", "1st"],
    skills: ["Letter sounds", "Phonemic awareness", "Initial sounds"],
    instructions: "Look at the letter shown, then find the picture whose name starts with that letter sound. Click the correct picture!",
    component: "PhonicsFun",
    color: "from-rose-400 to-red-400",
  },
  {
    id: "sight-word-safari",
    title: "Sight Word Safari",
    description: "Hunt for sight words hidden in a letter grid. Builds reading fluency with high-frequency words.",
    emoji: "🦁",
    subject: "Reading",
    grades: ["1st", "2nd"],
    skills: ["Sight words", "Word recognition", "Reading fluency"],
    instructions: "A sight word is shown at the top. Find it hidden in the letter grid by clicking the letters in order to spell the word!",
    component: "SightWordSafari",
    color: "from-yellow-400 to-amber-400",
  },
  {
    id: "spelling-bee",
    title: "Spelling Bee",
    description: "Look at the picture, read the hint, and spell the word. A fun way to practice spelling!",
    emoji: "🐝",
    subject: "Reading",
    grades: ["1st", "2nd", "3rd"],
    skills: ["Spelling", "Vocabulary", "Letter-sound correspondence"],
    instructions: "Look at the emoji picture and read the hint. Type the word it represents and press Buzz! to check your spelling.",
    component: "SpellingBee",
    color: "from-orange-400 to-yellow-400",
  },
  {
    id: "word-families",
    title: "Word Families",
    description: "Find the word that belongs to the given word family (-at, -an, -et, etc.). Builds phonics and rhyming skills.",
    emoji: "🏠",
    subject: "Reading",
    grades: ["K", "1st"],
    skills: ["Word families", "Rhyming", "Phonics patterns"],
    instructions: "A word family is shown (like -at or -an). Click the word that belongs to that family from the choices.",
    component: "WordFamilies",
    color: "from-green-400 to-emerald-400",
  },
];

export const subjectFilters = ["All", "Math", "Reading"] as const;
export type SubjectFilter = (typeof subjectFilters)[number];

export const gradeFilters = ["All", "K", "1st", "2nd", "3rd"] as const;
export type GradeFilter = (typeof gradeFilters)[number];
