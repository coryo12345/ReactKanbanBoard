import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ListBoards } from "../../../wailsjs/go/app/App";
import CurrentBoard from "./CurrentBoard";
import MiscSettings from "./MiscSettings";

function SettingsDialog() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const closeDialog = () => setShowSettingsDialog(false);

  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

  async function listDirs() {
    const boards = await ListBoards();
    console.log(boards);
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faGear}
        onClick={() => {
          setShowSettingsDialog(true);
        }}
      />
      <Dialog fullWidth={true} maxWidth={maxWidth} open={showSettingsDialog} onClose={closeDialog}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <CurrentBoard />

          <div className="my-2">
            <Divider />
          </div>

          <MiscSettings />
        </DialogContent>

        <DialogActions>
          <Button onClick={listDirs}>List Boards</Button>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SettingsDialog;
