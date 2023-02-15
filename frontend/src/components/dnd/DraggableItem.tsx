import { useEffect, useRef, useState } from "react";
import "./DraggableItem.css";
import { DropZoneContext, useDropZoneContext } from "./_DropZoneContext";
import { attemptItemMove } from "./_DropZones";

type Props = {
  item: any;
  children: JSX.Element;
};

function DraggableItem(props: Props) {
  const dropZone = useDropZoneContext();

  const containerRef = useRef(null as HTMLDivElement | null);
  const [movingItem, setMovingItem] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function updateTranslatePos(event: MouseEvent): any {
    event.preventDefault();
    setMousePos({ x: event.clientX, y: event.clientY });
  }

  function startMove(event: MouseEvent): any {
    event.preventDefault();
    try {
      if (
        (event.target as HTMLElement).getAttribute("data-draggable") !== "true" &&
        (event.target as HTMLElement).parentElement?.getAttribute("data-draggable") !== "true"
      ) {
        return;
      }
    } catch (err) {}

    setStartPos({ x: event.clientX, y: event.clientY });
    setMousePos({ x: event.clientX, y: event.clientY });
    setMovingItem(true);
    window.addEventListener("mousemove", updateTranslatePos);
    window.addEventListener("mouseup", endMove);
  }

  function endMove(event: MouseEvent) {
    event.preventDefault();
    setMovingItem(false);
    window.removeEventListener("mouseup", endMove);
    window.removeEventListener("mousemove", updateTranslatePos);
    try {
      if (
        (event.target as HTMLElement).getAttribute("data-draggable") !== "true" &&
        (event.target as HTMLElement).parentElement?.getAttribute("data-draggable") !== "true"
      ) {
        return;
      }
    } catch (err) {}

    // here is where we need to figure out where to move this item to
    if (containerRef.current) {
      attemptItemMove(dropZone.groupName, dropZone.zoneId, containerRef.current, props.item);
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener("mousedown", startMove);

    return () => {
      containerRef.current?.removeEventListener("mousedown", startMove);
    };
  }, [dropZone]);

  function containerClasses() {
    const cls = ["app-draggable-item"];
    if (movingItem) {
      cls.push("app-draggable-item-mouse-down");
    }
    return cls.join(" ");
  }

  return (
    <div
      ref={containerRef}
      className={containerClasses()}
      style={{
        top: mousePos.y - startPos.y + "px",
        left: mousePos.x - startPos.x + "px",
      }}
      data-draggable="true"
    >
      {props.children}
    </div>
  );
}

export default DraggableItem;
