INSERT INTO categories (name, type) VALUES
    ('食費',		'expense'),
    ('交通費',		'expense'),
    ('日用品費',	'expense'),
    ('家賃',		'expense'),
    ('医療費',		'expense'),
    ('被服費',		'expense'),
    ('娯楽費',		'expense'),
    ('交際費',		'expense'),
    ('水道光熱費',	'expense'),
    ('通信費',		'expense'),
    ('給与',		'income'),
    ('副業',		'income'),
    ('臨時収入'		'income')
    ('その他',		'expense'),
    ('その他',		'income')
ON CONFLICT (name) DO NOTHING;
