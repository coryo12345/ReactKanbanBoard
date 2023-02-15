import { Divider, IconButton, Paper } from "@mui/material";
import { KanbanColumn, WorkItem as WorkItemT } from "../models/KanbanBoard";
import { useBoardStore } from "../store/boardStore";
import DropZone from "./dnd/DropZone";
import "./StatusColumn.css";
import WorkItem, { WORK_ITEM_HEIGHT } from "./WorkItem";

type Props = {
  column: KanbanColumn;
};

function StatusColumn(props: Props) {
  const setItemsForColumn = useBoardStore((state) => state.setItemsForColumn);
  const _removeItem = useBoardStore((state) => state.removeItem);

  const getWorkItems = () =>
    useBoardStore.getState().columns.find((col) => col.id === props.column.id)?.items || [];
  const workItems =
    useBoardStore((state) => state.columns).find((col) => col.id === props.column.id)?.items || [];

  function setItems(items: WorkItemT[]) {
    setItemsForColumn(props.column.id, items);
  }

  function setItem(item: WorkItemT, index: number) {
    const newItems = [...workItems];
    newItems[index] = item;
    setItems(newItems);
  }

  function deleteItem(item: WorkItemT, index: number) {
    _removeItem(props.column.id, index);
  }

  function addItem() {
    const items = [
      ...workItems,
      { name: "A new task", description: "Edit this description by clicking the pencil icon" },
    ];
    setItemsForColumn(props.column.id, items);
  }

  return (
    <Paper className="kanban-status-column">
      <div className="p-1 flex justify-between">
        <span className="ml-2 font-bold text-lg">{props.column.name}</span>
        <span
          className="font-bold text-xl cursor-pointer flex justify-center items-center icon-button"
          onClick={addItem}
        >
          +
        </span>
      </div>
      <Divider />
      <div className="p-2">
        <DropZone
          groupName="kanban"
          getItems={getWorkItems}
          setItems={setItems}
          orderableItemHeight={WORK_ITEM_HEIGHT}
        >
          {workItems.map((item, idx) => (
            <WorkItem
              key={idx}
              item={item}
              setItem={(item: WorkItemT) => {
                setItem(item, idx);
              }}
              removeItem={() => {
                deleteItem(item, idx);
              }}
            />
          ))}
        </DropZone>
      </div>
    </Paper>
  );
}

export default StatusColumn;
