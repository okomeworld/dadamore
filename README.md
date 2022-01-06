# DADAMORE

## 概要

録音した声の感情を分析して可視化するwebアプリです

## DEMO

https://dadamore.pages.dev/

## ローカル環境での起動方法

### Step 1

感情分析機能には株式会社Empathから提供されている、音声感情分析AIのWeb APIを使用しているので、下記URLから新規登録・ログインを行い、API Keyを用意する

https://webempath.net/sign_in

### Step 2

リポジトリ直下に `.env.local` ファイルを作成し、下記のように用意したEmpathのAPI Keyを設定する

```bash
echo "VITE_EMPATH_API_KEY=${YOUR_EMPATH_API_KEY}" > .env.local
```

### Step 3

下記コマンドで起動する

```bash
npm install
npm run build
npm run serve
```

#### 開発モード

`npm run dev` で起動するとAPIリクエストをモックし、ランダムな分析結果を返すようになります
