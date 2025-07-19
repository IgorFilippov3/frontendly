import { Sandbox } from "@/components/app/sandbox/sandbox";
import { useParams } from "react-router-dom";
import { TutorialHeader } from "./components/tutorial-header/tutorial-header";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import { TutorialTask } from "./components/tutorial-task/tutorial-task";
import { useGetTutorialDataQuery } from "@/store/tutorials/tutorials-api";

interface TutorialPageParams {
  userSlug: string;
  tutorialKey: string;
  lessonKey: string;
}

const Tutorial = () => {
  const { userSlug, tutorialKey, lessonKey } =
    useParams<Partial<TutorialPageParams>>();
  const tutorialUrl = `/${userSlug}/${tutorialKey}`;

  const {
    data: tutorialData,
    isLoading,
    error,
  } = useGetTutorialDataQuery(
    { tutorialKey: tutorialKey!, lessonKey: lessonKey! },
    {
      skip: !tutorialKey,
    },
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Data fetching..." />
      </div>
    );
  }

  if (error || !tutorialData) {
    return <NotFound />;
  }

  const { tutorial, currentLesson } = tutorialData;

  return (
    <div>
      <TutorialHeader
        tutorial={tutorial}
        currentLesson={currentLesson}
        baseUrl={tutorialUrl}
      />
      <Sandbox contentType={tutorial.contentType} files={currentLesson.files} />
      <TutorialTask markdown={currentLesson.taskMarkdown} />
    </div>
  );
};

export default Tutorial;
