# 残タスクリスト

## 全体

- github actionsによるCIの導入

## Backend

- gomockhandlerの導入
- govulncheckの導入

## Frontend

## DB

- `expenses` / `incomes` テーブルを `transactions` テーブルに統合する
    - `transactions` カラム: `id`, `amount` (NUMERIC), `type` ('expense' or 'income'), `category_id` (FK), `title`, `transaction_date`, `payment_method` (VARCHAR), timestamps
    - `categories` テーブルに `type` カラムを追加し、収入・支出の区別を持たせる（VARCHAR + CHECK制約: `CHECK (type IN ('expense', 'income'))`）
    - 対応する Go 実装: `domain/transactions/`, `repository/transactions/` の作成、`GET /api/v1/transactions` の実装
