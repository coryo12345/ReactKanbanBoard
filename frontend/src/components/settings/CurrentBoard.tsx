import { faEllipsisV, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import { KanbanColumn } from "../../models/KanbanBoard";
import { useBoardStore } from "../../store/boardStore";
import DraggableItem from "../dnd/DraggableItem";
import DropZone from "../dnd/DropZone";
import EditableText from "../input/EditableText";

const DND_ITEM_HEIGHT = 32;

export default function CurrentBoard() {
  const board = useBoardStore((state) => state);
  const addColumn = useBoardStore((state) => state.addColumn);

  const getColumns = () => useBoardStore.getState().columns || [];
  const setColumns = useBoardStore((state) => state.setColumns);

  const setBoardName = useBoardStore((state) => state.setBoardName);

  return (
    <>
      <p className="text-lg font-semibold">Current Board</p>
      <span className="flex flex-row items-center">
        <span className="mr-1">Name: </span>
        <EditableText value={board.name} onChange={setBoardName} />
      </span>
      <p>Columns:</p>
      <DropZone
        groupName="settings-columns"
        getItems={getColumns}
        setItems={setColumns}
        orderableItemHeight={DND_ITEM_HEIGHT}
      >
        {board.columns.map((col, idx) => (
          <DraggableItem item={col} key={idx}>
            <ColumnCard column={col} />
          </DraggableItem>
        ))}
      </DropZone>
      <Button variant="outlined" size="small" onClick={addColumn}>
        Add Column
      </Button>
    </>
  );
}

type ColumnCardProps = {
  column: KanbanColumn;
};
function ColumnCard(props: ColumnCardProps) {
  const removeColumn = useBoardStore((state) => state.removeColumn);

  return (
    <>
      <Paper
        className="my-1 py-1 px-2"
        style={{ height: DND_ITEM_HEIGHT + "px" }}
        variant="outlined"
      >
        {/* TODO: fix this */}
        <EditableText value={props.column.name} onChange={() => {}} />
        <span
          className="ml-1 cursor-pointer"
          onClick={() => {
            removeColumn(props.column);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </Paper>
    </>
  );
}
