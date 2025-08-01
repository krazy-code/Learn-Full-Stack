package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/krazy-code/buynbye-go/middleware"
	v1 "github.com/krazy-code/buynbye-go/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())
	r.Use(middleware.LoggerMiddleware())
	r.Use(middleware.ValidationErrorHandler())
	apiV1 := r.Group("/api/v1")
	{
		apiV1.GET("/products", v1.GetAll)
		apiV1.GET("/products/:id", v1.GetByID)
		apiV1.POST("/products", v1.CreateProduct)
		apiV1.PUT("/products/:id", v1.UpdateProduct)
		apiV1.DELETE("/products/:id", v1.DeleteProduct)
	}
	return r
}
