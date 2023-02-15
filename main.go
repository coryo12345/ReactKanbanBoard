package main

import (
	"embed"
	"kanban/app"
	"kanban/app/meta"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := app.NewApp()
	metaApi := meta.NewMetaAPI()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "kanban",
		Width:            1024,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
			metaApi,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
