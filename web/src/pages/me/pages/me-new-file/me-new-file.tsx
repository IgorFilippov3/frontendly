import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MeSitePage } from "../../components/me-site-page";
import { useCreateFileMutation } from "@/store/files/files-api";
import { toast } from "sonner";

interface MeNewFileParams {
  tutorialId: string;
  lessonId: string;
}

export const MeNewFile = () => {
  const navigate = useNavigate();
  const { tutorialId, lessonId } = useParams<Partial<MeNewFileParams>>();
  const [pathError, setPathError] = useState("");

  const [createFile] = useCreateFileMutation();

  const backUrl = `/me/tutorials/${tutorialId}/lessons/${lessonId}`;

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const path = data.get("path") as string;

    if (!path.startsWith("/") || !path.endsWith("/")) {
      setPathError("Path should start and end with forward slash");
      return;
    }

    if (!lessonId) {
      toast.error("Lesson ID is missing");
      return;
    }

    try {
      const result = await createFile({
        name,
        path,
        lessonId: Number(lessonId),
      }).unwrap();

      toast.success("File created successfully!");
      navigate(
        `/me/tutorials/${tutorialId}/lessons/${lessonId}/files/${result.id}`,
      );
    } catch {
      toast.error("Failed to create file");
    }
  };

  const handlePathInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value.startsWith("/") || !value.endsWith("/")) {
      setPathError("Path should start and end with forward slash");
    } else {
      setPathError("");
    }
  };

  return (
    <MeSitePage className="flex flex-col" backUrl={backUrl}>
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        New file
      </h1>
      <form onSubmit={submitForm} className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="File name"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">Path</Label>
          <Input
            name="path"
            id="path"
            type="text"
            placeholder="Path should start and end with forward slash"
            className={pathError ? "border-red-500 focus:border-red-500" : ""}
            onChange={handlePathInputChange}
            required
          />
          {pathError && <p className="text-sm text-red-500">{pathError}</p>}
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
