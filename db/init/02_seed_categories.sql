INSERT INTO categories (name) VALUES
	('食費'),
	('交通費'),
	('日用品費'),
	('家賃'),
	('医療費'),
	('被服費'),
	('娯楽費'),
	('交際費'),
	('水道光熱費'),
	('通信費'),
	('その他')
ON CONFLICT (name) DO NOTHING;
