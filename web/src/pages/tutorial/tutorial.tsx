import { Sandbox } from "@/components/app/sandbox/sandbox";
import { useParams } from "react-router-dom";
import { TutorialHeader } from "./components/tutorial-header/tutorial-header";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import { TutorialTask } from "./components/tutorial-task/tutorial-task";
import { useGetTutorialDataQuery } from "@/store/tutorials/tutorials-api";
import styles from "./tutorial.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import clsx from "clsx";
import { TutorialTaskPosition } from "@/types/tutorial/tutorial-task-position";

interface TutorialPageParams {
  userSlug: string;
  tutorialKey: string;
  lessonKey: string;
}

const Tutorial = () => {
  const { userSlug, tutorialKey, lessonKey } =
    useParams<Partial<TutorialPageParams>>();
  const tutorialUrl = `/${userSlug}/${tutorialKey}`;
  const { tutorialTaskPosition } = useSelector(
    (state: RootState) => state.tutorials,
  );

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
    <div className={styles.tutorial}>
      <TutorialHeader
        tutorial={tutorial}
        currentLesson={currentLesson}
        baseUrl={tutorialUrl}
      />
      <div
        className={clsx(
          styles.tutorialContent,
          tutorialTaskPosition === TutorialTaskPosition.right &&
            styles.tutorialContentReversed,
        )}
      >
        <div className={styles.tutorialTask}>
          <TutorialTask markdown={currentLesson.taskMarkdown} />
        </div>
        <div className={styles.tutorialSandbox}>
          <Sandbox
            contentType={tutorial.contentType}
            files={currentLesson.files}
          />
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
