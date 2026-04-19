package transaction

import "time"

// Transaction は収支情報を表す構造体です。
type Transaction struct {
	ID              int64      `json:"id"`
	Title           string     `json:"title"`
	Amount          int64      `json:"amount"`
	Type            string     `json:"type"`
	CategoryID      int64      `json:"category_id"`
	TransactionDate time.Time  `json:"transaction_date"`
	Memo            string     `json:"memo"`
	CreatedAt       time.Time  `json:"-"`
	UpdatedAt       time.Time  `json:"-"`
	DeletedAt       *time.Time `json:"-"`
}
