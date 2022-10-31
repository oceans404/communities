import React from "react";
import { Routes, Route } from "react-router-dom";
import { CommunityPage } from "./CommunityPage";
import MainPage from "./MainPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<CommunityPage />} />
        <Route path="/" exact element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
