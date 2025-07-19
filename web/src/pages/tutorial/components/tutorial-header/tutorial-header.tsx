import "./tutorial-header.css";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  BookOpen,
  X,
  ChevronRight,
} from "lucide-react";
import type { Tutorial } from "@/types/tutorial/tutorial";
import type { Lesson } from "@/types/lessons/lesson";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import {
  closeTutorialTask,
  openTutorialTask,
} from "@/store/tutorials/tutorials-slice";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isTutorialTaskOpen } = useSelector(
    (state: RootState) => state.tutorials,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const currentLessonIndex = tutorial.lessons.findIndex(
    (l: Lesson) => l.id === currentLesson.id,
  );

  const handleLessonSelect = (lesson: Lesson) => {
    navigate(`${baseUrl}/${lesson.key}`);
    setIsDropdownOpen(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  const toggleTask = () => {
    dispatch((isTutorialTaskOpen ? closeTutorialTask : openTutorialTask)());
  };

  const navigateToLessonByIndex = (lessonIndex: number) => {
    const lesson: Lesson | undefined = tutorial.lessons[lessonIndex];

    if (lesson) {
      navigate(`${baseUrl}/${lesson.key}`);
    }
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

        <div className="text-white font-medium text-base flex items-center space-x-2 tutorial-name">
          <BookOpen size={16} />
          <span>{tutorial.name}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 tutorial-lesson">
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
              {tutorial.lessons.map((lesson, index) => (
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
            disabled={currentLessonIndex === 0}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:text-gray-300"
            onClick={() => navigateToLessonByIndex(currentLessonIndex - 1)}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={currentLessonIndex === tutorial.lessons.length - 1}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:text-gray-300"
            onClick={() => navigateToLessonByIndex(currentLessonIndex + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center ml-auto">
        <button
          onClick={toggleTask}
          className={`flex items-center space-x-1 px-3 py-1 rounded text-base transition-colors bg-blue-600 hover:bg-blue-700 text-white`}
        >
          {isTutorialTaskOpen ? (
            <>
              <X size={14} />
              <span>Close task</span>
            </>
          ) : (
            <>
              <BookOpen size={14} />
              <span>Open task</span>
            </>
          )}
        </button>
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
