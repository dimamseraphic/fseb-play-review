# Seraphic Mobile Browser activation page

A static page that lets a Google Play reviewer activate the Android app
`com.crowdstrike.seraphicenterprisebrowser.mobilebrowser` from Chrome.

Open it as `https://dimamseraphic.github.io/fseb-play-review/?token=<activation-uuid>&region=us2`.

- On an Android phone it shows a button that opens the app with
  `seraphicbrowser://activate?token=...&region=...` through an `intent://` link.
- On a computer it shows a QR code and the address to open on the phone.

No token is stored in this repository; it is read from the page address only.

`qrcode.js` is [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 2.0.4 by Kazuhiko Arase, MIT license.
