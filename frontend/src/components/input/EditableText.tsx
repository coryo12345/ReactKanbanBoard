import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function EditableText(props: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function setName(name: string) {
    props.onChange(name);
    setEditing(false);
  }

  return (
    <span>
      {editing && (
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => setName(e.target.value)}
          size="small"
        />
      )}
      {!editing && (
        <span onClick={() => setEditing(true)}>
          <span className="mr-1">{props.value}</span>
          <FontAwesomeIcon icon={faPencil} />
        </span>
      )}
    </span>
  );
}
