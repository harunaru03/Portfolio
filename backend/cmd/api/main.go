package main

import (
	"fmt"
	"net/http"
	"os"

	"household/internal/activate"
	"household/internal/handler" // AppContextのために追加
	"household/internal/platform/db"
	"household/internal/platform/env" // 設定読み込みのために追加
	"household/internal/platform/log"

	"github.com/gin-gonic/gin"
)

func main() {
	conf := env.New()
	logger := log.New()
	dbClient := db.New(logger, conf)

	if err := dbClient.Connect(); err != nil {
		fmt.Printf("DB connection failed: %v\n", err)
		os.Exit(1)
	}

	// 各ハンドラーに配るための共通コンテキスト
	appCtx := handler.NewAppContext(logger, dbClient)

	boot := gin.Default()

	// ヘルスチェック
	boot.GET("/health", func(c *gin.Context) {
		// すでに接続済みのreaderを使うので爆速です
		if err := appCtx.DB().Reader().Exec("SELECT 1").Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		c.Status(http.StatusOK)
	})

	activate.ResolveMiddleware(boot, appCtx)
	activate.ResolveAPI(boot, appCtx)

	fmt.Println("🚀 API is running on port 8080")
	_ = boot.Run(":8080")
}
