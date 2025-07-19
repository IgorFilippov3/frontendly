import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FormEvent } from "react";
import {
  getTutorialContentTypeItems,
  TutorialContentType,
  type TutorialContentTypeItem,
} from "@/types/tutorial/tutorial-content-type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MeSitePage } from "../../components/me-site-page";
import { toast } from "sonner";
import { useCreateTutorialMutation } from "@/store/tutorials/tutorials-api";
import {
  getTutorialDifficultyLevelItems,
  TutorialDifficultyLevel,
  type TutorialDifficultyLevelItem,
} from "@/types/tutorial/tutorial-difficulty-level";

export const MeNewTutorial = () => {
  const navigate = useNavigate();

  const [createTutorial] = useCreateTutorialMutation();

  const contentTypeOptions = getTutorialContentTypeItems().map(
    ({ value, displayName }: TutorialContentTypeItem) => {
      return (
        <SelectItem key={value} value={value}>
          {displayName}
        </SelectItem>
      );
    },
  );

  const difficultyLevelOptions = getTutorialDifficultyLevelItems().map(
    ({ value, displayName }: TutorialDifficultyLevelItem) => {
      return (
        <SelectItem key={value} value={value}>
          {displayName}
        </SelectItem>
      );
    },
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const contentType = data.get("contentType") as TutorialContentType;
    const difficulty = data.get("difficulty") as TutorialDifficultyLevel;

    if (!contentType) {
      toast.error("Please select content type");
      return;
    }

    try {
      await createTutorial({
        name,
        description,
        contentType,
        difficulty,
      });

      toast.success("Tutorial created successfully!");
      navigate("/me/tutorials");
    } catch {
      toast.error("Failed to create tutorial");
    }
  };

  return (
    <MeSitePage className="flex flex-col" backUrl="/me/tutorials">
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        New tutorial
      </h1>
      <form onSubmit={submitForm} className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Tutorial name"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            id="description"
            type="text"
            placeholder="Few words about this tutorial"
            required
          />
        </div>
        <div className="flex justify-end">
          <Select name="difficulty">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>{difficultyLevelOptions}</SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Select name="contentType">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>{contentTypeOptions}</SelectGroup>
            </SelectContent>
          </Select>
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
