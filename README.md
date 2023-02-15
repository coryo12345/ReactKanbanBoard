# React Kanban Board
This project uses [wails](https://wails.io/) to build a desktop application using React as the UI, with the "backend" hooks written in go.

## Why did I make this?
I was beginning to learn go, and wanted to refresh myself on React after not using for a few years. I saw the wails project, and figured a simple kanban board would be the perfect sized project for me to refresh myself on React, and get a little more familiar with go. A kanban board is simple in concept, so I didn't have to put time into coming up with an idea. But it has enough little intricate pieces to make sure I really get comfortable with React on more than just a surface level.

## Things still to do
1. Make board name editable in settings
2. Make column names editable in settings
3. Persistent storage by writing settings to user storage

## UI
* Using Zustand for state management
* MUI for visual components
* Tailwind CSS for custom styling

I ended up building my own drag and drop components for the kanban cards. I wasn't a huge fan of the drag and drop libraries I found, most seemed overly complicated for what I was looking for. my drag and drop components are found in `frontend/src/components/dnd`.