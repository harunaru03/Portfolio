package activate

import (
	"household/internal/handler"

	"github.com/gin-gonic/gin"
)

// ResolveAPI は各ドメインのルーティング解決を行います。
func ResolveAPI(e *gin.Engine, h handler.ContextIF) {
	// 家計簿ドメインのマウント
	handler.MountHousehold(e, h)
}
