
# Windows 10標準機能でSSH認証用の公開鍵と秘密鍵を作成する方法

## はじめに

Windows10 April 2018 Update(1803)からSSHクライアントが標準で使えるようになっていたので
社内イントラのGitlabにSSHでアクセス出来るように公開鍵と秘密鍵を作成する方法を纏めたメモとなります。

## 環境情報

OS:　Microsoft Windows 10 Pro Update Ver.(1803)

## 作業の流れ

1. SSHが使用できるか確認
2. 公開鍵と秘密鍵を作成
3. SSH構成ファイルの作成と構成


## 1. Windows 10でSSHが使用出来ることを確認

`Windows Tweminal`を起動します。インストールしていない場合は、Microsoft Storeからインストールしてください。

ターミナル上でsshコマンドを入力します。

下記のようなコマンドヘルプが表示されていれば使用可能です。

```powershell
PS C:\Users\USER> ssh
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]

```

## 2. 公開鍵と秘密鍵を作成

次のコマンドにて鍵長が2048以上かつ、暗号化方式が`RSA`の公開鍵と秘密鍵のペアを作成します。

例）

```powershell
PS C:\Users\USER> ssh-keygen.exe -t rsa
```

保存先の入力を求められるので、`.ssh/id_rsa_test`などとします。

この場合、`C:\Users\USER/.ssh/id_rsa_test` に公開鍵と秘密鍵が作成されます。

    Enter file in which to save the key (C:\Users\USER/.ssh/id_rsa): .ssh/id_rsa_test

またパスワード（パスフレーズ）の入力を求められますが、何も入力せずEnterキーをタイプします。

    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:

実行例）

```powershell
PS C:\Users\USER> ssh-keygen.exe -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\USER/.ssh/id_rsa): .ssh/id_rsa_test
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in .ssh/id_rsa_test.
Your public key has been saved in .ssh/id_rsa_test.pub.
The key fingerprint is:
SHA256:D1Z/NkFNfBN5fRhdTLUwaxENYWDPAEptIC+WyTII/6M user@330s
The key's randomart image is:
+---[RSA 2048]----+
|.    . oo..+.OB@@|
|... . * .o. =.*+@|
| ..o * o. .  =..=|
|   .+ .  . ..  . |
|    o   S   . +  |
|   . . . o   o . |
|  E       .      |
|                 |
|                 |
+----[SHA256]-----+
```

公開鍵と秘密鍵が作成できたか確認します。

```
PS C:\Users\USER> dir C:\Users\USER/.ssh/id_rsa_test*


    Directory: C:\Users\USER\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----           21/1/27     17:34           1679 id_rsa_test
-a----           21/1/27     17:34            392 id_rsa_test.pub

```

`id_rsa_test`が秘密鍵、`id_rsa_test.pub`が公開鍵です。無事に作成できていることを確認しました。

ちなみに、秘密鍵と公開鍵はホームディレクトリのトップの`.ssh`というディレクトリに保存することが慣例的に決まっています。

```
Windows 10の場合
C:\Users\ユーザ名/.ssh

Unixの場合
/home/ユーザ名/.ssh
```

## 3. SSH構成ファイルの作成と構成

SSH構成ファイル (~/.ssh/config) を作成して構成すると、ログインを高速化し、SSH クライアントの動作を最適化することができます。
次の例で示す簡単な構成を使うと、既定の`SSH秘密キー`を使って、特定のサーバーにユーザーとしてすばやくサインインできます。
特定のサーバーとは、今回の場合はTermuxをインストールしたアンドロイドスマホを意味します。


SSH構成ファイルにサーバー情報と秘密鍵の設定を行います。

```
Host oppo
    HostName 192.168.1.2
    User u0_a259
    Port 8022
    IdentityFile ~/.ssh/id_rsa
```

## 関連情報へのリンク

- [Windows Terminal を入手 - Microsoft Store ja-JP](https://www.microsoft.com/ja-jp/p/windows-terminal/9n0dx20hk701?cid=msft_web_chart&activetab=pivot:overviewtab)
- [【 ssh-keygen 】コマンド――SSHの公開鍵と秘密鍵を作成する](https://www.atmarkit.co.jp/ait/articles/1908/02/news015.html)
- [SSH config file for OpenSSH client](https://www.ssh.com/ssh/config/)

