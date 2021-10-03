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

func removeUselessWords(title string, text string) string {
	text = strings.TrimSpace(title + " " + text)
	text = strings.ToLower(text)
	text = strings.Replace(text, "пожалуйста", "", -1)
	text = strings.Replace(text, "спасибо", "", -1)
	text = strings.Replace(text, "помогите", "", -1)
	text = strings.Replace(text, "решить", "", -1)
	text = strings.Replace(text, "решите", "", -1)
	text = strings.Replace(text, "быстрее", "", -1)
	text = strings.Replace(text, "срочно", "", -1)
	text = strings.Replace(text, "быстро", "", -1)
	text = strings.Replace(text, "быстро", "", -1)
	return text
}

func Init() {
	searcher.Init(types.EngineOpts{
		// Using:             4,
		NotUseGse: true,
	})
}

func Index(id int, title string, text string) {
	text = removeUselessWords(title, text)
	searcher.Index(strconv.Itoa(id), types.DocData{Content: text})
	searcher.Flush()
}

func Search(title string, text string) []int {
	text = removeUselessWords(title, text)

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
