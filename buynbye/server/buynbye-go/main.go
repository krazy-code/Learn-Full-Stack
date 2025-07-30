package main

import (
	"github.com/krazy-code/buynbye-go/routers"
)

func main() {
	r := routers.InitRouter()

	r.Run(":3000")
}
