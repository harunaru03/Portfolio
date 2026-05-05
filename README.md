# Household Account Book App (Portfolio Project)

就職活動のポートフォリオ用に実装する、シンプルかつ堅牢な設計を目指したローカルで動く家計簿アプリケーションです。
実務レベルを意識したディレクトリ構成とデザインパターンを採用しています。

## 🚀 プロジェクトの概要
- **バックエンド:** Go (Gin) によるREST APIの実装
- **フロントエンド:** Vanilla JSを用いたMVCパターンによる実装
- **インフラ:** Docker / Docker Compose によるコンテナ化
- **データベース:** PostgreSQL

## 🏗 アーキテクチャ

本プロジェクトでは、小規模開発において保守性と拡張性を両立させるため、以下の設計パターンを採用しています。
また、今回は開発規模、AIツールとの親和性の観点からモノレポ方式を採用します。

### バックエンド (3-Layer Architecture)
関心の分離は徹底しつつ、アプリのシンプルさに合わせて今回はDDDの要素を取り入れた3層アーキテクチャで実装します。
また、開発規模を考慮し、今回はモジュール単位ではなくデザインパターンの層ごとにパッケージを分割します。
- **Handler (Presentation Layer):**
  - HTTPリクエストの受付、バリデーション、JSONレスポンスの返却（Ginに依存）。
- **Service (Logic Layer):**
  - ドメイン知識に基づくビジネスロジック（収支計算、予算判定など）の実行。
  - 後述する `Domain` 層の Interface を介してリポジトリを呼び出すことで、特定のDB実装に依存しない設計としています。
- **Repository (Infrastructure Layer):**
  - データベース（PostgreSQL）への具体的なデータ操作（SQL実行）。
- **Domain (Domain Layer):**
  - **Entity:** 各層で共有されるデータ構造（構造体）。
  - **Interface:** リポジトリが備えるべきメソッドの定義。これにより、ビジネスロジックとDB実装の疎結合を実現しています。

### フロントエンド (MVC Pattern)
フレームワークを使用せず、Vanilla JSで保守性の高いコードを書くためにMVCパターンを採用しました。
- **Model:** API通信（Fetch API）とデータ状態の管理
- **View:** DOM操作、UIのレンダリング、イベントリスナーの設置
- **Controller (app.js):** ユーザー操作に応じたModelとViewの仲介（司令塔）

## 📁 ディレクトリ構成

```
.
├── docker-compose.yml         # 全コンテナの起動定義
├── backend/                   # Go (Gin) API Project
│   ├── cmd/api/main.go        # エントリポイント
│   ├── internal/              # 外部非公開のコアロジック
│   │   ├── handler/           # Controller層
│   │   ├── service/           # Logic層
│   │   ├── repository/        # Data Access層
│   │   └── model/             # Entity
│   ├── pkg/                   # 共通ライブラリ（DB接続など）
│   ├── Dockerfile
│   └── go.mod
├── frontend/                  # Vanilla JS (MVC Pattern)
│   ├── index.html             # メインレイアウト
│   ├── style.css              # スタイル定義
│   ├── js/
│   │   ├── app.js             # Controller: 全体の交通整理
│   │   ├── models/            # Model: データ・API通信管理
│   │   └── views/             # View: 表示・DOM操作管理
│   └── Dockerfile
└── db/                        # Database
    └── init/                  # 初期化用SQLスクリプト
```

## 👨‍💻 開発メンバー
- @rysakamo
 - 担当: バックエンド開発(Go/Gin)、 DB設計(PostgreSQL)、インフラ構築(Docker)
- @harunaru03
 - 担当: フロントエンド開発(Vue,Javascript)、UI/UXデザイン
