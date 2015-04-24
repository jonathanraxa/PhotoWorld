/* BOILDERPLATE CODE FOR HASH CODING */

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

/* END MD5 */



;(function() {
  'use strict';
  
  // Check the existence of module and module.exports to detect node
  var isNode = (typeof module != 'undefined' && typeof module.exports != 'undefined');
  
  function OAuthSignature() {
  }

  OAuthSignature.prototype.generate = function (httpMethod, url, parameters, consumerSecret, tokenSecret, options) {
    var signatureBaseString = new SignatureBaseString(httpMethod, url, parameters).generate();
    var encodeSignature = true;
    if (options) {
      encodeSignature = options.encodeSignature;
    }
    return new HmacSha1Signature(signatureBaseString, consumerSecret, tokenSecret).generate(encodeSignature);
  };

  // Specification: http://oauth.net/core/1.0/#anchor14
  // url: if the scheme is missing, http will be added automatically
  function SignatureBaseString(httpMethod, url, parameters) {
    parameters = new ParametersLoader(parameters).get();
    this._httpMethod = new HttpMethodElement(httpMethod).get();
    this._url = new UrlElement(url).get();
    this._parameters = new ParametersElement(parameters).get();
    this._rfc3986 = new Rfc3986();
  }

  SignatureBaseString.prototype = {
    generate : function () {
      // HTTP_METHOD & url & parameters
      return this._rfc3986.encode(this._httpMethod) + '&'
        + this._rfc3986.encode(this._url) + '&'
        + this._rfc3986.encode(this._parameters);
    }
  };

  function HttpMethodElement(httpMethod) {
    this._httpMethod = httpMethod || '';
  }

  HttpMethodElement.prototype = {
    get : function () {
      return this._httpMethod.toUpperCase();
    }
  };

  function UrlElement(url) {
    this._url = url || '';
  }

  UrlElement.prototype = {
    get : function () {
      // The following is to prevent js-url from loading the window.location
      if (!this._url) {
        return this._url;
      }

      // FIXME: Make this behaviour explicit by returning warnings
      if (this._url.indexOf('://') == -1) {
        this._url = 'http://' + this._url;
      }

      // Handle parsing the url in node or in browser
      var parsedUrl = isNode ? this.parseInNode() : this.parseInBrowser(),
        // FIXME: Make this behaviour explicit by returning warnings
        scheme = (parsedUrl.scheme || 'http').toLowerCase(),
        // FIXME: Make this behaviour explicit by returning warnings
        authority = (parsedUrl.authority || '').toLocaleLowerCase(),
        path = parsedUrl.path || '',
        port = parsedUrl.port || '';

      // FIXME: Make this behaviour explicit by returning warnings
      if ((port == 80 && scheme == 'http')
        || (port == 443 && scheme == 'https'))
      {
        port = '';
      }
      var baseUrl = scheme + '://' + authority;
      baseUrl = baseUrl + (!!port ? ':' + port : '');
      // FIXME: Make this behaviour explicit by returning warnings
      if (path == '/' && this._url.indexOf(baseUrl + path) === -1) {
        path = '';
      }
      this._url =
        (scheme ? scheme + '://' : '')
          + authority
          + (port ? ':' + port : '')
          + path;
      return this._url;
    },
    parseInBrowser : function () {
      return {
        scheme : url('protocol', this._url).toLowerCase(),
        authority : url('hostname', this._url).toLocaleLowerCase(),
        port : url('port', this._url),
        path :url('path', this._url)
      };
    },
    parseInNode : function () {
      var url = require('url'),
        parsedUri = url.parse(this._url),
        scheme = parsedUri.protocol;
      // strip the ':' at the end of the scheme added by the url module
      if (scheme.charAt(scheme.length - 1) == ":") {
        scheme = scheme.substring(0, scheme.length - 1);
      }
      return {
        scheme : scheme,
        authority : parsedUri.hostname,
        port : parsedUri.port,
        path : parsedUri.pathname
      };
    }
  };

  function ParametersElement (parameters) {
    // Parameters format: { 'key': ['value 1', 'value 2'] };
    this._parameters = parameters || {};
    this._sortedKeys = [];
    this._normalizedParameters = [];
    this._rfc3986 = new Rfc3986();
    this._sortParameters();
    this._concatenateParameters();
  }

  ParametersElement.prototype = {
    _sortParameters : function () {
      var key,
        encodedKey;
      for (key in this._parameters) {
        if (this._parameters.hasOwnProperty(key)) {
          encodedKey = this._rfc3986.encode(key);
          this._sortedKeys.push(encodedKey);
        }
      }
      this._sortedKeys.sort();
    },
    _concatenateParameters : function () {
      var i;
      for (i = 0; i < this._sortedKeys.length; i++) {
        this._normalizeParameter(this._sortedKeys[i]);
      }
    },
    _normalizeParameter : function (encodedKey) {
      var i,
        key = this._rfc3986.decode(encodedKey),
        values = this._parameters[key],
        encodedValue;
      values.sort();
      for (i = 0; i < values.length; i++) {
        encodedValue = this._rfc3986.encode(values[i]);
        this._normalizedParameters.push(encodedKey + '=' + encodedValue)
      }
    },
    get : function () {
      return this._normalizedParameters.join('&');
    }
  };

  function ParametersLoader (parameters) {
    // Format: { 'key': ['value 1', 'value 2'] }
    this._parameters = {};
    this._loadParameters(parameters || {});
  }

  ParametersLoader.prototype = {
    _loadParameters : function (parameters) {
      if (parameters instanceof Array) {
        this._loadParametersFromArray(parameters);
      } else if (typeof parameters === 'object') {
        this._loadParametersFromObject(parameters);
      }
    },
    _loadParametersFromArray : function (parameters) {
      var i;
      for (i = 0; i < parameters.length; i++) {
        this._loadParametersFromObject(parameters[i]);
      }
    },
    _loadParametersFromObject : function (parameters) {
      var key;
      for (key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          this._loadParameterValue(key, parameters[key] || '');
        }
      }
    },
    _loadParameterValue : function (key, value) {
      var i;
      if (value instanceof Array) {
        for (i = 0; i < value.length; i++) {
          this._addParameter(key, value[i]);
        }
        if (value.length == 0) {
          this._addParameter(key, '');
        }
      } else {
        this._addParameter(key, value);
      }
    },
    _addParameter : function (key, value) {
      if (!this._parameters[key]) {
        this._parameters[key] = [];
      }
      this._parameters[key].push(value);
    },
    get : function () {
      return this._parameters;
    }
  };

  function Rfc3986() {

  }

  Rfc3986.prototype = {
    encode : function (decoded) {
      if (!decoded) {
        return '';
      }
      // using implementation from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FencodeURIComponent
      return encodeURIComponent(decoded)
        .replace(/[!'()]/g, escape)
        .replace(/\*/g, "%2A");
    },
    decode : function (encoded) {
      if (!encoded) {
        return '';
      }
      return decodeURIComponent(encoded);
    }
  };

  function HmacSha1Signature(signatureBaseString, consumerSecret, tokenSecret) {
    this._rfc3986 = new Rfc3986();
    this._text = signatureBaseString;
    this._key = this._rfc3986.encode(consumerSecret) + '&' + this._rfc3986.encode(tokenSecret);
    this._base64EncodedHash = new HmacSha1(this._text, this._key).getBase64EncodedHash();
  }

  HmacSha1Signature.prototype = {
    generate : function (encode) {
      return encode === false ?
          this._base64EncodedHash :
          this._rfc3986.encode(this._base64EncodedHash);
    }
  };

  function HmacSha1(text, key) {
    // load CryptoJs in the browser or in node
    this._cryptoJS = isNode ? require('crypto-js') : CryptoJS;
    this._text = text || '';
    this._key = key || '';
    this._hash = this._cryptoJS.HmacSHA1(this._text, this._key);
  }

  HmacSha1.prototype = {
    getBase64EncodedHash : function () {
      return this._hash.toString(this._cryptoJS.enc.Base64);
    }
  };

  var oauthSignature = new OAuthSignature();
  oauthSignature.SignatureBaseString = SignatureBaseString;
  oauthSignature.HttpMethodElement = HttpMethodElement;
  oauthSignature.UrlElement = UrlElement;
  oauthSignature.ParametersElement = ParametersElement;
  oauthSignature.ParametersLoader = ParametersLoader;
  oauthSignature.Rfc3986 = Rfc3986;
  oauthSignature.HmacSha1Signature = HmacSha1Signature;
  oauthSignature.HmacSha1 = HmacSha1;

  // support for the browser and nodejs
  if (isNode) {
    module.exports = oauthSignature;
  } else {
    window.oauthSignature = oauthSignature;
  }
})();





/**
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
**/
function SHA1(msg) {
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  function lsb_hex(val) {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  function cvt_hex(val) {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
    break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
    break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}
































// http://flickr.com/services/auth/?api_key=0fd24d9d0411ede9c4d33d4c531bbc16&perms=write&api_sig=47ddcd2305b095f3be2bc2230f07396c

// "http://www.flickr.com/services/auth/?api_key=0fd24d9d0411ede9c4d33d4c531bbc16&perms=write&api_sig=c9383302b56102b8"


/* Global variables used across application */
// var userID; 
// var apiKey = '0fd24d9d0411ede9c4d33d4c531bbc16';
// var myString = 'c9383302b56102b8api_key0fd24d9d0411ede9c4d33d4c531bbc16permswrite';
// //var apiSig = calcMD5(myString); 

// var FROB;
// // var anotherString = 'c9383302b56102b8api_key0fd24d9d0411ede9c4d33d4c531bbc16frob'+FROB+'methodflickr.auth.getToken';
// //var api_sig = SHA1(anotherString);
// var api_sig; 

// // /* We need to get the FROB here */
// $(document).ready(function(){
//   $("#testUser").click(function(){
//     var url = window.location.href; 
//     FROB = url.slice(28, url.length);  
     
//    // alert("FROB: "+ FROB); 
//     convertFROB(FROB);
//     alert("api_sig: "+ api_sig); 

//     //debugger;
//     //window.history.replaceState('object or string', 'Title', 'http://localhost:8888');
    
//     //runAjax(); 
//     // $.ajax('http://flickr.com/services/rest/?method=flickr.auth.getToken&api_key='+apiKey+'&frob='+FROB+'&format=json&nojsoncallback=?&api_sig='+api_sig+'',
    
//     //  //$.getJSON('https://api.flickr.com/services/rest/?method=flickr.auth.getToken&api_key='+apiKey+'&frob='+FROB+'&format=json&nojsoncallback=1&api_sig='+api_sig+'',
//     //  function(data){
//     //    console.log(data); 
//     //  }); 
// $.ajax({
//     url: 'http://flickr.com/services/rest/?method=flickr.auth.getToken&api_key='+apiKey+'&frob='+FROB+'&api_sig='+api_sig+'',
//     dataType: 'jsonp',
//     success: function(results){
//       console.log(results);
//         // var title = results.response.oneforty;
//         // var numTweets = results.response.trackback_total;
//         // $('#results').append(title + ' has ' + numTweets + ' tweets.');
//     }
// });

//     });


//   // });

// // /*  Convert FROB into a token */
// function convertFROB(FROB){
//   alert("FROB TOKEN: " + FROB); 
//   var stringToConvert = 'c9383302b56102b8api_key'+apiKey+'frob'+FROB+'methodflickr.auth.getToken';
//   api_sig = SHA1(stringToConvert); 

//   // this needs a different ENCODING - SHA1!!!
  
//   //return api_sig;
//   }
// }); // end testUser



/* User Authentication Methods */
$(document).ready(function(){

/* Takes user to USER LOGIN at the FLICKR YAHOO page - if NOT already logged in */
	//$('#sign_in').click(function(){
  //   $.getJSON('https://api.flickr.com/services/rest/?method=flickr.auth.oauth.getAccessToken&api_key='+apiKey+'&format=json&nojsoncallback=1&auth_token='+FROB+'&api_sig='+api_sig+'',
  // function(data){
  //   console.log(data); 
  // });



$('#sign_in').click(function(){
      OAuth.initialize('xNHSTIsum9Yfyk4bLHAvkO983Pg');

  $('#sign_in').click(function(){
  OAuth.popup('flickr').done(function(result) {
    console.log(result)
    // do some stuff with result
  });
  })
});







/* Get user ID - Use this to get the user's ID to use for other methods */
  $("#getID").click(function(){
    //var apiKey = '0ecf0a0d645ad3b39ec60d137ebb75a5'; 
    userName = prompt("Please enter your user name");

    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key='+apiKey+'&username='+userName+'&format=json&nojsoncallback=1&auth_token=72157652029604262-c6b720c6caf27458&api_sig=f50405c8f647bcc90f19e7c6cadb4d53',
      function(data){
        userID = (data.user.id); 
        alert(userID); 
      })
  })



/* Testing USER LOGIN - currently NOT in production  */
    $("").click(function(){
    //$("#sign_in").empty(); // empties all the tags there are inside
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.test.login&api_key='+apiKey+'&format=json&nojsoncallback=1&auth_token=72157652053303902-5878d3c4131e4235&api_sig=b736b172694a8fab23cb68851c505287',
    function(data){
      alert(data.stat); 
      
    });
  });




/*
  Return the images from the photoset - user has to know the ID of the photoset prior to using
*/
  $("#photoset").click(function(){
      jQuery('#a-link').remove();   
  
      //jQuery('<img alt="" />').attr('id', 'loader').attr('src', 'ajax-loader.gif').appendTo('#image-container');
      // var photosetID = prompt("Please Enter PHOTOSET ID", "photoset ID");
      // if(theID != null){
      //  alert("Valid"); 
      // }
      //var apiKey = '0ecf0a0d645ad3b39ec60d137ebb75a5'; // not my real API key
      //var apiKey = '0fd24d9d0411ede9c4d33d4c531bbc16'
      var userID = '90085976%40N03';
      var photosetID = '72157651980228016';

    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='+photosetID+'&user_id='+userID+'&format=json&nojsoncallback=1',


    /*
      iterates through the defined photoset and pulls all the images from my account
    */  
    function(data){
      var i; 
      var aPhoto = [];
      for(i = 0; i < data.photoset.photo.length; i++){

        aPhoto[i] = 'http://farm' + data.photoset.photo[i].farm + '.static.flickr.com/' + data.photoset.photo[i].server + '/' + data.photoset.photo[i].id + '_' + data.photoset.photo[i].secret + '_m.jpg';
      
        jQuery('<a href/>').attr('id','photo'+i+'').attr('onClick','showMarkers()').html($('<img/>').attr('src',aPhoto[i])).appendTo('#pics');

      }
    

    });
  
  });



}); // END DOCUMENT READY FUNCTIONS 














