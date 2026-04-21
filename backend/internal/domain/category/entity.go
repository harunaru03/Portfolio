package categories

// Category は1つのカテゴリを表す構造体です。
type Category struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"` // 'expense' or 'income'
}
