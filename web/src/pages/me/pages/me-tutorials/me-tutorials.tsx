import { TutorialContentTypeIcon } from "@/components/app/tutorial-content-type-icon/tutorial-content-type-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tutorial } from "@/types/tutorial/tutorial";
import { BadgeCheckIcon, Clock, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MeSitePage } from "../../components/me-site-page";
import { LoadingSpinner } from "@/components/app/loading-spinner/loading-spinner";
import { NotFound } from "@/components/app/not-found/not-found";
import { useGetAllTutorialsQuery } from "@/store/tutorials/tutorials-api";

export const MeTutorials = () => {
  const navigate = useNavigate();

  const {
    data: paginatedResult,
    isLoading,
    isError,
  } = useGetAllTutorialsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigateToTutorial = (tutorialId: number) => {
    navigate(`/me/tutorials/${tutorialId}`);
  };

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

  const tutorialsRows = paginatedResult.data?.map((tutorial: Tutorial) => {
    return (
      <TableRow
        className="hover:cursor-pointer"
        key={tutorial.id}
        onClick={() => navigateToTutorial(tutorial.id)}
      >
        <TableCell className="font-medium">{tutorial.name}</TableCell>
        <TableCell>{tutorial.key}</TableCell>
        <TableCell>
          <TutorialContentTypeIcon
            contentType={tutorial.contentType}
            width={32}
            height={32}
          />
        </TableCell>
        <TableCell className="text-right">
          {tutorial.published ? (
            <Badge variant="secondary" className="bg-emerald-500 text-white">
              <BadgeCheckIcon />
              Published
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Clock />
              Pending
            </Badge>
          )}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <MeSitePage>
      <h1 className="text-center text-3xl text-foreground underline pb-6">
        Your tutorials
      </h1>
      <div className="flex justify-end items-center pb-6">
        <Button variant="outline" asChild>
          <Link to="/me/tutorials/new">
            <Plus /> New tutorial
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Content Type</TableHead>
            <TableHead className="text-right">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tutorialsRows}</TableBody>
      </Table>
    </MeSitePage>
  );
};
