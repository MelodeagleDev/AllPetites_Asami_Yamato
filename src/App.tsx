import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<ListPage />}></Route>
          <Route path="/:id" element={<DetailPage />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
