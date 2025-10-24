import { Spotlight } from "./Spotlight";

export function SpotlightPreview() {
  return (
    <div>
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
           Rishi
        </h1>
        <br />
        <h3 className="bg-opacity-50  bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-3xl " >MERN Stack Developer</h3>
      </div>
    </div>
  );
}
