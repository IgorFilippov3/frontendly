import type { TutorialContentType } from "@/types/tutorial/tutorial-content-type";
import type { TutorialDifficultyLevel } from "@/types/tutorial/tutorial-difficulty-level";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const contentType = searchParams.get("contentType") as TutorialContentType;
  const difficulty = searchParams.get("difficulty") as TutorialDifficultyLevel;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (value === "all" || !value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      if (key !== "page") {
        newParams.set("page", "1");
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    contentType,
    difficulty,
    page,
    updateFilter,
    clearFilters,
  };
};
