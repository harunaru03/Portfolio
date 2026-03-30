package time

import "time"

// GetLocationJST は日本標準時のロケーションを返します。
func GetLocationJST() *time.Location {
	return time.FixedZone("Asia/Tokyo", 9*60*60)
}

// NowJST は日本標準時の現在時刻を返します。
func NowJST() time.Time {
	return time.Now().In(GetLocationJST())
}
