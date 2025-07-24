package main

import (
	"github.com/gin-gonic/gin"
	"github.com/krazy-code/buynbye-go/products"
)

func main() {
	r := gin.Default()

	r.GET("/products", products.GetAll)
	r.GET("/products/:id", products.GetByID)

	r.Run(":3000")
}
