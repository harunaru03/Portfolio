package categories

import (
	"fmt"

	domain "household/internal/domain/category"
	"household/internal/platform/appctx"
)

// CategoryRepository はカテゴリのDB操作を担う構造体です。
type CategoryRepository struct {
	Context appctx.AppCtx
}

// FindAll はカテゴリ一覧を取得します。
func (c *CategoryRepository) FindAll() ([]domain.Category, error) {
	var res []domain.Category

	err := c.Context.DB().Reader().
		Select("id, name, type").
		Table("categories").
		Where("deleted_at IS NULL").
		Find(&res).Error

	if err != nil {
		return nil, fmt.Errorf("FindAll: %w", err)
	}

	return res, nil
}

// FindByID は指定IDのカテゴリを取得します。
func (c *CategoryRepository) FindByID(id int64) (*domain.Category, error) {
	var res domain.Category

	err := c.Context.DB().Reader().
		Select("id, name, type").
		Table("categories").
		Where("id = ? AND deleted_at IS NULL", id).
		First(&res).Error

	if err != nil {
		return nil, fmt.Errorf("FindByID: %w", err)
	}

	return &res, nil
}
