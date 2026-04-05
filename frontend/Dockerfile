FROM node:26-alpine

# OSレベルのパッケージを最新に更新して脆弱性を最小化
RUN apk update && apk upgrade

WORKDIR /app

# 依存関係のインストール（キャッシュを利用）
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Viteの開発用ポート
EXPOSE 3000

# Viteを起動。--host 0.0.0.0 はコンテナ外からのアクセスに必須
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
