import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PublicOnlyRoute from "./PublicOnlyRoute";
import { AuthPage } from "../../../../pages/AuthPage";
import { BoardsPage } from "../../../../pages/BoardsPage";
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
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
