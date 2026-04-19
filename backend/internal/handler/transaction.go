package handler

import (
	"household/internal/platform/appctx"
	"household/internal/platform/response"
	expenseRepo "household/internal/repository/transactions"
	expenseSvc "household/internal/service/expenses"

	"github.com/gin-gonic/gin"
)

// ExpenseHandler は支出ハンドラーの構造体です。
type ExpenseHandler struct {
	svc expenseSvc.Service
}

// MountTransactions は支出APIのエンドポイントを定義します。
func MountTransactions(e *gin.Engine, ctx appctx.AppCtx) {
	eh := &ExpenseHandler{
		svc: &Transactionsvc.Transactionservice{
			Repo:    &expenseRepo.ExpenseRepository{Context: ctx},
			Context: ctx,
		},
	}

	e.GET("/api/v1/Transactions", eh.GetTransactions)
	e.POST("/api/v1/Transactions", eh.CreateTransactions)
}

// GetTransactions は支出一覧取得APIのハンドラーです。
func (h *ExpenseHandler) GetTransactions(c *gin.Context) {
	data, err := h.svc.GetAll()
	if err != nil {
		response.InternalServerError(c)
		return
	}
	response.Success(c, data)
}

// CreateExpense は支出作成APIのハンドラーです。
func (h *ExpenseHandler) CreateExpense(c *gin.Context) {
	response.Created(c, nil)
}
