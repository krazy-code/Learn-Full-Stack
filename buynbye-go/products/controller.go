package products

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	category := strings.ToLower(c.Query("category"))
	if category != "" {
		var filtered []Product
		for _, p := range ProductList {
			if strings.ToLower(p.Category) == category {
				filtered = append(filtered, p)
			}
		}
		c.JSON(http.StatusOK, filtered)
		return
	}
	c.JSON(http.StatusOK, ProductList)
}

func GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	for _, p := range ProductList {
		if p.ID == id {
			c.JSON(http.StatusOK, p)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
}
