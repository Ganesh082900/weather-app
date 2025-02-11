import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/landingPage/LandingPage";
import MainPage from "./components/pages/Mainpage";
import FavoritePlaces from "./components/pages/FavoritePlaces";

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <Router>
      <Routes>
        {/* Landing Page Layout Wrapper */}
        <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />}>
          {/* Default Route (MainPage) */}
          <Route index element={<MainPage theme={theme} />} />
          {/* Favorite Places Route */}
          <Route path="favorite-places" element={<FavoritePlaces theme={theme} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
