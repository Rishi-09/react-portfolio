import { Boxes } from "./background-boxes";
import { SpotlightPreview } from "./SpotlightPreview";


export default function Home() {
  return (
    <>
      <div className="h-screen overflow-x-hidden  w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <span className="w-fit overflow-x-hidden" > <Boxes /> </span>
        <SpotlightPreview />
      </div>
    </>
  );
}