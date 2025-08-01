package models

type Product struct {
	ID       int    `json:"id"`
	Name     string `json:"name" validate:"required,min=3,max=20"`
	Price    int    `json:"price" validate:"required,gte=0"`
	Category string `json:"category" validate:"required"`
}
