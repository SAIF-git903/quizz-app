import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const QuizList = ({ onSelectQuiz }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  // Extract the 'category' query parameter from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = parseInt(params.get("category"));
    setActiveCategory(categoryId);
  }, [location]);

  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 21, name: "Sports" },
    { id: 28, name: "Vehicles" },
    { id: 27, name: "Animals" },
    { id: 12, name: "Science & Nature" },
    // Add more categories if needed
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out font-semibold
            ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white transform scale-105 border border-blue-800 shadow-xl" // Active category styling
                : "bg-gray-100 hover:bg-gray-200 text-gray-700" // Default styling
            }`}
          onClick={() => onSelectQuiz(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default QuizList;
