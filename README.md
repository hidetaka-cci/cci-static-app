# CCI Static App

HonoXを使用した静的サイト生成（SSG）プロジェクトです。GitHub Pagesにデプロイ可能な静的サイトを構築できます。

## 技術スタック

- **HonoX**: Honoベースのメタフレームワーク
- **Vite**: ビルドツール
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **TypeScript**: 型安全な開発

## プロジェクト構成

```
cci-static-app/
├── app/
│   ├── routes/          # ファイルベースルーティング
│   │   ├── index.tsx    # トップページ
│   │   ├── _404.tsx     # 404エラーページ
│   │   └── _error.tsx   # エラーページ
│   ├── islands/         # Islands Architecture用のコンポーネント
│   │   └── counter.tsx  # クライアントサイドで動作するコンポーネント
│   ├── client.ts        # クライアントエントリーポイント
│   ├── server.ts        # サーバーエントリーポイント
│   └── style.css        # グローバルスタイル
├── public/              # 静的ファイル
├── vite.config.ts       # Vite設定
└── package.json         # 依存関係とスクリプト
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数（必要に応じて）

環境変数が必要な場合は、`.env` ファイルを作成してください。

## 開発

### ローカル開発サーバーの起動

開発モードでサーバーを起動します。ホットリロードが有効で、変更が自動的に反映されます。

```bash
npm run dev
```

開発サーバーは通常 `http://localhost:5173` で起動します。

### 開発時の注意点

- ファイルベースルーティング: `app/routes/` 配下のファイルが自動的にルートとして認識されます
- Islands Architecture: `app/islands/` 配下のコンポーネントはクライアントサイドでハイドレーションされます
- ホットリロード: ファイルを保存すると自動的にブラウザが更新されます

## ビルド

### 静的サイトの生成

プロダクション用の静的サイトをビルドします。

```bash
npm run build
```

ビルドが完了すると、`dist` フォルダに静的なHTMLファイルが生成されます。

### ビルド後のプレビュー

ビルドした静的サイトをローカルでプレビューできます。

```bash
npm run preview
```

プレビューサーバーが起動し、ビルドされたサイトを確認できます。通常は `http://localhost:4173` でアクセスできます。

### ビルド出力の確認

ビルド後、以下のディレクトリにファイルが生成されます：

- `dist/`: 静的HTMLファイルとアセット

生成されたファイルを確認して、期待通りの出力になっているか確認してください。

## デプロイ

### GitHub Pagesへのデプロイ

このプロジェクトはCircleCIを使用して自動デプロイが設定されています。

#### 1. CircleCIの設定

1. CircleCIのダッシュボードでプロジェクトをGitHubリポジトリに接続します
2. プロジェクト設定で以下の環境変数を設定します：
   - `GITHUB_TOKEN`: GitHub Personal Access Token（`repo` スコープが必要）

#### 2. GitHubリポジトリの設定

1. GitHubリポジトリの **Settings > Pages** を開きます
2. **Build and deployment > Source** を **「Deploy from a branch」** に設定し、**Branch** を `gh-pages` に設定します

#### 3. 自動デプロイ

`main` ブランチにプッシュすると、自動的にビルドとデプロイが実行されます。

```bash
git push origin main
```

#### 4. デプロイの確認

CircleCIのワークフローが完了すると、以下のURLでサイトにアクセスできます：

```
https://<ユーザー名>.github.io/cci-static-app/
```

### 手動デプロイ

CircleCIを使わずに手動でデプロイする場合：

1. ビルドを実行: `npm run build`
2. `gh-pages` ブランチにビルド成果物をデプロイ:
   ```bash
   npx gh-pages -d dist
   ```

## ルーティング

HonoXはファイルベースルーティングを採用しています。

- `app/routes/index.tsx` → `/`
- `app/routes/about.tsx` → `/about`
- `app/routes/posts/[id].tsx` → `/posts/:id` (動的ルート)

## Islands Architecture

HonoXはIslands Architectureを採用しており、静的サイトでもインタラクティブなUIを実現できます。

- `app/islands/` 配下のコンポーネントはクライアントサイドでハイドレーションされます
- 例: `app/islands/counter.tsx` はカウンター機能を提供します

## スタイリング

このプロジェクトではTailwind CSSを使用しています。

- ユーティリティクラスを使用してスタイリング
- `app/style.css` でグローバルスタイルを定義可能

## トラブルシューティング

### ビルドエラーが発生する場合

1. 依存関係が正しくインストールされているか確認: `npm install`
2. Node.jsのバージョンを確認（推奨: Node.js 20以上）
3. エラーメッセージを確認して、必要な設定を追加

### プレビューでアセットが読み込まれない場合

- `vite.config.ts` の `base` パス設定を確認してください
- 開発時は `/`、本番時は `/cci-static-app/` に設定されています

### GitHub Pagesでアセットが読み込まれない場合

- リポジトリ名が `cci-static-app` と一致しているか確認
- `vite.config.ts` の `base` パスが正しく設定されているか確認
- CircleCIのワークフローでビルド出力ディレクトリ（`dist`）が正しいか確認
- `gh-pages` ブランチに正しくデプロイされているか確認

## ライセンス

このプロジェクトのライセンス情報をここに記載してください。

