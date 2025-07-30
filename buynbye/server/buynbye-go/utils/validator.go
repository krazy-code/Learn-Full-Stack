package utils

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

// ValidateStruct validates a struct and returns a slice of error messages (if any)
func ValidateStruct(s interface{}) []string {
	err := validate.Struct(s)
	if err == nil {
		return nil
	}
	var errs []string
	for _, e := range err.(validator.ValidationErrors) {
		errs = append(errs, fmt.Sprintf("Field '%s' failed on the '%s' rule", e.Field(), e.Tag()))
	}
	return errs
}
