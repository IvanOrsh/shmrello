import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../../../store";

const PrivateOnlyRoute = (props: PropsWithChildren) => {
  const { children } = props;
  const location = useLocation();
  const { userQuery } = useUserStore();
  const { isLoggedIn } = userQuery;

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateOnlyRoute;
