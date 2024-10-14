import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser } from "@/stores/Users/slice";
import { PUBLIC, PRIVATE } from "./paths";
import Splash from "@/components/Splash";

function AuthRouter() {
  const { isAuthenticated, authLoading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => { 
    (async () => await  dispatch(getAuthUser()))() 
  }, [dispatch]);


  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        navigate(PRIVATE);
      } else {
        navigate(PUBLIC);
      }
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return <Splash />;
  }

  return <Outlet />;
}

export default AuthRouter;