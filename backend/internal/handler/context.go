package handler

import (
	"household/internal/platform/appctx"
	"household/internal/platform/db"
	"household/internal/platform/log"
)

// AppContext は appctx.AppCtx を実装する具体的な構造体です。
type AppContext struct {
	logger   *log.Log
	dbClient *db.Client
}

// NewAppContext はAppContextのコンストラクタです。
func NewAppContext(l *log.Log, d *db.Client) appctx.AppCtx {
	return &AppContext{
		logger:   l,
		dbClient: d,
	}
}

// DB はDBクライアントを提供します。
func (h *AppContext) DB() *db.Client {
	return h.dbClient
}

// Log はロガーを提供します。
func (h *AppContext) Log() *log.Log {
	return h.logger
}
