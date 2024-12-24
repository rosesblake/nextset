import "../styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { ArtistRegisterForm } from "./ArtistRegisterForm";
import { VenueRegisterForm } from "./VenueRegisterForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/register/artist" element={<ArtistRegisterForm />} />
          <Route path="/register/venue" element={<VenueRegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
