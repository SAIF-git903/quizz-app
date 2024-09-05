import { useState } from "react";

const DifficultySelection = ({ onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const difficulties = [
    {
      id: "easy",
      title: "Easy",
    },
    {
      id: "medium",
      title: "Medium",
    },
    {
      id: "hard",
      title: "Hard",
    },
  ];

  const handleSelection = (e) => {
    setSelectedDifficulty(e.target.value);
    onSelectDifficulty(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full animate-slide-in-right">
      <h2 className="text-xl font-semibold">Choose difficulty</h2>
      <select
        value={selectedDifficulty}
        onChange={handleSelection}
        className="w-full max-w-sm bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="" disabled>
          Select Difficulty
        </option>
        {difficulties.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySelection;
