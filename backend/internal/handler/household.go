package handler

import (
	"household/internal/platform/response"

	"github.com/gin-gonic/gin"
)

// MountHousehold はGetHouseholdHandlerのエンドポイントを定義します。
func MountHousehold(e *gin.Engine, h ContextIF) {
	e.GET("/household", func(c *gin.Context) {
		GetHouseholdHandler(c, h)
	})
}

// GetHouseholdHandler は家計簿リストを取得するためのハンドラーです。
func GetHouseholdHandler(c *gin.Context, h ContextIF) {
	// 本来は h.DB() を使ってデータ取得
	data := []string{"家賃", "食費", "通信費"}

	response.Success(c, data)
}
