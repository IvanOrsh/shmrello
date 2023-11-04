import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../../../store";

const PublicOnlyRoute = (props: PropsWithChildren) => {
  const { children } = props;

  const { userQuery } = useUserStore();
  const { isLoggedIn } = userQuery;

  if (isLoggedIn) {
    return <Navigate to="/boards" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
