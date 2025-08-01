package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10" // Example validator package
	"github.com/krazy-code/buynbye-go/utils"
)

type ErrorResponse struct {
	Message string      `json:"message"`
	Details interface{} `json:"details,omitempty"` // e.g., validation error details
}

func ValidationErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next() // Process the request first

		// Iterate through errors added to the context
		for _, ginErr := range c.Errors {
			if validationErrors, ok := ginErr.Err.(validator.ValidationErrors); ok {
				// Handle validation errors specifically
				errorDetails := make(map[string]string)
				for _, fieldErr := range validationErrors {
					errorDetails[fieldErr.Field()] = utils.TagToMessage(fieldErr.Field(), fieldErr.Tag(), fieldErr.Param())
				}
				c.AbortWithStatusJSON(http.StatusBadRequest, ErrorResponse{
					Message: "Validation failed",
					Details: errorDetails,
				})
				return // Stop processing further errors
			}
		}
	}
}
