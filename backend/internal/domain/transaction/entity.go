package transaction

import (
	"database/sql/driver"
	"fmt"
	"time"

	"gorm.io/gorm"
)

// Date は YYYY-MM-DD 形式でJSONシリアライズされる日付型です。
type Date struct {
	time.Time
}

func (d Date) MarshalJSON() ([]byte, error) {
	return []byte(`"` + d.Time.Format("2006-01-02") + `"`), nil
}

// Value はdriver.Valuerインターフェースの実装です。DBへの書き込み時にtime.Time型に変換します。
func (d Date) Value() (driver.Value, error) {
	return d.Time, nil
}

// Scan はsql.Scannerインターフェースの実装です。DBからの読み込み時にtime.Time型をDate型に変換します。
func (d *Date) Scan(value any) error {
	t, ok := value.(time.Time)
	if !ok {
		return fmt.Errorf("Date.Scan: expected time.Time, got %T", value)
	}
	d.Time = t
	return nil
}

// Transaction は収支情報を表す構造体です。
type Transaction struct {
	ID              int64          `json:"id"`
	Title           string         `json:"title"`
	Amount          int64          `json:"amount"`
	Type            string         `json:"type"`
	CategoryID      int64          `json:"category_id"`
	TransactionDate Date           `json:"transaction_date"`
	Memo            string         `json:"memo"`
	CreatedAt       time.Time      `json:"-"`
	UpdatedAt       time.Time      `json:"-"`
	DeletedAt       gorm.DeletedAt `json:"-"`
}
