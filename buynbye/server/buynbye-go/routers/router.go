package routers

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	v1 "github.com/krazy-code/buynbye-go/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	apiV1 := r.Group("/api/v1")
	apiV1.Use()
	{
		apiV1.GET("/products", v1.GetAll)
		apiV1.GET("/products/:id", v1.GetByID)
		apiV1.POST("/products", v1.CreateProduct)
	}
	return r
}
