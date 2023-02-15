import { Board } from "../models/KanbanBoard";

export const defaultBoard: Board = {
  name: "My Kanban Board",
  id: 0,
  columns: [
    {
      name: "TODO",
      id: 0,
      items: [
        {
          name: "An item to do",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed voluptatibus iste a sit repellendus, praesentium hic dolor voluptatum optio veritatis eius dicta porro vero libero? Eius accusantium aspernatur quos.",
        },
        {
          name: "board name",
          description: "Make board name editable in settings",
        },
        {
          name: "column names",
          description: "Make column names editable in settings",
        },
        {
          name: "persistent storage",
          description: "use .kanban storage location to store persistent data of columns & items",
        },
      ],
    },
    {
      name: "In Progress",
      id: 1,
      items: [
        {
          name: "Something I'm doing",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed voluptatibus iste a sit repellendus, praesentium hic dolor voluptatum optio veritatis eius dicta porro vero libero? Eius accusantium aspernatur quos.",
        },
      ],
    },
    {
      name: "Done",
      id: 2,
      items: [
        {
          name: "A task I've done",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed voluptatibus iste a sit repellendus, praesentium hic dolor voluptatum optio veritatis eius dicta porro vero libero? Eius accusantium aspernatur quos.",
        },
      ],
    },
  ],
};
