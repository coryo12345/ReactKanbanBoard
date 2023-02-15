package meta

import (
	"encoding/json"
	"log"
	"os"
)

type MetaAPI struct{}

func NewMetaAPI() *MetaAPI {
	return &MetaAPI{}
}

func (m *MetaAPI) SetBackgroundColor(color string) error {
	meta, err := m.LoadAppMeta()
	if err != nil {
		return err
	}
	meta.BgColor = color
	WriteMetaFile(&meta)
	return nil
}

func (m *MetaAPI) LoadAppMeta() (MetaV1, error) {
	// make sure file exists
	InitMetaFiles()
	// read meta file
	data, err := os.ReadFile(GetMetaFileName())
	if err != nil {
		log.Fatalf(err.Error())
	}
	meta := &MetaV1{}
	err = json.Unmarshal(data, &meta)
	if err != nil {
		log.Fatalf(err.Error())
	}
	return *meta, nil
}
