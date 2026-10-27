// Hands an enrollment token from this web page to the Seraphic Mobile Browser app.
// The token comes from this page's own address (?token=<uuid>&region=<env>), so no token
// is stored in this repository. Chrome on Android only hands a link to an app when a person
// taps it, which is why activation is a button and not an automatic redirect.
(function () {
  var PACKAGE = 'com.crowdstrike.seraphicenterprisebrowser.mobilebrowser';
  var SCHEME = 'seraphicbrowser';
  var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  var REGION = /^[a-z0-9-]{2,20}$/i;

  // Accept the code from the query string or the fragment (#token=...&region=...).
  var params = new URLSearchParams(window.location.search);
  if (!params.get('token') && window.location.hash.length > 1) {
    params = new URLSearchParams(window.location.hash.slice(1));
  }
  var token = (params.get('token') || params.get('t') || '').trim();
  var region = (params.get('region') || params.get('r') || 'us2').trim();

  function show(id) { document.getElementById(id).hidden = false; }

  if (!UUID.test(token) || !REGION.test(region)) {
    show('missing');
    return;
  }

  var query = 'token=' + encodeURIComponent(token) + '&region=' + encodeURIComponent(region);

  if (/Android/i.test(navigator.userAgent)) {
    // intent:// tells Chrome which app to open; if it is not installed, Chrome opens its Play page.
    document.getElementById('open-intent').href =
      'intent://activate?' + query + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE + ';end';
    // Plain custom-scheme link for browsers other than Chrome.
    document.getElementById('open-scheme').href = SCHEME + '://activate?' + query;
    show('android');
    return;
  }

  var pageUrl = window.location.origin + window.location.pathname + '?' + query;
  document.getElementById('page-url').textContent = pageUrl;
  try {
    var qr = qrcode(0, 'M');
    qr.addData(pageUrl);
    qr.make();
    var img = new Image();
    img.alt = 'QR code for this page';
    img.src = qr.createDataURL(8, 2);
    document.getElementById('qr').appendChild(img);
  } catch (e) {
    document.getElementById('qr').hidden = true;
  }
  show('desktop');
})();
