株式会社ゆめみのフロントエンド課題プロジェクト。

## Getting Started
開発モード

```bash
npm run dev
```

テスト

```bash
npm run test
```

ビルド

```bash
npm run build
```

## 構成
本アプリケーションは、SPA(Single Page Application)である。
また、1ページに全てのコンテンツを表示し、ページ遷移を行わない。

しかし、パーツとして分けた方がいいと思われる部分は、コンポーネントとして分けた方が望ましい。
ページは、将来はこのように分けようとしている。

- ページ（下記のコンポーネントを組み合わせたもの）
- 都道府県選択コンポーネント
- 表示切り替えコンポーネント
- 折れ線グラフコンポーネント

RESAS APIを用いるための型及びAPIからの情報取得も、別ファイルとして分ける計画である。

- APIで用いる型の定義
- APIを叩く関数

の2つを作成する予定である。

## 使用技術
下記のようなライブラリ・フレームワークを用いる。
なお、言語はTypeScriptを用いる。

- Next.js
- Recharts(グラフ描画)
- Jest(テスト)

## 開発の進め方
個人開発だが、課題にチーム開発を意識することと書いてあるので、チーム開発を意識した進め方にしたい。
そのため、各機能追加等は、issueを発行し、別途ブランチを切って開発を行うことを前提とする。
ブランチ名は、`issue/番号`か、そのissueが実装しようとするもの（`implement_api`など）とする。
`develop`ブランチなどは、規模から冗長になるだけであり、今回は採用しない。