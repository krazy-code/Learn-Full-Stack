package models

type Product struct {
	ID       int    `json:"id"`
	Name     string `json:"name" validate:"required,min=3,max=20"`
	Price    int    `json:"price" binding:"required"`
	Category string `json:"category" binding:"required"`
}
