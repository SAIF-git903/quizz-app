import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackButton";
import CategorySelection from "../components/CategorySelection";
import DifficultySelection from "../components/DifficultySelection";

const HomePage = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
    setStep(2);
  };

  const handleDifficultySelection = (difficulty) => {
    navigate(`/quiz?category=${category}&difficulty=${difficulty}`, {
      state: { category, difficulty },
    });
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 relative">
      {step === 2 && <BackIcon onBack={handleBack} />}
      <div className="w-full max-w-2xl p-6">
        {step === 1 && (
          <CategorySelection onSelectCategory={handleCategorySelection} />
        )}
        {step === 2 && (
          <DifficultySelection onSelectDifficulty={handleDifficultySelection} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
