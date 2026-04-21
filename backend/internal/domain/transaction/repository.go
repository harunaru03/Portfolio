package transaction

// Repository は支出情報のDB操作に関するメソッドを定義するインターフェースです。
type Repository interface {
	FindAll() ([]Transaction, error)
	Create(e Transaction) (*Transaction, error)
}
