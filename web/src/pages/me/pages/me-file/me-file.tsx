import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./me-file.css";
import { CustomMonacoEditor } from "@/components/app/custom-monaco-editor/custom-monaco-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { File } from "@/types/files/file";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { MeSitePage } from "../../components/me-site-page";
import { toast } from "sonner";
import {
  useDeleteFileMutation,
  useGetFileQuery,
  useUpdateFileMutation,
} from "@/store/files/files-api";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";

interface MeFileParams {
  tutorialId: string;
  lessonId: string;
  fileId: string;
}

export const MeFile = () => {
  const navigate = useNavigate();
  const { tutorialId, lessonId, fileId } = useParams<Partial<MeFileParams>>();

  const {
    data: originalFile,
    isLoading,
    isError,
  } = useGetFileQuery(Number(fileId), {
    skip: !fileId,
  });

  const [updateFile] = useUpdateFileMutation();
  const [deleteFile] = useDeleteFileMutation();

  const [file, setFile] = useState<File | null>(null);

  const backUrl = `/me/tutorials/${tutorialId}/lessons/${lessonId}`;

  useEffect(() => {
    if (originalFile) {
      setFile(originalFile);
    }
  }, [originalFile]);

  const handleCodeChange = (code: string) => {
    setFile((file: File | null) => {
      if (file) {
        return {
          ...file,
          code,
        };
      }

      return file;
    });
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((file: File | null) => {
      if (file) {
        return {
          ...file,
          name: e.target.value,
        };
      }

      return file;
    });
  };

  const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((file: File | null) => {
      if (file) {
        return {
          ...file,
          path: e.target.value,
        };
      }

      return file;
    });
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    try {
      await updateFile({
        fileId: file.id,
        name: file.name,
        path: file.path,
        code: file.code,
      }).unwrap();

      toast.success("File updated!");
    } catch {
      toast.error("Failed to update file");
    }
  };

  const handleFileDelete = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!fileId) return;

    try {
      await deleteFile({
        fileId: Number(fileId),
        lessonId: Number(lessonId),
      }).unwrap();
      toast.success("File deleted successfully!");
      navigate(backUrl);
    } catch {
      toast.error("Failed to delete file");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Data fetching..." />
      </div>
    );
  }

  if (isError || !originalFile) {
    return <NotFound />;
  }

  if (!file) return null;

  return (
    <MeSitePage backUrl={backUrl}>
      <form onSubmit={submitForm} className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            value={file.name}
            onChange={handleFileNameChange}
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
            value={file.path}
            onChange={handlePathChange}
            id="path"
            type="text"
            placeholder="Path should start and end with forward slash"
            required
          />
        </div>
        <div className="me-file-code-editor">
          <CustomMonacoEditor
            value={file.code}
            onChange={handleCodeChange}
            fileName={file.name}
            theme="vs-light"
            height="100%"
            width="100%"
          />
        </div>
        <div className="flex justify-between">
          <Button
            variant="destructive"
            type="button"
            className="cursor-pointer"
            onClick={handleFileDelete}
          >
            <Trash2 />
            Delete
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="cursor-pointer"
          >
            <Plus /> Save
          </Button>
        </div>
      </form>
    </MeSitePage>
  );
};
