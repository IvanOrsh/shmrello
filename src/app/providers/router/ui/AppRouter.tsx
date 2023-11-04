import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthPage } from "../../../../pages/AuthPage";

const AppRouter = () => {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
