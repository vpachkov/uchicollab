package search

import (
	"strconv"
	"strings"

	"github.com/go-ego/riot"
	"github.com/go-ego/riot/types"
)

var (
	// searcher is coroutine safe
	searcher = riot.Engine{}
)

func Init() {
	searcher.Init(types.EngineOpts{
		// Using:             4,
		NotUseGse: true,
	})
}

func Index(id int, text string) {
	text = strings.TrimSpace(text)
	searcher.Index(strconv.Itoa(id), types.DocData{Content: text})
	searcher.Flush()
}

func Search(text string) []int {
	text = strings.TrimSpace(text)

	res := searcher.Search(types.SearchReq{Text: text, RankOpts: &types.RankOpts{
		OutputOffset: 0,
		MaxOutputs:   10,
	}})

	a := make([]int, 0)
	for i := 0; i < len(res.Docs.(types.ScoredDocs)); i++ {
		d, _ := strconv.Atoi(res.Docs.(types.ScoredDocs)[i].DocId)
		a = append(a, d)
	}

	return a
}