/* END - User Authentication Methods */











/* Uploads one photo so we can comment on it - this will be for testing purposes */
// $(document).ready(function(){
// 	$('#getPublic').click(function(){
// 		var i; 
// 		var publicPhoto = []; 
// 		$.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=e81306643b01d75c37c5e14f3d0ca1ab&user_id=90085976%40N03&format=json&nojsoncallback=1&api_sig=72ec5e99fad9beb9f3d7c4ed30df4c78',
// 			function(data){

// 				//alert(data.photos.photo[0].farm); 
// 			    for(i = 0; i < data.photos.photo.length; i++){

// 					publicPhoto[i] = 'http://farm' + data.photos.photo[i].farm + '.static.flickr.com/' + data.photos.photo[i].server + '/' + data.photos.photo[i].id + '_' + data.photoset.photo[i].secret + '_m.jpg';
					
// 				jQuery('<a href/>').attr('id','photo').html($('<img/>').attr('src',publicPhoto[i])).appendTo('#pics');

// 			}

// 			})
// 	})
// })



/* User makes a comment on the photo */
// $(document).ready(function(){
// 	$("#comment").click(function(){

// 		var comment = prompt("Please enter your comment"); 
// 		var photoID = '17170293906';
// 		// &auth_token=72157652053303902-5878d3c4131e4235
// 		$.post('https://api.flickr.com/services/rest/?method=flickr.photos.comments.addComment&api_key='+apiKey+'&photo_id='+photoID+'&comment_text='+comment+'&format=json&nojsoncallback=1&api_sig='+apiSig'',

