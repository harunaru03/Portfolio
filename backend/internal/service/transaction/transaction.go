package transaction

import (
	"errors"

	"gorm.io/gorm"

	categoryDomain "household/internal/domain/category"
	domain "household/internal/domain/transaction"
	"household/internal/platform/appctx"
	"household/internal/platform/log"
)

// ErrCategoryNotFound はカテゴリが存在しない場合のエラーです。
var ErrCategoryNotFound = errors.New("category not found")

// ErrCategoryTypeMismatch はカテゴリのtypeと収支データのtypeが一致しない場合のエラーです。
var ErrCategoryTypeMismatch = errors.New("category type mismatch")

// Service は支出に関するビジネスロジックを定義するインターフェースです。
type Service interface {
	GetAll() ([]domain.Transaction, error)
	Create(e domain.Transaction) (*domain.Transaction, error)
}

// TransactionService は Service を実装する構造体です。
type TransactionService struct {
	Context      appctx.AppCtx
	Repo         domain.Repository
	CategoryRepo categoryDomain.Repository
}

// GetAll は支出一覧を取得します。
// TODO: 仮実装なのでフロントエンドが収支一覧画面を作成するときに本実装予定
func (e *TransactionService) GetAll() ([]domain.Transaction, error) {
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
func (e *TransactionService) Create(t domain.Transaction) (*domain.Transaction, error) {
	// カテゴリ存在チェック
	category, err := e.CategoryRepo.FindByID(t.CategoryID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrCategoryNotFound
		}
		e.Context.Log().Error(log.Args{
			Message:    "カテゴリ取得に失敗しました。",
			StackTrace: err.Error(),
		})
		return nil, err
	}

	// カテゴリtypeとトランザクションtypeの整合性チェック
	if category.Type != t.Type {
		return nil, ErrCategoryTypeMismatch
	}

	result, err := e.Repo.Create(t)
	if err != nil {
		e.Context.Log().Error(log.Args{
			Message:    "収支データの登録に失敗しました。",
			StackTrace: err.Error(),
		})
		return nil, err
	}
	return result, nil
}
