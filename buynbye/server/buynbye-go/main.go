package handler

import (
	"net/http"

	"github.com/krazy-code/buynbye-go/routers"
)

// var Handler http.Handler = routers.InitRouter()

// func main() {
// 	r := routers.InitRouter()

// 	r.Run(":3000")
// }

func Handler(w http.ResponseWriter, res *http.Request) {
	r := routers.InitRouter()

	r.ServeHTTP(w, res)
}
