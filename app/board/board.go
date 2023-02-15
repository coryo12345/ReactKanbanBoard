package board

import (
	"encoding/json"
	"errors"
	"fmt"
	"kanban/app/utils"
	"os"
	"path"
	"strings"
)

type WorkItem struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Column struct {
	Name  string     `json:"name"`
	Id    int        `json:"id"`
	Items []WorkItem `json:"items"`
}

type BoardMetaData struct {
	Name string `json:"name"`
	Id   int    `json:"id"`
}

type Board struct {
	Name    string   `json:"name"`
	Id      int      `json:"id"`
	Columns []Column `json:"columns"`
}

func SaveBoard(b Board) (int, error) {
	file, err := json.MarshalIndent(b, "", " ")
	if err != nil {
		return -1, err
	}

	workDir := utils.GetWorkDir()
	filename := fmt.Sprintf("%d.json", b.Id)
	filename = path.Join(workDir, filename)

	err = os.WriteFile(filename, file, 0644)
	if err != nil {
		return -1, err
	}
	return 0, nil
}

func LoadBoard(id int) (Board, error) {
	workDir := utils.GetWorkDir()
	filename := fmt.Sprintf("%d.json", id)
	filename = path.Join(workDir, filename)

	// make sure the file exists
	if _, err := os.Stat(filename); errors.Is(err, os.ErrNotExist) {
		return Board{}, errors.New("Board does not exist")
	}

	file, err := os.ReadFile(filename)
	if err != nil {
		return Board{}, err
	}

	b := Board{}
	err = json.Unmarshal(file, &b)
	if err != nil {
		return Board{}, err
	}

	return b, nil
}

func ListBoards() ([]BoardMetaData, error) {
	workDir := utils.GetWorkDir()
	dirs, err := os.ReadDir(workDir)
	if err != nil {
		return nil, err
	}

	boards := []BoardMetaData{}

	for i := 0; i < len(dirs); i++ {
		dir := dirs[i]
		filename := dir.Name()
		id := strings.Split(filename, ".json")
		fmt.Println(id)
		b := BoardMetaData{
			Name: filename,
			Id:   i,
		}
		boards = append(boards, b)
	}

	return boards, nil
}
