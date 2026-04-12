package expenses

// Repository は支出情報のDB操作に関するメソッドを定義するインターフェースです。
type Repository interface {
	FindAll() ([]Expense, error)
	Create(e Expense) (*Expense, error)
}
