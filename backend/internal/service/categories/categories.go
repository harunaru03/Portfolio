package categories

import (
	domain "household/internal/domain/categories"
	"household/internal/platform/appctx"
	"household/internal/platform/log"
)

// Service はカテゴリに関するビジネスロジックを定義するインターフェースです。
type Service interface {
	GetAll() ([]domain.Category, error)
}

// CategoryService は Service を実装する構造体です。
type CategoryService struct {
	Context appctx.AppCtx
	Repo domain.Repository
}

// GetAll はカテゴリ一覧を取得します。
func (c *CategoryService) GetAll() ([]domain.Category, error) {
	data, err := c.Repo.FindAll()
	if err != nil {
		c.Context.Log().Error(log.Args{
			Message: "[カテゴリ一覧取得API] カテゴリ一覧の取得に失敗しました。",
			StackTrace: err.Error(),
		})
		return nil, err
	}

	return data, nil
}
