import { useState } from "react";

const CategorySelection = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 21, name: "Sports" },
    { id: 28, name: "Vehicles" },
    { id: 27, name: "Animals" },
    { id: 12, name: "Science & Nature" },
    // Add more categories if needed
  ];

  const handleSelection = (e) => {
    setSelectedCategory(e.target.value);
    onSelectCategory(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full animate-slide-in-right">
      <h2 className="text-xl font-semibold">Choose a category</h2>
      <select
        value={selectedCategory}
        onChange={handleSelection}
        className="w-full max-w-sm bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select a Category
        </option>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelection;
