import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Lesson } from "@/types/lessons/lesson";
import type { Tutorial } from "@/types/tutorial/tutorial";

interface UseLessonNavigationProps {
  tutorial: Tutorial;
  currentLesson: Lesson;
  baseUrl: string;
}

interface UseLessonNavigationReturn {
  sortedLessons: Lesson[];
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  navigateToPreviousLesson: () => void;
  navigateToNextLesson: () => void;
  navigateToLesson: (lesson: Lesson) => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
}

export function useLessonNavigation({
  tutorial,
  currentLesson,
  baseUrl,
}: UseLessonNavigationProps): UseLessonNavigationReturn {
  const navigate = useNavigate();

  const sortedLessons = useMemo(() => {
    return [...tutorial.lessons].sort((a, b) => a.order - b.order);
  }, [tutorial.lessons]);

  const previousLesson = useMemo((): Lesson | null => {
    const lessonsWithSmallerOrder = sortedLessons.filter(
      (lesson) => lesson.order < currentLesson.order,
    );

    if (lessonsWithSmallerOrder.length === 0) return null;

    return lessonsWithSmallerOrder.reduce((max, current) =>
      current.order > max.order ? current : max,
    );
  }, [sortedLessons, currentLesson.order]);

  const nextLesson = useMemo((): Lesson | null => {
    const lessonsWithLargerOrder = sortedLessons.filter(
      (lesson) => lesson.order > currentLesson.order,
    );

    if (lessonsWithLargerOrder.length === 0) return null;

    return lessonsWithLargerOrder.reduce((min, current) =>
      current.order < min.order ? current : min,
    );
  }, [sortedLessons, currentLesson.order]);

  const navigateToPreviousLesson = () => {
    if (previousLesson) {
      navigate(`${baseUrl}/${previousLesson.key}`);
    }
  };

  const navigateToNextLesson = () => {
    if (nextLesson) {
      navigate(`${baseUrl}/${nextLesson.key}`);
    }
  };

  const navigateToLesson = (lesson: Lesson) => {
    navigate(`${baseUrl}/${lesson.key}`);
  };

  const canNavigatePrevious = previousLesson !== null;
  const canNavigateNext = nextLesson !== null;

  return {
    sortedLessons,
    previousLesson,
    nextLesson,
    navigateToPreviousLesson,
    navigateToNextLesson,
    navigateToLesson,
    canNavigatePrevious,
    canNavigateNext,
  };
}
