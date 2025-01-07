import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [navigated, setNavigated] = useState(false);
  const navigate = useNavigate();
  //ensure navigation happened, otherwise show 404 page
  useEffect(() => {
    if (!navigated) {
      navigate("/");
      setNavigated(true);
    } else {
      return;
    }
  }, [navigate, navigated]);
  return (
    <>
      <h1 className="text-lg">Page Not Found</h1>
    </>
  );
}

export { NotFound };
