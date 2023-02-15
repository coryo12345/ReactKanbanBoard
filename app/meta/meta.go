package meta

import (
	"encoding/json"
	"errors"
	"kanban/app/utils"
	"log"
	"os"
	"path"
)

const (
	Version      int    = 1
	metaFileName string = "meta_v1.json" // this will need to change if the structure of the meta struct massively changes
)

// Versioning this just in case this gets updated in future versions
type MetaV1 struct {
	BgColor string `json:"bgColor"`
	Version int    `json:"version"`
}

func (m *MetaV1) Marshall() []byte {
	data, err := json.MarshalIndent(*m, "", " ")
	if err != nil {
		panic("failed to convert meta data to json")
	}
	return data
}

func GetDefaultMeta() *MetaV1 {
	return &MetaV1{
		BgColor: "#afd6e4",
		Version: Version,
	}
}

func GetMetaFileName() string {
	return path.Join(utils.GetWorkDir(), metaFileName)
}

func InitMetaFiles() {
	metaFileName := GetMetaFileName()
	// check if meta file exists
	if _, err := os.Stat(metaFileName); errors.Is(err, os.ErrNotExist) {
		// meta file doesn't exist - need to create
		meta := GetDefaultMeta().Marshall()
		err = os.WriteFile(metaFileName, meta, 0644)
		if err != nil {
			// we couldn't create the file, fail
			log.Fatalf(err.Error())
		}
	}
}

func WriteMetaFile(meta *MetaV1) {
	data := meta.Marshall()
	err := os.WriteFile(GetMetaFileName(), data, 0644)
	if err != nil {
		// we couldn't create the file, fail
		log.Fatalf(err.Error())
	}
}
