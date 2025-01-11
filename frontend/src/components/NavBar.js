import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

function Navbar() {
  const { currUser, logout } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-nextsetPrimary p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        <div className="text-nextsetAccent text-2xl font-bold pl-4">
          <a href="/">NextSet</a>
        </div>
        <div className="pr-4">
          {currUser ? (
            <button
              onClick={logout}
              className="px-6 py-2 text-nextsetPrimary bg-nextsetAccent hover:bg-nextsetButton rounded-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 text-nextsetPrimary bg-nextsetAccent hover:bg-nextsetButton rounded-md transition duration-300"
            >
              Login
            </button>
          )}
          {!currUser && (
            <Link to="/">
              <button className="ml-4 px-6 py-2 text-nextsetPrimary bg-nextsetButton hover:bg-nextsetAccent rounded-md transition duration-300">
                Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
