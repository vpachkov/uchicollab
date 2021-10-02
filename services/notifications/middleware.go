// Autogenerated by proprietary Rychkov Silicon Rychkov.MultiplexerGenerator.
// Don't edit or delete this file.

package notifications

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func _handleList(w http.ResponseWriter, r *http.Request) {
	header := w.Header()
	header.Add("Access-Control-Allow-Origin", "*")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	var request NotificationListRequest
	err = json.Unmarshal(b, &request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	response, status := handleList(request)
	w.WriteHeader(status)

	if status >= 200 && status <= 299 {
		resp, _ := json.Marshal(response)
		w.Write([]byte(string(resp)))
	}
}
