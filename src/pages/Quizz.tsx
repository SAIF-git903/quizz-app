import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState([]); // Track answers with correctness
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  const getAnsweredQuestions = () => {
    const storedQuestions = localStorage.getItem("answeredQuestions");
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  };

  const saveQuestionId = (questionId) => {
    const answeredQuestions = getAnsweredQuestions();
    answeredQuestions.push(questionId);
    localStorage.setItem(
      "answeredQuestions",
      JSON.stringify(answeredQuestions)
    );
  };

  const clearAnsweredQuestions = () => {
    setQuestions([]);
    setScore(0);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    fetchQuestions();
  };

  const fetchQuestions = () => {
    if (category) {
      setLoading(true);
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then((response) => {
          const answeredQuestions = getAnsweredQuestions();
          const newQuestions = response.data.results.filter(
            (question) => !answeredQuestions.includes(question.question)
          );

          if (newQuestions.length === 0) {
            toast.error("No new questions available.");
            setLoading(false);
            return;
          }

          const questionsWithShuffledOptions = newQuestions
            .slice(0, 10)
            .map((question) => {
              const options = [
                ...question.incorrect_answers,
                question.correct_answer,
              ];
              return {
                ...question,
                options: shuffleArray(options),
              };
            });

          setQuestions(questionsWithShuffledOptions);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    setAnswers([
      ...answers,
      { question: currentQuestion.question, isCorrect: isCorrect },
    ]);

    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer! Try again.");
    }

    saveQuestionId(currentQuestion.question);

    setIsTransitioning(true);

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
      } else {
        toast.success("You've completed the quiz!");
      }

      setIsTransitioning(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          No more questions left!
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full shadow-md transition-all flex items-center justify-center hover:rotate-90 hover:text-gray-500 hover:shadow-lg"
          >
            <CogIcon className="w-8 h-8 text-gray-600 transition-all" />
          </button>
          <button
            onClick={clearAnsweredQuestions}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Refresh Questions
          </button>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex + 1 >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] text-center p-8 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-10 gap-2 mb-6 border border-sky-500 p-2">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-sm flex items-center justify-center text-white font-semibold ${
                answer.isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={clearAnsweredQuestions}
            className="p-3 rounded-full shadow-md transition-all flex items-center justify-center hover:shadow-lg active:animate-spin"
          >
            <ArrowPathIcon className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-all" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full shadow-md transition-all flex items-center justify-center hover:rotate-90 hover:text-gray-500 hover:shadow-lg"
          >
            <CogIcon className="w-8 h-8 text-gray-600 transition-all" />
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-6 h-full flex flex-col justify-center">
      <Toaster />
      <div
        className={`transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
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
              {selectedAnswer === answer && (
                <div
                  className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center ${
                    answer === question.correct_answer
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {answer === question.correct_answer ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <XMarkIcon className="w-5 h-5" />
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
