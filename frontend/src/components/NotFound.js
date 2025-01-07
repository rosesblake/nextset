import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function NotFound() {
  const [navigated, setNavigated] = useState(false);
  const navigate = useNavigate();
  const { currUser } = useUser();
  //ensure navigation happened, otherwise show 404 page
  useEffect(() => {
    if (!navigated) {
      if (currUser) {
        navigate("/artist/dashboard");
      } else {
        navigate("/");
      }
      setNavigated(true);
    }
  }, [navigate, navigated, currUser]);
  return (
    <>
      <h1 className="text-lg">Page Not Found</h1>
    </>
  );
}

export { NotFound };
