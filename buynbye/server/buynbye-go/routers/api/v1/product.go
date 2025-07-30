package v1

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/krazy-code/buynbye-go/data"
	"github.com/krazy-code/buynbye-go/models"
	"github.com/krazy-code/buynbye-go/utils"
)

func GetAll(c *gin.Context) {
	category := strings.ToLower(c.Query("category"))
	if category != "" {
		var filtered []models.Product
		for _, p := range data.ProductList {
			if strings.ToLower(p.Category) == category {
				filtered = append(filtered, p)
			}
		}
		c.JSON(http.StatusOK, filtered)
		return
	}
	c.JSON(http.StatusOK, data.ProductList)
}

func GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	for _, p := range data.ProductList {
		if p.ID == id {
			c.JSON(http.StatusOK, p)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
}

func CreateProduct(c *gin.Context) {
	var product models.Product

	if err := c.BindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if errs := utils.ValidateStruct(product); errs != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": errs})
		return
	}
	maxID := 0
	for _, p := range data.ProductList {
		if p.ID > maxID {
			maxID = p.ID
		}
	}
	product.ID = maxID + 1

	data.ProductList = append(data.ProductList, product)
	c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	var product models.Product

	if err := c.BindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if errs := utils.ValidateStruct(product); errs != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": errs})
		return
	}
	for i, p := range data.ProductList {
		if p.ID == id {
			product.ID = id
			data.ProductList[i] = product
			c.JSON(http.StatusOK, product)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})

}

func DeleteProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	for i, p := range data.ProductList {
		if p.ID == id {
			data.ProductList = append(data.ProductList[:i], data.ProductList[i+1:]...)
			c.JSON(http.StatusNoContent, gin.H{"message": "Success Delete", "deleted": p})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
}
