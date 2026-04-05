package appctx

import (
	"household/internal/platform/db"
	"household/internal/platform/log"
)

// AppCtx はアプリケーション全体で共有するコンテキストのインターフェースです。
type AppCtx interface {
	DB() *db.Client
	Log() *log.Log
}
