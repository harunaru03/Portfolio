package expenses

import (
	domain "household/internal/domain/expenses"
	"household/internal/platform/appctx"
	"household/internal/platform/log"
)

// Service は支出に関するビジネスロジックを定義するインターフェースです。
type Service interface {
	GetAll() ([]domain.Expense, error)
	Create(e domain.Expense) (*domain.Expense, error)
}

// ExpenseService は Service を実装する構造体です。
type ExpenseService struct {
	Context appctx.AppCtx
	Repo    domain.Repository
}

// GetAll は支出一覧を取得します。
func (e *ExpenseService) GetAll() ([]domain.Expense, error) {
	data, err := e.Repo.FindAll()
	if err != nil {
		e.Context.Log().Error(log.Args{
			Message:    "支出一覧取得に失敗しました。",
			StackTrace: err.Error(),
		})
		return nil, err
	}
	return data, nil
}

// Create は支出を登録します。
func (e *ExpenseService) Create(expense domain.Expense) (*domain.Expense, error) {
	result, err := e.Repo.Create(expense)
	if err != nil {
		e.Context.Log().Error(log.Args{
			Message:    "支出登録に失敗しました。",
			StackTrace: err.Error(),
		})
		return nil, err
	}
	return result, nil
}
