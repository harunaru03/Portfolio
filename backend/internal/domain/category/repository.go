package categories

// Repository はカテゴリ情報のDB操作に関するメソッドを定義するインターフェースです。
type Repository interface {
	FindAll() ([]Category, error)
	FindByID(id int64) (*Category, error)
}
