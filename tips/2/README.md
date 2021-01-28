# 【TIPS#2】 アンドロイドスマホ上のLinuxにターミナルで接続してみよう


## はじめに

みなさん、こんにちは。

前回はアンドロイドスマホに[Termux](#関連情報へのリンク)をインストールして、`Linux`と`Python`の環境を導入しました。

今回はPCのターミナルソフトから、アンドロイドスマホ上のLinuxに接続し、アンドロイドスマホが簡単な開発環境として利用可能になることを示します。

ところで、`Termuxでインストールしたアンドロイドスマホ上のLinux環境`と毎回書くのは大変なので今後は **[Termux端末](#用語)** と表記します。

[Termux](#関連情報へのリンク)のインストールなど終わってない方は、前回の記事をご覧ください。


## PC側OSの要件

以下のバージョン以上をご用意ください。

- Microsoft Windows 10 20H2
- macOS 10.15
- Ubuntu 20.04

実際の説明は`Windows 10`のみ行います。macOSやUbuntuなどのUNIX系OSを利用されている方にとっては、普通のオペレーションですので割愛します。


## PCからTermux端末にSSH接続するための準備



### パッケージのアップデートと必要最低限のインストール

[Termux端末](#用語)で次の作業を行います。

`$`や`>`はプロンプトを表現しています。タイプしないでください。

それぞれ別にタイプして実行します。

```
$ pkg upgrade
```
```
$ apt update
```

`git`、`openssh`、`nmap`をインストールします。

```
$ pkg install -y git openssh nmap
```

`-y`オプションは、インストール内容を確認せず、即座にインストールします。 `-y`オプションを指定しなければ、インストール内容が表示され、インストールするかどうかを確認されます。

### SSHDを起動する

通常のLinux環境と違い、Termuxでは　SSHDなどのサービスを自動起動させることができません。そのため、手動で毎回起動する必要があります。

```
$ sshd
```

### ユーザ名の確認

[Termux端末](#用語)で次の作業を行います。

```
$ whoami
```

結果

```
u0_a182
```

この場合、ユーザ名が`u0_a182`とわかりましたのでメモしておきます。後で使います。

### パスワードの設定

初期状態ではパスワードが設定されていないので、パスワードを設定します。

```
$ passwd u0_a182
New password:
Retype new password:
New password was successfully set.
```

### Termux端末のIPアドレスを確認します

Termux端末で次のコマンドをタイプしてください。

```
$ ip -4 a | grep inet
```

結果

```
    inet 127.0.0.1/8 scope host lo
    inet 192.168.1.2/24 brd 192.168.1.255 scope global wlan0  <-- このアドレス
```

上記の結果では、[Termux端末](#用語) のIPアドレスは`192.168.1.2`です。これもメモしておきます。後で使います。

### SSHのポート番号の確認をします。

```
$ nmap localhost
```

結果

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-01-28 18:20 +08
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0036s latency).
Not shown: 999 closed ports
PORT     STATE SERVICE
8022/tcp open  oa-system  <-- このポート

Nmap done: 1 IP address (1 host up) scanned in 0.83 seconds
```

この結果では `8022`がSSHのポート番号となります。


## 接続の確認

ここまでにメモしてきた、Termux端末の接続に必要な情報を使って、PCのターミナル（Windows Terminal）で次のようにコマンドをタイプして実行します。

```
PS C:\Users\USER> ssh u0_a182@192.168.1.2 -p 8022
```

結果

```
u0_a182@192.168.1.2's password:

Welcome to Termux!

Wiki:            https://wiki.termux.com
Community forum: https://termux.com/community
Gitter chat:     https://gitter.im/termux/termux
IRC channel:     #termux on freenode

Working with packages:

 * Search packages:   pkg search <query>
 * Install a package: pkg install <package>
 * Upgrade packages:  pkg upgrade

Subscribing to additional repositories:

 * Root:     pkg install root-repo
 * Unstable: pkg install unstable-repo
 * X11:      pkg install x11-repo

Report issues at https://termux.com/issues
```

SSHによる接続が正常であれば、上記のように表示されます。


## エディタのインストール

設定ファイルや簡単なコードが書けるようにエディタをインストールしましょう。

ここでは`vim`や`nano`をインストールします。vimは最初はとっつきにくいエディタですが、使えるようになっておくと非常に便利です。

せっかくなので、TermuxにアクセスしたPCのターミナル上で実行してみましょう。

```
pkg install vim nao
```

## Pythonコードの実行

```python
$ cat hello.py
message = "hello world"
print(message)
```

上記のようなPythonコードをエディタで書いて実行してみます。


```shell
$ python hello.py
hello world
```

## まとめ

いつもアンドロイドスマホのキーボードと小さな画面上で作業するのはつらいですが、PCからターミナルでSSH接続するのでしたら、普通のLinuxサーバーにアクセスするのと変わりません。とても便利ですよね！ これであなたはパーソナルLinuxサーバーをゲットできました！！


アンドロイド上で直接Termuxを使う場合は、

- `Hacker's Keyboard`をインストールして、キーボードを切り替える
- Bluetooth対応の外部キーボードを利用する

をなどタイプしやすくなるよう検討してみてください。

安い中古のアンドロイドスマホを購入して、Linuxサーバーとして利用すれば、Raspbery Piを新しく買うよりもよいかもしれません。
通信系はもちろん、いろんなセンサーが最初からビルトインされているので、とてもコスパが良いと思います。

さて、次回はVSCodeから[Termux端末](#用語)のLinuxにアクセスして、Pythonプログラムを書き、デバッグしてみます。
また、SSH秘密鍵公開鍵のペアの作成、接続に関する設定ファイルについても説明します。

おたのしみに。

## 関連情報へのリンク

- [【TIPS#1】 アンドロイドスマホにLinuxとPythonを導入してみよう](https://nemlog.nem.social/blog/54849)
- [Termux公式サイト（英語）](https://termux.com/)
- [Termux Wiki](https://wiki.termux.com/wiki/Main_Page)
- [Termux - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.termux&hl=ja)
- [Windows Terminal を入手 - Microsoft Store ja-JP](https://www.microsoft.com/ja-jp/p/windows-terminal/9n0dx20hk701?cid=msft_web_chart&activetab=pivot:overviewtab)


## 用語

Termux端末とは、TermuxでインストールしたLinuxが稼働中のアンドロイドスマホの事です。


Termuxは、Androidターミナルエミュレーターであり、最小構成のLinux環境アプリです。

