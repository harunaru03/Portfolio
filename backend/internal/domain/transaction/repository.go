package transaction

import "time"

// Repository は支出情報のDB操作に関するメソッドを定義するインターフェースです。
type Repository interface {
	FindByMonth(year int, month time.Month) ([]Transaction, error)
	Create(e Transaction) (*Transaction, error)
}
