import { useEffect, useRef, useState } from "react";
import SettingsDialog from "./components/settings/SettingsDialog";
import StatusBoard from "./components/StatusBoard";
import { useAppStore } from "./store/appStore";
import { useBoardStore } from "./store/boardStore";

function App() {
  // Board Info
  const boardName = useBoardStore((state) => state.name || "");
  const backgroundColor = useAppStore((state) => state.backgroundColor);

  // Board Sizing
  const appRef = useRef(null as any);
  const columnsContainerRef = useRef(null as any);
  const [columnsContainerHeight, setColumnsContainerHeight] = useState(1);

  function updateContainerHeight() {
    const y = columnsContainerRef.current.getBoundingClientRect().y;
    const height = appRef.current.getBoundingClientRect().height;
    setColumnsContainerHeight(height - y - 8);
  }

  useEffect(() => {
    updateContainerHeight();
  });

  useEffect(() => {
    window.addEventListener("resize", updateContainerHeight);
    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  // data to load on startup
  const loadAppData = useAppStore((state) => state.loadAppState);
  useEffect(() => {
    loadAppData();
  }, []);

  return (
    <div className="w-screen h-screen p-2" style={{ backgroundColor }} ref={appRef}>
      <div className="w-full relative mb-1">
        <div className="text-xl text-center">{boardName}</div>
        <span className="text-xl float-right absolute top-0 right-0 cursor-pointer">
          <SettingsDialog />
        </span>
      </div>
      <div
        className="flex overflow-scroll"
        ref={columnsContainerRef}
        style={{ height: columnsContainerHeight + "px" }}
      >
        <StatusBoard />
      </div>
    </div>
  );
}

export default App;
