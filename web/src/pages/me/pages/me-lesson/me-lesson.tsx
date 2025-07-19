import { lazy, useEffect, useState } from "react";

import "./me-lesson.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { File } from "@/types/files/file";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Plus, RotateCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MeSitePage } from "../../components/me-site-page";
import {
  useDeleteLessonMutation,
  useGetLessonQuery,
  useUpdateLessonMutation,
} from "@/store/lessons/lessons-api";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import { useGetTutorialByIdQuery } from "@/store/tutorials/tutorials-api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

interface MeLessonParams {
  tutorialId: string;
  lessonId: string;
}

const MeLesson = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tutorialId, lessonId } = useParams<Partial<MeLessonParams>>();

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonQuery(Number(lessonId), {
    refetchOnMountOrArgChange: true,
  });

  const { data: tutorial } = useGetTutorialByIdQuery(Number(tutorialId));

  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const newFileUrl = `/me/tutorials/${tutorialId}/lessons/${lessonId}/files/new`;
  const backUrl = `/me/tutorials/${tutorialId}`;

  const [taskMarkdown, setTaskMarkdown] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (lesson) {
      setTaskMarkdown(lesson.taskMarkdown);
    }
  }, [lesson]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Data fetching..." />
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  if (!lesson || !tutorial) return null;

  const navigateToFile = (fileId: number) => {
    navigate(`/me/tutorials/${tutorialId}/lessons/${lessonId}/files/${fileId}`);
  };

  const navigateToPreview = () => {
    window.open(`/${user?.slug}/${tutorial.key}/${lesson.key}`, "_blank");
  };

  const filesRows = lesson.files.map((t: File) => {
    return (
      <TableRow
        className="hover:cursor-pointer"
        key={t.id}
        onClick={() => navigateToFile(t.id)}
      >
        <TableCell className="font-medium">{t.name}</TableCell>
        <TableCell>{t.path}</TableCell>
      </TableRow>
    );
  });

  const handleUpdateLesson = async () => {
    if (!taskMarkdown) return;

    try {
      await updateLesson({
        lessonId: Number(lessonId),
        taskMarkdown,
      });

      toast.success("Lesson updated!");
    } catch {
      toast.error("Failed to update lesson");
    }
  };

  const handleLessonDelete = async () => {
    try {
      await deleteLesson(lesson.id);
      navigate(backUrl);
      toast.success(`Lesson ${lesson.name} is deleted!`);
    } catch {
      toast.error("Failed to delete lesson");
    }
  };

  return (
    <MeSitePage backUrl={backUrl}>
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        {lesson.name}
      </h1>
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="cursor-pointer mb-4"
          onClick={navigateToPreview}
        >
          <Eye />
          Preview lesson
        </Button>
      </div>
      <div className="me-lesson-editor">
        <MDEditor
          value={taskMarkdown}
          onChange={(value) => setTaskMarkdown(value)}
          height="100%"
          commands={[]}
          extraCommands={[]}
        />
      </div>
      <div className="flex justify-between items-center py-6">
        <Button
          variant="destructive"
          type="button"
          className="cursor-pointer"
          onClick={handleLessonDelete}
        >
          <Trash2 />
          Delete
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={handleUpdateLesson}
        >
          <RotateCw /> Update lesson
        </Button>
      </div>
      <hr />
      <h2 className="text-center text-3xl text-foreground underline py-6">
        Files
      </h2>
      <div className="flex justify-end items-center pb-6">
        <Button variant="outline" asChild>
          <Link to={newFileUrl}>
            <Plus /> New file
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Path</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{filesRows}</TableBody>
      </Table>
    </MeSitePage>
  );
};

export default MeLesson;
