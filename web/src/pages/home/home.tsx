import { PageLayout } from "@/components/app/page-layout/page-layout";
import { useGetTutorialsQuery } from "@/store/tutorials/tutorials-api";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import type { Tutorial } from "@/types/tutorial/tutorial";
import { useNavigate } from "react-router-dom";
import { useQueryFilters } from "./hooks/useQueryFilters";
import { useCallback, useMemo } from "react";
import { TutorialsFilters } from "./components/tutorials-filters";
import { TutorialGrid } from "./components/tutorials-grid";

export const Home = () => {
  const { contentType, difficulty, updateFilter } = useQueryFilters();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => ({
      contentType: contentType || undefined,
      difficulty: difficulty || undefined,
      published: true,
      includeOwner: true,
    }),
    [contentType, difficulty],
  );

  const {
    data: paginatedResult,
    isLoading,
    isError,
  } = useGetTutorialsQuery(queryParams);

  const navigateToTutorial = useCallback(
    (userKey: string, tutorialKey: string) => {
      navigate(`/${userKey}/${tutorialKey}`);
    },
    [navigate],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading tutorials..." />
      </div>
    );
  }

  if (isError || !paginatedResult) {
    return <NotFound />;
  }

  const tutorials: Tutorial[] = paginatedResult.data;

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Frontendly
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn modern frontend development through hands-on tutorials from
              experienced developers.
            </p>
          </div>

          <TutorialsFilters
            contentType={contentType}
            difficulty={difficulty}
            onFilterChange={updateFilter}
          />

          <TutorialGrid tutorials={tutorials} onNavigate={navigateToTutorial} />
        </div>
      </div>
    </PageLayout>
  );
};
