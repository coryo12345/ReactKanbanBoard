import Stack from "@mui/material/Stack";
import { useBoardStore } from "../store/boardStore";
import StatusColumn from "./StatusColumn";

function StatusBoard() {
  const columns = useBoardStore((state) => state.columns || []);

  return (
    <Stack direction="row" spacing={1}>
      {columns.map((col) => (
        <StatusColumn column={col} key={col.id}></StatusColumn>
      ))}
    </Stack>
  );
}

export default StatusBoard;
