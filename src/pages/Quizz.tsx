import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Import icons

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      setShowAnswer(false);
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${
            category ?? 9
          }&difficulty=easy&type=multiple`
        )
        .then((response) => {
          // Shuffle the options for each question
          const questionsWithShuffledOptions = response.data.results.map(
            (question) => {
              const options = [
                ...question.incorrect_answers,
                question.correct_answer,
              ];
              return {
                ...question,
                options: shuffleArray(options),
              };
            }
          );
          setQuestions(questionsWithShuffledOptions);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [category]);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
      setIsAnswerCorrect(true);
      toast.success("Correct answer!"); // Show toast for correct answer
    } else {
      toast.error("Incorrect answer! Try again."); // Show toast for incorrect answer
      setIsAnswerCorrect(false);
    }
    setSelectedAnswer(answer);
    setShowAnswer(false); // Ensure the answer is not shown yet
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (isAnswerCorrect || showAnswer) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(false); // Reset the correctness state for the next question
      setShowAnswer(false); // Hide the answer for the next question
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-indigo-600">
          Your Score: {score}
        </h2>
        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-6 h-full flex flex-col justify-center">
      <Toaster /> {/* Add Toaster to render the toasts */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {question?.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question?.options.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={`relative px-4 py-2 border rounded-lg shadow-sm text-gray-700 transition-colors ${
              selectedAnswer === answer
                ? answer === question.correct_answer
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-red-500 text-white border-red-600"
                : "bg-gray-100 border-gray-300 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {answer}
            {showAnswer && (
              <div
                className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center ${
                  answer === question.correct_answer
                    ? "text-green-500"
                    : answer === selectedAnswer &&
                      answer !== question.correct_answer
                    ? "text-red-500"
                    : "invisible"
                }`}
              >
                {answer === question.correct_answer ? (
                  <CheckIcon className="w-5 h-5" />
                ) : answer === selectedAnswer ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : null}
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleShowAnswer}
          className={`px-6 py-3 border rounded-lg shadow-md font-semibold ${
            showAnswer
              ? "border-green-500 text-green-500"
              : "border-gray-300 text-gray-700"
          } transition-colors hover:bg-gray-100`}
        >
          Show Answer
        </button>
        {(isAnswerCorrect || showAnswer) && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
