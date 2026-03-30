package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Body はレスポンスボディを表す構造体です。
type Body struct {
	Status  int    `json:"status"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

// sendError はパッケージ内部でのみ使用する共通レスポンス処理です。
func sendError(c *gin.Context, code int, message string) {
	c.AbortWithStatusJSON(code, Body{
		Status:  code,
		Message: message,
	})
}

// Success は200 OKと 標準データを返します。
func Success(c *gin.Context, data any) {
	c.JSON(http.StatusOK, Body{
		Status: http.StatusOK,
		Data:   data,
	})
}

// Created は 201 Created を返します（新規作成時）。
func Created(c *gin.Context, data any) {
	c.JSON(http.StatusCreated, Body{
		Status: http.StatusCreated,
		Data:   data,
	})
}

// InternalServerError は 500: システムエラーを返します。
func InternalServerError(c *gin.Context) {
	sendError(c, http.StatusInternalServerError, "サーバ内部で予期せぬエラーが発生しました。時間をおいて再度お試しください。")
}

// BadRequest は 400: 入力エラーを返します。
func BadRequest(c *gin.Context) {
	sendError(c, http.StatusBadRequest, "入力内容に不備があります。確認して再度送信してください。")
}

// NotFound は 404: リソース不在を返します。
func NotFound(c *gin.Context) {
	sendError(c, http.StatusNotFound, "指定されたリソースが見つかりませんでした。")
}

// Unauthorized は 401: 認証エラーを返します。
func Unauthorized(c *gin.Context) {
	sendError(c, http.StatusUnauthorized, "認証に失敗しました。ログインし直してください。")
}

// Forbidden は 403: 権限エラーを返します。
func Forbidden(c *gin.Context) {
	sendError(c, http.StatusForbidden, "この操作を行う権限がありません。")
}
