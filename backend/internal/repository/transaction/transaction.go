package transaction

import (
	"fmt"

	domain "household/internal/domain/transaction"
	"household/internal/platform/appctx"
)

// TransactionRepository は支出のDB操作を担う構造体です。
type TransactionRepository struct {
	Context appctx.AppCtx
}

// FindAll は収支情報一覧を取得します。
func (t *TransactionRepository) FindAll() ([]domain.Transaction, error) {
	// TODO: implement
	return nil, nil
}

// Create は収支情報を登録します。
func (t *TransactionRepository) Create(transaction domain.Transaction) (*domain.Transaction, error) {
	err := t.Context.DB().Writer().
		Create(&transaction).Error
	if err != nil {
		return nil, fmt.Errorf("Create: %w", err)
	}

	return &transaction, nil
}
