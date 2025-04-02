import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import Heading from "./Heading";
import Home from "./Home";
import AboutMe from "./AboutMe";

function App(){
    return (
        <BrowserRouter>
          <Heading />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/aboutMe" element={<AboutMe />} />
            <Route path="/contactMe " />
            <Route path="/feedbacks" />
          </Routes>
            {/*<Footer />*/}
        </BrowserRouter>
      ); 
}

export default App;