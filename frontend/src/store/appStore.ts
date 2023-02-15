import create from "zustand";
import { LoadAppMeta, SetBackgroundColor } from "../../wailsjs/go/meta/MetaAPI";

interface AppState {
  loadAppState: () => Promise<void>;
  backgroundColor: string;
  setBackgroundColor: (color: string) => Promise<void>;
}

export const useAppStore = create<AppState>()((set) => ({
  backgroundColor: "#afd6e4",
  async setBackgroundColor(color: string) {
    set(() => {
      return {
        backgroundColor: color,
      };
    });
    SetBackgroundColor(color);
  },
  async loadAppState() {
    const data = await LoadAppMeta();
    set(() => {
      return {
        backgroundColor: data.bgColor,
      };
    });
  },
}));