// 			function(data){
// 				alert(data.stat); 
// 			});
// 	});
// });





/*
	Will check if the user signed in, this will 
	be done in the background process.
*/
// $(document).ready(function(){
// 	$("#sign_in").click(function(){
// 			$.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=e8ccf1cc1cbbae254459539e1cbf049c&format=json&nojsoncallback=1&auth_token=72157649673760944-12f9842b056ca8e9&api_sig=cd1a1aaf7895f9ed0e71505c2467d23e",
// 	{
// 		format: "json",
// 		function(data){
// 			alert("data.user.username.content");
// 		}
// 	});
// 	});
// });


// function checkSignin(){
// 	$.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=e8ccf1cc1cbbae254459539e1cbf049c&format=json&nojsoncallback=1&auth_token=72157649673760944-12f9842b056ca8e9&api_sig=cd1a1aaf7895f9ed0e71505c2467d23e",
// 	{
// 		format: "json",
// 		function(data){
// 			alert(data.user.username.content);
// 		}
// 	});
// }


/*
	Checks if the user has signed in or not. If not, then
	the function will ask for credentials and then download the 
	photos from his library. 
*/
// boolean ready = true; 
// $(document).ready(function(){
// 	$("#sign_in").click(function(){

// 		if(ready = false){
// 		var username = prompt("Username", "username");
// 		var password = prompt("Password", "password");
// 		alert("Downloading " + username +"'s"+ " photos");
// 		} else if (ready = true){
// 			checkSignin(); 
// 		}
	
