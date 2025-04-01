import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import Heading from "./Heading";
import Home from "./Home";

function App(){
    return (
        <BrowserRouter>
          <Heading />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/resume" />
            <Route path="/aboutMe" />
            <Route path="/contactMe " />
            <Route path="/feedbacks" />
          </Routes>
            {/*<Footer />*/}
        </BrowserRouter>
      ); 
}

export default App;