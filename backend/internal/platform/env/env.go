package env

import "os"

// Env は環境変数情報を表す構造体です。
type Env struct {
	dbHost     string
	dbUser     string
	dbPassword string
	dbName     string
	dbPort     string
}

// New はEnv構造体のコンストラクタです。
func New() *Env {
	return &Env{
		dbHost:     os.Getenv("DB_HOST"),
		dbUser:     os.Getenv("DB_USER"),
		dbPassword: os.Getenv("DB_PASSWORD"),
		dbName:     os.Getenv("DB_NAME"),
		dbPort:     os.Getenv("DB_PORT"),
	}
}

// GetDBHost は環境変数からDBホストの情報を読み取り返却します。
func (e *Env) GetDBHost() string {
	return e.dbHost
}

// GetDBUser は環境変数からDBユーザーの情報を読み取り返却します。
func (e *Env) GetDBUser() string {
	return e.dbUser
}

// GetDBPassWord は環境変数からDBパスワードの情報を読み取り返却します。
func (e *Env) GetDBPassWord() string {
	return e.dbPassword
}

// GetDBName は環境変数からDB名の情報を読み取り返却します。
func (e *Env) GetDBName() string {
	return e.dbName
}

// GetDBPort は環境変数からDBのポート番号情報を読み取り返却します。
func (e *Env) GetDBPort() string {
	return e.dbPort
}
