import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import { OpenWorkDir } from "../../../wailsjs/go/app/App";
import { useAppStore } from "../../store/appStore";

export default function MiscSettings() {
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const setBackgroundColor = useAppStore((state) => state.setBackgroundColor);

  return (
    <>
      <p className="text-lg font-semibold">Misc.</p>
      <DialogContentText>
        <span className="flex items-center">
          <span className="mr-2">Background Color: </span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </span>
      </DialogContentText>
      <DialogContentText>
        Open Kanban Data Directory:{" "}
        <Button variant="outlined" onClick={OpenWorkDir} size="small">
          Open
        </Button>
      </DialogContentText>
    </>
  );
}
