Social Tracking JS
======================
GoogleAnalyticsで解析できるソーシャルボタンを設置するJavaScriptライブラリ。  
各ソーシャルのスクリプトを非同期で読み込み、Twitter/Facebookのクリックやシェア状況をGoogleAnalytics
で解析することができるようになります。

対応ソーシャルボタン
------
+   GoogleAnalytics
+   ツイートボタン [Twitter] `解析可`
+   いいねボタン [Facebook] `解析可`
+   Pinボタン [Pinterest]
+   はてブボタン [はてなブックマーク]
 
使い方
------
social-tracking.jsを読み込みます。

    <script src="social-tracking.js"></script>

このままでは使えませんので、socail-tracking.jsをテキストエディタで開きます。  
23行目から45行目の記述がオプション設定になります。

    var SocialTracking = {
        lang: "ja",
        locale: "ja_JP",
        trackid: null,
        appId: null,
        status: true,
        cookie: true,
        xfbml: true,
        domain: location.hostname,
        subdomain: false,
        multidomain: false,
        socialTracking: true,
        position: "foot",
        api: {
            analytics: true,
            facebook: true,
            twitter: true,
            google: true,
            hatena: true,
            pinterest: true
        },
        onload: function() {}
    };


### 簡単な設定例 ###
GoogleAnalyticsのトラッキングIDを「trackid: null」のところにコピーします。

#### 記述例 ####

    var SocialTracking = {
        lang: "ja",
        locale: "ja_JP",
        trackid: "UA-28381001-1",
        (...略)
    };

※トラッキングIDの場所はGoogleAnalyticsのトラッキングコード内にある「UA-○○」の部分です。

    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-28381001-1']);
     
      //略
    </script>

あとは各ソーシャルボタンのHTMLタグを表示したいところに記述するだけです。

#### ソーシャルボタン記述例 ####

    <ul>
        <li><a href="http://b.hatena.ne.jp/entry/http://creatorish.com" class="hatena-bookmark-button" data-hatena-bookmark-title="creatorish -クリエイターイッシュ-" data-hatena-bookmark-layout="simple-balloon" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a></li>
        <li><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://creatorish.com" data-via="creatorish" data-lang="ja">ツイート</a></li>
        <li><div class="plus-one"><div class="g-plusone" data-size="medium"></div></div></li>
        <li><div class="fb-like" data-href="http://creatorish.com" data-send="false" data-layout="button_count" data-width="110" data-show-faces="true" data-font="arial"></div></li>
    </ul>

タグは各ソーシャルのジェネレーターを使うと便利です。
+    <a href="https://developers.facebook.com/docs/reference/plugins/like/" target="_blank">Facebookボタン</a>
+    <a href="https://twitter.com/about/resources/buttons" target="_blank">Twitterボタン</a>
+    <a href="http://b.hatena.ne.jp/guide/bbutton" target="_blank">はてなブックマークボタン</a>
+    <a href="http://www.google.com/intl/ja/+1/button/" target="_blank">Google+1ボタン</a>
+    <a href="http://pinterest.com/about/goodies/erence/plugins/like/" target="_blank">Pinerestボタン</a>

出力されたタグから**<script>(…略)</script>部分を消して貼り付け**てください。

オプション
------

オプションの内容は以下の通りです。
細かい内容は各サービスにお任せしてしまっています。中・上級者向け。

+    lang: [google+]言語設定
+    locale: [facebook]言語設定
+    trackid: [analytics]トラッキングID
+    appId: [facebook]のAppID
+    status: [facebook]ログインステータスを<br>チェックするかどうか
+    cookie: [facebook]cookieによるアクセス許可
+    xfbml:[facebook]XFBMLをパースするかどうか
+    domain: [analytics]解析を取るドメイン
+    subdomain: [analytics]サブドメインをチェックするかどうか
+    multidomain: [analytics]マルチドメインをチェックするかどうか
+    socialTracking: [common]Twitter/FacebookのボタンをGoogleAnalyticsで解析するかどうか
+    position: [common]JSの読み込み位置<br>head: &lt;/head&gt;の前foot: &lt;/body&gt;の前
+    api{...}:  [common]読み込むソーシャルプラグイン。falseにしたものは読み込みません。
+    onload: [common]すべてのJSが読み込み終わったら実行する処理

ライセンス
--------
[MIT]: http://www.opensource.org/licenses/mit-license.php
Copyright &copy; 2012 creatorish.com
Distributed under the [MIT License][mit].

作者
--------
creatorish yuu  
Weblog: <http://creatorish.com>  
Facebook: <http://facebook.com/creatorish>  
Twitter: <http://twitter.jp/creatorish>