import { useEffect, useState } from "react";

function TemporaryWarning() {
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-[90%] bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md border border-yellow-300 shadow-lg">
      <h4 className="text-sm font-medium text-center">
        This site is using a free database service. Please give the servers a
        moment to spin up after making a request.
      </h4>
    </div>
  );
}

export { TemporaryWarning };
