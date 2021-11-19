import React from 'react'
import ReactDOM from "react-dom";
import "./index.css";
import Dashboard from './Pages/Dashboard'

import { Route, Routes, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

