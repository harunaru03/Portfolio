package activate

import (
	"household/internal/handler"
	"household/internal/platform/appctx"

	"github.com/gin-gonic/gin"
)

// ResolveAPI は各ドメインのルーティング解決を行います。
func ResolveAPI(e *gin.Engine, ctx appctx.AppCtx) {
	// handler.MountExpenses(e, ctx)
	handler.MountCategories(e, ctx)
}
