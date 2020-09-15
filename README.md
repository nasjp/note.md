[![Actions Status](https://github.com/nasjp/note.md/workflows/Node.js%20CI/badge.svg)](https://github.com/nasjp/note.md/actions)

# note.md [WIP]

[note](https://note.com/)でmarkdownを使うためのchrome拡張

```sh
$ npm run install
$ npm run build
# upload dist directory
```

## 使い方

- [x] 見出し

```md
# hoge
<!-- hogeのh入力時に見出しに変換 -->
```

- [x] 太字

```md
**hoge**
<!-- **hoge**末尾**入力時に太字に変換 -->
```

- [x] 中央寄せ
  - markdown記法ではないが下記のように設定

```md
>> hoge
<!-- hogeのh入力時に見出しに変換 -->
```

- [x] リンク

```md
[hoge](https://example.com/)
<!-- (https://example.com/)の)入力時に見出しに変換 -->
```
- [x] 引用

```md
> hoge
<!-- hogeのh入力時に見出しに変換 -->
```

- [x] コード埋め込み

```md
```func hoge() {}
<!-- ```の入力時に以降の入力をコード埋め込みに変換 -->
```

## License

MIT
