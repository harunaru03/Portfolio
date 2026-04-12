package categories

// Category は1つのカテゴリを表す構造体です。
type Category struct {
	ID   int64
	Name string
	Type string // 'expense' or 'income'
}
