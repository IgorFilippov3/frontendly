import type { Tutorial } from "@/types/tutorial/tutorial";
import { TutorialsCard } from "./tutorials-card";

interface TutorialsGridProps {
  tutorials: Tutorial[];
  onNavigate: (userKey: string, tutorialKey: string) => void;
}

export const TutorialGrid = ({ tutorials, onNavigate }: TutorialsGridProps) => {
  if (tutorials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">No tutorials found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <TutorialsCard
          key={tutorial.id}
          tutorial={tutorial}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};
