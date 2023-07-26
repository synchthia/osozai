# Osozai

- /

  - トップページ (最近追加されたやつとか出せたらいいよね)

- /folders/{path}

  - いい感じにツリービューで表示される (GitHub のアレみたいな感じ)
  - params の解釈のアレがアレなので `/folders/*` にしておく

- /search?s={string}&page={page}
  - 検索できるやつ

## Sozai のレスポンス例

- SE のパスは `namespaces` の 0 インデックス目から取得可能
  - (とはいえ、必ず 0 インデックスに存在するのを期待するのはどうだろうか。)

```json
[
  {
    "names": ["150kmh", "9Do0G/150kmh"],
    "namespaces": ["9Do0G"],
    "url": "https://sozai.dev/9Do0G/150kmh.mp3",
    "id": "150kmh",
    "path": "9Do0G/150kmh.mp3",
    "hash": "1eae07a4da0b5712f23eb1dfb9783fc6ebf3343e"
  }
]
```

### フォルダの場合

- /windows
  - /win11
  - ~.mp3

### PathLength の振る舞い

#### 変数の振る舞い

```
同じ階層のファイルを取りたいときは、同じパスから始まっていて、pathLen === sozaiPathLen

# /
- pathLen: 0
- sozaiPathLen: 0 (1-1)

# valorant/
- pathLen: 1
- sozaiPathLen: 1 (2-1)

# valorant/sage/
- pathLen: 2
- sozaiPathLen: 2 (3-1)

```

#### メモ

```
"/".split('/').filter((e)=>e!="").length
0
// ファイル: pathをsplitして1 (-1で0)
// フォルダ: pathをsplitして2 (-1で1)

// ひつようなもの
path: "valorant/valorant.mp3"
path: "others/~~~/hoge.mp3"
全フォルダの1項目目(splitして0)

"valorant/".split('/').filter((e)=>e!="").length
1

"valorant/sage".split('/').filter((e)=>e!="").length
2
```

#### windows/ 内のオブジェクト

```json
{
  "names": ["win_error", "windows/win_error"],
  "namespaces": ["windows"],
  "url": "https://sozai.dev/windows/win_error.mp3",
  "id": "win_error",
  "path": "windows/win_error.mp3",
  "hash": "f170e35feec41b38be0386f280a0876c9f88dbc3"
}
```

#### windows/win11/ 内のオブジェクト

namespaces の 1 つ目が指定されたパスならそのフォルダ

```json
{
  "names": ["win11_alarm01", "windows/win11/win11_alarm01"],
  "namespaces": ["windows/win11", "windows"],
  "url": "https://sozai.dev/windows/win11/win11_alarm01.mp3",
  "id": "win11_alarm01",
  "path": "windows/win11/win11_alarm01.mp3",
  "hash": "69bb98a08a9a9a1bd7e6fe1447206b2bc2e9d6c7"
}
```
