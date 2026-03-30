package db

import (
	"fmt"

	"household/internal/platform/env"
	"household/internal/platform/log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Client はDB接続とロガー、設定を管理します。
type Client struct {
	writer *gorm.DB
	reader *gorm.DB
	tx     *gorm.DB
	logger *log.Log
	env    *env.Env
}

// New はDBクライアントのコンストラクタです。
func New(l *log.Log, e *env.Env) *Client {
	return &Client{
		logger: l,
		env:    e,
	}
}

// Connect はDB接続を行います。
func (c *Client) Connect() error {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo",
		c.env.GetDBHost(),
		c.env.GetDBUser(),
		c.env.GetDBPassWord(),
		c.env.GetDBName(),
		c.env.GetDBPort(),
	)

	// Writer用の接続
	w, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		c.logger.Error(log.Args{
			Message:    "Writerへの接続に失敗しました。",
			StackTrace: err.Error(),
		})

		return err
	}
	c.writer = w

	// Reader用の接続
	r, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		c.logger.Error(log.Args{
			Message:    "Readerへの接続に失敗しました。",
			StackTrace: err.Error(),
		})
		return err
	}
	c.reader = r

	return nil
}

// Writer は書き込み用の接続を提供します。
func (c *Client) Writer() *gorm.DB {
	if c.tx != nil {
		return c.tx
	}
	return c.writer
}

// Reader は読み取り用の接続を提供します。
func (c *Client) Reader() *gorm.DB {
	if c.tx != nil {
		return c.tx
	}

	return c.reader
}

// Begin はトランザクションを開始し、新しいClientを返します。
func (c *Client) Begin() (*Client, error) {
	tx := c.writer.Begin()
	if tx.Error != nil {
		return nil, tx.Error
	}
	return &Client{
		writer: c.writer,
		reader: c.reader,
		logger: c.logger,
		env:    c.env,
		tx:     tx,
	}, nil
}

// Commit はトランザクションをコミットします。
func (c *Client) Commit() error {
	return c.tx.Commit().Error
}

// Rollback はトランザクション内でロールバックを実行します。
func (c *Client) Rollback() error {
	return c.tx.Rollback().Error
}
