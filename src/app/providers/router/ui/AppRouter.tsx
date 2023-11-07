import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicOnlyRoute from "./PublicOnlyRoute";
import { AuthPage } from "@pages/AuthPage";
import { BoardsPage } from "@pages/BoardsPage";
import { BoardPage } from "@pages/BoardPage";
import PrivateOnlyRoute from "./PrivateOnlyRoute";

const AppRouter = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <AuthPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/boards"
          element={
            <PrivateOnlyRoute>
              <BoardsPage />
            </PrivateOnlyRoute>
          }
        />
        <Route
          path="/boards/:boardsDataId"
          element={
            <PrivateOnlyRoute>
              <BoardPage />
            </PrivateOnlyRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
