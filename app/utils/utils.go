package utils

import (
	"errors"
	"log"
	"os"
	"path/filepath"
)

const (
	workdirName string = ".kanban"
)

/**
 * Returns the working directory for the app
 * Creates the directory if it does not exist
 */
func GetWorkDir() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("Unable to find User home dir... Exiting")
	}

	workdir := filepath.Join(homeDir, workdirName)

	// make sure the directory exists
	if _, err := os.Stat(workdir); errors.Is(err, os.ErrNotExist) {
		err := os.Mkdir(workdir, os.ModePerm)
		if err != nil {
			// we couldn't create the directory, needs to fail
			log.Fatalf(err.Error())
		}
	}

	return workdir
}
