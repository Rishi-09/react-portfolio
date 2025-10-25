import React from "react";


import Home from "./components/Home";
import Skills from "./components/Skills";

export default function App() {
  return (
    <>
      <Home />
      <h1 className="bg-slate-900 font-bold text-white text-center text-4xl z-10 overflow-x-hidden " >Skills</h1>
      <div className="flex justify-center bg-slate-900  border-amber-100" >
        <Skills />
      </div>
          
    </>
  );
}