// 	});

// });


	





// $(document).ready(function() {
// SC.get('/tracks/293', function(track) {
//   SC.oEmbed(track.permalink_url, document.getElementById('player'));
// });
// });

// $(document).ready(function(){
// 	$("#button").click(function(){
// 		var xhr = new XMLHttpRequest(); 
// 		xhr.open("GET", 
// 			"https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=433ad000f6c8f565418ae4bc51864f91&user_id=90085976%40N03&format=json&nojsoncallback=1&auth_token=72157649645806663-ada04bff8c9b8a74&api_sig=2d1630adbfdf333df03789de394db87d", 
// 			false); 

// 		xhr.send(); 

// 		console.log(xhr.status); 
// 		console.log(xhr.statusText + " good, you're logged on!!!"); 

// 		alert()



// 	});
// });




// $(document).ready(function(){
// 	$("#button").click(function(){
// 		var info = $flickr.photos.getInfo("16324929259");
// 		console.log(info); 
// 	})
// })

// $('#button').click(function() {
// 	var string = $('#string').val(); //taking value of string

// 	$.get('./php/reverse.php', { input: string }, function(data) {
// 		$('#feedback').text(data); 
// 	});

// });

// $(function () {
// 	$.ajax({
// 		type: 'GET',
// 		url: '/api/orders',
// 		sucess: function(orders){
// 			$.each(orders, function(i,order){
// 				$orders.append('<li>myorder</li>'); 
// 			});
// 		}
// 	});
// });

