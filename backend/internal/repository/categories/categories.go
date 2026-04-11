package categories

import (
	"golang.org/x/xerrors"

	domain "household/internal/domain/categories"
	"household/internal/platform/appctx"
)

// CategoryRepository はカテゴリのDB操作を担う構造体です。
type CategoryRepository struct {
	Context appctx.AppCtx
}

// FindAll はカテゴリ一覧を取得します。
func (c *CategoryRepository) FindAll() ([]domain.Category, error) {
	var res []domain.Category

	// データ取得
	err := c.Context.DB().Reader().
		Select("id, name").
		Table("categories").
		Where("deleted_at IS NULL").
		Find(&res).Error

	if err != nil {
		return nil, xerrors.Errorf("FindAll: %w", err)
	}

	return res, nil
}
