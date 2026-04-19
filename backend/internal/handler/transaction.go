package handler

import (
	"errors"
	"time"

	"household/internal/platform/appctx"
	"household/internal/platform/response"
	CategoryRepo "household/internal/repository/category"
	TransactionRepo "household/internal/repository/transaction"
	TransactionSvc "household/internal/service/transaction"

	domain "household/internal/domain/transaction"

	"github.com/gin-gonic/gin"
)

// CreateTransactionRequest は収支登録APIのリクエスト構造体です。
type CreateTransactionRequest struct {
	Title           string `json:"title"            binding:"required"`
	Amount          int64  `json:"amount"           binding:"required,gte=1"`
	Type            string `json:"type"             binding:"required,oneof=expense income"`
	CategoryID      int64  `json:"category_id"      binding:"required"`
	TransactionDate string `json:"transaction_date" binding:"required"`
	Memo            string `json:"memo"`
}

// TransactionHandler は支出ハンドラーの構造体です。
type TransactionHandler struct {
	svc TransactionSvc.Service
}

// MountTransaction は支出APIのエンドポイントを定義します。
func MountTransaction(e *gin.Engine, ctx appctx.AppCtx) {
	eh := &TransactionHandler{
		svc: &TransactionSvc.TransactionService{
			Repo:         &TransactionRepo.TransactionRepository{Context: ctx},
			CategoryRepo: &CategoryRepo.CategoryRepository{Context: ctx},
			Context:      ctx,
		},
	}

	e.GET("/api/v1/transactions", eh.GetTransactions)
	e.POST("/api/v1/transactions", eh.CreateTransaction)
}

// GetTransactions は支出一覧取得APIのハンドラーです。
func (h *TransactionHandler) GetTransactions(c *gin.Context) {
	data, err := h.svc.GetAll()
	if err != nil {
		response.InternalServerError(c)
		return
	}
	response.Success(c, data)
}

// CreateTransaction は収支登録APIのハンドラーです。
func (h *TransactionHandler) CreateTransaction(c *gin.Context) {
	var req CreateTransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c)
		return
	}

	date, err := time.Parse("2006-01-02", req.TransactionDate)
	if err != nil {
		response.BadRequestWithMessage(c, "日付は本日以前を選択してください。")
		return
	}

	// 未来日チェック
	if date.After(time.Now().Truncate(24 * time.Hour)) {
		response.BadRequestWithMessage(c, "日付は本日以前を選択してください。")
		return
	}

	t := domain.Transaction{
		Title:           req.Title,
		Amount:          req.Amount,
		Type:            req.Type,
		CategoryID:      req.CategoryID,
		TransactionDate: date,
		Memo:            req.Memo,
	}

	result, err := h.svc.Create(t)
	if err != nil {
		// カテゴリ存在チェックエラー
		if errors.Is(err, TransactionSvc.ErrCategoryNotFound) {
			response.BadRequestWithMessage(c, "存在するカテゴリを選択してください。")
			return
		}
		response.InternalServerError(c)
		return
	}

	response.Created(c, result)
}
