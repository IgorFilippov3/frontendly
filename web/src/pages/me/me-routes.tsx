import { Route } from "react-router-dom";
import { MeHome } from "./pages/me-home/me-home";
import { MeTutorials } from "./pages/me-tutorials/me-tutorials";
import { MeNewTutorial } from "./pages/me-new-tutorial/me-new-tutorial";
import { MeTutorial } from "./pages/me-tutorial/me-tutorial";
import { MeNewLesson } from "./pages/me-new-lesson/me-new-lesson";
import { MeNewFile } from "./pages/me-new-file/me-new-file";
import { MeFile } from "./pages/me-file/me-file";
import { lazy } from "react";

const MeLesson = lazy(() => import("./pages/me-lesson/me-lesson"));

export const meRoutes = (
  <>
    <Route index element={<MeHome />} />
    <Route path="tutorials" element={<MeTutorials />} />
    <Route path="tutorials/new" element={<MeNewTutorial />} />
    <Route path="tutorials/:tutorialId" element={<MeTutorial />} />
    <Route path="tutorials/:tutorialId/lesson/new" element={<MeNewLesson />} />
    <Route
      path="tutorials/:tutorialId/lessons/:lessonId"
      element={<MeLesson />}
    />
    <Route
      path="tutorials/:tutorialId/lessons/:lessonId/files/new"
      element={<MeNewFile />}
    />
    <Route
      path="tutorials/:tutorialId/lessons/:lessonId/files/:fileId"
      element={<MeFile />}
    />
  </>
);
