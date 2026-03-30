package log

import (
	"fmt"

	"household/internal/platform/time"
)

// Log はロガーの本体です。
type Log struct{}

// New はLog構造体のコンストラクタです。
func New() *Log {
	return &Log{}
}

// Args はログの入力情報です。
type Args struct {
	Message    string
	StackTrace string
}

// Info は標準出力にINFOログを出力します。
func (l *Log) Info(args Args) {
	timestamp := time.NowJST().Format("2006-01-02 15:04:05")
	fmt.Printf("[INFO] [%s] %s\n", timestamp, args.Message)
}

// Error は標準出力にERRORログを出力します。
func (l *Log) Error(args Args) {
	timestamp := time.NowJST().Format("2006-01-02 15:04:05")
	fmt.Printf("[ERROR] [%s] %s\n", timestamp, args.Message)
	fmt.Printf("StackTrace: %s\n", args.StackTrace)
}
