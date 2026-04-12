-- カテゴリマスターテーブル
-- 将来的にアイコンURLや色の設定を増やせるよう、独立させておきます
CREATE TABLE categories (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL UNIQUE,                      -- 「食費」「日用品」など（重複禁止）
    type       VARCHAR(10)  NOT NULL CHECK (type IN ('expense', 'income')), -- 支出 or 収入
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE                           -- GORMの論理削除用
);

-- 家計簿トランザクションテーブル（支出・収入を統合）
CREATE TABLE transactions (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(100) NOT NULL,
    amount           NUMERIC(12, 2) NOT NULL,                     -- 小数点以下2桁まで。お金の計算に必須
    type             VARCHAR(10)  NOT NULL CHECK (type IN ('expense', 'income')), -- 支出 or 収入
    category_id      INTEGER NOT NULL,
    transaction_date DATE NOT NULL,                               -- 時分秒を含まない「決済日」
    payment_method   VARCHAR(50),                                 -- 支払い方法（現金、クレジットカードなど）
    memo             TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at       TIMESTAMP WITH TIME ZONE,                    -- GORMの論理削除用

    -- 外部キー制約：存在しないカテゴリIDの登録を防ぐ
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT                                        -- カテゴリが使われている間は削除不可にする安全策
);

-- インデックス
-- 日付範囲での集計（「先月の支出」など）用
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);
-- カテゴリごとの集計用
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
-- 支出・収入の種別での絞り込み用
CREATE INDEX idx_transactions_type ON transactions(type);
