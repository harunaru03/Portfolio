package transaction

import (
	"fmt"
	"time"

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

// FindByMonth は指定した年月の収支情報一覧を取得します。
func (t *TransactionRepository) FindByMonth(year int, month time.Month) ([]domain.Transaction, error) {
	from := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	to := from.AddDate(0, 1, 0)

	var transactions []domain.Transaction
	err := t.Context.DB().Reader().
		Where("transaction_date >= ? AND transaction_date < ?", from, to).
		Order("transaction_date ASC").
		Find(&transactions).Error
	if err != nil {
		return nil, fmt.Errorf("FindByMonth: %w", err)
	}
	return transactions, nil
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
