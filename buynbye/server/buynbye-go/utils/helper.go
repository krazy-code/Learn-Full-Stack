package utils

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var Validate *validator.Validate

func init() {
	Validate = validator.New()
}

func TagToMessage(field, tag string, param string) string {
	switch tag {
	case "required":
		return fmt.Sprintf("%s is required", field)
	case "min":
		return fmt.Sprintf("%s must be at least %s characters", field, param)
	case "max":
		return fmt.Sprintf("%s must be at most %s characters", field, param)
	case "email":
		return fmt.Sprintf("%s must be a valid email", field)
	case "gte":
		return fmt.Sprintf("%s must be greater than %s", field, param)
	default:
		return fmt.Sprintf("%s is not valid", field)
	}
}

type DefaultResponse struct {
	Code   int         `json:"code"`
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
	Error  interface{} `json:"errors"`
}

func SendResponse(c *gin.Context, code int, data interface{}, err interface{}) {
	c.JSON(code, DefaultResponse{
		Code:   code,
		Status: "Success",
		Data:   data,
		Error:  err,
	})
}
