# README
## アプリ概要
　心理的または身体的に外で会話を取りづらい患者さんが、情報を発信できたり、似た境遇を持つ方々とコミュニケーションをとれるアプリ。また医療従事者や学生さん向けにも枠を用意した。
### 使用言語/ツール
フレームワーク
- Ruby on Rails

言語
- HTML/CSS
- JavaScript (Jquery)
- Ruby

データベース管理 (テスト/開発環境)
- MySQL

プラットフォーム
- Github

コードエディタ
- Visual Studio Code
### アプリ機能
- 新規登録、ログイン
- ユーザー情報編集
- ブログ投稿 (画像は複数枚可)
- ブログ編集、ゴミ箱
- タグ付け、タグ検索
- コメント、リプライ
- ダイレクトメッセージ

## 制作した理由
　先天的また後天的にも病や怪我を患い、外でのコミュニケーションが難しい方々が世界にはいる。
そのような方々に、ブログという形で人と繋がれる機会を増やし、孤独感を減らそうと製作を決意した。

## 工夫した点
　今回の開発では、javascriptの使用がアプリのデザイン、またユーザビリティ向上にも貢献した。
新規登録やログインページのバリデーションをjavascriptで実装したことで、ユーザーもスムーズに再入力ができるだろう。
複数枚の画像は見やすいようにスライドで表示できる。
　またajax通信の使用はページ遷移の削減を促した。コメント・ダイレクトメッセージは入力後、非同期で更新される。
マイページ画面ではメニューをクリックすると、ページを更新することなく内容は切り替わることができる。

## アプリ画面
アプリホーム
![heart-connect-img1](https://user-images.githubusercontent.com/59188285/78050320-06e37200-73b7-11ea-8bb0-07c44e094334.jpg)

投稿画面
![heart edit](https://user-images.githubusercontent.com/59188285/78051559-d270b580-73b8-11ea-8c1d-54a25d82e2b9.jpg)

投稿詳細
![show msg1](https://user-images.githubusercontent.com/59188285/78052665-64c58900-73ba-11ea-86e6-479876f32ffb.jpg)
![show msg2](https://user-images.githubusercontent.com/59188285/78052722-77d85900-73ba-11ea-9bdf-caddaf157693.jpg)

ダイレクトメッセージ
![heart comment](https://user-images.githubusercontent.com/59188285/78052380-fe406b00-73b9-11ea-80cd-d3ce8e375b55.jpg)

新規登録
![sign heart](https://user-images.githubusercontent.com/59188285/78051612-e74d4900-73b8-11ea-8309-0d83f5d02b1c.jpg)

マイページ画面
![home heart](https://user-images.githubusercontent.com/59188285/78051701-09df6200-73b9-11ea-89d8-4a2d2d610ea5.jpg)
![hiestory heart](https://user-images.githubusercontent.com/59188285/78051774-254a6d00-73b9-11ea-8049-55468926bb6c.jpg)
![profile heart](https://user-images.githubusercontent.com/59188285/78051882-4612c280-73b9-11ea-81a6-9794f71a091f.jpg)

## 現段階の課題
タグの種類が少ないので、今後seed.rbにてタグのバリエーションをさらに増やすだろう。

未だマイページの機能が完成していなく、追加実装が必要である。
以下が現段階でのマイページ機能概要である
- マイページホーム　実装済
- プロフィール　　　実装済
- 設定
- 投稿履歴　　　　　実装済
- 投稿　　　　　　　実装済
- 利用ガイド
- ヘルプ

また、他アプリと本アプリの差別化するポイントは、
- 外でのコミュニケーションが難しい方に向けて製作する
- その方々が似た境遇の方々と繋がれたり、ブログを通じて心地よくアウトプットをできる

である。現段階では基本的なブログの機能が実装されている一方、上記のポイントを反映できているとはいえない。
"同じ境遇の方々と繋がれる" ための新機能追加や、より気持ちよく使用できるためにデザインのブラッシュアップが必要である。

## まとめ
　本アプリは、外でアウトプットや会話が取りづらい病や怪我を持つ方々向けに開発された。
そのような方々がブログアプリというツールを通じて、似た境遇を持つ方と繋がれたり、アウトプットができる。
アプリ機能ではjavascriptを用いて、ページ遷移の削減や動きのあるアプリの製作に繋がった。
今後はマイページ機能の充実や、より使用性の高いデザイン、"同じ境遇の方々と繋がれる" ための新機能追加の実装をしていきたい。


# データベース　テーブル一覧
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|character|string|null: false|
|user_image|string||
|detail|text||
|email|string|null: false|
|encrypted_password|string|null: false|

### Association
- has_many :messages, dependent: :destroy
- has_many :dms, dependent: :destroy
- has_many :entries, dependent: :destroy
- has_many :comments, dependent: :destroy

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|title|string||
|body|text||
|trash_status|integer||
|user_id|bigint|foreign_key: true|
### Association
- has_many :comments, dependent: :destroy
- has_many :msg_categories
- has_many :categories, through: :msg_categories
- has_many :images, dependent: :destroy
- belongs_to :user

## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|img_src|text||
|message_id|bigint|foreign_key: true|
### Association
- mount_uploader :img_src, ImageUploader
- belongs_to :message

## roomsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string||
### Association
- has_many :dms, dependent: :destroy
- has_many :entries, dependent: :destroy

## dmsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|bigint|foreign_key: true|
|room_id|bigint|foreign_key: true|
|content|text||
|image|text||
### Association
- belongs_to :user
- belongs_to :room

## entriesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|bigint|null: false|
|room_id|bigint|null: false|
### Association
- belongs_to :user
- belongs_to :room

## msg_categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|bigint|foreign_key: true|
|category_id|bigint|foreign_key: true|
### Association
- belongs_to :message
- belongs_to :category

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|message_id|integer|null: false|
|user_id|integer|null: false|
|comment_num|integer||
|replied_num|integer||
### Association
- belongs_to :user
- belongs_to :message

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|default: "", null: false|
|ancestry|string||

### Association
- has_many :msg_categories
- has_many :messages, through: :msg_categories
- has_ancestry