import React from "react";

import Home from "./components/Home";
import Skills from "./components/Skills";
import { FloatingDockDemo } from "./components/FloatingDockPreview";

export default function App() {
  return (
    <>
      <div className="fixed z-20 -mt-56 mr-196" >
        <FloatingDockDemo />
      </div>
      <Home />
      <div className="flex flex-col items-center bg-slate-900  border-amber-100">
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            My Skills
          </h1>
        </div>
        <div className="w-4/5" >
          <Skills />
        </div>
      </div>

    </>
  );
}
