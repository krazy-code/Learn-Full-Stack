package products

type Product struct {
	ID       int    `json:"id"`
	Name     string `json:"name" binding:"required,min=3,max=20"`
	Price    int    `json:"price"`
	Category string `json:"category"`
}