// $('#button').click(function(data){

// 	var string = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=7bdc0a857bd273658f68d9dddfd22079&photo_id=16324929259&format=json&nojsoncallback=1&auth_token=72157651529668479-53f7076fcde493ff&api_sig=727174b0132d14d963930ff6882bb6af');

// 	alert($_GET); 
// });


// var demo = '{"pets": { "name": "Jeffrey", "species": "Giraffe"}}';
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://www.codecademy.com/", false);
// // Add your code below!
// xhr.send(); 
// alert(xhr.status + " " +xhr.statusText);
// console.log(xhr.statusText); 


// var json = JSON.parse(demo);
// alert(json.name);



// function(data){

// //loop through the results with the following function
// $.each(data.photoset.photo, function(i,item){

//     //build the url of the photo in order to link to it
//    // var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg'

//     //turn the photo id into a variable
//     var photoID = item.id;

//     //use another ajax request to get the geo location data for the image
//     $.getJSON('http://api.flickr.com/services/rest/?&amp;method=flickr.photos.geo.getLocation&amp;api_key=' + 0fd24d9d0411ede9c4d33d4c531bbc16 + '&amp;photo_id=' + 16324929259 + '&amp;format=json&amp;jsoncallback=?',
//     function(data){

//         //if the image has a location, build an html snippet containing the data
//         if(data.stat != 'fail') {
//             pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
//         }

//     });

// }

// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {

//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);

//   } else if (typeof XDomainRequest != "undefined") {

//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);

//   } else {

//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;

//   }
//   return xhr;
// }

// var xhr = createCORSRequest('GET', url);
// if (!xhr) {
//   throw new Error('CORS not supported');
// }

// xhr.onload = function() {
//  var responseText = xhr.responseText;
//  console.log(responseText);
//  // process the response.
// };

// xhr.onerror = function() {
//   console.log('There was an error!');
// };

// function runAjax(){



// // var url = 'http://flickr.com/services/rest/?method=flickr.auth.getToken&api_key='+apiKey+'&frob='+FROB+'&api_sig='+api_sig+'';
// // var xhr = createCORSRequest('GET', url);
// // xhr.setRequestHeader(
// //     'Access-Control-Allow-Origin', 'GET');

// // xhr.send();

//      $.ajax({
//      type:'GET',
//      url: 'http://flickr.com/services/rest/?method=flickr.auth.getToken&api_key='+apiKey+'&frob='+FROB+'&api_sig='+api_sig+'',
//      contentType: 'json',
//      xhrFields:{
//        withCredentials: false
//      },
//      headers: {


//      },
//      success: function(){
//        console.log("FINALLY!"); 
//      },
//      error: function(){
//        console.log("I hate programming"); 
//      }
//      });


//  } // end runAjax(); 

