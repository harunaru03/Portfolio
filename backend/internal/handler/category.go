package handler

import (
	"github.com/gin-gonic/gin"

	"household/internal/platform/appctx"
	"household/internal/platform/response"
	categoriesRepo "household/internal/repository/category"
	categoriesSvc "household/internal/service/category"
)

// CategoriesHandler はカテゴリハンドラーの構造体です。
type CategoriesHandler struct {
	svc categoriesSvc.Service
}

// MountCategory はカテゴリAPIのエンドポイントを定義します。
func MountCategory(e *gin.Engine, ctx appctx.AppCtx) {
	ch := &CategoriesHandler{
		svc: &categoriesSvc.CategoryService{
			Context: ctx,
			Repo:    &categoriesRepo.CategoryRepository{Context: ctx},
		},
	}

	e.GET("/api/v1/categories", ch.GetCategories)
}

// GetCategories はカテゴリ一覧取得APIのハンドラーです。
func (ch *CategoriesHandler) GetCategories(c *gin.Context) {
	data, err := ch.svc.GetAll()
	if err != nil {
		response.InternalServerError(c)
		return
	}
	response.Success(c, data)
}
