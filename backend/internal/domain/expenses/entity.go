package expenses

import "time"

// Expense は支出情報を表す構造体です。
type Expense struct {
	ID              int64
	Title           string
	Amount          float64
	CategoryID      int64
	CategoryName    string
	TransactionDate time.Time
	Memo            string
}
