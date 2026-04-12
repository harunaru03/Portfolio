package activate

import (
	"household/internal/platform/appctx"

	"github.com/gin-gonic/gin"
)

// ResolveMiddleware は共通のミドルウェアを登録します。
func ResolveMiddleware(e *gin.Engine, ctx appctx.AppCtx) {

	// 1. カスタムコンテキストの注入
	e.Use(func(c *gin.Context) {
		c.Set("appCtx", ctx)
		c.Next()
	})

	// 2. CORS設定
	e.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// ブラウザからのプリフライトリクエスト (OPTIONS) を受け流す
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // No Content で即座にレスポンス
			return
		}

		c.Next()
	})
}
