-- カテゴリマスターテーブル
-- 将来的にアイコンURLや色の設定を増やせるよう、独立させておきます
CREATE TABLE categories (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL UNIQUE, -- 「食費」「日用品」など（重複禁止）
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE      -- GORMの論理削除用
);

-- 家計簿トランザクションテーブル
CREATE TABLE households (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(100) NOT NULL,
    amount           NUMERIC(12, 2) NOT NULL, -- 小数点以下2桁まで。お金の計算に必須
    category_id      INTEGER NOT NULL,
    transaction_date DATE NOT NULL,           -- 時分秒を含まない「決済日」
    memo             TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at       TIMESTAMP WITH TIME ZONE, -- GORMの論理削除用

    -- 外部キー制約：存在しないカテゴリIDの登録を防ぐ
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT -- カテゴリが使われている間は削除不可にする安全策
);

-- 収入テーブル
CREATE TABLE incomes (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(100) NOT NULL, -- 例：「3月分給与」「メルカリ売上」
    amount           NUMERIC(12, 2) NOT NULL,
    source           VARCHAR(50),           -- 収入源（給与、副業、お祝いなど）
    transaction_date DATE NOT NULL,           -- 入金日
    memo             TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at       TIMESTAMP WITH TIME ZONE
);

-- インデックス（検索を爆速にする）
-- 日付範囲での集計（「先月の支出」など）用
CREATE INDEX idx_households_transaction_date ON households(transaction_date);
-- カテゴリごとの集計用
CREATE INDEX idx_households_category_id ON households(category_id);
-- 入金日での検索・ソートを高速化
CREATE INDEX idx_incomes_transaction_date ON incomes(transaction_date);
