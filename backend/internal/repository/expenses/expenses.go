package expenses

import (
	domain "household/internal/domain/expenses"
	"household/internal/platform/appctx"
)

// ExpenseRepository は支出のDB操作を担う構造体です。
type ExpenseRepository struct {
	Context appctx.AppCtx
}

// FindAll は支出一覧を取得します。
func (e *ExpenseRepository) FindAll() ([]domain.Expense, error) {
	// TODO: implement
	return nil, nil
}

// Create は支出を登録します。
func (e *ExpenseRepository) Create(expense domain.Expense) (*domain.Expense, error) {
	// TODO: implement
	return nil, nil
}
