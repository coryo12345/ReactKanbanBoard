package app

import (
	"context"
	"fmt"
	"os/exec"
	"runtime"

	"kanban/app/board"
	"kanban/app/meta"
	"kanban/app/utils"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	app := &App{}
	app.InitMetaFiles()
	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.InitMetaFiles()
}

func (a *App) OpenWorkDir() {
	cmd := "explorer"
	workDir := utils.GetWorkDir()
	if runtime.GOOS != "windows" {
		cmd = "open"
	}
	fmt.Printf("%s %s\n", cmd, workDir)
	exec.Command(cmd, workDir).Start()
}

func (a *App) InitMetaFiles() {
	meta.InitMetaFiles()
}

func (a *App) SaveBoard(b board.Board) (int, error) {
	return board.SaveBoard(b)
}

func (a *App) LoadBoard(id int) (board.Board, error) {
	return board.LoadBoard(id)
}

func (a *App) ListBoards() ([]board.BoardMetaData, error) {
	return board.ListBoards()
}
