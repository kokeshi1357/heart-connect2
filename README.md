# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|encrypted_password|string|null: false|
|character|string||
### Association
- has_many :items

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|title|string||
|body|text||
|image|text||
|user_id|bigint|foreign_key: truef|
### Association
- has_many :items

## roomsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|  #ブランドの名前
### Association
- has_many :items

## dmsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|  #ブランドの名前
### Association
- has_many :items

## entriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|  #ブランドの名前
### Association
- has_many :items