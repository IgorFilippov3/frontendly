import { TutorialContentTypeIcon } from "@/components/app/tutorial-content-type-icon/tutorial-content-type-icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tutorial } from "@/types/tutorial/tutorial";
import { getDifficultyColor } from "@/types/tutorial/tutorial-difficulty-level";
import { User } from "lucide-react";
import { useCallback } from "react";

interface TutorialsCardProps {
  tutorial: Tutorial;
  onNavigate: (userKey: string, tutorialKey: string) => void;
}

export const TutorialsCard = ({ tutorial, onNavigate }: TutorialsCardProps) => {
  const handleClick = useCallback(() => {
    onNavigate(tutorial.owner!.key, tutorial.key);
  }, [tutorial, onNavigate]);

  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge
            variant="secondary"
            className={getDifficultyColor(tutorial.difficulty)}
          >
            {tutorial.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{tutorial.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {tutorial.description || "No description available"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {tutorial.owner?.username || "Anonymous"}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          <TutorialContentTypeIcon
            width={30}
            height={30}
            contentType={tutorial.contentType}
          />
        </div>
      </CardContent>
    </Card>
  );
};
