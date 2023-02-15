import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper } from "@mui/material";
import { useRef } from "react";
import { WorkItem } from "../models/KanbanBoard";
import DraggableItem from "./dnd/DraggableItem";
import EditWorkItemDialog from "./EditWorkItemDialog";
import "./WorkItem.css";

type Props = {
  item: WorkItem;
  setItem: (item: WorkItem) => void;
  removeItem: () => void;
};

export const WORK_ITEM_HEIGHT = 120;

function workItem(props: Props) {
  const descriptionContainer = useRef(null as HTMLDivElement | null);

  return (
    <DraggableItem item={props.item}>
      <Paper
        className="work-item-card p-2 cursor-pointer border overflow-hidden mb-2"
        style={{ minHeight: WORK_ITEM_HEIGHT + "px", maxHeight: WORK_ITEM_HEIGHT + "px" }}
      >
        <div className="flex justify-between" data-draggable="true">
          <div className="text-lg font-medium" data-draggable="true">
            {props.item.name}
          </div>
          <span>
            <FontAwesomeIcon
              icon={faXmark}
              className="item-edit-icon mr-1 text-lg"
              onClick={props.removeItem}
            />
            <EditWorkItemDialog
              activator={<FontAwesomeIcon icon={faPencil} className="item-edit-icon" />}
              setItem={props.setItem}
              item={props.item}
            />
          </span>
        </div>
        <div ref={descriptionContainer} className="text-sm" data-draggable="true">
          {props.item.description}
        </div>
      </Paper>
    </DraggableItem>
  );
}

export default workItem;
