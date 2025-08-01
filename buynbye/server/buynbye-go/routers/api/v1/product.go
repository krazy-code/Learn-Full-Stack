package v1

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/krazy-code/buynbye-go/data"
	"github.com/krazy-code/buynbye-go/models"
	u "github.com/krazy-code/buynbye-go/utils"
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
		u.SendResponse(c, http.StatusOK, filtered, nil)
		return
	}
	u.SendResponse(c, http.StatusOK, data.ProductList, nil)

}

func GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		u.SendResponse(c, http.StatusBadRequest, nil, gin.H{"message": "Invalid ID"})
		return
	}

	for _, p := range data.ProductList {
		if p.ID == id {
			u.SendResponse(c, http.StatusOK, p, nil)
			return
		}
	}

	u.SendResponse(c, http.StatusNotFound, nil, gin.H{"message": "Product not found"})

}

func CreateProduct(c *gin.Context) {
	var product models.Product

	if err := c.BindJSON(&product); err != nil {
		u.SendResponse(c, http.StatusBadRequest, nil, gin.H{"error": err})

		return
	}
	if errs := u.Validate.Struct(product); errs != nil {
		c.Error(errs)
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
	u.SendResponse(c, http.StatusCreated, product, nil)
}

func UpdateProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		u.SendResponse(c, http.StatusBadRequest, nil, gin.H{"message": "Invalid ID"})
		return
	}
	var product models.Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.Error(err)
		return
	}
	for i, p := range data.ProductList {
		if p.ID == id {
			product.ID = id
			data.ProductList[i] = product
			u.SendResponse(c, http.StatusOK, product, nil)
			return
		}
	}
	u.SendResponse(c, http.StatusNotFound, nil, gin.H{"message": "Product not found"})

}

func DeleteProduct(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		u.SendResponse(c, http.StatusBadRequest, nil, gin.H{"message": "Invalid ID"})
		return
	}
	for i, p := range data.ProductList {
		if p.ID == id {
			data.ProductList = append(data.ProductList[:i], data.ProductList[i+1:]...)
			u.SendResponse(c, http.StatusNoContent, nil, nil)
			return
		}
	}
	u.SendResponse(c, http.StatusNotFound, nil, gin.H{"message": "Product not found"})

}
