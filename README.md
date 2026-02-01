# 環境構築(20260201)

## Gitのインストール

下記参照。
https://qiita.com/takeru-hirai/items/4fbe6593d42f9a844b1c

## Gitのコマンド

(参考)
https://qiita.com/atsushi101011/items/96054ebbd876e378cac

- `git status`
  -　修正が入っているファイルを確認
- `git log`
  - コミットログの確認 
- `git add {対象ファイル}`
  - commit 対象を確定する 
  - 例: `git add .`
  - 面倒なときは `add` の後ろにドットを配置して、全ファイルをステージングすればよい 
- `git commit -m {コミットメッセージ}`
  - 変更をgit上に保存する
  - 例: `git commit -m "first-commit"`   
- `git push -u origin {ブランチ名}`
  - 例: `git push -u origin main` 
- `git switch -c {新規ブランチ名}`
  - ※すでにブランチが作られている場合は`-c`は不要    
  - 例: `git switch -c develop`
