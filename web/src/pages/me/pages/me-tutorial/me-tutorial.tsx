import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lightbulb, Plus } from "lucide-react";
import { toast } from "sonner";

import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTutorialByIdQuery,
  usePublishTutorialMutation,
  useUnpublishTutorialMutation,
} from "@/store/tutorials/tutorials-api";
import type { RootState } from "@/store";
import type { Lesson } from "@/types/lessons/lesson";
import { UserRole } from "@/types/user-role";
import { MeSitePage } from "../../components/me-site-page";

interface TutorialParams {
  tutorialId: string;
}

export const MeTutorial = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tutorialId } = useParams<Partial<TutorialParams>>();

  const {
    data: tutorial,
    isLoading,
    isError,
  } = useGetTutorialByIdQuery(Number(tutorialId), {
    skip: !tutorialId,
    refetchOnMountOrArgChange: true,
  });

  const [publishTutorial] = usePublishTutorialMutation();
  const [unpublishTutorial] = useUnpublishTutorialMutation();

  const handleTogglePublish = useCallback(async () => {
    const isPublished = tutorial?.published;
    const action = isPublished ? unpublishTutorial : publishTutorial;
    const successMessage = isPublished
      ? "Tutorial is unpublished!"
      : "Tutorial is published!";
    const errorMessage = isPublished
      ? "Failed to unpublish tutorial"
      : "Failed to publish tutorial";

    try {
      await action(Number(tutorialId));
      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    }
  }, [publishTutorial, unpublishTutorial, tutorialId, tutorial?.published]);

  const isUserAdmin = user?.role === UserRole.admin;
  const buttonText = tutorial?.published ? "Unpublish" : "Publish";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Data fetching..." />
      </div>
    );
  }

  if (isError || !tutorial) {
    return <NotFound />;
  }

  const navigateToLesson = (lessonId: number) => {
    navigate(`/me/tutorials/${tutorialId}/lessons/${lessonId}`);
  };

  const lessonsRows = tutorial?.lessons?.map((lesson: Lesson) => {
    return (
      <TableRow
        className="hover:cursor-pointer"
        key={lesson.id}
        onClick={() => navigateToLesson(lesson.id)}
      >
        <TableCell className="font-medium">{lesson.name}</TableCell>
      </TableRow>
    );
  });

  const newLessonUrl = `/me/tutorials/${tutorialId}/lesson/new`;

  return (
    <MeSitePage backUrl="/me/tutorials">
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        {tutorial.name}
      </h1>
      <hr />
      <h2 className="text-center text-3xl text-foreground underline py-6">
        Lessons
      </h2>
      <div className="flex justify-end items-center pb-6 gap-4">
        <Button variant="outline" asChild>
          <Link to={newLessonUrl}>
            <Plus /> New lesson
          </Link>
        </Button>
        {isUserAdmin && (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleTogglePublish}
          >
            <Lightbulb />
            {buttonText}
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{lessonsRows}</TableBody>
      </Table>
    </MeSitePage>
  );
};
