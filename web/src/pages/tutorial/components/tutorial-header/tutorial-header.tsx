import "./tutorial-header.css";

import { useState } from "react";
import { ChevronDown, ChevronLeft, BookOpen, ChevronRight } from "lucide-react";
import type { Tutorial } from "@/types/tutorial/tutorial";
import type { Lesson } from "@/types/lessons/lesson";
import { useNavigate } from "react-router-dom";
import { useLessonNavigation } from "./hooks/useLessonNavigation";

interface TutorialHeaderProps {
  tutorial: Tutorial;
  currentLesson: Lesson;
  baseUrl: string;
}

export const TutorialHeader = ({
  tutorial,
  currentLesson,
  baseUrl,
}: TutorialHeaderProps) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    sortedLessons,
    navigateToPreviousLesson,
    navigateToNextLesson,
    navigateToLesson,
    canNavigatePrevious,
    canNavigateNext,
  } = useLessonNavigation({
    tutorial,
    currentLesson,
    baseUrl,
  });

  const handleLessonSelect = (lesson: Lesson) => {
    navigateToLesson(lesson);
    setIsDropdownOpen(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center gap-6 px-4 border-b border-gray-700 tutorial-header">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleBack}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span className="text-base">Back</span>
        </button>

        <div className="text-white font-medium text-base flex items-center space-x-2">
          <BookOpen size={16} />
          <span>{tutorial.name}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-base"
          >
            <span>{currentLesson.name}</span>
            <ChevronDown
              size={14}
              className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg min-w-[200px] z-50">
              {sortedLessons.map((lesson, index) => (
                <button
                  key={index}
                  onClick={() => handleLessonSelect(lesson)}
                  className={`w-full text-left px-3 py-2 text-base hover:bg-gray-700 transition-colors ${
                    lesson === currentLesson
                      ? "text-blue-400 bg-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {lesson.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <button
            disabled={!canNavigatePrevious}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:text-gray-300"
            onClick={navigateToPreviousLesson}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={!canNavigateNext}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:text-gray-300"
            onClick={navigateToNextLesson}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};
