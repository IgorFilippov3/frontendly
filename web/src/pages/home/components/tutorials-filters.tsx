import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTutorialContentTypeItems,
  type TutorialContentType,
  type TutorialContentTypeItem,
} from "@/types/tutorial/tutorial-content-type";
import {
  getTutorialDifficultyLevelItems,
  type TutorialDifficultyLevel,
  type TutorialDifficultyLevelItem,
} from "@/types/tutorial/tutorial-difficulty-level";
import { useMemo } from "react";

interface TutorialsFiltersProps {
  contentType: TutorialContentType | null;
  difficulty: TutorialDifficultyLevel | null;
  onFilterChange: (key: string, value: string) => void;
}

export const TutorialsFilters = ({
  contentType,
  difficulty,
  onFilterChange,
}: TutorialsFiltersProps) => {
  const contentTypeOptions = useMemo(() => {
    const defaultSelects = getTutorialContentTypeItems().map(
      ({ value, displayName }: TutorialContentTypeItem) => (
        <SelectItem key={value} value={value}>
          {displayName}
        </SelectItem>
      ),
    );

    const allSelect = (
      <SelectItem key="all" value="all">
        All Content Types
      </SelectItem>
    );

    return [allSelect, ...defaultSelects];
  }, []);

  const difficultyLevelOptions = useMemo(() => {
    const defaultSelects = getTutorialDifficultyLevelItems().map(
      ({ value, displayName }: TutorialDifficultyLevelItem) => (
        <SelectItem key={value} value={value}>
          {displayName}
        </SelectItem>
      ),
    );

    const allSelect = (
      <SelectItem key="all" value="all">
        All Difficulty Levels
      </SelectItem>
    );

    return [allSelect, ...defaultSelects];
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <Select
          value={contentType || "all"}
          onValueChange={(value) => onFilterChange("contentType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Content type" />
          </SelectTrigger>
          <SelectContent>{contentTypeOptions}</SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Select
          value={difficulty || "all"}
          onValueChange={(value) => onFilterChange("difficulty", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Difficulty level" />
          </SelectTrigger>
          <SelectContent>{difficultyLevelOptions}</SelectContent>
        </Select>
      </div>
    </div>
  );
};
