import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { WorkItem } from "../models/KanbanBoard";

type Props = {
  item: WorkItem;
  setItem: (item: WorkItem) => void;
  activator: JSX.Element;
};

function EditWorkItemDialog(props: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description);

  const closeDialog = () => {
    setShowDialog(false);
    setName(props.item.name);
    setDescription(props.item.description);
  };

  function save() {
    props.setItem({
      name,
      description,
    });
    setShowDialog(false);
  }

  return (
    <>
      <span
        onClick={() => {
          setShowDialog(true);
        }}
      >
        {props.activator}
      </span>
      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-item-name"
            label="Title"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="edit-item-desc"
            label="Description"
            multiline
            fullWidth
            maxRows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditWorkItemDialog;
