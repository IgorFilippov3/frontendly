import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MeSitePage } from "../../components/me-site-page";
import { useCreateLessonMutation } from "@/store/lessons/lessons-api";
import { toast } from "sonner";

interface NewTutorialParams {
  tutorialId: string;
}

export const MeNewLesson = () => {
  const navigate = useNavigate();
  const { tutorialId } = useParams<Partial<NewTutorialParams>>();

  const [createLesson] = useCreateLessonMutation();

  const backUrl = `/me/tutorials/${tutorialId}`;

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;

    if (!tutorialId) {
      toast.error("Tutorial ID is missing");
      return;
    }

    try {
      await createLesson({
        name,
        tutorialId: Number(tutorialId),
      }).unwrap();

      toast.success("Lesson created successfully!");
      navigate(`/me/tutorials/${tutorialId}`);
    } catch {
      toast.error("Failed to create lesson");
    }
  };

  return (
    <MeSitePage className="flex flex-col" backUrl={backUrl}>
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        New lesson
      </h1>
      <form onSubmit={submitForm} className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="my brand new lesson"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="cursor-pointer"
          >
            <Plus /> Submit
          </Button>
        </div>
      </form>
    </MeSitePage>
  );
};
