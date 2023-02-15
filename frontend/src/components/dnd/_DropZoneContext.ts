import { createContext, useContext } from "react";

export type DZContext = {
  groupName: string;
  zoneId: number;
};

export const DropZoneContext = createContext<DZContext>({
  groupName: "",
  zoneId: 0,
});

export const useDropZoneContext = () => useContext(DropZoneContext);
