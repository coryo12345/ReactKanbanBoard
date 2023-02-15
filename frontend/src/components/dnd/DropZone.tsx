import { useEffect, useRef, useState } from "react";
import { DropZoneContext } from "./_DropZoneContext";
import { Item, registerZone, removeZone } from "./_DropZones";

type Props = {
  groupName: string; // an identifier to group dropzones together
  getItems: () => Item[];
  setItems: (items: Item[]) => void;
  orderableItemHeight?: number;
  children: JSX.Element | JSX.Element[];
};

function DropZone(props: Props) {
  const containerRef = useRef(null as HTMLDivElement | null);
  const [zoneId, setZoneId] = useState(0);

  // Register this zone in the group
  useEffect(() => {
    if (containerRef.current) {
      const id = registerZone(
        props.groupName,
        containerRef.current,
        props.getItems,
        props.setItems,
        props.orderableItemHeight
      );
      setZoneId(id);
      return () => {
        removeZone(props.groupName, id);
      };
    }
  }, []);

  return (
    <DropZoneContext.Provider value={{ groupName: props.groupName, zoneId }}>
      <div ref={containerRef} data-drop-zone="true">
        {props.children}
      </div>
    </DropZoneContext.Provider>
  );
}

export default DropZone;
