"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      ;(function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
          if (code < NUMBER) return -1; //no match
          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

          // base64 is 4/3 + up to two characters of the original data
          arr = new Arr(b64.length * 3 / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? b64.length - 4 : b64.length;

          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,

          // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\base64-js\\lib\\b64.js", "/..\\..\\node_modules\\base64-js\\lib");
  }, { "buffer": 2, "e/U+97": 4 }], 2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      };

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;

      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */
      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);
          arr.foo = function () {
            return 42;
          };
          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();

      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */
      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

        // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.
        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);
          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        }

        // Find the length
        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');

        var buf;
        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;
        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      }

      // STATIC METHODS
      // ==============

      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';
        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;
          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;
          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;
          case 'base64':
            ret = base64ToBytes(str).length;
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };

      // BUFFER INSTANCE METHODS
      // =======================

      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          assert(!isNaN(byte), 'Invalid hex string');
          buf[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;
          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;
          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;
          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;

        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length;

        // Fastpath empty strings
        if (end === start) return '';

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;
          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;
          case 'binary':
            ret = _binarySlice(self, start, end);
            break;
          case 'base64':
            ret = _base64Slice(self, start, end);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;

        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0;

        // Copy 0 bytes; we're done
        if (end === start) return;
        if (target.length === 0 || source.length === 0) return;

        // Fatal error conditions
        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;

        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
          return newBuf;
        }
      };

      // `get` will be removed in Node 0.13+
      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };

      // `set` will be removed in Node 0.13+
      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }
        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }
        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);
        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);
        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;

        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;

        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      };

      // fill(value, start=0, end=buffer.length)
      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start');

        // Fill 0 bytes; we're done
        if (end === start) return;
        if (this.length === 0) return;

        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };

      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */
      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      };

      // HELPER FUNCTIONS
      // ================

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;

      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */
      Buffer._augment = function (arr) {
        arr._isBuffer = true;

        // save reference to original Uint8Array get/set methods before overwriting
        arr._get = arr.get;
        arr._set = arr.set;

        // deprecated, will be removed in node 0.13+
        arr.get = BP.get;
        arr.set = BP.set;

        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;

        return arr;
      };

      // slice(start, end)
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }
        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;
        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }

      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */
      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\buffer\\index.js", "/..\\..\\node_modules\\buffer");
  }, { "base64-js": 1, "buffer": 2, "e/U+97": 4, "ieee754": 3 }], 3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];

        i += d;

        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\ieee754\\index.js", "/..\\..\\node_modules\\ieee754");
  }, { "buffer": 2, "e/U+97": 4 }], 4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      // TODO(shtylman)
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\process\\browser.js", "/..\\..\\node_modules\\process");
  }, { "buffer": 2, "e/U+97": 4 }], 5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function GameArena(element, width, height, Player) {
        this.canvas = element;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.player = new Player(this.ctx);

        //this.eventBus = eventBus;
        this.start();
      }

      GameArena.prototype = {
        start: function start() {
          var _this = this;

          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.interval = setInterval(this.updateState.bind(this), 20);
          window.addEventListener('keydown', function (e) {
            e.preventDefault();
            _this.keys = _this.keys || [];
            _this.keys[e.keyCode] = e.type === 'keydown';
          });
          window.addEventListener('keyup', function (e) {
            _this.keys[e.keyCode] = e.type === 'keydown';
          });
        },
        stop: function stop() {
          clearInterval(this.interval);
        },
        updateState: function updateState() {
          this.clear();
          this.player.newPos({
            right: this.keys && this.keys[68],
            left: this.keys && this.keys[65],
            up: this.keys && this.keys[87],
            down: this.keys && this.keys[83]
          }, this.width, this.height).update(this.ctx);
        },
        clear: function clear() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      };

      exports.default = GameArena;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\gameArena.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 28-Jun-17.
       */
      function Player(ctx) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
        var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'green';
        var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
        var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 50;

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;

        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
      }

      Player.prototype = {
        update: function update(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
          ctx.restore();
          return this;
        },
        newPos: function newPos(option, width, height) {
          this.moveAngle = 0;
          this.speed = 0;

          option.left && (this.moveAngle = -5);
          option.right && (this.moveAngle = 5);
          option.up && (this.speed = 5);
          option.down && (this.speed = -5);

          this.angle += this.moveAngle * Math.PI / 180;
          this.x += this.speed * Math.sin(this.angle);
          this.y -= this.speed * Math.cos(this.angle);

          if (this.y > height) {
            this.y = 0;
          } else if (this.y < 0) {
            this.y = height;
          } else if (this.x > width) {
            this.x = 0;
          } else if (this.x < 0) {
            this.x = width;
          }
          return this;
        }
      };

      exports.default = Player;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\player.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * Created by andre on 29-Jun-17.
       */

      function Timer(element) {
        this.element = element;
        //this.eventBus = eventBus;

        this.time = 0;
        this.startTimer();
        // this.eventBus.on('time:start', this.startTimer.bind(this));
      }

      Timer.prototype = {
        startTimer: function startTimer() {
          var _this = this;

          this.element.innerHTML = '';

          this.timer = setInterval(function () {
            _this.time++;
            _this.element.innerHTML = _this.time;
          }, 1000);
        }
      };

      exports.default = Timer;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\timer.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _eventBus = require('./utils/eventBus');

      var _eventBus2 = _interopRequireDefault(_eventBus);

      var _router = require('./utils/router');

      var _router2 = _interopRequireDefault(_router);

      var _index = require('./routes/index');

      var _about = require('./routes/about');

      var _game = require('./routes/game');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var eventBus = new _eventBus2.default();

      var routes = [_index.index, _about.about, _game.game];
      new _router2.default({ routes: routes });
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_fe6f6a5c.js", "/");
  }, { "./routes/about": 9, "./routes/game": 10, "./routes/index": 11, "./utils/eventBus": 12, "./utils/router": 13, "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var div = document.querySelector('div.main');
      var about = {
        name: 'about',
        match: function match(text) {
          return text === 'about';
        },
        onBeforeEnter: function onBeforeEnter() {
          return console.log('onBeforeEnter about');
        },
        onEnter: function onEnter() {
          div.innerHTML = '<p>Андрей</p> <a href="https://vk.com/stolpner_andrey" target="_blank">VK</a>';
        },
        onLeave: function onLeave() {
          return div.innerHTML = '';
        }
      };

      exports.about = about;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\about.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.game = undefined;

      var _gameArena = require('../components/gameArena');

      var _gameArena2 = _interopRequireDefault(_gameArena);

      var _player = require('../components/player');

      var _player2 = _interopRequireDefault(_player);

      var _timer = require('../components/timer');

      var _timer2 = _interopRequireDefault(_timer);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var ARENA_WIDTH = 700;
      var ARENA_HEIGHT = 400;

      var div = document.querySelector('div.main');
      var game = {
        name: 'game',
        match: function match(text) {
          return text === 'game';
        },
        onEnter: function onEnter() {
          div.innerHTML = '\n<h2>Game</h2> <hr>\n<button class="start">Start</button>\n\n';
          var btn = document.querySelector('button.start');
          btn.addEventListener('click', function () {
            div.innerHTML += '<span class="score"></span><div><canvas style="border: solid 1px red"></canvas></div>';
            var canvas = document.querySelector('canvas');
            var score = document.querySelector('span.score');
            var gameArena = new _gameArena2.default(canvas, ARENA_WIDTH, ARENA_HEIGHT, _player2.default);

            var timer = new _timer2.default(score);
          });
        },
        onLeave: function onLeave() {
          return div.innerHTML = '';
        }
      };

      exports.game = game;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\game.js", "/routes");
  }, { "../components/gameArena": 5, "../components/player": 6, "../components/timer": 7, "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var div = document.querySelector('div.main');
      var index = {
        name: 'index',
        match: '',
        onBeforeEnter: function onBeforeEnter() {
          return console.log('onBeforeEnter index');
        },
        onEnter: function onEnter() {
          return div.innerHTML = 'Это самая крутая игра в Мире. Правил в ней нет, делай что хочешь P.S. Я сам не знаю )';
        },
        onLeave: function onLeave() {
          return console.log('onLeave index');
        }
      };

      exports.index = index;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\index.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*
       d1. Реализовать EventBus
      
       создать конструктор
       создать метод on
       coздать метод off
       создать метод trigger
       создать метод once
       вызвать конструктор
       */

      function EventBus() {
        this.listeners = {};
      }

      EventBus.prototype.on = function (ev, handler) {
        this.listeners[ev] = this.listeners[ev] || [];
        this.listeners[ev].push(handler);
      };
      EventBus.prototype.trigger = function (ev) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (this.listeners[ev] || []).forEach(function (handler) {
          return handler.apply(null, args);
        });
      };
      EventBus.prototype.off = function (ev, handler) {
        (this.listeners[ev] || []).forEach(function (item, i) {
          if (item === handler) {
            this.listeners[ev].splice(i, 1);
          }
        }, this);
      };
      EventBus.prototype.once = function (ev, handler) {
        var that = this;
        this.on(ev, function offMethod() {
          handler.apply(null, arguments);
          that.off(ev, offMethod);
        });
      };

      exports.default = EventBus;

      // var eventBus = new EventBus();
      // var handler = (a, b, c) => console.log('Handler', a, b, c);
      // eventBus.once('one', handler);
      // eventBus.trigger('one', 1,2,3);
      // // Handler 1 2 3
      // eventBus.trigger('one');
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\eventBus.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /*
       Реализовать Router
      
       создать конструктор
       обработчик изменения адреса
       при создании выплнил обработчик изменения адреса
       научиться определять роут по адресу ( какой роут нужно активировать )
       находить/сохранять последний активный роут
       вызвать onLeave
       вызвать onBeforeEnter
       вызвать onEnter
       обрабатывать отсутствие фукнций-хуков
       поддерживать promise из onBeforeEnter
       поддерживать promise из onLeave
       */
      var Router = function Router(options, eventBus) {
        this.routes = options.routes;
        this.eventBus = eventBus;
        this.init();
      };

      Router.prototype = {
        init: function init() {
          var _this = this;

          window.addEventListener('hashchange', function (ev) {
            return _this.handleUrl(ev.oldURL.split('#')[1] || '', ev.newURL.split('#')[1]);
          });
          this.handleUrl(undefined, window.location.hash.slice(1));
        },
        getParam: function getParam(newRoute, currentRoute) {
          var param = newRoute.match(currentRoute.match) || [];
          return param[1];
        },
        handleUrl: function handleUrl(oldRoute, newRoute) {
          var currentRoute = this.routes.find(function (item) {
            if (typeof item.match === 'string') {
              return newRoute === item.match;
            } else if (typeof item.match === 'function') {
              return item.match(newRoute);
            } else if (item.match instanceof RegExp) {
              return newRoute.match(item.match);
            }
          });
          if (oldRoute !== undefined) {
            var previousRoute = this.routes.find(function (item) {
              if (typeof item.match === 'string') {
                return oldRoute === item.match;
              } else if (typeof item.match === 'function') {
                return item.match(oldRoute);
              } else if (item.match instanceof RegExp) {
                return oldRoute.match(item.match);
              }
            });
          }
          var currentParam = this.getParam(newRoute, currentRoute);
          console.log('---> router oldURL: ' + oldRoute);
          console.log('---> router findNewActiveRoute: ' + newRoute + ' -- ' + (currentRoute || {}).name);
          Promise.resolve().then(function () {
            return previousRoute && previousRoute.onLeave && previousRoute.onLeave(oldRoute.split('=')[1]);
          }).then(function () {
            return currentRoute && currentRoute.onBeforeEnter && currentRoute.onBeforeEnter(currentParam);
          }).then(function () {
            return currentRoute && currentRoute.onEnter && currentRoute.onEnter(currentParam);
          });
        }
      };

      exports.default = Router;

      // var router = new Router({
      //     routes: [{
      //         name: 'index',
      //         match: '',
      //         onBeforeEnter: () => console.log('onBeforeEnter index'),
      //         onEnter: () => console.log('onEnter index'),
      //         onLeave: () => console.log('onLeave index')
      //     }, {
      //         name: 'city',
      //         match: /city=(.+)/,
      //         onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
      //         onEnter: (city) => console.log(`onEnter city:${city}`),
      //         onLeave: (city) => console.log(`onLeave city:${city}`)
      //     }, {
      //         name: 'about',
      //         match: (text) => text === 'about',
      //         onBeforeEnter: () => console.log(`onBeforeEnter about`),
      //         onEnter: () => {
      //             console.log(`onEnter about`);
      //             //document.querySelector('#content').innerHTML = '<h1>About</h1>';
      //         },
      //         onLeave: () => {
      //             console.log(`onLeave about`);
      //             document.querySelector('#content').innerHTML = '';
      //         }
      //     }]
      // });
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\router.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [8]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvU3RvbHBuZXJBL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvU3RvbHBuZXJBL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvU3RvbHBuZXJBL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9TdG9scG5lckEvc3JjL3NjcmlwdC9jb21wb25lbnRzL2dhbWVBcmVuYS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9zcmMvc2NyaXB0L2NvbXBvbmVudHMvcGxheWVyLmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvU3RvbHBuZXJBL3NyYy9zY3JpcHQvY29tcG9uZW50cy90aW1lci5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9zcmMvc2NyaXB0L2Zha2VfZmU2ZjZhNWMuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9TdG9scG5lckEvc3JjL3NjcmlwdC9yb3V0ZXMvYWJvdXQuanMiLCJDOi9Vc2Vycy9hbmRyZS9EZXNrdG9wL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9TdG9scG5lckEvc3JjL3NjcmlwdC9yb3V0ZXMvZ2FtZS5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9zcmMvc2NyaXB0L3JvdXRlcy9pbmRleC5qcyIsIkM6L1VzZXJzL2FuZHJlL0Rlc2t0b3AvanMtLWJhc2UtY291cnNlLzA2L2h0L1N0b2xwbmVyQS9zcmMvc2NyaXB0L3V0aWxzL2V2ZW50QnVzLmpzIiwiQzovVXNlcnMvYW5kcmUvRGVza3RvcC9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvU3RvbHBuZXJBL3NyYy9zY3JpcHQvdXRpbHMvcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EsQUFDQTs7QUFDQSxtQkFDQTs7QUFDQSwyQkFDQTtBQUNBLEFBQ0E7O21FQUNBLEFBQ0E7O2tDQUNBO21DQUNBO29DQUNBO21DQUNBO21DQUNBOzJDQUNBOzRDQUNBLEFBQ0E7OzZCQUNBO29DQUNBO2tFQUNBO29FQUNBO3dDQUNBOzhEQUNBOytDQUNBO3VEQUNBO0FBQ0EsQUFDQTs7cUNBQ0E7MENBQ0EsQUFDQTs7a0NBQ0E7NEJBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7d0JBQ0E7NkZBQ0EsQUFDQTs7QUFDQTs2Q0FDQSxBQUNBOztBQUNBO3NEQUNBLEFBQ0E7O2tCQUNBLEFBQ0E7OzJCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7b0RBQ0E7eUlBQ0E7cUNBQ0E7bUNBQ0E7dUJBQ0E7QUFDQSxBQUNBOztrQ0FDQTs0RUFDQTt1QkFDQTt5Q0FDQTs4R0FDQTs0QkFDQTt1QkFDQTtBQUNBLEFBQ0E7O2lCQUNBO0FBQ0EsQUFDQTs7c0NBQ0E7Y0FDQTswQ0FDQTs7QUFDQTttQkFDQTtjQUNBO2NBQ0EsQUFDQTs7K0JBQ0E7aUNBQ0E7QUFDQSxBQUNBOzt3Q0FDQTtnSEFDQTtBQUNBLEFBQ0E7O0FBQ0E7OEVBQ0E7c0VBQ0E7c0NBQ0E7QUFDQSxBQUNBOztBQUNBO2tCQUNBO2lCQUNBOzBDQUNBO3VDQUNBOzJDQUNBO3dCQUNBO0FBQ0E7aUJBQ0E7MkVBQ0E7dUNBQ0E7MkNBQ0E7MkNBQ0E7d0JBQ0E7QUFDQSxBQUNBLEFBQ0E7OztpQkFDQTtBQUNBLEFBQ0E7OzhCQUNBO2dDQUNBO29FQUNBLEFBQ0E7OztBQ3hIQTtBQUNBLEFBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7OztBQUNBO0FBQ0EsNEJBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7QUFDQSwyQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7WUFDQTtvQ0FDQTttQ0FDQTtnQ0FDQTttQkFDQTtBQUNBO3lFQUNBO29CQUNBO2lCQUNBO0FBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7Ozs7OztBQUNBLGlEQUNBOzRFQUNBLEFBQ0E7OzBFQUNBLEFBQ0E7O0FBQ0E7QUFDQTt3REFDQTsrQkFDQTsyQ0FDQTtnQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTtZQUNBOytMQUNBOzZCQUNBLEFBQ0E7O1lBQ0E7b0NBQ0E7QUFDQTsrQ0FDQTtlQUNBO0FBQ0E7Z0JBQ0E7dUJBQ0E7MEJBQ0E7QUFDQSxBQUNBOztZQUNBOzhFQUNBO0FBQ0E7bUJBQ0E7d0NBQ0E7QUFDQTt1Q0FDQTs4RkFDQTtBQUNBO3NDQUNBO2dDQUNBOzRFQUNBO3VDQUNBO3FCQUNBO0FBQ0E7QUFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLDhDQUNBO2lDQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTttQkFDQTtBQUNBO21CQUNBLEFBQ0E7O0FBQ0E7O0FBQ0EscUNBQ0E7cURBQ0E7QUFDQTs7QUFDQSxtREFDQTtZQUNBO29CQUNBOzRCQUNBO2VBQ0E7K0JBQ0E7QUFDQTtlQUNBO2VBQ0E7bUNBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtzQkFDQTtBQUNBO2VBQ0E7cUNBQ0E7QUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBOytCQUNBO0FBQ0E7QUFDQTs0QkFDQSxBQUNBOztlQUNBO0FBQ0E7O0FBQ0EsbURBQ0E7OEVBQ0EsQUFDQTs7K0JBQ0E7NEJBQ0E7c0NBQ0E7c0JBQ0E7QUFDQSxBQUNBOztZQUNBOzZDQUNBO3dCQUNBOzRDQUNBO21DQUNBO0FBQ0E7QUFDQSxBQUNBOzs2QkFDQTtrQkFDQTswQ0FDQTswQkFDQTt5QkFDQTtzQkFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0Esc0RBQ0E7bUNBQ0E7cUNBQ0E7cUJBQ0E7bUJBQ0E7ZUFDQTswQkFDQTtrQ0FDQTtxQkFDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTs0QkFDQTtpQ0FDQSxBQUNBOztpQ0FDQTs0QkFDQTtBQUNBO3lDQUNBO3VEQUNBOytCQUNBOzRCQUNBO0FBQ0E7bUNBQ0E7ZUFDQTtBQUNBOztBQUNBLHVEQUNBOytGQUNBO2VBQ0E7QUFDQTs7QUFDQSx3REFDQTtnR0FDQTtlQUNBO0FBQ0E7O0FBQ0EseURBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx5REFDQTtpR0FDQTtlQUNBO0FBQ0E7O0FBQ0EsMERBQ0E7a0dBQ0E7ZUFDQTtBQUNBOztBQUNBLDJFQUNBO0FBQ0E7QUFDQTs4QkFDQTtpQ0FDQTt1QkFDQTtxQkFDQTtBQUNBO2VBQ0E7QUFDQTtxQkFDQTtxQkFDQTttQkFDQTttQkFDQTtBQUNBLEFBQ0E7O21DQUNBO3NDQUNBO3FCQUNBO21CQUNBO2VBQ0E7MEJBQ0E7a0NBQ0E7cUJBQ0E7QUFDQTtBQUNBOzhDQUNBLEFBQ0E7O1lBQ0E7Z0JBQ0E7ZUFDQTtrREFDQTtBQUNBO2VBQ0E7ZUFDQTttREFDQTtBQUNBO2VBQ0E7b0RBQ0E7QUFDQTtlQUNBO3FEQUNBO0FBQ0E7ZUFDQTtxREFDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7c0RBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTttQkFDQSxBQUNBOzs4Q0FDQTtpQ0FDQTsyREFDQSxBQUNBOztBQUNBO2tDQUNBLEFBQ0E7O1lBQ0E7Z0JBQ0E7ZUFDQTt5Q0FDQTtBQUNBO2VBQ0E7ZUFDQTswQ0FDQTtBQUNBO2VBQ0E7MkNBQ0E7QUFDQTtlQUNBOzRDQUNBO0FBQ0E7ZUFDQTs0Q0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7NkNBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSw0Q0FDQTs7Z0JBRUE7OERBQ0EsQUFDQTtBQUhBO0FBSUE7O0FBQ0E7QUFDQSwwRUFDQTtxQkFDQSxBQUNBOzs0QkFDQTswQ0FDQTswQ0FDQSxBQUNBOztBQUNBOzJCQUNBO3dEQUNBLEFBQ0E7O0FBQ0E7NkJBQ0E7a0VBQ0E7b0RBQ0E7aURBQ0EsQUFDQTs7QUFDQTswQ0FDQTs2RkFDQSxBQUNBOzt3QkFDQSxBQUNBOztrREFDQTt3Q0FDQTtnREFDQTtBQUNBO2VBQ0E7eURBQ0E7QUFDQTtBQUNBOztBQUNBLDZDQUNBOytDQUNBO3NDQUNBO2VBQ0E7dURBQ0E7QUFDQTtBQUNBOztBQUNBLDJDQUNBO2tCQUNBO2tCQUNBO21DQUNBLEFBQ0E7OzBDQUNBOzhCQUNBO2lFQUNBO2tCQUNBO2lCQUNBO3lDQUNBO0FBQ0E7QUFDQSxBQUNBOztvQ0FDQTtBQUNBOztBQUNBLDRDQUNBO2tCQUNBO21DQUNBLEFBQ0E7OzBDQUNBO3lDQUNBO2dCQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7dUNBQ0E7QUFDQTs7QUFDQSwwQ0FDQTtzQkFDQSxBQUNBOzt5Q0FDQTtnREFDQSxBQUNBOztrQkFDQTswQ0FDQTsyQkFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSw4Q0FDQTtxQ0FDQTtrQkFDQTtrREFDQTsrREFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxxREFDQTt1QkFDQTtrQ0FDQTs4QkFDQSxBQUNBOztvQ0FDQTtzREFDQTtlQUNBOytCQUNBO3VEQUNBOzZDQUNBO2lDQUNBO0FBQ0E7aUJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsK0NBQ0E7b0JBQ0E7OEJBQ0E7QUFDQTs7QUFDQTtBQUNBLGtEQUNBO29CQUNBO2tDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7MERBQ0E7dUNBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztvQkFDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7WUFDQTswQkFDQTtvQkFDQTswREFDQTtlQUNBOytCQUNBO29EQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSxnRUFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O1lBQ0E7MEJBQ0E7eURBQ0E7MERBQ0E7cUJBQ0E7dUVBQ0E7ZUFDQTt5REFDQTswREFDQTtvREFDQTs2Q0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsOERBQ0E7dUJBQ0E7MERBQ0E7dUNBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztpQ0FDQTt3RUFDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7eURBQ0E7d0JBQ0E7NERBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzt5REFDQTt3QkFDQTtnRUFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBDQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7QUFDQTs7QUFDQSxrRUFDQTsrQ0FDQTtBQUNBOztBQUNBLGtFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7MERBQ0E7dUNBQ0E7MkJBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOzt1QkFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7bUVBQ0E7OEdBQ0E7QUFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQSx3RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTsyQkFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O21FQUNBO3VFQUNBO0FBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0Esc0VBQ0E7dUJBQ0E7d0RBQ0E7MERBQ0E7dUNBQ0E7a0NBQ0E7QUFDQSxBQUNBOzttQ0FDQSxBQUNBOztnSEFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO29DQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7a0pBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7d0NBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztzSkFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt1REFDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7OzREQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3dEQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7NERBQ0E7QUFDQTs7QUFDQSwwRUFDQTtnREFDQTtBQUNBOztBQUNBLDBFQUNBO2lEQUNBO0FBQ0E7O0FBQ0E7QUFDQSwyREFDQTs0QkFDQTs0QkFDQTs2QkFDQSxBQUNBOzt1Q0FDQTttQ0FDQTtBQUNBLEFBQ0E7OzJEQUNBOzZCQUNBLEFBQ0E7O0FBQ0E7MkJBQ0E7K0JBQ0EsQUFDQTs7a0RBQ0E7K0NBQ0EsQUFDQTs7MENBQ0E7b0JBQ0E7QUFDQTtBQUNBOztBQUNBLDZDQUNBO2tCQUNBO3VCQUNBO3NDQUNBOzhCQUNBOytDQUNBO3lCQUNBO0FBQ0E7QUFDQTtBQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7QUFDQSxtREFDQTsrQ0FDQTtzQ0FDQTtvQ0FDQTtpQkFDQTswQ0FDQTsrREFDQTs0QkFDQTt3QkFDQTtBQUNBO2VBQ0E7MEJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSwrQkFDQTtpQ0FDQTt5Q0FDQTtBQUNBOztBQUNBLHNCQUNBOztBQUNBLEFBQ0EsQUFDQTs7O0FBQ0EsdUNBQ0E7d0JBQ0EsQUFDQTs7QUFDQTt1QkFDQTt1QkFDQSxBQUNBOztBQUNBO3FCQUNBO3FCQUNBLEFBQ0E7O3VCQUNBOzBCQUNBO2dDQUNBO3dCQUNBO3NCQUNBO3VCQUNBOzJCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzBCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzZCQUNBOzhCQUNBOzhCQUNBOzRCQUNBOytCQUNBOytCQUNBOytCQUNBOytCQUNBOzJCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOzhCQUNBOytCQUNBOytCQUNBO3NCQUNBO3lCQUNBOytCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQTtBQUNBOzhDQUVBO3dCQURBLENBRUE7aUNBQ0E7K0JBQ0E7aUJBQ0E7K0JBQ0E7ZUFDQTtBQUNBOztBQUNBLDhCQUNBO0FBQ0E7QUFDQTtBQUNBOzhCQUNBO2dDQUNBO0FBQ0E7O0FBQ0EsZ0NBQ0E7b0RBQ0E7NkRBQ0E7V0FDQTtBQUNBOztBQUNBLG1DQUNBO3NMQUNBO0FBQ0E7O0FBQ0Esd0JBQ0E7NENBQ0E7MEJBQ0E7QUFDQTs7QUFDQSxnQ0FDQTt3QkFDQTs2Q0FDQTtpQ0FDQTtnRUFDQTt3QkFDQTs0Q0FDQTtnRkFDQTsrQ0FDQTs0Q0FDQTtBQUNBO0FBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsaUNBQ0E7d0JBQ0E7NkNBQ0E7QUFDQTs2Q0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxtQ0FDQTttQkFDQTt3QkFDQTs2Q0FDQTs2QkFDQTtvQkFDQTttQkFDQTt5QkFDQTt5QkFDQTtBQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxrQ0FDQTtrQ0FDQTtBQUNBOztBQUNBLG9EQUNBO1lBQ0E7eUNBQ0E7MkRBQ0E7Z0NBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7WUFDQTtvQ0FDQTtzQkFDQTs4Q0FDQTtBQUNBO0FBQ0E7O0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7QUFDQSxxQ0FDQTswQ0FDQTsyQkFDQTs2QkFDQTs0Q0FDQTtBQUNBOztBQUNBLDBDQUNBOzBDQUNBOzZCQUNBOzZCQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7MENBQ0E7NkJBQ0E7NkJBQ0E7QUFDQTs7QUFDQSxxQ0FDQTs4Q0FDQTtBQUNBLEFBQ0E7OztBQ3poQ0E7QUFDQSxBQUNBOztBQUNBLG1FQUNBO2VBQ0E7dUNBQ0E7aUNBQ0E7NEJBQ0E7cUJBQ0E7b0NBQ0E7NEJBQ0E7Z0NBQ0EsQUFDQTs7YUFDQSxBQUNBOztnQ0FDQTtlQUNBO2lCQUNBO2lGQUNBLEFBQ0E7O2dDQUNBO2VBQ0E7aUJBQ0E7aUZBQ0EsQUFDQTs7cUJBQ0E7a0JBQ0E7K0JBQ0E7MENBQ0E7ZUFDQTs4QkFDQTtrQkFDQTtBQUNBO2tEQUNBO0FBQ0E7O0FBQ0EsMkVBQ0E7a0JBQ0E7dUNBQ0E7aUNBQ0E7NEJBQ0E7cUVBQ0E7b0NBQ0E7NEJBQ0E7Z0VBQ0EsQUFDQTs7eUJBQ0EsQUFDQTs7Z0RBQ0E7aUNBQ0E7Y0FDQTtlQUNBO2dEQUNBO2lEQUNBO0FBQ0E7aUJBQ0E7QUFDQTs4QkFDQTswQkFDQTtpQkFDQTswQ0FDQTtBQUNBOzhCQUNBO0FBQ0E7aUJBQ0E7QUFDQSxBQUNBOztpQ0FDQTtnQkFDQTtnQkFDQTtxQ0FDQTs4Q0FDQTtvQkFDQTtpQkFDQTs2REFDQTtnQkFDQTtBQUNBO0FBQ0EsQUFDQTs7dUZBQ0EsQUFDQTs7d0JBQ0E7Z0JBQ0E7c0ZBQ0EsQUFDQTs7c0NBQ0E7QUFDQSxBQUNBOzs7QUN4RkE7QUFDQSxBQUNBOztBQUNBLEFBQ0E7O0FBQ0EscUNBQ0E7O0FBQ0EscUNBQ0E7c0VBQ0E7b0ZBQ0EsQUFDQTs7NkJBQ0E7OEJBQ0E7dUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O3FCQUNBO3NCQUNBOzJEQUNBOzRCQUNBO3NGQUNBO2lCQUNBO29DQUNBOytCQUNBO0FBQ0E7QUFDQTtBQUNBO2FBQ0EsQUFDQTs7dUNBQ0E7dUJBQ0E7K0NBQ0E7QUFDQTtBQUNBLEFBQ0E7O3FDQUNBO3lCQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFDQTs7QUFDQSx1QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFDQTs7QUFDQSx3Q0FDQTt3QkFDQTtBQUNBOztBQUNBO0FBQ0EsZ0NBQ0E7ZUFDQTs7QUFDQSxxQ0FDQTt3QkFDQTtBQUNBLEFBQ0E7OztBQ3BFQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEseURBQ0E7c0JBQ0E7MENBQ0E7cUJBQ0E7c0JBQ0E7c0NBQ0EsQUFDQTs7QUFDQTthQUNBO0FBQ0E7O0FBQ0E7Z0NBRUE7c0JBQ0EsQUFDQTs7bUNBQ0E7b0NBQ0E7bUVBQ0E7MERBQ0E7Y0FDQTt1Q0FDQTsrQ0FDQTtBQUNBO3dEQUNBOytDQUNBO0FBQ0E7QUFDQTs4QkFDQTs2QkFDQTtBQUNBOzRDQUNBO2VBQ0E7OzBDQUVBO3lDQUNBO3VDQUNBO3lDQUNBO0FBSkEsa0RBS0E7QUFDQTtnQ0FDQTtrRUFDQTtBQUNBLEFBQ0E7QUEvQkE7O0FBZ0NBLHdCQUNBLEFBQ0E7OztBQ3BEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsQUFDQSxBQUNBOzs7QUFDQSwyQkFDQTt3RkFDQTt5RkFDQTt3RkFDQTtvRkFDQTtvRkFDQSxBQUNBOzttQkFDQTtxQkFDQTtzQkFDQTtxQkFDQTtpQkFDQTtpQkFDQSxBQUNBOztxQkFDQTtxQkFDQTt5QkFDQTtBQUNBOztBQUNBO3FDQUVBO2NBQ0E7cUNBQ0E7MEJBQ0E7K0JBQ0E7MkVBQ0E7Y0FDQTtpQkFDQTtBQUNBO3VEQUNBOzJCQUNBO3VCQUNBLEFBQ0E7OzRDQUNBOzRDQUNBO3FDQUNBO3dDQUNBLEFBQ0E7O21EQUNBOytDQUNBOytDQUNBLEFBQ0E7OytCQUNBO3FCQUNBO2lDQUNBO3FCQUNBO3FDQUNBO3FCQUNBO2lDQUNBO3FCQUNBO0FBQ0E7aUJBQ0E7QUFDQSxBQUNBO0FBbENBOztBQW1DQSx3QkFDQSxBQUNBOzs7QUNsRUE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLEFBQ0EsQUFDQSxBQUNBOzs7O0FBQ0EsOEJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztvQkFDQTthQUNBO0FBQ0E7QUFDQTs7QUFDQTswQ0FFQTtzQkFDQSxBQUNBOzttQ0FDQSxBQUNBOzsrQ0FDQTtrQkFDQTs0Q0FDQTthQUNBO0FBQ0EsQUFDQTtBQVhBOztBQVlBLHdCQUNBLEFBQ0E7OztBQ2xDQTtBQUNBLEFBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0Esb0NBQ0E7O0FBQ0E7QUFDQSxxQ0FDQSxBQUNBOzs7QUN4QkE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBO0FBQ0E7Y0FFQTtvQ0FDQTswQkFDQTtBQUNBO2dEQUNBOzZCQUNBO0FBQ0E7b0NBQ0E7MEJBQ0E7QUFDQTtvQ0FDQTtpQ0FDQTtBQUNBLEFBQ0E7QUFkQTs7QUFlQSxzQkFDQSxBQUNBOzs7QUN6QkE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLHFCQUNBOztBQUNBLCtCQUNBOztBQUNBLCtDQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDJCQUNBOztBQUNBLDJDQUNBOztBQUNBOztBQUNBOztBQUNBO0FBQ0EseUJBQ0E7O0FBQ0E7QUFDQTtjQUVBO29DQUNBOzBCQUNBO0FBQ0E7b0NBQ0E7MEJBQ0E7MkNBQ0E7b0RBQ0E7NkJBQ0E7Z0RBQ0E7K0NBQ0E7Z0dBQ0EsQUFDQTs7NENBQ0E7QUFDQTtBQUNBO29DQUNBO2lDQUNBO0FBQ0EsQUFDQTtBQXBCQTs7QUFxQkEscUJBQ0EsQUFDQTs7O0FDbERBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQTtBQUNBO2NBRUE7ZUFDQTtnREFDQTs2QkFDQTtBQUNBO29DQUNBO2lDQUNBO0FBQ0E7b0NBQ0E7NkJBQ0E7QUFDQSxBQUNBO0FBWkE7O0FBYUEsc0JBQ0EsQUFDQTs7O0FDdkJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7OztBQUNBLDBCQUNBO3lCQUNBO0FBQ0E7O0FBQ0EscURBQ0E7bURBQ0E7Z0NBQ0E7O0FBQ0EsaURBQ0E7Z0hBQ0E7cUNBQ0E7QUFDQSxBQUNBOzs4REFDQTtxQ0FDQTtBQUNBOztBQUNBLHNEQUNBOzhEQUNBO2dDQUNBO3lDQUNBO0FBQ0E7V0FDQTs7QUFDQSx1REFDQTttQkFDQTt5Q0FDQTs4QkFDQTt1QkFDQTtBQUNBO0FBQ0E7O0FBQ0Esd0JBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTs7O0FDMURBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUNBOzhCQUNBO3dCQUNBO2FBQ0E7QUFDQTs7QUFDQTs4QkFFQTtzQkFDQSxBQUNBOzs4REFDQTt1RkFDQTtBQUNBOytEQUNBO0FBQ0E7NERBQ0E7NERBQ0E7dUJBQ0E7QUFDQTswREFDQTs4REFDQTtnREFDQTt1Q0FDQTt5REFDQTtnQ0FDQTtxREFDQTt5Q0FDQTtBQUNBO0FBQ0E7c0NBQ0E7aUVBQ0E7a0RBQ0E7eUNBQ0E7MkRBQ0E7a0NBQ0E7dURBQ0E7MkNBQ0E7QUFDQTtBQUNBO0FBQ0E7cURBQ0E7K0NBQ0E7b0dBQ0E7NkNBQ0E7dUdBQ0E7OEJBQ0E7NEZBQ0E7OEJBQ0E7Z0ZBQ0E7QUFDQTtBQUNBLEFBQ0E7QUE3Q0E7O0FBOENBLHdCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXk7XG5cblx0dmFyIFBMVVMgPSAnKycuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKTtcblx0dmFyIExPV0VSID0gJ2EnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBVUFBFUiA9ICdBJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgU0xBU0hfVVJMX1NBRkUgPSAnXycuY2hhckNvZGVBdCgwKTtcblxuXHRmdW5jdGlvbiBkZWNvZGUoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKTtcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fCBjb2RlID09PSBQTFVTX1VSTF9TQUZFKSByZXR1cm4gNjI7IC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fCBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSkgcmV0dXJuIDYzOyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUikgcmV0dXJuIC0xOyAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMCkgcmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2O1xuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNikgcmV0dXJuIGNvZGUgLSBVUFBFUjtcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpIHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNjtcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5KGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyO1xuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoO1xuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMDtcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKTtcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aDtcblxuXHRcdHZhciBMID0gMDtcblxuXHRcdGZ1bmN0aW9uIHB1c2godikge1xuXHRcdFx0YXJyW0wrK10gPSB2O1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpO1xuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOCk7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0O1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyO1xuXHRcdFx0cHVzaCh0bXAgPj4gOCAmIDB4RkYpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdCAgICBleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMyxcblx0XHQgICAgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdCAgICB0ZW1wLFxuXHRcdCAgICBsZW5ndGg7XG5cblx0XHRmdW5jdGlvbiBlbmNvZGUobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKTtcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyB1aW50OFtpICsgMl07XG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApO1xuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMik7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA8PCA0ICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSAnPT0nO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArIHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgMiAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz0nO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5O1xuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0O1xufSkodHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkLmJhc2U2NGpzID0ge30gOiBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSTJOQzVxY3lKZExDSnVZVzFsY3lJNld5SnNiMjlyZFhBaUxDSmxlSEJ2Y25Seklpd2lRWEp5SWl3aVZXbHVkRGhCY25KaGVTSXNJa0Z5Y21GNUlpd2lVRXhWVXlJc0ltTm9ZWEpEYjJSbFFYUWlMQ0pUVEVGVFNDSXNJazVWVFVKRlVpSXNJa3hQVjBWU0lpd2lWVkJRUlZJaUxDSlFURlZUWDFWU1RGOVRRVVpGSWl3aVUweEJVMGhmVlZKTVgxTkJSa1VpTENKa1pXTnZaR1VpTENKbGJIUWlMQ0pqYjJSbElpd2lZalkwVkc5Q2VYUmxRWEp5WVhraUxDSmlOalFpTENKcElpd2lhaUlzSW13aUxDSjBiWEFpTENKd2JHRmpaVWh2YkdSbGNuTWlMQ0poY25JaUxDSnNaVzVuZEdnaUxDSkZjbkp2Y2lJc0lteGxiaUlzSW1Ob1lYSkJkQ0lzSWt3aUxDSndkWE5vSWl3aWRpSXNJblZwYm5RNFZHOUNZWE5sTmpRaUxDSjFhVzUwT0NJc0ltVjRkSEpoUW5sMFpYTWlMQ0p2ZFhSd2RYUWlMQ0owWlcxd0lpd2laVzVqYjJSbElpd2liblZ0SWl3aWRISnBjR3hsZEZSdlFtRnpaVFkwSWl3aWRHOUNlWFJsUVhKeVlYa2lMQ0ptY205dFFubDBaVUZ5Y21GNUlpd2lZbUZ6WlRZMGFuTWlYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzU1VGQlNVRXNVMEZCVXl4clJVRkJZanM3UVVGRlFTeERRVUZGTEZkQlFWVkRMRTlCUVZZc1JVRkJiVUk3UVVGRGNFSTdPMEZCUlVNc1MwRkJTVU1zVFVGQlR5eFBRVUZQUXl4VlFVRlFMRXRCUVhOQ0xGZEJRWFpDTEVkQlEwNUJMRlZCUkUwc1IwRkZUa01zUzBGR1NqczdRVUZKUkN4TFFVRkpReXhQUVVGVExFbEJRVWxETEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlF5eFJRVUZUTEVsQlFVbEVMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUlN4VFFVRlRMRWxCUVVsR0xGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpSeXhSUVVGVExFbEJRVWxJTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlNTeFJRVUZUTEVsQlFVbEtMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKU3l4blFrRkJaMElzU1VGQlNVd3NWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJjRUk3UVVGRFFTeExRVUZKVFN4cFFrRkJhVUlzU1VGQlNVNHNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJja0k3TzBGQlJVRXNWVUZCVTA4c1RVRkJWQ3hEUVVGcFFrTXNSMEZCYWtJc1JVRkJjMEk3UVVGRGNrSXNUVUZCU1VNc1QwRkJUMFFzU1VGQlNWSXNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJXRHRCUVVOQkxFMUJRVWxUTEZOQlFWTldMRWxCUVZRc1NVRkRRVlVzVTBGQlUwb3NZVUZFWWl4RlFVVkRMRTlCUVU4c1JVRkJVQ3hEUVVwdlFpeERRVWxXTzBGQlExZ3NUVUZCU1Vrc1UwRkJVMUlzUzBGQlZDeEpRVU5CVVN4VFFVRlRTQ3hqUVVSaUxFVkJSVU1zVDBGQlR5eEZRVUZRTEVOQlVHOUNMRU5CVDFZN1FVRkRXQ3hOUVVGSlJ5eFBRVUZQVUN4TlFVRllMRVZCUTBNc1QwRkJUeXhEUVVGRExFTkJRVklzUTBGVWIwSXNRMEZUVmp0QlFVTllMRTFCUVVsUExFOUJRVTlRTEZOQlFWTXNSVUZCY0VJc1JVRkRReXhQUVVGUFR5eFBRVUZQVUN4TlFVRlFMRWRCUVdkQ0xFVkJRV2hDTEVkQlFYRkNMRVZCUVRWQ08wRkJRMFFzVFVGQlNVOHNUMEZCVDB3c1VVRkJVU3hGUVVGdVFpeEZRVU5ETEU5QlFVOUxMRTlCUVU5TUxFdEJRV1E3UVVGRFJDeE5RVUZKU3l4UFFVRlBUaXhSUVVGUkxFVkJRVzVDTEVWQlEwTXNUMEZCVDAwc1QwRkJUMDRzUzBGQlVDeEhRVUZsTEVWQlFYUkNPMEZCUTBRN08wRkJSVVFzVlVGQlUwOHNZMEZCVkN4RFFVRjVRa01zUjBGQmVrSXNSVUZCT0VJN1FVRkROMElzVFVGQlNVTXNRMEZCU2l4RlFVRlBReXhEUVVGUUxFVkJRVlZETEVOQlFWWXNSVUZCWVVNc1IwRkJZaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5ETEVkQlFXaERPenRCUVVWQkxFMUJRVWxPTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFYSkNMRVZCUVhkQ08wRkJRM1pDTEZOQlFVMHNTVUZCU1VNc1MwRkJTaXhEUVVGVkxHZEVRVUZXTEVOQlFVNDdRVUZEUVRzN1FVRkZSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1VNc1RVRkJUVlFzU1VGQlNVOHNUVUZCWkR0QlFVTkJSaXhwUWtGQlpTeFJRVUZSVEN4SlFVRkpWU3hOUVVGS0xFTkJRVmRFTEUxQlFVMHNRMEZCYWtJc1EwRkJVaXhIUVVFNFFpeERRVUU1UWl4SFFVRnJReXhSUVVGUlZDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4RFFVRnVSanM3UVVGRlFUdEJRVU5CU0N4UlFVRk5MRWxCUVVseVFpeEhRVUZLTEVOQlFWRmxMRWxCUVVsUExFMUJRVW9zUjBGQllTeERRVUZpTEVkQlFXbENMRU5CUVdwQ0xFZEJRWEZDUml4WlFVRTNRaXhEUVVGT096dEJRVVZCTzBGQlEwRkdMRTFCUVVsRkxHVkJRV1VzUTBGQlppeEhRVUZ0UWt3c1NVRkJTVThzVFVGQlNpeEhRVUZoTEVOQlFXaERMRWRCUVc5RFVDeEpRVUZKVHl4TlFVRTFRenM3UVVGRlFTeE5RVUZKU1N4SlFVRkpMRU5CUVZJN08wRkJSVUVzVjBGQlUwTXNTVUZCVkN4RFFVRmxReXhEUVVGbUxFVkJRV3RDTzBGQlEycENVQ3hQUVVGSlN5eEhRVUZLTEVsQlFWZEZMRU5CUVZnN1FVRkRRVHM3UVVGRlJDeFBRVUZMV2l4SlFVRkpMRU5CUVVvc1JVRkJUME1zU1VGQlNTeERRVUZvUWl4RlFVRnRRa1FzU1VGQlNVVXNRMEZCZGtJc1JVRkJNRUpHTEV0QlFVc3NRMEZCVEN4RlFVRlJReXhMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNwRFJTeFRRVUZQVWl4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRU5CUVZnc1EwRkJVQ3hMUVVGNVFpeEZRVUV4UWl4SFFVRnBRMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4TFFVRTJRaXhGUVVFNVJDeEhRVUZ4UlV3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RFFVRnNSeXhIUVVGMVIwd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hEUVVFM1J6dEJRVU5CVnl4UlFVRkxMRU5CUVVOU0xFMUJRVTBzVVVGQlVDeExRVUZ2UWl4RlFVRjZRanRCUVVOQlVTeFJRVUZMTEVOQlFVTlNMRTFCUVUwc1RVRkJVQ3hMUVVGclFpeERRVUYyUWp0QlFVTkJVU3hSUVVGTFVpeE5RVUZOTEVsQlFWZzdRVUZEUVRzN1FVRkZSQ3hOUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZEZGtKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFTkJRVEZDTEVkQlFXZERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVc1Rk8wRkJRMEZYTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQkxFZEJTRVFzVFVGSFR5eEpRVUZKUXl4cFFrRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkRPVUpFTEZOQlFVOVNMRTlCUVU5SkxFbEJRVWxWTEUxQlFVb3NRMEZCVjFRc1EwRkJXQ3hEUVVGUUxFdEJRWGxDTEVWQlFURkNMRWRCUVdsRFRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRVGxFTEVkQlFXOUZUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVhaSE8wRkJRMEZYTEZGQlFVMVNMRTlCUVU4c1EwRkJVaXhIUVVGaExFbEJRV3hDTzBGQlEwRlJMRkZCUVV0U0xFMUJRVTBzU1VGQldEdEJRVU5CT3p0QlFVVkVMRk5CUVU5RkxFZEJRVkE3UVVGRFFUczdRVUZGUkN4VlFVRlRVU3hoUVVGVUxFTkJRWGRDUXl4TFFVRjRRaXhGUVVFclFqdEJRVU01UWl4TlFVRkpaQ3hEUVVGS08wRkJRVUVzVFVGRFEyVXNZVUZCWVVRc1RVRkJUVklzVFVGQlRpeEhRVUZsTEVOQlJEZENPMEZCUVVFc1RVRkRaME03UVVGREwwSlZMRmRCUVZNc1JVRkdWanRCUVVGQkxFMUJSME5ETEVsQlNFUTdRVUZCUVN4TlFVZFBXQ3hOUVVoUU96dEJRVXRCTEZkQlFWTlpMRTFCUVZRc1EwRkJhVUpETEVkQlFXcENMRVZCUVhOQ08wRkJRM0pDTEZWQlFVOXlReXhQUVVGUE1rSXNUVUZCVUN4RFFVRmpWU3hIUVVGa0xFTkJRVkE3UVVGRFFUczdRVUZGUkN4WFFVRlRReXhsUVVGVUxFTkJRVEJDUkN4SFFVRXhRaXhGUVVFclFqdEJRVU01UWl4VlFVRlBSQ3hQUVVGUFF5eFBRVUZQTEVWQlFWQXNSMEZCV1N4SlFVRnVRaXhKUVVFeVFrUXNUMEZCVDBNc1QwRkJUeXhGUVVGUUxFZEJRVmtzU1VGQmJrSXNRMEZCTTBJc1IwRkJjMFJFTEU5QlFVOURMRTlCUVU4c1EwRkJVQ3hIUVVGWExFbEJRV3hDTEVOQlFYUkVMRWRCUVdkR1JDeFBRVUZQUXl4TlFVRk5MRWxCUVdJc1EwRkJka1k3UVVGRFFUczdRVUZGUkR0QlFVTkJMRTlCUVV0dVFpeEpRVUZKTEVOQlFVb3NSVUZCVDAwc1UwRkJVMUVzVFVGQlRWSXNUVUZCVGl4SFFVRmxVeXhWUVVGd1F5eEZRVUZuUkdZc1NVRkJTVTBzVFVGQmNFUXNSVUZCTkVST0xFdEJRVXNzUTBGQmFrVXNSVUZCYjBVN1FVRkRia1ZwUWl4VlFVRlBMRU5CUVVOSUxFMUJRVTFrTEVOQlFVNHNTMEZCV1N4RlFVRmlMRXRCUVc5Q1l5eE5RVUZOWkN4SlFVRkpMRU5CUVZZc1MwRkJaMElzUTBGQmNFTXNTVUZCTUVOakxFMUJRVTFrTEVsQlFVa3NRMEZCVml4RFFVRnFSRHRCUVVOQlowSXNZVUZCVlVrc1owSkJRV2RDU0N4SlFVRm9RaXhEUVVGV08wRkJRMEU3TzBGQlJVUTdRVUZEUVN4VlFVRlJSaXhWUVVGU08wRkJRME1zVVVGQlN5eERRVUZNTzBGQlEwTkZMRmRCUVU5SUxFMUJRVTFCTEUxQlFVMVNMRTFCUVU0c1IwRkJaU3hEUVVGeVFpeERRVUZRTzBGQlEwRlZMR05CUVZWRkxFOUJRVTlFTEZGQlFWRXNRMEZCWml4RFFVRldPMEZCUTBGRUxHTkJRVlZGTEU5QlFWRkVMRkZCUVZFc1EwRkJWQ3hIUVVGakxFbEJRWEpDTEVOQlFWWTdRVUZEUVVRc1kwRkJWU3hKUVVGV08wRkJRMEU3UVVGRFJDeFJRVUZMTEVOQlFVdzdRVUZEUTBNc1YwRkJUeXhEUVVGRFNDeE5RVUZOUVN4TlFVRk5VaXhOUVVGT0xFZEJRV1VzUTBGQmNrSXNTMEZCTWtJc1EwRkJOVUlzU1VGQmEwTlJMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGNlF6dEJRVU5CVlN4alFVRlZSU3hQUVVGUFJDeFJRVUZSTEVWQlFXWXNRMEZCVmp0QlFVTkJSQ3hqUVVGVlJTeFBRVUZSUkN4UlFVRlJMRU5CUVZRc1IwRkJZeXhKUVVGeVFpeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SFFVRldPMEZCUTBFN1FVRmlSanM3UVVGblFrRXNVMEZCVDBFc1RVRkJVRHRCUVVOQk96dEJRVVZFYWtNc1UwRkJVWE5ETEZkQlFWSXNSMEZCYzBKMlFpeGpRVUYwUWp0QlFVTkJaaXhUUVVGUmRVTXNZVUZCVWl4SFFVRjNRbFFzWVVGQmVFSTdRVUZEUVN4RFFYcElReXhGUVhsSVFTeFBRVUZQT1VJc1QwRkJVQ3hMUVVGdFFpeFhRVUZ1UWl4SFFVRnJReXhWUVVGTGQwTXNVVUZCVEN4SFFVRm5RaXhGUVVGc1JDeEhRVUYzUkhoRExFOUJla2g0UkN4RFFVRkVJaXdpWm1sc1pTSTZJbUkyTkM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCc2IyOXJkWEFnUFNBblFVSkRSRVZHUjBoSlNrdE1UVTVQVUZGU1UxUlZWbGRZV1ZwaFltTmtaV1puYUdscWEyeHRibTl3Y1hKemRIVjJkM2g1ZWpBeE1qTTBOVFkzT0Rrckx5YzdYRzVjYmpzb1puVnVZM1JwYjI0Z0tHVjRjRzl5ZEhNcElIdGNibHgwSjNWelpTQnpkSEpwWTNRbk8xeHVYRzRnSUhaaGNpQkJjbklnUFNBb2RIbHdaVzltSUZWcGJuUTRRWEp5WVhrZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1Z4dUlDQWdJRDhnVldsdWREaEJjbkpoZVZ4dUlDQWdJRG9nUVhKeVlYbGNibHh1WEhSMllYSWdVRXhWVXlBZ0lEMGdKeXNuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JSUNBOUlDY3ZKeTVqYUdGeVEyOWtaVUYwS0RBcFhHNWNkSFpoY2lCT1ZVMUNSVklnUFNBbk1DY3VZMmhoY2tOdlpHVkJkQ2d3S1Z4dVhIUjJZWElnVEU5WFJWSWdJRDBnSjJFbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRlZRVUVWU0lDQTlJQ2RCSnk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQlFURlZUWDFWU1RGOVRRVVpGSUQwZ0p5MG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZOTVFWTklYMVZTVEY5VFFVWkZJRDBnSjE4bkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4dVhIUm1kVzVqZEdsdmJpQmtaV052WkdVZ0tHVnNkQ2tnZTF4dVhIUmNkSFpoY2lCamIyUmxJRDBnWld4MExtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MFhIUnBaaUFvWTI5a1pTQTlQVDBnVUV4VlV5QjhmRnh1WEhSY2RDQWdJQ0JqYjJSbElEMDlQU0JRVEZWVFgxVlNURjlUUVVaRktWeHVYSFJjZEZ4MGNtVjBkWEp1SURZeUlDOHZJQ2NySjF4dVhIUmNkR2xtSUNoamIyUmxJRDA5UFNCVFRFRlRTQ0I4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCVFRFRlRTRjlWVWt4ZlUwRkdSU2xjYmx4MFhIUmNkSEpsZEhWeWJpQTJNeUF2THlBbkx5ZGNibHgwWEhScFppQW9ZMjlrWlNBOElFNVZUVUpGVWlsY2JseDBYSFJjZEhKbGRIVnliaUF0TVNBdkwyNXZJRzFoZEdOb1hHNWNkRngwYVdZZ0tHTnZaR1VnUENCT1ZVMUNSVklnS3lBeE1DbGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxJQzBnVGxWTlFrVlNJQ3NnTWpZZ0t5QXlObHh1WEhSY2RHbG1JQ2hqYjJSbElEd2dWVkJRUlZJZ0t5QXlOaWxjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1ZWQlFSVkpjYmx4MFhIUnBaaUFvWTI5a1pTQThJRXhQVjBWU0lDc2dNallwWEc1Y2RGeDBYSFJ5WlhSMWNtNGdZMjlrWlNBdElFeFBWMFZTSUNzZ01qWmNibHgwZlZ4dVhHNWNkR1oxYm1OMGFXOXVJR0kyTkZSdlFubDBaVUZ5Y21GNUlDaGlOalFwSUh0Y2JseDBYSFIyWVhJZ2FTd2dhaXdnYkN3Z2RHMXdMQ0J3YkdGalpVaHZiR1JsY25Nc0lHRnljbHh1WEc1Y2RGeDBhV1lnS0dJMk5DNXNaVzVuZEdnZ0pTQTBJRDRnTUNrZ2UxeHVYSFJjZEZ4MGRHaHliM2NnYm1WM0lFVnljbTl5S0NkSmJuWmhiR2xrSUhOMGNtbHVaeTRnVEdWdVozUm9JRzExYzNRZ1ltVWdZU0J0ZFd4MGFYQnNaU0J2WmlBMEp5bGNibHgwWEhSOVhHNWNibHgwWEhRdkx5QjBhR1VnYm5WdFltVnlJRzltSUdWeGRXRnNJSE5wWjI1eklDaHdiR0ZqWlNCb2IyeGtaWEp6S1Z4dVhIUmNkQzh2SUdsbUlIUm9aWEpsSUdGeVpTQjBkMjhnY0d4aFkyVm9iMnhrWlhKekxDQjBhR0Z1SUhSb1pTQjBkMjhnWTJoaGNtRmpkR1Z5Y3lCaVpXWnZjbVVnYVhSY2JseDBYSFF2THlCeVpYQnlaWE5sYm5RZ2IyNWxJR0o1ZEdWY2JseDBYSFF2THlCcFppQjBhR1Z5WlNCcGN5QnZibXg1SUc5dVpTd2dkR2hsYmlCMGFHVWdkR2h5WldVZ1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUWdjbVZ3Y21WelpXNTBJRElnWW5sMFpYTmNibHgwWEhRdkx5QjBhR2x6SUdseklHcDFjM1FnWVNCamFHVmhjQ0JvWVdOcklIUnZJRzV2ZENCa2J5QnBibVJsZUU5bUlIUjNhV05sWEc1Y2RGeDBkbUZ5SUd4bGJpQTlJR0kyTkM1c1pXNW5kR2hjYmx4MFhIUndiR0ZqWlVodmJHUmxjbk1nUFNBblBTY2dQVDA5SUdJMk5DNWphR0Z5UVhRb2JHVnVJQzBnTWlrZ1B5QXlJRG9nSnowbklEMDlQU0JpTmpRdVkyaGhja0YwS0d4bGJpQXRJREVwSUQ4Z01TQTZJREJjYmx4dVhIUmNkQzh2SUdKaGMyVTJOQ0JwY3lBMEx6TWdLeUIxY0NCMGJ5QjBkMjhnWTJoaGNtRmpkR1Z5Y3lCdlppQjBhR1VnYjNKcFoybHVZV3dnWkdGMFlWeHVYSFJjZEdGeWNpQTlJRzVsZHlCQmNuSW9ZalkwTG14bGJtZDBhQ0FxSURNZ0x5QTBJQzBnY0d4aFkyVkliMnhrWlhKektWeHVYRzVjZEZ4MEx5OGdhV1lnZEdobGNtVWdZWEpsSUhCc1lXTmxhRzlzWkdWeWN5d2diMjVzZVNCblpYUWdkWEFnZEc4Z2RHaGxJR3hoYzNRZ1kyOXRjR3hsZEdVZ05DQmphR0Z5YzF4dVhIUmNkR3dnUFNCd2JHRmpaVWh2YkdSbGNuTWdQaUF3SUQ4Z1lqWTBMbXhsYm1kMGFDQXRJRFFnT2lCaU5qUXViR1Z1WjNSb1hHNWNibHgwWEhSMllYSWdUQ0E5SURCY2JseHVYSFJjZEdaMWJtTjBhVzl1SUhCMWMyZ2dLSFlwSUh0Y2JseDBYSFJjZEdGeWNsdE1LeXRkSUQwZ2RseHVYSFJjZEgxY2JseHVYSFJjZEdadmNpQW9hU0E5SURBc0lHb2dQU0F3T3lCcElEd2diRHNnYVNBclBTQTBMQ0JxSUNzOUlETXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UZ3BJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z01USXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXlLU2tnUER3Z05pa2dmQ0JrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ015a3BYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXdNQ2tnUGo0Z01UWXBYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXBJRDQrSURncFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmVnh1WEc1Y2RGeDBhV1lnS0hCc1lXTmxTRzlzWkdWeWN5QTlQVDBnTWlrZ2UxeHVYSFJjZEZ4MGRHMXdJRDBnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drcEtTQThQQ0F5S1NCOElDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBJQ3NnTVNrcElENCtJRFFwWEc1Y2RGeDBYSFJ3ZFhOb0tIUnRjQ0FtSURCNFJrWXBYRzVjZEZ4MGZTQmxiSE5sSUdsbUlDaHdiR0ZqWlVodmJHUmxjbk1nUFQwOUlERXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UQXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z05Da2dmQ0FvWkdWamIyUmxLR0kyTkM1amFHRnlRWFFvYVNBcklESXBLU0ErUGlBeUtWeHVYSFJjZEZ4MGNIVnphQ2dvZEcxd0lENCtJRGdwSUNZZ01IaEdSaWxjYmx4MFhIUmNkSEIxYzJnb2RHMXdJQ1lnTUhoR1JpbGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnWVhKeVhHNWNkSDFjYmx4dVhIUm1kVzVqZEdsdmJpQjFhVzUwT0ZSdlFtRnpaVFkwSUNoMWFXNTBPQ2tnZTF4dVhIUmNkSFpoY2lCcExGeHVYSFJjZEZ4MFpYaDBjbUZDZVhSbGN5QTlJSFZwYm5RNExteGxibWQwYUNBbElETXNJQzh2SUdsbUlIZGxJR2hoZG1VZ01TQmllWFJsSUd4bFpuUXNJSEJoWkNBeUlHSjVkR1Z6WEc1Y2RGeDBYSFJ2ZFhSd2RYUWdQU0JjSWx3aUxGeHVYSFJjZEZ4MGRHVnRjQ3dnYkdWdVozUm9YRzVjYmx4MFhIUm1kVzVqZEdsdmJpQmxibU52WkdVZ0tHNTFiU2tnZTF4dVhIUmNkRngwY21WMGRYSnVJR3h2YjJ0MWNDNWphR0Z5UVhRb2JuVnRLVnh1WEhSY2RIMWNibHh1WEhSY2RHWjFibU4wYVc5dUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNBb2JuVnRLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdaVzVqYjJSbEtHNTFiU0ErUGlBeE9DQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBeE1pQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBMklDWWdNSGd6UmlrZ0t5QmxibU52WkdVb2JuVnRJQ1lnTUhnelJpbGNibHgwWEhSOVhHNWNibHgwWEhRdkx5Qm5ieUIwYUhKdmRXZG9JSFJvWlNCaGNuSmhlU0JsZG1WeWVTQjBhSEpsWlNCaWVYUmxjeXdnZDJVbmJHd2daR1ZoYkNCM2FYUm9JSFJ5WVdsc2FXNW5JSE4wZFdabUlHeGhkR1Z5WEc1Y2RGeDBabTl5SUNocElEMGdNQ3dnYkdWdVozUm9JRDBnZFdsdWREZ3ViR1Z1WjNSb0lDMGdaWGgwY21GQ2VYUmxjenNnYVNBOElHeGxibWQwYURzZ2FTQXJQU0F6S1NCN1hHNWNkRngwWEhSMFpXMXdJRDBnS0hWcGJuUTRXMmxkSUR3OElERTJLU0FySUNoMWFXNTBPRnRwSUNzZ01WMGdQRHdnT0NrZ0t5QW9kV2x1ZERoYmFTQXJJREpkS1Z4dVhIUmNkRngwYjNWMGNIVjBJQ3M5SUhSeWFYQnNaWFJVYjBKaGMyVTJOQ2gwWlcxd0tWeHVYSFJjZEgxY2JseHVYSFJjZEM4dklIQmhaQ0IwYUdVZ1pXNWtJSGRwZEdnZ2VtVnliM01zSUdKMWRDQnRZV3RsSUhOMWNtVWdkRzhnYm05MElHWnZjbWRsZENCMGFHVWdaWGgwY21FZ1lubDBaWE5jYmx4MFhIUnpkMmwwWTJnZ0tHVjRkSEpoUW5sMFpYTXBJSHRjYmx4MFhIUmNkR05oYzJVZ01UcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlIVnBiblE0VzNWcGJuUTRMbXhsYm1kMGFDQXRJREZkWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNCbGJtTnZaR1VvZEdWdGNDQStQaUF5S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRHc4SURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlDYzlQU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSY2RHTmhjMlVnTWpwY2JseDBYSFJjZEZ4MGRHVnRjQ0E5SUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXlYU0E4UENBNEtTQXJJQ2gxYVc1ME9GdDFhVzUwT0M1c1pXNW5kR2dnTFNBeFhTbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJR1Z1WTI5a1pTaDBaVzF3SUQ0K0lERXdLVnh1WEhSY2RGeDBYSFJ2ZFhSd2RYUWdLejBnWlc1amIyUmxLQ2gwWlcxd0lENCtJRFFwSUNZZ01IZ3pSaWxjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2dvZEdWdGNDQThQQ0F5S1NBbUlEQjRNMFlwWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNBblBTZGNibHgwWEhSY2RGeDBZbkpsWVd0Y2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdiM1YwY0hWMFhHNWNkSDFjYmx4dVhIUmxlSEJ2Y25SekxuUnZRbmwwWlVGeWNtRjVJRDBnWWpZMFZHOUNlWFJsUVhKeVlYbGNibHgwWlhod2IzSjBjeTVtY205dFFubDBaVUZ5Y21GNUlEMGdkV2x1ZERoVWIwSmhjMlUyTkZ4dWZTaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlBb2RHaHBjeTVpWVhObE5qUnFjeUE5SUh0OUtTQTZJR1Y0Y0c5eWRITXBLVnh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlxcXFxiNjQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKTtcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpO1xuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MDtcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTI7XG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApO1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gNDI7XG4gICAgfTtcbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJiB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nOyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSgpO1xuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pO1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1YmplY3QpO1xuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdCk7XG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSc7XG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGg7XG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpO2Vsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZyk7ZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCk7IC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpO1xuXG4gIHZhciBidWY7XG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXM7XG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aDtcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSkgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSk7ZWxzZSBidWZbaV0gPSBzdWJqZWN0W2ldO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZyk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcik7XG59O1xuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXQ7XG4gIHN0ciA9IHN0ciArICcnO1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKTtcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKTtcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aCk7XG4gIHZhciBwb3MgPSAwO1xuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpO1xuICAgIHBvcyArPSBpdGVtLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gYnVmO1xufTtcblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMDtcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aDtcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKTtcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDI7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZTtcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyO1xuICByZXR1cm4gaTtcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aDtcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG9mZnNldDtcbiAgICBvZmZzZXQgPSBsZW5ndGg7XG4gICAgbGVuZ3RoID0gc3dhcDtcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIHJldDtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwO1xuICBlbmQgPSBlbmQgIT09IHVuZGVmaW5lZCA/IE51bWJlcihlbmQpIDogZW5kID0gc2VsZi5sZW5ndGg7XG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuICcnO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH07XG59O1xuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMDtcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0Jyk7XG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLCAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydCkgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0O1xuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIHRtcCA9ICcnO1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICAgIHRtcCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKTtcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gIH1yZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDA7XG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW47XG5cbiAgdmFyIG91dCA9ICcnO1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMCk7XG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pO1xuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydDtcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZjtcbiAgfVxufTtcblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpO1xufTtcblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF07XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgODtcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWw7XG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDg7XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgM107XG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMTtlbHNlIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWREb3VibGUoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgMHhmZiA8PCA4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDg7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZik7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSB2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4ICYgMHhmZjtcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KTtlbHNlIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMDtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGg7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJyk7XG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpO1xuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuO1xuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZTtcbiAgfVxufTtcblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pO1xuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLic7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiBuZXcgQnVmZmVyKHRoaXMpLmJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXTtcbiAgICAgIH1yZXR1cm4gYnVmLmJ1ZmZlcjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpO1xuICB9XG59O1xuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0oc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKCk7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlO1xuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZTtcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0O1xuICBhcnIuX3NldCA9IGFyci5zZXQ7XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldDtcbiAgYXJyLnNldCA9IEJQLnNldDtcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZTtcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmc7XG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9KU09OID0gQlAudG9KU09OO1xuICBhcnIuY29weSA9IEJQLmNvcHk7XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlO1xuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4O1xuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFO1xuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFO1xuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFO1xuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFO1xuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50ODtcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEU7XG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFO1xuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRTtcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkU7XG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFO1xuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRTtcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRTtcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRTtcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4O1xuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEU7XG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRTtcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFO1xuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkU7XG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDg7XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEU7XG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkU7XG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEU7XG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkU7XG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEU7XG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkU7XG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRTtcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFO1xuICBhcnIuZmlsbCA9IEJQLmZpbGw7XG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdDtcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyO1xuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICBpbmRleCA9IH5+aW5kZXg7IC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICBpbmRleCArPSBsZW47XG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXg7XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBjb2VyY2UobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aCk7XG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheShzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH0pKHN1YmplY3QpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8IHN1YmplY3QgJiYgKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIHRvSGV4KG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpO1xuICByZXR1cm4gbi50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYiA8PSAweDdGKSBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSk7ZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpO1xuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKys7XG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkgKyAxKSkuc3Vic3RyKDEpLnNwbGl0KCclJyk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKTtcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGMsIGhpLCBsbztcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoaSA9IGMgPj4gODtcbiAgICBsbyA9IGMgJSAyNTY7XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pO1xuICAgIGJ5dGVBcnJheS5wdXNoKGhpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKTtcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlcihzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGggfHwgaSA+PSBzcmMubGVuZ3RoKSBicmVhaztcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV07XG4gIH1cbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTsgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG59XG5cbmZ1bmN0aW9uIGFzc2VydCh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbUpoYzJVMk5DSXNJbkpsY1hWcGNtVWlMQ0pwWldWbE56VTBJaXdpWlhod2IzSjBjeUlzSWtKMVptWmxjaUlzSWxOc2IzZENkV1ptWlhJaUxDSkpUbE5RUlVOVVgwMUJXRjlDV1ZSRlV5SXNJbkJ2YjJ4VGFYcGxJaXdpWDNWelpWUjVjR1ZrUVhKeVlYbHpJaXdpWW5WbUlpd2lRWEp5WVhsQ2RXWm1aWElpTENKaGNuSWlMQ0pWYVc1ME9FRnljbUY1SWl3aVptOXZJaXdpYzNWaVlYSnlZWGtpTENKbElpd2ljM1ZpYW1WamRDSXNJbVZ1WTI5a2FXNW5JaXdpYm05YVpYSnZJaXdpZEhsd1pTSXNJbk4wY21sdVozUnlhVzBpTENKc1pXNW5kR2dpTENKamIyVnlZMlVpTENKaWVYUmxUR1Z1WjNSb0lpd2lSWEp5YjNJaUxDSmZZWFZuYldWdWRDSXNJbDlwYzBKMVptWmxjaUlzSW1raUxDSmZjMlYwSWl3aWFYTkJjbkpoZVdsemFDSXNJbWx6UW5WbVptVnlJaXdpY21WaFpGVkpiblE0SWl3aWQzSnBkR1VpTENKcGMwVnVZMjlrYVc1bklpd2lVM1J5YVc1bklpd2lkRzlNYjNkbGNrTmhjMlVpTENKaUlpd2lkVzVrWldacGJtVmtJaXdpYzNSeUlpd2ljbVYwSWl3aWRYUm1PRlJ2UW5sMFpYTWlMQ0ppWVhObE5qUlViMEo1ZEdWeklpd2lZMjl1WTJGMElpd2liR2x6ZENJc0luUnZkR0ZzVEdWdVozUm9JaXdpWVhOelpYSjBJaXdpYVhOQmNuSmhlU0lzSW5CdmN5SXNJbWwwWlcwaUxDSmpiM0I1SWl3aVgyaGxlRmR5YVhSbElpd2ljM1J5YVc1bklpd2liMlptYzJWMElpd2lUblZ0WW1WeUlpd2ljbVZ0WVdsdWFXNW5JaXdpYzNSeVRHVnVJaXdpWW5sMFpTSXNJbkJoY25ObFNXNTBJaXdpYzNWaWMzUnlJaXdpYVhOT1lVNGlMQ0pmWTJoaGNuTlhjbWwwZEdWdUlpd2lYM1YwWmpoWGNtbDBaU0lzSW1Ob1lYSnpWM0pwZEhSbGJpSXNJbUpzYVhSQ2RXWm1aWElpTENKZllYTmphV2xYY21sMFpTSXNJbUZ6WTJscFZHOUNlWFJsY3lJc0lsOWlhVzVoY25sWGNtbDBaU0lzSWw5aVlYTmxOalJYY21sMFpTSXNJbDkxZEdZeE5teGxWM0pwZEdVaUxDSjFkR1l4Tm14bFZHOUNlWFJsY3lJc0luQnliM1J2ZEhsd1pTSXNJbWx6Um1sdWFYUmxJaXdpYzNkaGNDSXNJblJ2VTNSeWFXNW5JaXdpYzNSaGNuUWlMQ0psYm1RaUxDSnpaV3htSWl3aVgyaGxlRk5zYVdObElpd2lYM1YwWmpoVGJHbGpaU0lzSWw5aGMyTnBhVk5zYVdObElpd2lYMkpwYm1GeWVWTnNhV05sSWl3aVgySmhjMlUyTkZOc2FXTmxJaXdpWDNWMFpqRTJiR1ZUYkdsalpTSXNJblJ2U2xOUFRpSXNJbVJoZEdFaUxDSkJjbkpoZVNJc0luTnNhV05sSWl3aVkyRnNiQ0lzSWw5aGNuSWlMQ0owWVhKblpYUWlMQ0owWVhKblpYUmZjM1JoY25RaUxDSnpiM1Z5WTJVaUxDSnNaVzRpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpY21Weklpd2lkRzF3SWl3aVRXRjBhQ0lzSW0xcGJpSXNJbVJsWTI5a1pWVjBaamhEYUdGeUlpd2labkp2YlVOb1lYSkRiMlJsSWl3aWIzVjBJaXdpZEc5SVpYZ2lMQ0ppZVhSbGN5SXNJbU5zWVcxd0lpd2ljMnhwWTJWTVpXNGlMQ0p1WlhkQ2RXWWlMQ0puWlhRaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWMyVjBJaXdpZGlJc0luZHlhWFJsVlVsdWREZ2lMQ0p1YjBGemMyVnlkQ0lzSWw5eVpXRmtWVWx1ZERFMklpd2liR2wwZEd4bFJXNWthV0Z1SWl3aWRtRnNJaXdpY21WaFpGVkpiblF4Tmt4Rklpd2ljbVZoWkZWSmJuUXhOa0pGSWl3aVgzSmxZV1JWU1c1ME16SWlMQ0p5WldGa1ZVbHVkRE15VEVVaUxDSnlaV0ZrVlVsdWRETXlRa1VpTENKeVpXRmtTVzUwT0NJc0ltNWxaeUlzSWw5eVpXRmtTVzUwTVRZaUxDSnlaV0ZrU1c1ME1UWk1SU0lzSW5KbFlXUkpiblF4TmtKRklpd2lYM0psWVdSSmJuUXpNaUlzSW5KbFlXUkpiblF6TWt4Rklpd2ljbVZoWkVsdWRETXlRa1VpTENKZmNtVmhaRVpzYjJGMElpd2ljbVZoWkNJc0luSmxZV1JHYkc5aGRFeEZJaXdpY21WaFpFWnNiMkYwUWtVaUxDSmZjbVZoWkVSdmRXSnNaU0lzSW5KbFlXUkViM1ZpYkdWTVJTSXNJbkpsWVdSRWIzVmliR1ZDUlNJc0luWmhiSFZsSWl3aWRtVnlhV1oxYVc1MElpd2lYM2R5YVhSbFZVbHVkREUySWl3aWFpSXNJbmR5YVhSbFZVbHVkREUyVEVVaUxDSjNjbWwwWlZWSmJuUXhOa0pGSWl3aVgzZHlhWFJsVlVsdWRETXlJaXdpZDNKcGRHVlZTVzUwTXpKTVJTSXNJbmR5YVhSbFZVbHVkRE15UWtVaUxDSjNjbWwwWlVsdWREZ2lMQ0oyWlhKcFpuTnBiblFpTENKZmQzSnBkR1ZKYm5ReE5pSXNJbmR5YVhSbFNXNTBNVFpNUlNJc0luZHlhWFJsU1c1ME1UWkNSU0lzSWw5M2NtbDBaVWx1ZERNeUlpd2lkM0pwZEdWSmJuUXpNa3hGSWl3aWQzSnBkR1ZKYm5Rek1rSkZJaXdpWDNkeWFYUmxSbXh2WVhRaUxDSjJaWEpwWmtsRlJVVTNOVFFpTENKM2NtbDBaVVpzYjJGMFRFVWlMQ0ozY21sMFpVWnNiMkYwUWtVaUxDSmZkM0pwZEdWRWIzVmliR1VpTENKM2NtbDBaVVJ2ZFdKc1pVeEZJaXdpZDNKcGRHVkViM1ZpYkdWQ1JTSXNJbVpwYkd3aUxDSmphR0Z5UTI5a1pVRjBJaXdpYVc1emNHVmpkQ0lzSW1wdmFXNGlMQ0owYjBGeWNtRjVRblZtWm1WeUlpd2lZblZtWm1WeUlpd2lkSEpwYlNJc0luSmxjR3hoWTJVaUxDSkNVQ0lzSWw5blpYUWlMQ0owYjB4dlkyRnNaVk4wY21sdVp5SXNJbWx1WkdWNElpd2laR1ZtWVhWc2RGWmhiSFZsSWl3aVkyVnBiQ0lzSWs5aWFtVmpkQ0lzSW00aUxDSmllWFJsUVhKeVlYa2lMQ0p3ZFhOb0lpd2lhQ0lzSW1WdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0luTndiR2wwSWl3aVl5SXNJbWhwSWl3aWJHOGlMQ0owYjBKNWRHVkJjbkpoZVNJc0luTnlZeUlzSW1SemRDSXNJbVJsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ0lzSW1WeWNpSXNJbTFoZUNJc0ltWnNiMjl5SWl3aWRHVnpkQ0lzSW0xbGMzTmhaMlVpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3UVVGQlFUczdPenM3T3p0QlFVOUJMRWxCUVVsQkxGTkJRVk5ETEZGQlFWRXNWMEZCVWl4RFFVRmlPMEZCUTBFc1NVRkJTVU1zVlVGQlZVUXNVVUZCVVN4VFFVRlNMRU5CUVdRN08wRkJSVUZGTEZGQlFWRkRMRTFCUVZJc1IwRkJhVUpCTEUxQlFXcENPMEZCUTBGRUxGRkJRVkZGTEZWQlFWSXNSMEZCY1VKRUxFMUJRWEpDTzBGQlEwRkVMRkZCUVZGSExHbENRVUZTTEVkQlFUUkNMRVZCUVRWQ08wRkJRMEZHTEU5QlFVOUhMRkZCUVZBc1IwRkJhMElzU1VGQmJFSTdPMEZCUlVFN096czdPMEZCUzBGSUxFOUJRVTlKTEdWQlFWQXNSMEZCTUVJc1dVRkJXVHRCUVVOd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTVHRCUVVOR0xGRkJRVWxETEUxQlFVMHNTVUZCU1VNc1YwRkJTaXhEUVVGblFpeERRVUZvUWl4RFFVRldPMEZCUTBFc1VVRkJTVU1zVFVGQlRTeEpRVUZKUXl4VlFVRktMRU5CUVdWSUxFZEJRV1lzUTBGQlZqdEJRVU5CUlN4UlFVRkpSU3hIUVVGS0xFZEJRVlVzV1VGQldUdEJRVUZGTEdGQlFVOHNSVUZCVUR0QlFVRlhMRXRCUVc1RE8wRkJRMEVzVjBGQlR5eFBRVUZQUml4SlFVRkpSU3hIUVVGS0xFVkJRVkFzU1VGRFNDeFBRVUZQUml4SlFVRkpSeXhSUVVGWUxFdEJRWGRDTEZWQlJEVkNMRU5CU2tVc1EwRkxjVU03UVVGRGVFTXNSMEZPUkN4RFFVMUZMRTlCUVU5RExFTkJRVkFzUlVGQlZUdEJRVU5XTEZkQlFVOHNTMEZCVUR0QlFVTkVPMEZCUTBZc1EwRm1kMElzUlVGQmVrSTdPMEZCYVVKQk96czdPenM3T3pzN096czdRVUZaUVN4VFFVRlRXQ3hOUVVGVUxFTkJRV2xDV1N4UFFVRnFRaXhGUVVFd1FrTXNVVUZCTVVJc1JVRkJiME5ETEUxQlFYQkRMRVZCUVRSRE8wRkJRekZETEUxQlFVa3NSVUZCUlN4blFrRkJaMEprTEUxQlFXeENMRU5CUVVvc1JVRkRSU3hQUVVGUExFbEJRVWxCTEUxQlFVb3NRMEZCVjFrc1QwRkJXQ3hGUVVGdlFrTXNVVUZCY0VJc1JVRkJPRUpETEUxQlFUbENMRU5CUVZBN08wRkJSVVlzVFVGQlNVTXNZMEZCWTBnc1QwRkJaQ3g1UTBGQlkwRXNUMEZCWkN4RFFVRktPenRCUVVWQk8wRkJRMEU3UVVGRFFTeE5RVUZKUXl4aFFVRmhMRkZCUVdJc1NVRkJlVUpGTEZOQlFWTXNVVUZCZEVNc1JVRkJaMFE3UVVGRE9VTklMR05CUVZWSkxGZEJRVmRLTEU5QlFWZ3NRMEZCVmp0QlFVTkJMRmRCUVU5QkxGRkJRVkZMTEUxQlFWSXNSMEZCYVVJc1EwRkJha0lzUzBGQmRVSXNRMEZCT1VJc1JVRkJhVU03UVVGREwwSk1MR2RDUVVGVlFTeFZRVUZWTEVkQlFYQkNPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbExMRTFCUVVvN1FVRkRRU3hOUVVGSlJpeFRRVUZUTEZGQlFXSXNSVUZEUlVVc1UwRkJVME1zVDBGQlQwNHNUMEZCVUN4RFFVRlVMRU5CUkVZc1MwRkZTeXhKUVVGSlJ5eFRRVUZUTEZGQlFXSXNSVUZEU0VVc1UwRkJVMnBDTEU5QlFVOXRRaXhWUVVGUUxFTkJRV3RDVUN4UFFVRnNRaXhGUVVFeVFrTXNVVUZCTTBJc1EwRkJWQ3hEUVVSSExFdEJSVUVzU1VGQlNVVXNVMEZCVXl4UlFVRmlMRVZCUTBoRkxGTkJRVk5ETEU5QlFVOU9MRkZCUVZGTExFMUJRV1lzUTBGQlZDeERRVVJITEVOQlF6WkNPMEZCUkRkQ0xFOUJSMGdzVFVGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2RVUkJRVllzUTBGQlRqczdRVUZGUml4TlFVRkpaaXhIUVVGS08wRkJRMEVzVFVGQlNVd3NUMEZCVDBrc1pVRkJXQ3hGUVVFMFFqdEJRVU14UWp0QlFVTkJReXhWUVVGTlRDeFBRVUZQY1VJc1VVRkJVQ3hEUVVGblFpeEpRVUZKWWl4VlFVRktMRU5CUVdWVExFMUJRV1lzUTBGQmFFSXNRMEZCVGp0QlFVTkVMRWRCU0VRc1RVRkhUenRCUVVOTU8wRkJRMEZhTEZWQlFVMHNTVUZCVGp0QlFVTkJRU3hSUVVGSldTeE5RVUZLTEVkQlFXRkJMRTFCUVdJN1FVRkRRVm9zVVVGQlNXbENMRk5CUVVvc1IwRkJaMElzU1VGQmFFSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSlF5eERRVUZLTzBGQlEwRXNUVUZCU1haQ0xFOUJRVTlKTEdWQlFWQXNTVUZCTUVJc1QwRkJUMUVzVVVGQlVVOHNWVUZCWml4TFFVRTRRaXhSUVVFMVJDeEZRVUZ6UlR0QlFVTndSVHRCUVVOQlpDeFJRVUZKYlVJc1NVRkJTaXhEUVVGVFdpeFBRVUZVTzBGQlEwUXNSMEZJUkN4TlFVZFBMRWxCUVVsaExGZEJRVmRpTEU5QlFWZ3NRMEZCU2l4RlFVRjVRanRCUVVNNVFqdEJRVU5CTEZOQlFVdFhMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSXNWVUZCU1haQ0xFOUJRVTh3UWl4UlFVRlFMRU5CUVdkQ1pDeFBRVUZvUWl4RFFVRktMRVZCUTBWUUxFbEJRVWxyUWl4RFFVRktMRWxCUVZOWUxGRkJRVkZsTEZOQlFWSXNRMEZCYTBKS0xFTkJRV3hDTEVOQlFWUXNRMEZFUml4TFFVZEZiRUlzU1VGQlNXdENMRU5CUVVvc1NVRkJVMWdzVVVGQlVWY3NRMEZCVWl4RFFVRlVPMEZCUTBnN1FVRkRSaXhIUVZKTkxFMUJVVUVzU1VGQlNWSXNVMEZCVXl4UlFVRmlMRVZCUVhWQ08wRkJRelZDVml4UlFVRkpkVUlzUzBGQlNpeERRVUZWYUVJc1QwRkJWaXhGUVVGdFFpeERRVUZ1UWl4RlFVRnpRa01zVVVGQmRFSTdRVUZEUkN4SFFVWk5MRTFCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZVTEVsQlFYRkNMRU5CUVVObUxFOUJRVTlKTEdWQlFUZENMRWxCUVdkRUxFTkJRVU5WTEUxQlFYSkVMRVZCUVRaRU8wRkJRMnhGTEZOQlFVdFRMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSnNRaXhWUVVGSmEwSXNRMEZCU2l4SlFVRlRMRU5CUVZRN1FVRkRSRHRCUVVOR096dEJRVVZFTEZOQlFVOXNRaXhIUVVGUU8wRkJRMFE3TzBGQlJVUTdRVUZEUVRzN1FVRkZRVXdzVDBGQlR6WkNMRlZCUVZBc1IwRkJiMElzVlVGQlZXaENMRkZCUVZZc1JVRkJiMEk3UVVGRGRFTXNWVUZCVVdsQ0xFOUJRVTlxUWl4UlFVRlFMRVZCUVdsQ2EwSXNWMEZCYWtJc1JVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVTBGQlREdEJRVU5CTEZOQlFVc3NWVUZCVER0QlFVTkZMR0ZCUVU4c1NVRkJVRHRCUVVOR08wRkJRMFVzWVVGQlR5eExRVUZRTzBGQlpFbzdRVUZuUWtRc1EwRnFRa1E3TzBGQmJVSkJMMElzVDBGQlR6QkNMRkZCUVZBc1IwRkJhMElzVlVGQlZVMHNRMEZCVml4RlFVRmhPMEZCUXpkQ0xGTkJRVThzUTBGQlF5eEZRVUZGUVN4TlFVRk5MRWxCUVU0c1NVRkJZMEVzVFVGQlRVTXNVMEZCY0VJc1NVRkJhVU5FTEVWQlFVVldMRk5CUVhKRExFTkJRVkk3UVVGRFJDeERRVVpFT3p0QlFVbEJkRUlzVDBGQlQyMUNMRlZCUVZBc1IwRkJiMElzVlVGQlZXVXNSMEZCVml4RlFVRmxja0lzVVVGQlppeEZRVUY1UWp0QlFVTXpReXhOUVVGSmMwSXNSMEZCU2p0QlFVTkJSQ3hSUVVGTlFTeE5RVUZOTEVWQlFWbzdRVUZEUVN4VlFVRlJja0lzV1VGQldTeE5RVUZ3UWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFVb3NSMEZCWVN4RFFVRnVRanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOUXl4WlFVRlpSaXhIUVVGYUxFVkJRV2xDYWtJc1RVRkJka0k3UVVGRFFUdEJRVU5HTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5GYTBJc1dVRkJUVVFzU1VGQlNXcENMRTFCUVZZN1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVVVzWTBGQlkwZ3NSMEZCWkN4RlFVRnRRbXBDTEUxQlFYcENPMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUVN4VFFVRkxMRk5CUVV3N1FVRkRRU3hUUVVGTExGVkJRVXc3UVVGRFJXdENMRmxCUVUxRUxFbEJRVWxxUWl4TlFVRktMRWRCUVdFc1EwRkJia0k3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpSeXhMUVVGS0xFTkJRVlVzYTBKQlFWWXNRMEZCVGp0QlFYWkNTanRCUVhsQ1FTeFRRVUZQWlN4SFFVRlFPMEZCUTBRc1EwRTNRa1E3TzBGQkswSkJia01zVDBGQlQzTkRMRTFCUVZBc1IwRkJaMElzVlVGQlZVTXNTVUZCVml4RlFVRm5Ra01zVjBGQmFFSXNSVUZCTmtJN1FVRkRNME5ETEZOQlFVOURMRkZCUVZGSUxFbEJRVklzUTBGQlVDeEZRVUZ6UWl4blJFRkRiRUlzTUVKQlJFbzdPMEZCUjBFc1RVRkJTVUVzUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkRja0lzVjBGQlR5eEpRVUZKYWtJc1RVRkJTaXhEUVVGWExFTkJRVmdzUTBGQlVEdEJRVU5FTEVkQlJrUXNUVUZGVHl4SlFVRkpkVU1zUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkROVUlzVjBGQlQzTkNMRXRCUVVzc1EwRkJUQ3hEUVVGUU8wRkJRMFE3TzBGQlJVUXNUVUZCU1doQ0xFTkJRVW83UVVGRFFTeE5RVUZKTEU5QlFVOXBRaXhYUVVGUUxFdEJRWFZDTEZGQlFUTkNMRVZCUVhGRE8wRkJRMjVEUVN4clFrRkJZeXhEUVVGa08wRkJRMEVzVTBGQlMycENMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKWjBJc1MwRkJTM1JDTEUxQlFYSkNMRVZCUVRaQ1RTeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EybENMSEZDUVVGbFJDeExRVUZMYUVJc1EwRkJUQ3hGUVVGUlRpeE5RVUYyUWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVFVGQlNWb3NUVUZCVFN4SlFVRkpUQ3hOUVVGS0xFTkJRVmQzUXl4WFFVRllMRU5CUVZZN1FVRkRRU3hOUVVGSlJ5eE5RVUZOTEVOQlFWWTdRVUZEUVN4UFFVRkxjRUlzU1VGQlNTeERRVUZVTEVWQlFWbEJMRWxCUVVsblFpeExRVUZMZEVJc1RVRkJja0lzUlVGQk5rSk5MRWRCUVRkQ0xFVkJRV3RETzBGQlEyaERMRkZCUVVseFFpeFBRVUZQVEN4TFFVRkxhRUlzUTBGQlRDeERRVUZZTzBGQlEwRnhRaXhUUVVGTFF5eEpRVUZNTEVOQlFWVjRReXhIUVVGV0xFVkJRV1Z6UXl4SFFVRm1PMEZCUTBGQkxGZEJRVTlETEV0QlFVc3pRaXhOUVVGYU8wRkJRMFE3UVVGRFJDeFRRVUZQV2l4SFFVRlFPMEZCUTBRc1EwRXhRa1E3TzBGQk5FSkJPMEZCUTBFN08wRkJSVUVzVTBGQlUzbERMRk5CUVZRc1EwRkJiMEo2UXl4SFFVRndRaXhGUVVGNVFqQkRMRTFCUVhwQ0xFVkJRV2xEUXl4TlFVRnFReXhGUVVGNVF5OUNMRTFCUVhwRExFVkJRV2xFTzBGQlF5OURLMElzVjBGQlUwTXNUMEZCVDBRc1RVRkJVQ3hMUVVGclFpeERRVUV6UWp0QlFVTkJMRTFCUVVsRkxGbEJRVmszUXl4SlFVRkpXU3hOUVVGS0xFZEJRV0VyUWl4TlFVRTNRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqczdRVUZGUkR0QlFVTkJMRTFCUVVsRExGTkJRVk5LTEU5QlFVODVRaXhOUVVGd1FqdEJRVU5CZDBJc1UwRkJUMVVzVTBGQlV5eERRVUZVTEV0QlFXVXNRMEZCZEVJc1JVRkJlVUlzYjBKQlFYcENPenRCUVVWQkxFMUJRVWxzUXl4VFFVRlRhME1zVTBGQlV5eERRVUYwUWl4RlFVRjVRanRCUVVOMlFteERMR0ZCUVZOclF5eFRRVUZUTEVOQlFXeENPMEZCUTBRN1FVRkRSQ3hQUVVGTExFbEJRVWsxUWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbE9MRTFCUVhCQ0xFVkJRVFJDVFN4SFFVRTFRaXhGUVVGcFF6dEJRVU12UWl4UlFVRkpOa0lzVDBGQlQwTXNVMEZCVTA0c1QwRkJUMDhzVFVGQlVDeERRVUZqTDBJc1NVRkJTU3hEUVVGc1FpeEZRVUZ4UWl4RFFVRnlRaXhEUVVGVUxFVkJRV3RETEVWQlFXeERMRU5CUVZnN1FVRkRRV3RDTEZkQlFVOHNRMEZCUTJNc1RVRkJUVWdzU1VGQlRpeERRVUZTTEVWQlFYRkNMRzlDUVVGeVFqdEJRVU5CTDBNc1VVRkJTVEpETEZOQlFWTjZRaXhEUVVGaUxFbEJRV3RDTmtJc1NVRkJiRUk3UVVGRFJEdEJRVU5FY0VRc1UwRkJUM2RFTEdGQlFWQXNSMEZCZFVKcVF5eEpRVUZKTEVOQlFUTkNPMEZCUTBFc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOclF5eFZRVUZVTEVOQlFYRkNjRVFzUjBGQmNrSXNSVUZCTUVJd1F5eE5RVUV4UWl4RlFVRnJRME1zVFVGQmJFTXNSVUZCTUVNdlFpeE5RVUV4UXl4RlFVRnJSRHRCUVVOb1JDeE5RVUZKZVVNc1pVRkJaVEZFTEU5QlFVOTNSQ3hoUVVGUUxFZEJRMnBDUnl4WFFVRlhka0lzV1VGQldWY3NUVUZCV2l4RFFVRllMRVZCUVdkRE1VTXNSMEZCYUVNc1JVRkJjVU15UXl4TlFVRnlReXhGUVVFMlF5OUNMRTFCUVRkRExFTkJSRVk3UVVGRlFTeFRRVUZQZVVNc1dVRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTkZMRmRCUVZRc1EwRkJjMEoyUkN4SFFVRjBRaXhGUVVFeVFqQkRMRTFCUVROQ0xFVkJRVzFEUXl4TlFVRnVReXhGUVVFeVF5OUNMRTFCUVRORExFVkJRVzFFTzBGQlEycEVMRTFCUVVsNVF5eGxRVUZsTVVRc1QwRkJUM2RFTEdGQlFWQXNSMEZEYWtKSExGZEJRVmRGTEdGQlFXRmtMRTFCUVdJc1EwRkJXQ3hGUVVGcFF6RkRMRWRCUVdwRExFVkJRWE5ETWtNc1RVRkJkRU1zUlVGQk9FTXZRaXhOUVVFNVF5eERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRTU3haUVVGVUxFTkJRWFZDZWtRc1IwRkJka0lzUlVGQk5FSXdReXhOUVVFMVFpeEZRVUZ2UTBNc1RVRkJjRU1zUlVGQk5FTXZRaXhOUVVFMVF5eEZRVUZ2UkR0QlFVTnNSQ3hUUVVGUE1rTXNXVUZCV1haRUxFZEJRVm9zUlVGQmFVSXdReXhOUVVGcVFpeEZRVUY1UWtNc1RVRkJla0lzUlVGQmFVTXZRaXhOUVVGcVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVemhETEZsQlFWUXNRMEZCZFVJeFJDeEhRVUYyUWl4RlFVRTBRakJETEUxQlFUVkNMRVZCUVc5RFF5eE5RVUZ3UXl4RlFVRTBReTlDTEUxQlFUVkRMRVZCUVc5RU8wRkJRMnhFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkMFFpeGpRVUZqVlN4TlFVRmtMRU5CUVZnc1JVRkJhME14UXl4SFFVRnNReXhGUVVGMVF6SkRMRTFCUVhaRExFVkJRU3RETDBJc1RVRkJMME1zUTBGRVJqdEJRVVZCTEZOQlFVOTVReXhaUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTAwc1lVRkJWQ3hEUVVGM1FqTkVMRWRCUVhoQ0xFVkJRVFpDTUVNc1RVRkJOMElzUlVGQmNVTkRMRTFCUVhKRExFVkJRVFpETDBJc1RVRkJOME1zUlVGQmNVUTdRVUZEYmtRc1RVRkJTWGxETEdWQlFXVXhSQ3hQUVVGUGQwUXNZVUZCVUN4SFFVTnFRa2NzVjBGQlYwMHNaVUZCWld4Q0xFMUJRV1lzUTBGQldDeEZRVUZ0UXpGRExFZEJRVzVETEVWQlFYZERNa01zVFVGQmVFTXNSVUZCWjBRdlFpeE5RVUZvUkN4RFFVUkdPMEZCUlVFc1UwRkJUM2xETEZsQlFWQTdRVUZEUkRzN1FVRkZSREZFTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZEVNc1MwRkJha0lzUjBGQmVVSXNWVUZCVlcxQ0xFMUJRVllzUlVGQmEwSkRMRTFCUVd4Q0xFVkJRVEJDTDBJc1RVRkJNVUlzUlVGQmEwTktMRkZCUVd4RExFVkJRVFJETzBGQlEyNUZPMEZCUTBFN1FVRkRRU3hOUVVGSmMwUXNVMEZCVTI1Q0xFMUJRVlFzUTBGQlNpeEZRVUZ6UWp0QlFVTndRaXhSUVVGSkxFTkJRVU50UWl4VFFVRlRiRVFzVFVGQlZDeERRVUZNTEVWQlFYVkNPMEZCUTNKQ1NpeHBRa0ZCVjBrc1RVRkJXRHRCUVVOQlFTeGxRVUZUWjBJc1UwRkJWRHRCUVVORU8wRkJRMFlzUjBGTVJDeE5RVXRQTzBGQlFVYzdRVUZEVWl4UlFVRkpiVU1zVDBGQlQzWkVMRkZCUVZnN1FVRkRRVUVzWlVGQlYyMURMRTFCUVZnN1FVRkRRVUVzWVVGQlV5OUNMRTFCUVZRN1FVRkRRVUVzWVVGQlUyMUVMRWxCUVZRN1FVRkRSRHM3UVVGRlJIQkNMRmRCUVZORExFOUJRVTlFTEUxQlFWQXNTMEZCYTBJc1EwRkJNMEk3UVVGRFFTeE5RVUZKUlN4WlFVRlpMRXRCUVV0cVF5eE5RVUZNTEVkQlFXTXJRaXhOUVVFNVFqdEJRVU5CTEUxQlFVa3NRMEZCUXk5Q0xFMUJRVXdzUlVGQllUdEJRVU5ZUVN4aFFVRlRhVU1zVTBGQlZEdEJRVU5FTEVkQlJrUXNUVUZGVHp0QlFVTk1ha01zWVVGQlUyZERMRTlCUVU5b1F5eE5RVUZRTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hUUVVGVGFVTXNVMEZCWWl4RlFVRjNRanRCUVVOMFFtcERMR1ZCUVZOcFF5eFRRVUZVTzBGQlEwUTdRVUZEUmp0QlFVTkVja01zWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHM3UVVGRlFTeE5RVUZKU1N4SFFVRktPMEZCUTBFc1ZVRkJVWFJDTEZGQlFWSTdRVUZEUlN4VFFVRkxMRXRCUVV3N1FVRkRSWE5DTEZsQlFVMVhMRlZCUVZVc1NVRkJWaXhGUVVGblFrTXNUVUZCYUVJc1JVRkJkMEpETEUxQlFYaENMRVZCUVdkREwwSXNUVUZCYUVNc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOYzBJc1YwRkJWeXhKUVVGWUxFVkJRV2xDVml4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGT08wRkJRMEU3UVVGRFJpeFRRVUZMTEU5QlFVdzdRVUZEUld0Q0xGbEJRVTE1UWl4WlFVRlpMRWxCUVZvc1JVRkJhMEppTEUxQlFXeENMRVZCUVRCQ1F5eE5RVUV4UWl4RlFVRnJReTlDTEUxQlFXeERMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVEpDTEdGQlFXRXNTVUZCWWl4RlFVRnRRbVlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhSUVVGTU8wRkJRMFZyUWl4WlFVRk5ORUlzWVVGQllTeEpRVUZpTEVWQlFXMUNhRUlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZyUWl4WlFVRk5Oa0lzWTBGQll5eEpRVUZrTEVWQlFXOUNha0lzVFVGQmNFSXNSVUZCTkVKRExFMUJRVFZDTEVWQlFXOURMMElzVFVGQmNFTXNRMEZCVGp0QlFVTkJPMEZCUTBZN1FVRkRSU3haUVVGTkxFbEJRVWxITEV0QlFVb3NRMEZCVlN4clFrRkJWaXhEUVVGT08wRkJlRUpLTzBGQk1FSkJMRk5CUVU5bExFZEJRVkE3UVVGRFJDeERRWFpFUkRzN1FVRjVSRUZ1UXl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWtjc1VVRkJha0lzUjBGQk5FSXNWVUZCVlhoRUxGRkJRVllzUlVGQmIwSjVSQ3hMUVVGd1FpeEZRVUV5UWtNc1IwRkJNMElzUlVGQlowTTdRVUZETVVRc1RVRkJTVU1zVDBGQlR5eEpRVUZZT3p0QlFVVkJNMFFzWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHRCUVVOQmRVTXNWVUZCVVhKQ0xFOUJRVTl4UWl4TFFVRlFMRXRCUVdsQ0xFTkJRWHBDTzBGQlEwRkRMRkZCUVU5QkxGRkJRVkYwUXl4VFFVRlVMRWRCUTBablFpeFBRVUZQYzBJc1IwRkJVQ3hEUVVSRkxFZEJSVVpCTEUxQlFVMURMRXRCUVV0MlJDeE5RVVptT3p0QlFVbEJPMEZCUTBFc1RVRkJTWE5FTEZGQlFWRkVMRXRCUVZvc1JVRkRSU3hQUVVGUExFVkJRVkE3TzBGQlJVWXNUVUZCU1c1RExFZEJRVW83UVVGRFFTeFZRVUZSZEVJc1VVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5GYzBJc1dVRkJUWE5ETEZWQlFWVkVMRWxCUVZZc1JVRkJaMEpHTEV0QlFXaENMRVZCUVhWQ1F5eEhRVUYyUWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUlhCRExGbEJRVTExUXl4WFFVRlhSaXhKUVVGWUxFVkJRV2xDUml4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eFBRVUZNTzBGQlEwVndReXhaUVVGTmQwTXNXVUZCV1Vnc1NVRkJXaXhGUVVGclFrWXNTMEZCYkVJc1JVRkJlVUpETEVkQlFYcENMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GY0VNc1dVRkJUWGxETEdGQlFXRktMRWxCUVdJc1JVRkJiVUpHTEV0QlFXNUNMRVZCUVRCQ1F5eEhRVUV4UWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExGRkJRVXc3UVVGRFJYQkRMRmxCUVUwd1F5eGhRVUZoVEN4SlFVRmlMRVZCUVcxQ1JpeExRVUZ1UWl4RlFVRXdRa01zUjBGQk1VSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZ3UXl4WlFVRk5Na01zWTBGQlkwNHNTVUZCWkN4RlFVRnZRa1lzUzBGQmNFSXNSVUZCTWtKRExFZEJRVE5DTEVOQlFVNDdRVUZEUVR0QlFVTkdPMEZCUTBVc1dVRkJUU3hKUVVGSmJrUXNTMEZCU2l4RFFVRlZMR3RDUVVGV0xFTkJRVTQ3UVVGNFFrbzdRVUV3UWtFc1UwRkJUMlVzUjBGQlVEdEJRVU5FTEVOQmVrTkVPenRCUVRKRFFXNURMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENZU3hOUVVGcVFpeEhRVUV3UWl4WlFVRlpPMEZCUTNCRExGTkJRVTg3UVVGRFRHaEZMRlZCUVUwc1VVRkVSRHRCUVVWTWFVVXNWVUZCVFVNc1RVRkJUV1lzVTBGQlRpeERRVUZuUW1kQ0xFdEJRV2hDTEVOQlFYTkNReXhKUVVGMFFpeERRVUV5UWl4TFFVRkxReXhKUVVGTUxFbEJRV0VzU1VGQmVFTXNSVUZCT0VNc1EwRkJPVU03UVVGR1JDeEhRVUZRTzBGQlNVUXNRMEZNUkRzN1FVRlBRVHRCUVVOQmNFWXNUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnlRaXhKUVVGcVFpeEhRVUYzUWl4VlFVRlZkME1zVFVGQlZpeEZRVUZyUWtNc1dVRkJiRUlzUlVGQlowTm9RaXhMUVVGb1F5eEZRVUYxUTBNc1IwRkJka01zUlVGQk5FTTdRVUZEYkVVc1RVRkJTV2RDTEZOQlFWTXNTVUZCWWpzN1FVRkZRU3hOUVVGSkxFTkJRVU5xUWl4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJSQ3hKUVVGUlFTeFJRVUZSTEVOQlFYQkNMRVZCUVhWQ1FTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU8wRkJRM1pDTEUxQlFVa3NRMEZCUTNGRkxGbEJRVXdzUlVGQmJVSkJMR1ZCUVdVc1EwRkJaanM3UVVGRmJrSTdRVUZEUVN4TlFVRkpaaXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWxsTEU5QlFVOXdSU3hOUVVGUUxFdEJRV3RDTEVOQlFXeENMRWxCUVhWQ2MwVXNUMEZCVDNSRkxFMUJRVkFzUzBGQmEwSXNRMEZCTjBNc1JVRkJaMFE3TzBGQlJXaEVPMEZCUTBGM1FpeFRRVUZQT0VJc1QwRkJUMFFzUzBGQlpDeEZRVUZ4UWl4NVFrRkJja0k3UVVGRFFUZENMRk5CUVU4MlF5eG5Ra0ZCWjBJc1EwRkJhRUlzU1VGQmNVSkJMR1ZCUVdWRUxFOUJRVTl3UlN4TlFVRnNSQ3hGUVVOSkxESkNRVVJLTzBGQlJVRjNRaXhUUVVGUE5rSXNVMEZCVXl4RFFVRlVMRWxCUVdOQkxGRkJRVkZwUWl4UFFVRlBkRVVzVFVGQmNFTXNSVUZCTkVNc01rSkJRVFZETzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVHl4RFFVRlFMRWxCUVZsQkxFOUJRVTluUWl4UFFVRlBkRVVzVFVGQmFrTXNSVUZCZVVNc2VVSkJRWHBET3p0QlFVVkJPMEZCUTBFc1RVRkJTWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRV1lzUlVGRFJYTkVMRTFCUVUwc1MwRkJTM1JFTEUxQlFWZzdRVUZEUml4TlFVRkpiMFVzVDBGQlQzQkZMRTFCUVZBc1IwRkJaMEp4UlN4WlFVRm9RaXhIUVVFclFtWXNUVUZCVFVRc1MwRkJla01zUlVGRFJVTXNUVUZCVFdNc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbWhDTEV0QlFYSkRPenRCUVVWR0xFMUJRVWxyUWl4TlFVRk5ha0lzVFVGQlRVUXNTMEZCYUVJN08wRkJSVUVzVFVGQlNXdENMRTFCUVUwc1IwRkJUaXhKUVVGaExFTkJRVU40Uml4UFFVRlBTU3hsUVVGNlFpeEZRVUV3UXp0QlFVTjRReXhUUVVGTExFbEJRVWx0UWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbHBSU3hIUVVGd1FpeEZRVUY1UW1wRkxFZEJRWHBDTzBGQlEwVTRSQ3hoUVVGUE9VUXNTVUZCU1N0RUxGbEJRVmdzU1VGQk1rSXNTMEZCU3k5RUxFbEJRVWtyUXl4TFFVRlVMRU5CUVROQ08wRkJSRVk3UVVGRlJDeEhRVWhFTEUxQlIwODdRVUZEVEdVc1YwRkJUemRFTEVsQlFWQXNRMEZCV1N4TFFVRkxaQ3hSUVVGTUxFTkJRV00wUkN4TFFVRmtMRVZCUVhGQ1FTeFJRVUZSYTBJc1IwRkJOMElzUTBGQldpeEZRVUVyUTBZc1dVRkJMME03UVVGRFJEdEJRVU5HTEVOQmFFTkVPenRCUVd0RFFTeFRRVUZUVkN4WlFVRlVMRU5CUVhWQ2VFVXNSMEZCZGtJc1JVRkJORUpwUlN4TFFVRTFRaXhGUVVGdFEwTXNSMEZCYmtNc1JVRkJkME03UVVGRGRFTXNUVUZCU1VRc1ZVRkJWU3hEUVVGV0xFbEJRV1ZETEZGQlFWRnNSU3hKUVVGSldTeE5RVUV2UWl4RlFVRjFRenRCUVVOeVF5eFhRVUZQY2tJc1QwRkJUelpHTEdGQlFWQXNRMEZCY1VKd1JpeEhRVUZ5UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hOUVVWUE8wRkJRMHdzVjBGQlQxUXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhKUVVGSk5rVXNTMEZCU2l4RFFVRlZXaXhMUVVGV0xFVkJRV2xDUXl4SFFVRnFRaXhEUVVGeVFpeERRVUZRTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGVFJ5eFZRVUZVTEVOQlFYRkNja1VzUjBGQmNrSXNSVUZCTUVKcFJTeExRVUV4UWl4RlFVRnBRME1zUjBGQmFrTXNSVUZCYzBNN1FVRkRjRU1zVFVGQlNXMUNMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxETEUxQlFVMHNSVUZCVmp0QlFVTkJjRUlzVVVGQlRYRkNMRXRCUVV0RExFZEJRVXdzUTBGQlUzaEdMRWxCUVVsWkxFMUJRV0lzUlVGQmNVSnpSQ3hIUVVGeVFpeERRVUZPT3p0QlFVVkJMRTlCUVVzc1NVRkJTV2hFTEVsQlFVa3JReXhMUVVGaUxFVkJRVzlDTDBNc1NVRkJTV2RFTEVkQlFYaENMRVZCUVRaQ2FFUXNSMEZCTjBJc1JVRkJhME03UVVGRGFFTXNVVUZCU1d4Q0xFbEJRVWxyUWl4RFFVRktMRXRCUVZVc1NVRkJaQ3hGUVVGdlFqdEJRVU5zUW0xRkxHRkJRVTlKTEdWQlFXVklMRWRCUVdZc1NVRkJjMEkzUkN4UFFVRlBhVVVzV1VGQlVDeERRVUZ2UWpGR0xFbEJRVWxyUWl4RFFVRktMRU5CUVhCQ0xFTkJRVGRDTzBGQlEwRnZSU3haUVVGTkxFVkJRVTQ3UVVGRFJDeExRVWhFTEUxQlIwODdRVUZEVEVFc1lVRkJUeXhOUVVGTmRFWXNTVUZCU1d0Q0xFTkJRVW9zUlVGQlR6aERMRkZCUVZBc1EwRkJaMElzUlVGQmFFSXNRMEZCWWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVTBGQlQzRkNMRTFCUVUxSkxHVkJRV1ZJTEVkQlFXWXNRMEZCWWp0QlFVTkVPenRCUVVWRUxGTkJRVk5vUWl4WFFVRlVMRU5CUVhOQ2RFVXNSMEZCZEVJc1JVRkJNa0pwUlN4TFFVRXpRaXhGUVVGclEwTXNSMEZCYkVNc1JVRkJkVU03UVVGRGNrTXNUVUZCU1hCRExFMUJRVTBzUlVGQlZqdEJRVU5CYjBNc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSTdRVUZEUlZrc1YwRkJUMHdzVDBGQlQybEZMRmxCUVZBc1EwRkJiMEl4Uml4SlFVRkphMElzUTBGQlNpeERRVUZ3UWl4RFFVRlFPMEZCUkVZc1IwRkZRU3hQUVVGUFdTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xETEZsQlFWUXNRMEZCZFVKMlJTeEhRVUYyUWl4RlFVRTBRbWxGTEV0QlFUVkNMRVZCUVcxRFF5eEhRVUZ1UXl4RlFVRjNRenRCUVVOMFF5eFRRVUZQU1N4WlFVRlpkRVVzUjBGQldpeEZRVUZwUW1sRkxFdEJRV3BDTEVWQlFYZENReXhIUVVGNFFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMFVzVTBGQlZDeERRVUZ2UW5CRkxFZEJRWEJDTEVWQlFYbENhVVVzUzBGQmVrSXNSVUZCWjBORExFZEJRV2hETEVWQlFYRkRPMEZCUTI1RExFMUJRVWxwUWl4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkRzN1FVRkZRU3hOUVVGSkxFTkJRVU54UkN4TFFVRkVMRWxCUVZWQkxGRkJRVkVzUTBGQmRFSXNSVUZCZVVKQkxGRkJRVkVzUTBGQlVqdEJRVU42UWl4TlFVRkpMRU5CUVVORExFZEJRVVFzU1VGQlVVRXNUVUZCVFN4RFFVRmtMRWxCUVcxQ1FTeE5RVUZOYVVJc1IwRkJOMElzUlVGQmEwTnFRaXhOUVVGTmFVSXNSMEZCVGpzN1FVRkZiRU1zVFVGQlNWRXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmVrVXNTVUZCU1N0RExFdEJRV0lzUlVGQmIwSXZReXhKUVVGSlowUXNSMEZCZUVJc1JVRkJOa0pvUkN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUTNsRkxGZEJRVTlETEUxQlFVMDFSaXhKUVVGSmEwSXNRMEZCU2l4RFFVRk9MRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTk1UlN4SFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUyeENMR0ZCUVZRc1EwRkJkMEo2UlN4SFFVRjRRaXhGUVVFMlFtbEZMRXRCUVRkQ0xFVkJRVzlEUXl4SFFVRndReXhGUVVGNVF6dEJRVU4yUXl4TlFVRkpNa0lzVVVGQlVUZEdMRWxCUVVrMlJTeExRVUZLTEVOQlFWVmFMRXRCUVZZc1JVRkJhVUpETEVkQlFXcENMRU5CUVZvN1FVRkRRU3hOUVVGSmJVSXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmJrVXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKTWtVc1RVRkJUV3BHTEUxQlFURkNMRVZCUVd0RFRTeExRVUZMTEVOQlFYWkRMRVZCUVRCRE8wRkJRM2hEYlVVc1YwRkJUelZFTEU5QlFVOXBSU3haUVVGUUxFTkJRVzlDUnl4TlFVRk5NMFVzUTBGQlRpeEpRVUZYTWtVc1RVRkJUVE5GTEVsQlFVVXNRMEZCVWl4SlFVRmhMRWRCUVRWRExFTkJRVkE3UVVGRFJEdEJRVU5FTEZOQlFVOXRSU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXhSaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbWRDTEV0QlFXcENMRWRCUVhsQ0xGVkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUXpkRExFMUJRVWxwUWl4TlFVRk5MRXRCUVV0MlJTeE5RVUZtTzBGQlEwRnhSQ3hWUVVGUk5rSXNUVUZCVFRkQ0xFdEJRVTRzUlVGQllXdENMRWRCUVdJc1JVRkJhMElzUTBGQmJFSXNRMEZCVWp0QlFVTkJha0lzVVVGQlRUUkNMRTFCUVUwMVFpeEhRVUZPTEVWQlFWZHBRaXhIUVVGWUxFVkJRV2RDUVN4SFFVRm9RaXhEUVVGT096dEJRVVZCTEUxQlFVbDRSaXhQUVVGUFNTeGxRVUZZTEVWQlFUUkNPMEZCUXpGQ0xGZEJRVTlLTEU5QlFVOXhRaXhSUVVGUUxFTkJRV2RDTEV0QlFVdFlMRkZCUVV3c1EwRkJZelJFTEV0QlFXUXNSVUZCY1VKRExFZEJRWEpDTEVOQlFXaENMRU5CUVZBN1FVRkRSQ3hIUVVaRUxFMUJSVTg3UVVGRFRDeFJRVUZKTmtJc1YwRkJWemRDTEUxQlFVMUVMRXRCUVhKQ08wRkJRMEVzVVVGQlNTdENMRk5CUVZNc1NVRkJTWEpITEUxQlFVb3NRMEZCVjI5SExGRkJRVmdzUlVGQmNVSnVSU3hUUVVGeVFpeEZRVUZuUXl4SlFVRm9ReXhEUVVGaU8wRkJRMEVzVTBGQlN5eEpRVUZKVml4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVazJSU3hSUVVGd1FpeEZRVUU0UWpkRkxFZEJRVGxDTEVWQlFXMURPMEZCUTJwRE9FVXNZVUZCVHpsRkxFTkJRVkFzU1VGQldTeExRVUZMUVN4SlFVRkpLME1zUzBGQlZDeERRVUZhTzBGQlEwUTdRVUZEUkN4WFFVRlBLMElzVFVGQlVEdEJRVU5FTzBGQlEwWXNRMEZtUkRzN1FVRnBRa0U3UVVGRFFYSkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENiME1zUjBGQmFrSXNSMEZCZFVJc1ZVRkJWWFJFTEUxQlFWWXNSVUZCYTBJN1FVRkRka04xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVVzM1JTeFRRVUZNTEVOQlFXVnhRaXhOUVVGbUxFTkJRVkE3UVVGRFJDeERRVWhFT3p0QlFVdEJPMEZCUTBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuVkRMRWRCUVdwQ0xFZEJRWFZDTEZWQlFWVkRMRU5CUVZZc1JVRkJZVEZFTEUxQlFXSXNSVUZCY1VJN1FVRkRNVU4xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVV0SExGVkJRVXdzUTBGQlowSkVMRU5CUVdoQ0xFVkJRVzFDTVVRc1RVRkJia0lzUTBGQlVEdEJRVU5FTEVOQlNFUTdPMEZCUzBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuWkRMRk5CUVdwQ0xFZEJRVFpDTEZWQlFWVnhRaXhOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZGtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSEZEUVVFM1FqdEJRVU5FT3p0QlFVVkVMRTFCUVVrclFpeFZRVUZWTEV0QlFVc3ZRaXhOUVVGdVFpeEZRVU5GT3p0QlFVVkdMRk5CUVU4c1MwRkJTeXRDTEUxQlFVd3NRMEZCVUR0QlFVTkVMRU5CVmtRN08wRkJXVUVzVTBGQlV6WkVMRmRCUVZRc1EwRkJjMEo0Unl4SFFVRjBRaXhGUVVFeVFqSkRMRTFCUVROQ0xFVkJRVzFET0VRc1dVRkJia01zUlVGQmFVUkdMRkZCUVdwRUxFVkJRVEpFTzBGQlEzcEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmRVVXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeE5RVUZKZFVJc1IwRkJTanRCUVVOQkxFMUJRVWxFTEZsQlFVb3NSVUZCYTBJN1FVRkRhRUpETEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4RFFVRk9PMEZCUTBFc1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1QwRkJUekZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNRMEZCTVVJN1FVRkRTQ3hIUVVwRUxFMUJTVTg3UVVGRFRDdEVMRlZCUVUweFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFTkJRWEpDTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1EwRkJVRHRCUVVOSU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRU1zV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQUXl4WlFVRlpMRWxCUVZvc1JVRkJhMEkzUkN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJclF5eFpRVUZxUWl4SFFVRm5ReXhWUVVGVmFrVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOURMRmxCUVZrc1NVRkJXaXhGUVVGclFqZEVMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTAwc1YwRkJWQ3hEUVVGelFqZEhMRWRCUVhSQ0xFVkJRVEpDTWtNc1RVRkJNMElzUlVGQmJVTTRSQ3haUVVGdVF5eEZRVUZwUkVZc1VVRkJha1FzUlVGQk1rUTdRVUZEZWtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExIRkRRVUZvUXp0QlFVTkVPenRCUVVWRUxFMUJRVWwxUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkR0QlFVTkJMRTFCUVVrclFpeFZRVUZWZDBNc1IwRkJaQ3hGUVVORk96dEJRVVZHTEUxQlFVbDFRaXhIUVVGS08wRkJRMEVzVFVGQlNVUXNXVUZCU2l4RlFVRnJRanRCUVVOb1FpeFJRVUZKT1VRc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUVUZCVFRGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUlVGQmVrSTdRVUZEUml4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeERRVUV4UWp0QlFVTkdLMFFzVjBGQlR6RkhMRWxCUVVreVF5eE5RVUZLTEVOQlFWQTdRVUZEUVN4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4TlFVRk5RU3hQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RlFVRnVRaXhMUVVFd1FpeERRVUZxUXl4RFFVRk9PMEZCUTBnc1IwRlNSQ3hOUVZGUE8wRkJRMHdzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HTEZGQlFVbEJMRk5CUVZNc1EwRkJWQ3hIUVVGaGQwTXNSMEZCYWtJc1JVRkRSWFZDTEU5QlFVOHhSeXhKUVVGSk1rTXNVMEZCVXl4RFFVRmlMRU5CUVZBN1FVRkRSaXRFTEZWQlFVMUJMRTlCUVU4eFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFVkJRV1lzUzBGQmMwSXNRMEZCTjBJc1EwRkJUanRCUVVORU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhVVFzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWVzVGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQVFN4WlFVRlpMRWxCUVZvc1JVRkJhMEpzUlN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKclJDeFpRVUZxUWl4SFFVRm5ReXhWUVVGVmNFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOU5MRmxCUVZrc1NVRkJXaXhGUVVGclFteEZMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbTFFTEZGQlFXcENMRWRCUVRSQ0xGVkJRVlZ5UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRFUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZEU1N4blFrRkVTanRCUVVWQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh4UTBGQk4wSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSkswSXNWVUZCVlN4TFFVRkxMMElzVFVGQmJrSXNSVUZEUlRzN1FVRkZSaXhOUVVGSmNVY3NUVUZCVFN4TFFVRkxkRVVzVFVGQlRDeEpRVUZsTEVsQlFYcENPMEZCUTBFc1RVRkJTWE5GTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1QwRkJUeXhMUVVGTGRFVXNUVUZCVEN4RFFVRlFMRWRCUVhOQ0xFTkJRWFpDTEVsQlFUUkNMRU5CUVVNc1EwRkJjRU1zUTBGRVJpeExRVWRGTEU5QlFVOHNTMEZCUzBFc1RVRkJUQ3hEUVVGUU8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVM1ZGTEZWQlFWUXNRMEZCY1VKc1NDeEhRVUZ5UWl4RlFVRXdRakpETEUxQlFURkNMRVZCUVd0RE9FUXNXVUZCYkVNc1JVRkJaMFJHTEZGQlFXaEVMRVZCUVRCRU8wRkJRM2hFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNUVUZCVFVZc1dVRkJXWGhITEVkQlFWb3NSVUZCYVVJeVF5eE5RVUZxUWl4RlFVRjVRamhFTEZsQlFYcENMRVZCUVhWRExFbEJRWFpETEVOQlFWWTdRVUZEUVN4TlFVRkpVU3hOUVVGTlVDeE5RVUZOTEUxQlFXaENPMEZCUTBFc1RVRkJTVThzUjBGQlNpeEZRVU5GTEU5QlFVOHNRMEZCUXl4VFFVRlRVQ3hIUVVGVUxFZEJRV1VzUTBGQmFFSXNTVUZCY1VJc1EwRkJReXhEUVVFM1FpeERRVVJHTEV0QlIwVXNUMEZCVDBFc1IwRkJVRHRCUVVOSU96dEJRVVZFTDBjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKelJDeFhRVUZxUWl4SFFVRXJRaXhWUVVGVmVFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRM3BFTEZOQlFVOVhMRmRCUVZjc1NVRkJXQ3hGUVVGcFFuWkZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlY2UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDFjc1YwRkJWeXhKUVVGWUxFVkJRV2xDZGtVc1RVRkJha0lzUlVGQmVVSXNTMEZCZWtJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRZeXhWUVVGVUxFTkJRWEZDY2tnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVFVGQlNYVkZMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1hWQ0xFMUJRVTFITEZsQlFWazNSeXhIUVVGYUxFVkJRV2xDTWtNc1RVRkJha0lzUlVGQmVVSTRSQ3haUVVGNlFpeEZRVUYxUXl4SlFVRjJReXhEUVVGV08wRkJRMEVzVFVGQlNWRXNUVUZCVFZBc1RVRkJUU3hWUVVGb1FqdEJRVU5CTEUxQlFVbFBMRWRCUVVvc1JVRkRSU3hQUVVGUExFTkJRVU1zWVVGQllWQXNSMEZCWWl4SFFVRnRRaXhEUVVGd1FpeEpRVUY1UWl4RFFVRkRMRU5CUVdwRExFTkJSRVlzUzBGSFJTeFBRVUZQUVN4SFFVRlFPMEZCUTBnN08wRkJSVVF2Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVelJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQyTXNWMEZCVnl4SlFVRllMRVZCUVdsQ01VVXNUVUZCYWtJc1JVRkJlVUlzU1VGQmVrSXNSVUZCSzBJMFJDeFJRVUV2UWl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNRVFzVjBGQmFrSXNSMEZCSzBJc1ZVRkJWVFZGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVONlJDeFRRVUZQWXl4WFFVRlhMRWxCUVZnc1JVRkJhVUl4UlN4TlFVRnFRaXhGUVVGNVFpeExRVUY2UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTnBRaXhWUVVGVUxFTkJRWEZDZUVnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVTBGQlQyNUNMRkZCUVZGblNTeEpRVUZTTEVOQlFXRjZTQ3hIUVVGaUxFVkJRV3RDTWtNc1RVRkJiRUlzUlVGQk1FSTRSQ3haUVVFeFFpeEZRVUYzUXl4RlFVRjRReXhGUVVFMFF5eERRVUUxUXl4RFFVRlFPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpaRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVdlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRamhFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlZvUml4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJsQ0xGZEJRVmNzU1VGQldDeEZRVUZwUWpkRkxFMUJRV3BDTEVWQlFYbENMRXRCUVhwQ0xFVkJRV2RETkVRc1VVRkJhRU1zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM0ZDTEZkQlFWUXNRMEZCYzBJMVNDeEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4VFFVRlBia0lzVVVGQlVXZEpMRWxCUVZJc1EwRkJZWHBJTEVkQlFXSXNSVUZCYTBJeVF5eE5RVUZzUWl4RlFVRXdRamhFTEZsQlFURkNMRVZCUVhkRExFVkJRWGhETEVWQlFUUkRMRU5CUVRWRExFTkJRVkE3UVVGRFJEczdRVUZGUkRsSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ1owVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXeEdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1NVRkJNVUlzUlVGQlowTTBSQ3hSUVVGb1F5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVVc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1R0xFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUGNVSXNXVUZCV1N4SlFVRmFMRVZCUVd0Q2FrWXNUVUZCYkVJc1JVRkJNRUlzUzBGQk1VSXNSVUZCYVVNMFJDeFJRVUZxUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENlVU1zVlVGQmFrSXNSMEZCT0VJc1ZVRkJWWGxDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJReTlFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh6UTBGQk4wSTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1NVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpjRVlzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGQk1rSTdPMEZCUlROQ0xFOUJRVXNyUWl4TlFVRk1MRWxCUVdWdlJpeExRVUZtTzBGQlEwUXNRMEZZUkRzN1FVRmhRU3hUUVVGVFJTeFpRVUZVTEVOQlFYVkNha2tzUjBGQmRrSXNSVUZCTkVJclNDeExRVUUxUWl4RlFVRnRRM0JHTEUxQlFXNURMRVZCUVRKRE9FUXNXVUZCTTBNc1JVRkJlVVJHTEZGQlFYcEVMRVZCUVcxRk8wRkJRMnBGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRVzlJTEdOQlFWVkVMRXRCUVZZc1JVRkJhVUlzVFVGQmFrSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeFBRVUZMTEVsQlFVbHFSU3hKUVVGSkxFTkJRVklzUlVGQlYyZElMRWxCUVVrelF5eExRVUZMUXl4SFFVRk1MRU5CUVZOTUxFMUJRVTE0UXl4TlFVRm1MRVZCUVhWQ0xFTkJRWFpDTEVOQlFYQkNMRVZCUVN0RGVrSXNTVUZCU1dkSUxFTkJRVzVFTEVWQlFYTkVhRWdzUjBGQmRFUXNSVUZCTWtRN1FVRkRla1JzUWl4UlFVRkpNa01zVTBGQlUzcENMRU5CUVdJc1NVRkRTU3hEUVVGRE5rY3NVVUZCVXl4UlFVRlRMRXRCUVV0MFFpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRTFRaXhEUVVGdVFpeE5RVU5KTEVOQlFVTjFSaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVaeVF6dEJRVWRFTzBGQlEwWTdPMEZCUlVSMlFpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkZMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVktMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEyeEZNRUlzWlVGQllTeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UW5CR0xFMUJRVEZDTEVWQlFXdERMRWxCUVd4RExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUoxUlN4aFFVRnFRaXhIUVVGcFF5eFZRVUZWVEN4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRCQ0xHVkJRV0VzU1VGQllpeEZRVUZ0UWtZc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXl4TFFVRnNReXhGUVVGNVF6UkVMRkZCUVhwRE8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRPRUlzV1VGQlZDeERRVUYxUW5KSkxFZEJRWFpDTEVWQlFUUkNLMGdzUzBGQk5VSXNSVUZCYlVOd1JpeE5RVUZ1UXl4RlFVRXlRemhFTEZsQlFUTkRMRVZCUVhsRVJpeFJRVUY2UkN4RlFVRnRSVHRCUVVOcVJTeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHpKR0xGVkJRVlZ1Unl4VFFVRldMRWxCUVhWQ2JVY3NWVUZCVlN4SlFVRjRReXhGUVVFNFF5eGxRVUU1UXp0QlFVTkJNMFlzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zYzBOQlFXaERPMEZCUTBGdlNDeGpRVUZWUkN4TFFVRldMRVZCUVdsQ0xGVkJRV3BDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVDBGQlN5eEpRVUZKYWtVc1NVRkJTU3hEUVVGU0xFVkJRVmRuU0N4SlFVRkpNME1zUzBGQlMwTXNSMEZCVEN4RFFVRlRUQ3hOUVVGTmVFTXNUVUZCWml4RlFVRjFRaXhEUVVGMlFpeERRVUZ3UWl4RlFVRXJRM3BDTEVsQlFVbG5TQ3hEUVVGdVJDeEZRVUZ6UkdoSUxFZEJRWFJFTEVWQlFUSkVPMEZCUTNwRWJFSXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUTBzMlJ5eFZRVUZWTEVOQlFVTjBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVGNFF5eEhRVUUyUXl4SlFVUnFSRHRCUVVWRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxGTEdGQlFXcENMRWRCUVdsRExGVkJRVlZRTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGT0VJc1pVRkJZU3hKUVVGaUxFVkJRVzFDVGl4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJd1JTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlVpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUaENMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrNHNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNa1VzVTBGQmFrSXNSMEZCTmtJc1ZVRkJWVlFzUzBGQlZpeEZRVUZwUW5CR0xFMUJRV3BDTEVWQlFYbENORVFzVVVGQmVrSXNSVUZCYlVNN1FVRkRPVVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSE5EUVVFM1FqdEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4SlFVRnFRaXhGUVVGMVFpeERRVUZETEVsQlFYaENPMEZCUTBRN08wRkJSVVFzVFVGQlNYQkdMRlZCUVZVc1MwRkJTeTlDTEUxQlFXNUNMRVZCUTBVN08wRkJSVVlzVFVGQlNXMUlMRk5CUVZNc1EwRkJZaXhGUVVORkxFdEJRVXQ2UWl4VlFVRk1MRU5CUVdkQ2VVSXNTMEZCYUVJc1JVRkJkVUp3Uml4TlFVRjJRaXhGUVVFclFqUkVMRkZCUVM5Q0xFVkJSRVlzUzBGSFJTeExRVUZMUkN4VlFVRk1MRU5CUVdkQ0xFOUJRVTk1UWl4TFFVRlFMRWRCUVdVc1EwRkJMMElzUlVGQmEwTndSaXhOUVVGc1F5eEZRVUV3UXpSRUxGRkJRVEZETzBGQlEwZ3NRMEZtUkRzN1FVRnBRa0VzVTBGQlUyMURMRmRCUVZRc1EwRkJjMEl4U1N4SFFVRjBRaXhGUVVFeVFpdElMRXRCUVROQ0xFVkJRV3REY0VZc1RVRkJiRU1zUlVGQk1FTTRSQ3haUVVFeFF5eEZRVUYzUkVZc1VVRkJlRVFzUlVGQmEwVTdRVUZEYUVVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSE5EUVVGb1F6dEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4TlFVRnFRaXhGUVVGNVFpeERRVUZETEUxQlFURkNPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1RSRExGTkJRVk1zUTBGQllpeEZRVU5GUlN4aFFVRmhha2tzUjBGQllpeEZRVUZyUWl0SUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNNFJDeFpRVUZxUXl4RlFVRXJRMFlzVVVGQkwwTXNSVUZFUml4TFFVZEZNRUlzWVVGQllXcEpMRWRCUVdJc1JVRkJhMElzVTBGQlV5dElMRXRCUVZRc1IwRkJhVUlzUTBGQmJrTXNSVUZCYzBOd1JpeE5RVUYwUXl4RlFVRTRRemhFTEZsQlFUbERMRVZCUVRSRVJpeFJRVUUxUkR0QlFVTklPenRCUVVWRU5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSTRSU3haUVVGcVFpeEhRVUZuUXl4VlFVRlZXaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSVzFETEdOQlFWa3NTVUZCV2l4RlFVRnJRbGdzUzBGQmJFSXNSVUZCZVVKd1JpeE5RVUY2UWl4RlFVRnBReXhKUVVGcVF5eEZRVUYxUXpSRUxGRkJRWFpETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDSzBVc1dVRkJha0lzUjBGQlowTXNWVUZCVldJc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZEYWtWdFF5eGpRVUZaTEVsQlFWb3NSVUZCYTBKWUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1MwRkJha01zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM05ETEZkQlFWUXNRMEZCYzBJM1NTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeFZRVUZxUWl4RlFVRTJRaXhEUVVGRExGVkJRVGxDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlRTeGhRVUZoY2trc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGT0VJc1lVRkJZWEpKTEVkQlFXSXNSVUZCYTBJc1lVRkJZU3RJTEV0QlFXSXNSMEZCY1VJc1EwRkJka01zUlVGQk1FTndSaXhOUVVFeFF5eEZRVUZyUkRoRUxGbEJRV3hFTEVWQlFXZEZSaXhSUVVGb1JUdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpwUml4WlFVRnFRaXhIUVVGblF5eFZRVUZWWml4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhORExHTkJRVmtzU1VGQldpeEZRVUZyUW1Rc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2EwWXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXaENMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEycEZjME1zWTBGQldTeEpRVUZhTEVWQlFXdENaQ3hMUVVGc1FpeEZRVUY1UW5CR0xFMUJRWHBDTEVWQlFXbERMRXRCUVdwRExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJMRk5CUVZONVF5eFhRVUZVTEVOQlFYTkNhRW9zUjBGQmRFSXNSVUZCTWtJclNDeExRVUV6UWl4RlFVRnJRM0JHTEUxQlFXeERMRVZCUVRCRE9FUXNXVUZCTVVNc1JVRkJkMFJHTEZGQlFYaEVMRVZCUVd0Rk8wRkJRMmhGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4elFrRkJjRUlzUlVGQk5FTXNRMEZCUXl4elFrRkJOME03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuRkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVnVRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zU1VGQmFrTXNSVUZCZFVNMFJDeFJRVUYyUXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5OR0xGbEJRV3BDTEVkQlFXZERMRlZCUVZWd1FpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYbERMR05CUVZrc1NVRkJXaXhGUVVGclFtcENMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVXpaRExGbEJRVlFzUTBGQmRVSndTaXhIUVVGMlFpeEZRVUUwUWl0SUxFdEJRVFZDTEVWQlFXMURjRVlzVFVGQmJrTXNSVUZCTWtNNFJDeFpRVUV6UXl4RlFVRjVSRVlzVVVGQmVrUXNSVUZCYlVVN1FVRkRha1VzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUTBrc2MwTkJSRW83UVVGRlFYRkpMR2xDUVVGaGJFSXNTMEZCWWl4RlFVRnZRaXgxUWtGQmNFSXNSVUZCTmtNc1EwRkJReXgxUWtGQk9VTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJqRkdMRlZCUVZFNFFpeExRVUZTTEVOQlFXTjJRaXhIUVVGa0xFVkJRVzFDSzBnc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVMRVZCUVdoRUxFVkJRVzlFTEVOQlFYQkVPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5kR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMFFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTVUZCYkVNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxHTEdGQlFXcENMRWRCUVdsRExGVkJRVlYyUWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRaRExHVkJRV0VzU1VGQllpeEZRVUZ0UW5KQ0xFdEJRVzVDTEVWQlFUQkNjRVlzVFVGQk1VSXNSVUZCYTBNc1MwRkJiRU1zUlVGQmVVTTBSQ3hSUVVGNlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFN1FVRkRRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVZc1NVRkJha0lzUjBGQmQwSXNWVUZCVlhoQ0xFdEJRVllzUlVGQmFVSTVSQ3hMUVVGcVFpeEZRVUYzUWtNc1IwRkJlRUlzUlVGQk5rSTdRVUZEYmtRc1RVRkJTU3hEUVVGRE5rUXNTMEZCVEN4RlFVRlpRU3hSUVVGUkxFTkJRVkk3UVVGRFdpeE5RVUZKTEVOQlFVTTVSQ3hMUVVGTUxFVkJRVmxCTEZGQlFWRXNRMEZCVWp0QlFVTmFMRTFCUVVrc1EwRkJRME1zUjBGQlRDeEZRVUZWUVN4TlFVRk5MRXRCUVV0MFJDeE5RVUZZT3p0QlFVVldMRTFCUVVrc1QwRkJUMjFJTEV0QlFWQXNTMEZCYVVJc1VVRkJja0lzUlVGQkswSTdRVUZETjBKQkxGbEJRVkZCTEUxQlFVMTVRaXhWUVVGT0xFTkJRV2xDTEVOQlFXcENMRU5CUVZJN1FVRkRSRHM3UVVGRlJIQklMRk5CUVU4c1QwRkJUekpHTEV0QlFWQXNTMEZCYVVJc1VVRkJha0lzU1VGQk5rSXNRMEZCUXpkRkxFMUJRVTAyUlN4TFFVRk9MRU5CUVhKRExFVkJRVzFFTEhWQ1FVRnVSRHRCUVVOQk0wWXNVMEZCVHpoQ0xFOUJRVTlFTEV0QlFXUXNSVUZCY1VJc1lVRkJja0k3TzBGQlJVRTdRVUZEUVN4TlFVRkpReXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWtzUzBGQlMzSkVMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN08wRkJSWFpDZDBJc1UwRkJUelpDTEZOQlFWTXNRMEZCVkN4SlFVRmpRU3hSUVVGUkxFdEJRVXR5UkN4TlFVRnNReXhGUVVFd1F5eHhRa0ZCTVVNN1FVRkRRWGRDTEZOQlFVODRRaXhQUVVGUExFTkJRVkFzU1VGQldVRXNUMEZCVHl4TFFVRkxkRVFzVFVGQkwwSXNSVUZCZFVNc2JVSkJRWFpET3p0QlFVVkJMRTlCUVVzc1NVRkJTVTBzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1F5eFRRVUZMUVN4RFFVRk1MRWxCUVZVMlJ5eExRVUZXTzBGQlEwUTdRVUZEUml4RFFYUkNSRHM3UVVGM1FrRndTU3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRalJHTEU5QlFXcENMRWRCUVRKQ0xGbEJRVms3UVVGRGNrTXNUVUZCU1RsRUxFMUJRVTBzUlVGQlZqdEJRVU5CTEUxQlFVbFNMRTFCUVUwc1MwRkJTM1pGTEUxQlFXWTdRVUZEUVN4UFFVRkxMRWxCUVVsTkxFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTV2xGTEVkQlFYQkNMRVZCUVhsQ2FrVXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSjVSU3hSUVVGSmVrVXNRMEZCU2l4SlFVRlRNRVVzVFVGQlRTeExRVUZMTVVVc1EwRkJUQ3hEUVVGT0xFTkJRVlE3UVVGRFFTeFJRVUZKUVN4TlFVRk5lRUlzVVVGQlVVY3NhVUpCUVd4Q0xFVkJRWEZETzBGQlEyNURPRVlzVlVGQlNYcEZMRWxCUVVrc1EwRkJVaXhKUVVGaExFdEJRV0k3UVVGRFFUdEJRVU5FTzBGQlEwWTdRVUZEUkN4VFFVRlBMR0ZCUVdGNVJTeEpRVUZKSzBRc1NVRkJTaXhEUVVGVExFZEJRVlFzUTBGQllpeEhRVUUyUWl4SFFVRndRenRCUVVORUxFTkJXRVE3TzBGQllVRTdPenM3UVVGSlFTOUtMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRVlzWVVGQmFrSXNSMEZCYVVNc1dVRkJXVHRCUVVNelF5eE5RVUZKTEU5QlFVOTRTaXhWUVVGUUxFdEJRWE5DTEZkQlFURkNMRVZCUVhWRE8wRkJRM0pETEZGQlFVbFNMRTlCUVU5SkxHVkJRVmdzUlVGQk5FSTdRVUZETVVJc1lVRkJVU3hKUVVGSlNpeE5RVUZLTEVOQlFWY3NTVUZCV0N4RFFVRkVMRU5CUVcxQ2FVc3NUVUZCTVVJN1FVRkRSQ3hMUVVaRUxFMUJSVTg3UVVGRFRDeFZRVUZKTlVvc1RVRkJUU3hKUVVGSlJ5eFZRVUZLTEVOQlFXVXNTMEZCUzFNc1RVRkJjRUlzUTBGQlZqdEJRVU5CTEZkQlFVc3NTVUZCU1Uwc1NVRkJTU3hEUVVGU0xFVkJRVmRwUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCTVVJc1JVRkJhME5OTEVsQlFVbHBSU3hIUVVGMFF5eEZRVUV5UTJwRkxFdEJRVXNzUTBGQmFFUTdRVUZEUld4Q0xGbEJRVWxyUWl4RFFVRktMRWxCUVZNc1MwRkJTMEVzUTBGQlRDeERRVUZVTzBGQlJFWXNUMEZGUVN4UFFVRlBiRUlzU1VGQlNUUktMRTFCUVZnN1FVRkRSRHRCUVVOR0xFZEJWRVFzVFVGVFR6dEJRVU5NTEZWQlFVMHNTVUZCU1RkSkxFdEJRVW9zUTBGQlZTeHZSRUZCVml4RFFVRk9PMEZCUTBRN1FVRkRSaXhEUVdKRU96dEJRV1ZCTzBGQlEwRTdPMEZCUlVFc1UwRkJVMG9zVlVGQlZDeERRVUZ4UW10Q0xFZEJRWEpDTEVWQlFUQkNPMEZCUTNoQ0xFMUJRVWxCTEVsQlFVbG5TU3hKUVVGU0xFVkJRV01zVDBGQlQyaEpMRWxCUVVsblNTeEpRVUZLTEVWQlFWQTdRVUZEWkN4VFFVRlBhRWtzU1VGQlNXbEpMRTlCUVVvc1EwRkJXU3haUVVGYUxFVkJRVEJDTEVWQlFURkNMRU5CUVZBN1FVRkRSRHM3UVVGRlJDeEpRVUZKUXl4TFFVRkxjRXNzVDBGQlQydEZMRk5CUVdoQ096dEJRVVZCT3pzN1FVRkhRV3hGTEU5QlFVOXhRaXhSUVVGUUxFZEJRV3RDTEZWQlFWVmtMRWRCUVZZc1JVRkJaVHRCUVVNdlFrRXNUVUZCU1dVc1UwRkJTaXhIUVVGblFpeEpRVUZvUWpzN1FVRkZRVHRCUVVOQlppeE5RVUZKT0Vvc1NVRkJTaXhIUVVGWE9Vb3NTVUZCU1N0R0xFZEJRV1k3UVVGRFFTOUdMRTFCUVVscFFpeEpRVUZLTEVkQlFWZHFRaXhKUVVGSmEwY3NSMEZCWmpzN1FVRkZRVHRCUVVOQmJFY3NUVUZCU1N0R0xFZEJRVW9zUjBGQlZUaEVMRWRCUVVjNVJDeEhRVUZpTzBGQlEwRXZSaXhOUVVGSmEwY3NSMEZCU2l4SFFVRlZNa1FzUjBGQlJ6TkVMRWRCUVdJN08wRkJSVUZzUnl4TlFVRkpjVUlzUzBGQlNpeEhRVUZaZDBrc1IwRkJSM2hKTEV0QlFXWTdRVUZEUVhKQ0xFMUJRVWs0UkN4UlFVRktMRWRCUVdVclJpeEhRVUZITDBZc1VVRkJiRUk3UVVGRFFUbEVMRTFCUVVrclNpeGpRVUZLTEVkQlFYRkNSaXhIUVVGSEwwWXNVVUZCZUVJN1FVRkRRVGxFTEUxQlFVbDNSU3hOUVVGS0xFZEJRV0Z4Uml4SFFVRkhja1lzVFVGQmFFSTdRVUZEUVhoRkxFMUJRVWx6UXl4SlFVRktMRWRCUVZkMVNDeEhRVUZIZGtnc1NVRkJaRHRCUVVOQmRFTXNUVUZCU1RKRkxFdEJRVW9zUjBGQldXdEdMRWRCUVVkc1JpeExRVUZtTzBGQlEwRXpSU3hOUVVGSmIwSXNVMEZCU2l4SFFVRm5RbmxKTEVkQlFVZDZTU3hUUVVGdVFqdEJRVU5CY0VJc1RVRkJTWGxITEZsQlFVb3NSMEZCYlVKdlJDeEhRVUZIY0VRc1dVRkJkRUk3UVVGRFFYcEhMRTFCUVVrd1J5eFpRVUZLTEVkQlFXMUNiVVFzUjBGQlIyNUVMRmxCUVhSQ08wRkJRMEV4Unl4TlFVRkpORWNzV1VGQlNpeEhRVUZ0UW1sRUxFZEJRVWRxUkN4WlFVRjBRanRCUVVOQk5VY3NUVUZCU1RaSExGbEJRVW9zUjBGQmJVSm5SQ3hIUVVGSGFFUXNXVUZCZEVJN1FVRkRRVGRITEUxQlFVazRSeXhSUVVGS0xFZEJRV1VyUXl4SFFVRkhMME1zVVVGQmJFSTdRVUZEUVRsSExFMUJRVWxwU0N4WFFVRktMRWRCUVd0Q05FTXNSMEZCUnpWRExGZEJRWEpDTzBGQlEwRnFTQ3hOUVVGSmEwZ3NWMEZCU2l4SFFVRnJRakpETEVkQlFVY3pReXhYUVVGeVFqdEJRVU5CYkVnc1RVRkJTVzlJTEZkQlFVb3NSMEZCYTBKNVF5eEhRVUZIZWtNc1YwRkJja0k3UVVGRFFYQklMRTFCUVVseFNDeFhRVUZLTEVkQlFXdENkME1zUjBGQlIzaERMRmRCUVhKQ08wRkJRMEZ5U0N4TlFVRkpkMGdzVjBGQlNpeEhRVUZyUW5GRExFZEJRVWR5UXl4WFFVRnlRanRCUVVOQmVFZ3NUVUZCU1hsSUxGZEJRVW9zUjBGQmEwSnZReXhIUVVGSGNFTXNWMEZCY2tJN1FVRkRRWHBJTEUxQlFVa3lTQ3haUVVGS0xFZEJRVzFDYTBNc1IwRkJSMnhETEZsQlFYUkNPMEZCUTBFelNDeE5RVUZKTkVnc1dVRkJTaXhIUVVGdFFtbERMRWRCUVVkcVF5eFpRVUYwUWp0QlFVTkJOVWdzVFVGQlNXOUhMRlZCUVVvc1IwRkJhVUo1UkN4SFFVRkhla1FzVlVGQmNFSTdRVUZEUVhCSExFMUJRVWxwU1N4aFFVRktMRWRCUVc5Q05FSXNSMEZCUnpWQ0xHRkJRWFpDTzBGQlEwRnFTU3hOUVVGSmEwa3NZVUZCU2l4SFFVRnZRakpDTEVkQlFVY3pRaXhoUVVGMlFqdEJRVU5CYkVrc1RVRkJTVzlKTEdGQlFVb3NSMEZCYjBKNVFpeEhRVUZIZWtJc1lVRkJka0k3UVVGRFFYQkpMRTFCUVVseFNTeGhRVUZLTEVkQlFXOUNkMElzUjBGQlIzaENMR0ZCUVhaQ08wRkJRMEZ5U1N4TlFVRkpjMGtzVTBGQlNpeEhRVUZuUW5WQ0xFZEJRVWQyUWl4VFFVRnVRanRCUVVOQmRFa3NUVUZCU1hsSkxGbEJRVW9zUjBGQmJVSnZRaXhIUVVGSGNFSXNXVUZCZEVJN1FVRkRRWHBKTEUxQlFVa3dTU3haUVVGS0xFZEJRVzFDYlVJc1IwRkJSMjVDTEZsQlFYUkNPMEZCUTBFeFNTeE5RVUZKTkVrc1dVRkJTaXhIUVVGdFFtbENMRWRCUVVkcVFpeFpRVUYwUWp0QlFVTkJOVWtzVFVGQlNUWkpMRmxCUVVvc1IwRkJiVUpuUWl4SFFVRkhhRUlzV1VGQmRFSTdRVUZEUVRkSkxFMUJRVWxuU2l4WlFVRktMRWRCUVcxQ1lTeEhRVUZIWWl4WlFVRjBRanRCUVVOQmFFb3NUVUZCU1dsS0xGbEJRVW9zUjBGQmJVSlpMRWRCUVVkYUxGbEJRWFJDTzBGQlEwRnFTaXhOUVVGSmJVb3NZVUZCU2l4SFFVRnZRbFVzUjBGQlIxWXNZVUZCZGtJN1FVRkRRVzVLTEUxQlFVbHZTaXhoUVVGS0xFZEJRVzlDVXl4SFFVRkhWQ3hoUVVGMlFqdEJRVU5CY0Vvc1RVRkJTWEZLTEVsQlFVb3NSMEZCVjFFc1IwRkJSMUlzU1VGQlpEdEJRVU5CY2tvc1RVRkJTWFZLTEU5QlFVb3NSMEZCWTAwc1IwRkJSMDRzVDBGQmFrSTdRVUZEUVhaS0xFMUJRVWw1U2l4aFFVRktMRWRCUVc5Q1NTeEhRVUZIU2l4aFFVRjJRanM3UVVGRlFTeFRRVUZQZWtvc1IwRkJVRHRCUVVORUxFTkJiRVJFT3p0QlFXOUVRVHRCUVVOQkxGTkJRVk0wUml4TFFVRlVMRU5CUVdkQ2IwVXNTMEZCYUVJc1JVRkJkVUl2UlN4SFFVRjJRaXhGUVVFMFFtZEdMRmxCUVRWQ0xFVkJRVEJETzBGQlEzaERMRTFCUVVrc1QwRkJUMFFzUzBGQlVDeExRVUZwUWl4UlFVRnlRaXhGUVVFclFpeFBRVUZQUXl4WlFVRlFPMEZCUXk5Q1JDeFZRVUZSTEVOQlFVTXNRMEZCUTBFc1MwRkJWaXhEUVVaM1F5eERRVVYwUWp0QlFVTnNRaXhOUVVGSlFTeFRRVUZUTDBVc1IwRkJZaXhGUVVGclFpeFBRVUZQUVN4SFFVRlFPMEZCUTJ4Q0xFMUJRVWtyUlN4VFFVRlRMRU5CUVdJc1JVRkJaMElzVDBGQlQwRXNTMEZCVUR0QlFVTm9Ra0VzVjBGQlV5OUZMRWRCUVZRN1FVRkRRU3hOUVVGSkswVXNVMEZCVXl4RFFVRmlMRVZCUVdkQ0xFOUJRVTlCTEV0QlFWQTdRVUZEYUVJc1UwRkJUeXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNKS0xFMUJRVlFzUTBGQmFVSkVMRTFCUVdwQ0xFVkJRWGxDTzBGQlEzWkNPMEZCUTBFN1FVRkRRVHRCUVVOQlFTeFhRVUZUTEVOQlFVTXNRMEZCUXpKRkxFdEJRVXMyUlN4SlFVRk1MRU5CUVZVc1EwRkJRM2hLTEUxQlFWZ3NRMEZCV0R0QlFVTkJMRk5CUVU5QkxGTkJRVk1zUTBGQlZDeEhRVUZoTEVOQlFXSXNSMEZCYVVKQkxFMUJRWGhDTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEU5QlFWUXNRMEZCYTBJNVFpeFBRVUZzUWl4RlFVRXlRanRCUVVONlFpeFRRVUZQTEVOQlFVTnhSU3hOUVVGTmRrTXNUMEZCVGl4SlFVRnBRaXhWUVVGVk9VSXNUMEZCVml4RlFVRnRRanRCUVVNeFF5eFhRVUZQT0Vvc1QwRkJUM2hITEZOQlFWQXNRMEZCYVVKSExGRkJRV3BDTEVOQlFUQkNZeXhKUVVFeFFpeERRVUVyUW5aRkxFOUJRUzlDTEUxQlFUUkRMR2RDUVVGdVJEdEJRVU5FTEVkQlJrMHNSVUZGU2tFc1QwRkdTU3hEUVVGUU8wRkJSMFE3TzBGQlJVUXNVMEZCVTJFc1ZVRkJWQ3hEUVVGeFFtSXNUMEZCY2tJc1JVRkJPRUk3UVVGRE5VSXNVMEZCVHpoQ0xGRkJRVkU1UWl4UFFVRlNMRXRCUVc5Q1dpeFBRVUZQTUVJc1VVRkJVQ3hEUVVGblFtUXNUMEZCYUVJc1EwRkJjRUlzU1VGRFNFRXNWMEZCVnl4UlFVRlBRU3hQUVVGUUxIbERRVUZQUVN4UFFVRlFMRTlCUVcxQ0xGRkJRVGxDTEVsQlEwRXNUMEZCVDBFc1VVRkJVVXNzVFVGQlppeExRVUV3UWl4UlFVWTVRanRCUVVkRU96dEJRVVZFTEZOQlFWTm5SaXhMUVVGVUxFTkJRV2RDTUVVc1EwRkJhRUlzUlVGQmJVSTdRVUZEYWtJc1RVRkJTVUVzU1VGQlNTeEZRVUZTTEVWQlFWa3NUMEZCVHl4TlFVRk5RU3hGUVVGRmRFY3NVVUZCUml4RFFVRlhMRVZCUVZnc1EwRkJZanRCUVVOYUxGTkJRVTl6Unl4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5xUXl4WFFVRlVMRU5CUVhOQ1JpeEhRVUYwUWl4RlFVRXlRanRCUVVONlFpeE5RVUZKTUVrc1dVRkJXU3hGUVVGb1FqdEJRVU5CTEU5QlFVc3NTVUZCU1hKS0xFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVmNzU1VGQlNXcENMRTFCUVhoQ0xFVkJRV2REVFN4SFFVRm9ReXhGUVVGeFF6dEJRVU51UXl4UlFVRkpVeXhKUVVGSlJTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4RFFVRlNPMEZCUTBFc1VVRkJTVk1zUzBGQlN5eEpRVUZVTEVWQlEwVTBTU3hWUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZtTEVWQlJFWXNTMEZGU3p0QlFVTklMRlZCUVVrclF5eFJRVUZSTDBNc1EwRkJXanRCUVVOQkxGVkJRVWxUTEV0QlFVc3NUVUZCVEN4SlFVRmxRU3hMUVVGTExFMUJRWGhDTEVWQlFXZERWRHRCUVVOb1F5eFZRVUZKZFVvc1NVRkJTVU1zYlVKQlFXMUNOMGtzU1VGQlNXZEVMRXRCUVVvc1EwRkJWVm9zUzBGQlZpeEZRVUZwUWk5RExFbEJRVVVzUTBGQmJrSXNRMEZCYmtJc1JVRkJNRU1yUWl4TlFVRXhReXhEUVVGcFJDeERRVUZxUkN4RlFVRnZSREJJTEV0QlFYQkVMRU5CUVRCRUxFZEJRVEZFTEVOQlFWSTdRVUZEUVN4WFFVRkxMRWxCUVVsNlF5eEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWwxUXl4RlFVRkZOMG9zVFVGQmRFSXNSVUZCT0VKelNDeEhRVUU1UWp0QlFVTkZjVU1zYTBKQlFWVkRMRWxCUVZZc1EwRkJaWGhJTEZOQlFWTjVTQ3hGUVVGRmRrTXNRMEZCUml4RFFVRlVMRVZCUVdVc1JVRkJaaXhEUVVGbU8wRkJSRVk3UVVGRlJEdEJRVU5HTzBGQlEwUXNVMEZCVDNGRExGTkJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRMMGNzV1VGQlZDeERRVUYxUWpOQ0xFZEJRWFpDTEVWQlFUUkNPMEZCUXpGQ0xFMUJRVWt3U1N4WlFVRlpMRVZCUVdoQ08wRkJRMEVzVDBGQlN5eEpRVUZKY2tvc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpWeXhKUVVGSmFrSXNUVUZCZUVJc1JVRkJaME5OTEVkQlFXaERMRVZCUVhGRE8wRkJRMjVETzBGQlEwRnhTaXhqUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeEpRVUZ2UWl4SlFVRnVRenRCUVVORU8wRkJRMFFzVTBGQlQzRktMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTTBjc1kwRkJWQ3hEUVVGNVFpOUNMRWRCUVhwQ0xFVkJRVGhDTzBGQlF6VkNMRTFCUVVrclNTeERRVUZLTEVWQlFVOURMRVZCUVZBc1JVRkJWME1zUlVGQldEdEJRVU5CTEUxQlFVbFFMRmxCUVZrc1JVRkJhRUk3UVVGRFFTeFBRVUZMTEVsQlFVbHlTaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsWExFbEJRVWxxUWl4TlFVRjRRaXhGUVVGblEwMHNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTXdTaXhSUVVGSkwwa3NTVUZCU1RKSUxGVkJRVW9zUTBGQlpYUkpMRU5CUVdZc1EwRkJTanRCUVVOQk1rb3NVMEZCUzBRc1MwRkJTeXhEUVVGV08wRkJRMEZGTEZOQlFVdEdMRWxCUVVrc1IwRkJWRHRCUVVOQlRDeGpRVUZWUXl4SlFVRldMRU5CUVdWTkxFVkJRV1k3UVVGRFFWQXNZMEZCVlVNc1NVRkJWaXhEUVVGbFN5eEZRVUZtTzBGQlEwUTdPMEZCUlVRc1UwRkJUMDRzVTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMlNTeGhRVUZVTEVOQlFYZENTQ3hIUVVGNFFpeEZRVUUyUWp0QlFVTXpRaXhUUVVGUGRFTXNUMEZCVDNkTUxGZEJRVkFzUTBGQmJVSnNTaXhIUVVGdVFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEZWQlFWUXNRMEZCY1VJd1NDeEhRVUZ5UWl4RlFVRXdRa01zUjBGQk1VSXNSVUZCSzBKMFNTeE5RVUV2UWl4RlFVRjFReTlDTEUxQlFYWkRMRVZCUVN0RE8wRkJRemRETEUxQlFVa3dRaXhIUVVGS08wRkJRMEVzVDBGQlN5eEpRVUZKY0VJc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpUaXhOUVVGd1FpeEZRVUUwUWswc1IwRkJOVUlzUlVGQmFVTTdRVUZETDBJc1VVRkJTMEVzU1VGQlNYbENMRTFCUVVvc1NVRkJZM05KTEVsQlFVbHlTeXhOUVVGdVFpeEpRVUVyUWswc1MwRkJTemhLTEVsQlFVbHdTeXhOUVVFMVF5eEZRVU5GTzBGQlEwWnhTeXhSUVVGSkwwb3NTVUZCU1hsQ0xFMUJRVklzU1VGQmEwSnhTU3hKUVVGSk9Vb3NRMEZCU2l4RFFVRnNRanRCUVVORU8wRkJRMFFzVTBGQlQwRXNRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk4xUlN4alFVRlVMRU5CUVhsQ05VUXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSXNUVUZCU1R0QlFVTkdMRmRCUVU5eFNpeHRRa0ZCYlVKeVNpeEhRVUZ1UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hEUVVWRkxFOUJRVTl6U2l4SFFVRlFMRVZCUVZrN1FVRkRXaXhYUVVGUE1Vb3NUMEZCVDJsRkxGbEJRVkFzUTBGQmIwSXNUVUZCY0VJc1EwRkJVQ3hEUVVSWkxFTkJRM1ZDTzBGQlEzQkRPMEZCUTBZN08wRkJSVVE3T3pzN08wRkJTMEVzVTBGQlUzTkRMRk5CUVZRc1EwRkJiMEpFTEV0QlFYQkNMRVZCUVRKQ2NVUXNSMEZCTTBJc1JVRkJaME03UVVGRE9VSm9TaXhUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTXNRMEZCYUVJc1JVRkJiVUlzTUVSQlFXNUNPMEZCUTBFelJpeFRRVUZQTWtZc1UwRkJVM0ZFTEVkQlFXaENMRVZCUVhGQ0xEWkRRVUZ5UWp0QlFVTkJhRW9zVTBGQlQyMUVMRXRCUVVzNFJpeExRVUZNTEVOQlFWZDBSQ3hMUVVGWUxFMUJRWE5DUVN4TFFVRTNRaXhGUVVGdlF5eHJRMEZCY0VNN1FVRkRSRHM3UVVGRlJDeFRRVUZUVlN4VFFVRlVMRU5CUVc5Q1ZpeExRVUZ3UWl4RlFVRXlRbkZFTEVkQlFUTkNMRVZCUVdkRE5VWXNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTndSQ3hUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTnhSQ3hIUVVGb1FpeEZRVUZ4UWl4NVEwRkJja0k3UVVGRFFXaEtMRk5CUVU4eVJpeFRRVUZUZGtNc1IwRkJhRUlzUlVGQmNVSXNNRU5CUVhKQ08wRkJRMEZ3UkN4VFFVRlBiVVFzUzBGQlN6aEdMRXRCUVV3c1EwRkJWM1JFTEV0QlFWZ3NUVUZCYzBKQkxFdEJRVGRDTEVWQlFXOURMR3REUVVGd1F6dEJRVU5FT3p0QlFVVkVMRk5CUVZOclFpeFpRVUZVTEVOQlFYVkNiRUlzUzBGQmRrSXNSVUZCT0VKeFJDeEhRVUU1UWl4RlFVRnRRelZHTEVkQlFXNURMRVZCUVhkRE8wRkJRM1JEY0VRc1UwRkJUeXhQUVVGUE1rWXNTMEZCVUN4TFFVRnBRaXhSUVVGNFFpeEZRVUZyUXl4MVEwRkJiRU03UVVGRFFUTkdMRk5CUVU4eVJpeFRRVUZUY1VRc1IwRkJhRUlzUlVGQmNVSXNlVU5CUVhKQ08wRkJRMEZvU2l4VFFVRlBNa1lzVTBGQlUzWkRMRWRCUVdoQ0xFVkJRWEZDTERCRFFVRnlRanRCUVVORU96dEJRVVZFTEZOQlFWTndSQ3hOUVVGVUxFTkJRV2xDYTBvc1NVRkJha0lzUlVGQmRVSkRMRTlCUVhaQ0xFVkJRV2RETzBGQlF6bENMRTFCUVVrc1EwRkJRMFFzU1VGQlRDeEZRVUZYTEUxQlFVMHNTVUZCU1haTExFdEJRVW9zUTBGQlZYZExMRmRCUVZjc2EwSkJRWEpDTEVOQlFVNDdRVUZEV2lJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFJVnh1SUNvZ1ZHaGxJR0oxWm1abGNpQnRiMlIxYkdVZ1puSnZiU0J1YjJSbExtcHpMQ0JtYjNJZ2RHaGxJR0p5YjNkelpYSXVYRzRnS2x4dUlDb2dRR0YxZEdodmNpQWdJRVpsY205emN5QkJZbTkxYTJoaFpHbHFaV2dnUEdabGNtOXpjMEJtWlhKdmMzTXViM0puUGlBOGFIUjBjRG92TDJabGNtOXpjeTV2Y21jK1hHNGdLaUJBYkdsalpXNXpaU0FnVFVsVVhHNGdLaTljYmx4dWRtRnlJR0poYzJVMk5DQTlJSEpsY1hWcGNtVW9KMkpoYzJVMk5DMXFjeWNwWEc1MllYSWdhV1ZsWlRjMU5DQTlJSEpsY1hWcGNtVW9KMmxsWldVM05UUW5LVnh1WEc1bGVIQnZjblJ6TGtKMVptWmxjaUE5SUVKMVptWmxjbHh1Wlhod2IzSjBjeTVUYkc5M1FuVm1abVZ5SUQwZ1FuVm1abVZ5WEc1bGVIQnZjblJ6TGtsT1UxQkZRMVJmVFVGWVgwSlpWRVZUSUQwZ05UQmNia0oxWm1abGNpNXdiMjlzVTJsNlpTQTlJRGd4T1RKY2JseHVMeW9xWEc0Z0tpQkpaaUJnUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWMyQTZYRzRnS2lBZ0lEMDlQU0IwY25WbElDQWdJRlZ6WlNCVmFXNTBPRUZ5Y21GNUlHbHRjR3hsYldWdWRHRjBhVzl1SUNobVlYTjBaWE4wS1Z4dUlDb2dJQ0E5UFQwZ1ptRnNjMlVnSUNCVmMyVWdUMkpxWldOMElHbHRjR3hsYldWdWRHRjBhVzl1SUNoamIyMXdZWFJwWW14bElHUnZkMjRnZEc4Z1NVVTJLVnh1SUNvdlhHNUNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUQwZ0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0x5OGdSR1YwWldOMElHbG1JR0p5YjNkelpYSWdjM1Z3Y0c5eWRITWdWSGx3WldRZ1FYSnlZWGx6TGlCVGRYQndiM0owWldRZ1luSnZkM05sY25NZ1lYSmxJRWxGSURFd0t5d2dSbWx5WldadmVDQTBLeXhjYmlBZ0x5OGdRMmh5YjIxbElEY3JMQ0JUWVdaaGNta2dOUzR4S3l3Z1QzQmxjbUVnTVRFdU5pc3NJR2xQVXlBMExqSXJMaUJKWmlCMGFHVWdZbkp2ZDNObGNpQmtiMlZ6SUc1dmRDQnpkWEJ3YjNKMElHRmtaR2x1WjF4dUlDQXZMeUJ3Y205d1pYSjBhV1Z6SUhSdklHQlZhVzUwT0VGeWNtRjVZQ0JwYm5OMFlXNWpaWE1zSUhSb1pXNGdkR2hoZENkeklIUm9aU0J6WVcxbElHRnpJRzV2SUdCVmFXNTBPRUZ5Y21GNVlDQnpkWEJ3YjNKMFhHNGdJQzh2SUdKbFkyRjFjMlVnZDJVZ2JtVmxaQ0IwYnlCaVpTQmhZbXhsSUhSdklHRmtaQ0JoYkd3Z2RHaGxJRzV2WkdVZ1FuVm1abVZ5SUVGUVNTQnRaWFJvYjJSekxpQlVhR2x6SUdseklHRnVJR2x6YzNWbFhHNGdJQzh2SUdsdUlFWnBjbVZtYjNnZ05DMHlPUzRnVG05M0lHWnBlR1ZrT2lCb2RIUndjem92TDJKMVozcHBiR3hoTG0xdmVtbHNiR0V1YjNKbkwzTm9iM2RmWW5WbkxtTm5hVDlwWkQwMk9UVTBNemhjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUVGeWNtRjVRblZtWm1WeUtEQXBYRzRnSUNBZ2RtRnlJR0Z5Y2lBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0dKMVppbGNiaUFnSUNCaGNuSXVabTl2SUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdORElnZlZ4dUlDQWdJSEpsZEhWeWJpQTBNaUE5UFQwZ1lYSnlMbVp2YnlncElDWW1YRzRnSUNBZ0lDQWdJSFI1Y0dWdlppQmhjbkl1YzNWaVlYSnlZWGtnUFQwOUlDZG1kVzVqZEdsdmJpY2dMeThnUTJoeWIyMWxJRGt0TVRBZ2JHRmpheUJnYzNWaVlYSnlZWGxnWEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlZjYmlBZ2ZWeHVmU2tvS1Z4dVhHNHZLaXBjYmlBcUlFTnNZWE56T2lCQ2RXWm1aWEpjYmlBcUlEMDlQVDA5UFQwOVBUMDlQVDFjYmlBcVhHNGdLaUJVYUdVZ1FuVm1abVZ5SUdOdmJuTjBjblZqZEc5eUlISmxkSFZ5Ym5NZ2FXNXpkR0Z1WTJWeklHOW1JR0JWYVc1ME9FRnljbUY1WUNCMGFHRjBJR0Z5WlNCaGRXZHRaVzUwWldSY2JpQXFJSGRwZEdnZ1puVnVZM1JwYjI0Z2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWVd4c0lIUm9aU0J1YjJSbElHQkNkV1ptWlhKZ0lFRlFTU0JtZFc1amRHbHZibk11SUZkbElIVnpaVnh1SUNvZ1lGVnBiblE0UVhKeVlYbGdJSE52SUhSb1lYUWdjM0YxWVhKbElHSnlZV05yWlhRZ2JtOTBZWFJwYjI0Z2QyOXlhM01nWVhNZ1pYaHdaV04wWldRZ0xTMGdhWFFnY21WMGRYSnVjMXh1SUNvZ1lTQnphVzVuYkdVZ2IyTjBaWFF1WEc0Z0tseHVJQ29nUW5rZ1lYVm5iV1Z1ZEdsdVp5QjBhR1VnYVc1emRHRnVZMlZ6TENCM1pTQmpZVzRnWVhadmFXUWdiVzlrYVdaNWFXNW5JSFJvWlNCZ1ZXbHVkRGhCY25KaGVXQmNiaUFxSUhCeWIzUnZkSGx3WlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnUW5WbVptVnlJQ2h6ZFdKcVpXTjBMQ0JsYm1OdlpHbHVaeXdnYm05YVpYSnZLU0I3WEc0Z0lHbG1JQ2doS0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJDZFdabVpYSXBLVnh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dRblZtWm1WeUtITjFZbXBsWTNRc0lHVnVZMjlrYVc1bkxDQnViMXBsY204cFhHNWNiaUFnZG1GeUlIUjVjR1VnUFNCMGVYQmxiMllnYzNWaWFtVmpkRnh1WEc0Z0lDOHZJRmR2Y210aGNtOTFibVE2SUc1dlpHVW5jeUJpWVhObE5qUWdhVzF3YkdWdFpXNTBZWFJwYjI0Z1lXeHNiM2R6SUdadmNpQnViMjR0Y0dGa1pHVmtJSE4wY21sdVozTmNiaUFnTHk4Z2QyaHBiR1VnWW1GelpUWTBMV3B6SUdSdlpYTWdibTkwTGx4dUlDQnBaaUFvWlc1amIyUnBibWNnUFQwOUlDZGlZWE5sTmpRbklDWW1JSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdjM1ZpYW1WamRDQTlJSE4wY21sdVozUnlhVzBvYzNWaWFtVmpkQ2xjYmlBZ0lDQjNhR2xzWlNBb2MzVmlhbVZqZEM1c1pXNW5kR2dnSlNBMElDRTlQU0F3S1NCN1hHNGdJQ0FnSUNCemRXSnFaV04wSUQwZ2MzVmlhbVZqZENBcklDYzlKMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUVacGJtUWdkR2hsSUd4bGJtZDBhRnh1SUNCMllYSWdiR1Z1WjNSb1hHNGdJR2xtSUNoMGVYQmxJRDA5UFNBbmJuVnRZbVZ5SnlsY2JpQWdJQ0JzWlc1bmRHZ2dQU0JqYjJWeVkyVW9jM1ZpYW1WamRDbGNiaUFnWld4elpTQnBaaUFvZEhsd1pTQTlQVDBnSjNOMGNtbHVaeWNwWEc0Z0lDQWdiR1Z1WjNSb0lEMGdRblZtWm1WeUxtSjVkR1ZNWlc1bmRHZ29jM1ZpYW1WamRDd2daVzVqYjJScGJtY3BYRzRnSUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdlltcGxZM1FuS1Z4dUlDQWdJR3hsYm1kMGFDQTlJR052WlhKalpTaHpkV0pxWldOMExteGxibWQwYUNrZ0x5OGdZWE56ZFcxbElIUm9ZWFFnYjJKcVpXTjBJR2x6SUdGeWNtRjVMV3hwYTJWY2JpQWdaV3h6WlZ4dUlDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25SbWx5YzNRZ1lYSm5kVzFsYm5RZ2JtVmxaSE1nZEc4Z1ltVWdZU0J1ZFcxaVpYSXNJR0Z5Y21GNUlHOXlJSE4wY21sdVp5NG5LVnh1WEc0Z0lIWmhjaUJpZFdaY2JpQWdhV1lnS0VKMVptWmxjaTVmZFhObFZIbHdaV1JCY25KaGVYTXBJSHRjYmlBZ0lDQXZMeUJRY21WbVpYSnlaV1E2SUZKbGRIVnliaUJoYmlCaGRXZHRaVzUwWldRZ1lGVnBiblE0UVhKeVlYbGdJR2x1YzNSaGJtTmxJR1p2Y2lCaVpYTjBJSEJsY21admNtMWhibU5sWEc0Z0lDQWdZblZtSUQwZ1FuVm1abVZ5TGw5aGRXZHRaVzUwS0c1bGR5QlZhVzUwT0VGeWNtRjVLR3hsYm1kMGFDa3BYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdMeThnUm1Gc2JHSmhZMnM2SUZKbGRIVnliaUJVU0VsVElHbHVjM1JoYm1ObElHOW1JRUoxWm1abGNpQW9ZM0psWVhSbFpDQmllU0JnYm1WM1lDbGNiaUFnSUNCaWRXWWdQU0IwYUdselhHNGdJQ0FnWW5WbUxteGxibWQwYUNBOUlHeGxibWQwYUZ4dUlDQWdJR0oxWmk1ZmFYTkNkV1ptWlhJZ1BTQjBjblZsWEc0Z0lIMWNibHh1SUNCMllYSWdhVnh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lBbUppQjBlWEJsYjJZZ2MzVmlhbVZqZEM1aWVYUmxUR1Z1WjNSb0lEMDlQU0FuYm5WdFltVnlKeWtnZTF4dUlDQWdJQzh2SUZOd1pXVmtJRzl3ZEdsdGFYcGhkR2x2YmlBdExTQjFjMlVnYzJWMElHbG1JSGRsSjNKbElHTnZjSGxwYm1jZ1puSnZiU0JoSUhSNWNHVmtJR0Z5Y21GNVhHNGdJQ0FnWW5WbUxsOXpaWFFvYzNWaWFtVmpkQ2xjYmlBZ2ZTQmxiSE5sSUdsbUlDaHBjMEZ5Y21GNWFYTm9LSE4xWW1wbFkzUXBLU0I3WEc0Z0lDQWdMeThnVkhKbFlYUWdZWEp5WVhrdGFYTm9JRzlpYW1WamRITWdZWE1nWVNCaWVYUmxJR0Z5Y21GNVhHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNCcFppQW9RblZtWm1WeUxtbHpRblZtWm1WeUtITjFZbXBsWTNRcEtWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMExuSmxZV1JWU1c1ME9DaHBLVnh1SUNBZ0lDQWdaV3h6WlZ4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCemRXSnFaV04wVzJsZFhHNGdJQ0FnZlZ4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdZblZtTG5keWFYUmxLSE4xWW1wbFkzUXNJREFzSUdWdVkyOWthVzVuS1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpJQ1ltSUNGdWIxcGxjbThwSUh0Y2JpQWdJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2diR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdKMVpsdHBYU0E5SURCY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnWW5WbVhHNTlYRzVjYmk4dklGTlVRVlJKUXlCTlJWUklUMFJUWEc0dkx5QTlQVDA5UFQwOVBUMDlQVDA5UFZ4dVhHNUNkV1ptWlhJdWFYTkZibU52WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2hsYm1OdlpHbHVaeWtnZTF4dUlDQnpkMmwwWTJnZ0tGTjBjbWx1WnlobGJtTnZaR2x1WnlrdWRHOU1iM2RsY2tOaGMyVW9LU2tnZTF4dUlDQWdJR05oYzJVZ0oyaGxlQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0JqWVhObElDZGlhVzVoY25rbk9seHVJQ0FnSUdOaGMyVWdKMkpoYzJVMk5DYzZYRzRnSUNBZ1kyRnpaU0FuY21GM0p6cGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVmNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxtbHpRblZtWm1WeUlEMGdablZ1WTNScGIyNGdLR0lwSUh0Y2JpQWdjbVYwZFhKdUlDRWhLR0lnSVQwOUlHNTFiR3dnSmlZZ1lpQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHSXVYMmx6UW5WbVptVnlLVnh1ZlZ4dVhHNUNkV1ptWlhJdVlubDBaVXhsYm1kMGFDQTlJR1oxYm1OMGFXOXVJQ2h6ZEhJc0lHVnVZMjlrYVc1bktTQjdYRzRnSUhaaGNpQnlaWFJjYmlBZ2MzUnlJRDBnYzNSeUlDc2dKeWRjYmlBZ2MzZHBkR05vSUNobGJtTnZaR2x1WnlCOGZDQW5kWFJtT0NjcElIdGNiaUFnSUNCallYTmxJQ2RvWlhnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnYzNSeUxteGxibWQwYUNBdklESmNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJQ0FnY21WMElEMGdkWFJtT0ZSdlFubDBaWE1vYzNSeUtTNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWVhOamFXa25PbHh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJR0poYzJVMk5GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRXTnpNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRXTnpMVEluT2x4dUlDQWdJR05oYzJVZ0ozVjBaakUyYkdVbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmkweE5teGxKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHZ2dLaUF5WEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdSbFptRjFiSFE2WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMVZ1YTI1dmQyNGdaVzVqYjJScGJtY25LVnh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWFJjYm4xY2JseHVRblZtWm1WeUxtTnZibU5oZENBOUlHWjFibU4wYVc5dUlDaHNhWE4wTENCMGIzUmhiRXhsYm1kMGFDa2dlMXh1SUNCaGMzTmxjblFvYVhOQmNuSmhlU2hzYVhOMEtTd2dKMVZ6WVdkbE9pQkNkV1ptWlhJdVkyOXVZMkYwS0d4cGMzUXNJRnQwYjNSaGJFeGxibWQwYUYwcFhGeHVKeUFyWEc0Z0lDQWdJQ0FuYkdsemRDQnphRzkxYkdRZ1ltVWdZVzRnUVhKeVlYa3VKeWxjYmx4dUlDQnBaaUFvYkdsemRDNXNaVzVuZEdnZ1BUMDlJREFwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdibVYzSUVKMVptWmxjaWd3S1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLR3hwYzNRdWJHVnVaM1JvSUQwOVBTQXhLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHeHBjM1JiTUYxY2JpQWdmVnh1WEc0Z0lIWmhjaUJwWEc0Z0lHbG1JQ2gwZVhCbGIyWWdkRzkwWVd4TVpXNW5kR2dnSVQwOUlDZHVkVzFpWlhJbktTQjdYRzRnSUNBZ2RHOTBZV3hNWlc1bmRHZ2dQU0F3WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHeHBjM1F1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lIUnZkR0ZzVEdWdVozUm9JQ3M5SUd4cGMzUmJhVjB1YkdWdVozUm9YRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdKMVppQTlJRzVsZHlCQ2RXWm1aWElvZEc5MFlXeE1aVzVuZEdncFhHNGdJSFpoY2lCd2IzTWdQU0F3WEc0Z0lHWnZjaUFvYVNBOUlEQTdJR2tnUENCc2FYTjBMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHbDBaVzBnUFNCc2FYTjBXMmxkWEc0Z0lDQWdhWFJsYlM1amIzQjVLR0oxWml3Z2NHOXpLVnh1SUNBZ0lIQnZjeUFyUFNCcGRHVnRMbXhsYm1kMGFGeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCaWRXWmNibjFjYmx4dUx5OGdRbFZHUmtWU0lFbE9VMVJCVGtORklFMUZWRWhQUkZOY2JpOHZJRDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibVoxYm1OMGFXOXVJRjlvWlhoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJRzltWm5ObGRDQTlJRTUxYldKbGNpaHZabVp6WlhRcElIeDhJREJjYmlBZ2RtRnlJSEpsYldGcGJtbHVaeUE5SUdKMVppNXNaVzVuZEdnZ0xTQnZabVp6WlhSY2JpQWdhV1lnS0NGc1pXNW5kR2dwSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0J5WlcxaGFXNXBibWRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0JPZFcxaVpYSW9iR1Z1WjNSb0tWeHVJQ0FnSUdsbUlDaHNaVzVuZEdnZ1BpQnlaVzFoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSEpsYldGcGJtbHVaMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUcxMWMzUWdZbVVnWVc0Z1pYWmxiaUJ1ZFcxaVpYSWdiMllnWkdsbmFYUnpYRzRnSUhaaGNpQnpkSEpNWlc0Z1BTQnpkSEpwYm1jdWJHVnVaM1JvWEc0Z0lHRnpjMlZ5ZENoemRISk1aVzRnSlNBeUlEMDlQU0F3TENBblNXNTJZV3hwWkNCb1pYZ2djM1J5YVc1bkp5bGNibHh1SUNCcFppQW9iR1Z1WjNSb0lENGdjM1J5VEdWdUlDOGdNaWtnZTF4dUlDQWdJR3hsYm1kMGFDQTlJSE4wY2t4bGJpQXZJREpjYmlBZ2ZWeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0o1ZEdVZ1BTQndZWEp6WlVsdWRDaHpkSEpwYm1jdWMzVmljM1J5S0drZ0tpQXlMQ0F5S1N3Z01UWXBYRzRnSUNBZ1lYTnpaWEowS0NGcGMwNWhUaWhpZVhSbEtTd2dKMGx1ZG1Gc2FXUWdhR1Y0SUhOMGNtbHVaeWNwWEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMGdZbmwwWlZ4dUlDQjlYRzRnSUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMGdhU0FxSURKY2JpQWdjbVYwZFhKdUlHbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaamhYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZNFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjloYzJOcGFWZHlhWFJsSUNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlHTm9ZWEp6VjNKcGRIUmxiaUE5SUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMWNiaUFnSUNCaWJHbDBRblZtWm1WeUtHRnpZMmxwVkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsWGNtbDBaU2hpZFdZc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpWVhObE5qUlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaGlZWE5sTmpSVWIwSjVkR1Z6S0hOMGNtbHVaeWtzSUdKMVppd2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJSEpsZEhWeWJpQmphR0Z5YzFkeWFYUjBaVzVjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpFMmJHVlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaDFkR1l4Tm14bFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdVZ1BTQm1kVzVqZEdsdmJpQW9jM1J5YVc1bkxDQnZabVp6WlhRc0lHeGxibWQwYUN3Z1pXNWpiMlJwYm1jcElIdGNiaUFnTHk4Z1UzVndjRzl5ZENCaWIzUm9JQ2h6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0xDQmxibU52WkdsdVp5bGNiaUFnTHk4Z1lXNWtJSFJvWlNCc1pXZGhZM2tnS0hOMGNtbHVaeXdnWlc1amIyUnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCcFppQW9hWE5HYVc1cGRHVW9iMlptYzJWMEtTa2dlMXh1SUNBZ0lHbG1JQ2doYVhOR2FXNXBkR1VvYkdWdVozUm9LU2tnZTF4dUlDQWdJQ0FnWlc1amIyUnBibWNnUFNCc1pXNW5kR2hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHNnSUM4dklHeGxaMkZqZVZ4dUlDQWdJSFpoY2lCemQyRndJRDBnWlc1amIyUnBibWRjYmlBZ0lDQmxibU52WkdsdVp5QTlJRzltWm5ObGRGeHVJQ0FnSUc5bVpuTmxkQ0E5SUd4bGJtZDBhRnh1SUNBZ0lHeGxibWQwYUNBOUlITjNZWEJjYmlBZ2ZWeHVYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlIUm9hWE11YkdWdVozUm9JQzBnYjJabWMyVjBYRzRnSUdsbUlDZ2hiR1Z1WjNSb0tTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ2NtVnRZV2x1YVc1blhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ1RuVnRZbVZ5S0d4bGJtZDBhQ2xjYmlBZ0lDQnBaaUFvYkdWdVozUm9JRDRnY21WdFlXbHVhVzVuS1NCN1hHNGdJQ0FnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdJQ0I5WEc0Z0lIMWNiaUFnWlc1amIyUnBibWNnUFNCVGRISnBibWNvWlc1amIyUnBibWNnZkh3Z0ozVjBaamduS1M1MGIweHZkMlZ5UTJGelpTZ3BYRzVjYmlBZ2RtRnlJSEpsZEZ4dUlDQnpkMmwwWTJnZ0tHVnVZMjlrYVc1bktTQjdYRzRnSUNBZ1kyRnpaU0FuYUdWNEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5b1pYaFhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVmR5YVhSbEtIUm9hWE1zSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmWW1sdVlYSjVWM0pwZEdVb2RHaHBjeXdnYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RWYm10dWIzZHVJR1Z1WTI5a2FXNW5KeWxjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY2dQU0JtZFc1amRHbHZiaUFvWlc1amIyUnBibWNzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpYRzVjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc0Z0lITjBZWEowSUQwZ1RuVnRZbVZ5S0hOMFlYSjBLU0I4ZkNBd1hHNGdJR1Z1WkNBOUlDaGxibVFnSVQwOUlIVnVaR1ZtYVc1bFpDbGNiaUFnSUNBL0lFNTFiV0psY2lobGJtUXBYRzRnSUNBZ09pQmxibVFnUFNCelpXeG1MbXhsYm1kMGFGeHVYRzRnSUM4dklFWmhjM1J3WVhSb0lHVnRjSFI1SUhOMGNtbHVaM05jYmlBZ2FXWWdLR1Z1WkNBOVBUMGdjM1JoY25RcFhHNGdJQ0FnY21WMGRYSnVJQ2NuWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZOc2FXTmxLSE5sYkdZc0lITjBZWEowTENCbGJtUXBYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjloYzJOcGFWTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VTJ4cFkyVW9jMlZzWml3Z2MzUmhjblFzSUdWdVpDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBJRDBnWDNWMFpqRTJiR1ZUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5S1UwOU9JRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lIUjVjR1U2SUNkQ2RXWm1aWEluTEZ4dUlDQWdJR1JoZEdFNklFRnljbUY1TG5CeWIzUnZkSGx3WlM1emJHbGpaUzVqWVd4c0tIUm9hWE11WDJGeWNpQjhmQ0IwYUdsekxDQXdLVnh1SUNCOVhHNTlYRzVjYmk4dklHTnZjSGtvZEdGeVoyVjBRblZtWm1WeUxDQjBZWEpuWlhSVGRHRnlkRDB3TENCemIzVnlZMlZUZEdGeWREMHdMQ0J6YjNWeVkyVkZibVE5WW5WbVptVnlMbXhsYm1kMGFDbGNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVZMjl3ZVNBOUlHWjFibU4wYVc5dUlDaDBZWEpuWlhRc0lIUmhjbWRsZEY5emRHRnlkQ3dnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ2MyOTFjbU5sSUQwZ2RHaHBjMXh1WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNBbUppQmxibVFnSVQwOUlEQXBJR1Z1WkNBOUlIUm9hWE11YkdWdVozUm9YRzRnSUdsbUlDZ2hkR0Z5WjJWMFgzTjBZWEowS1NCMFlYSm5aWFJmYzNSaGNuUWdQU0F3WEc1Y2JpQWdMeThnUTI5d2VTQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdnZ1BUMDlJREFnZkh3Z2MyOTFjbU5sTG14bGJtZDBhQ0E5UFQwZ01Da2djbVYwZFhKdVhHNWNiaUFnTHk4Z1JtRjBZV3dnWlhKeWIzSWdZMjl1WkdsMGFXOXVjMXh1SUNCaGMzTmxjblFvWlc1a0lENDlJSE4wWVhKMExDQW5jMjkxY21ObFJXNWtJRHdnYzI5MWNtTmxVM1JoY25RbktWeHVJQ0JoYzNObGNuUW9kR0Z5WjJWMFgzTjBZWEowSUQ0OUlEQWdKaVlnZEdGeVoyVjBYM04wWVhKMElEd2dkR0Z5WjJWMExteGxibWQwYUN4Y2JpQWdJQ0FnSUNkMFlYSm5aWFJUZEdGeWRDQnZkWFFnYjJZZ1ltOTFibVJ6SnlsY2JpQWdZWE56WlhKMEtITjBZWEowSUQ0OUlEQWdKaVlnYzNSaGNuUWdQQ0J6YjNWeVkyVXViR1Z1WjNSb0xDQW5jMjkxY21ObFUzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnYzI5MWNtTmxMbXhsYm1kMGFDd2dKM052ZFhKalpVVnVaQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNibHh1SUNBdkx5QkJjbVVnZDJVZ2IyOWlQMXh1SUNCcFppQW9aVzVrSUQ0Z2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dMU0IwWVhKblpYUmZjM1JoY25RZ1BDQmxibVFnTFNCemRHRnlkQ2xjYmlBZ0lDQmxibVFnUFNCMFlYSm5aWFF1YkdWdVozUm9JQzBnZEdGeVoyVjBYM04wWVhKMElDc2djM1JoY25SY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWlc1a0lDMGdjM1JoY25SY2JseHVJQ0JwWmlBb2JHVnVJRHdnTVRBd0lIeDhJQ0ZDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5bGNiaUFnSUNBZ0lIUmhjbWRsZEZ0cElDc2dkR0Z5WjJWMFgzTjBZWEowWFNBOUlIUm9hWE5iYVNBcklITjBZWEowWFZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhSaGNtZGxkQzVmYzJWMEtIUm9hWE11YzNWaVlYSnlZWGtvYzNSaGNuUXNJSE4wWVhKMElDc2diR1Z1S1N3Z2RHRnlaMlYwWDNOMFlYSjBLVnh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUdsbUlDaHpkR0Z5ZENBOVBUMGdNQ0FtSmlCbGJtUWdQVDA5SUdKMVppNXNaVzVuZEdncElIdGNiaUFnSUNCeVpYUjFjbTRnWW1GelpUWTBMbVp5YjIxQ2VYUmxRWEp5WVhrb1luVm1LVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQmlZWE5sTmpRdVpuSnZiVUo1ZEdWQmNuSmhlU2hpZFdZdWMyeHBZMlVvYzNSaGNuUXNJR1Z1WkNrcFhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhNZ1BTQW5KMXh1SUNCMllYSWdkRzF3SUQwZ0p5ZGNiaUFnWlc1a0lEMGdUV0YwYUM1dGFXNG9ZblZtTG14bGJtZDBhQ3dnWlc1a0tWeHVYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0dKMVpsdHBYU0E4UFNBd2VEZEdLU0I3WEc0Z0lDQWdJQ0J5WlhNZ0t6MGdaR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLU0FySUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQWdJQ0FnZEcxd0lEMGdKeWRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RHMXdJQ3M5SUNjbEp5QXJJR0oxWmx0cFhTNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdjbVZ6SUNzZ1pHVmpiMlJsVlhSbU9FTm9ZWElvZEcxd0tWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZllYTmphV2xUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnlaWFFnUFNBbkoxeHVJQ0JsYm1RZ1BTQk5ZWFJvTG0xcGJpaGlkV1l1YkdWdVozUm9MQ0JsYm1RcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BYRzRnSUNBZ2NtVjBJQ3M5SUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lISmxkSFZ5YmlCZllYTmphV2xUYkdsalpTaGlkV1lzSUhOMFlYSjBMQ0JsYm1RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc1Y2JpQWdhV1lnS0NGemRHRnlkQ0I4ZkNCemRHRnlkQ0E4SURBcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ0I4ZkNCbGJtUWdQQ0F3SUh4OElHVnVaQ0ErSUd4bGJpa2daVzVrSUQwZ2JHVnVYRzVjYmlBZ2RtRnlJRzkxZENBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdiM1YwSUNzOUlIUnZTR1Y0S0dKMVpsdHBYU2xjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdiM1YwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkxZEdZeE5teGxVMnhwWTJVZ0tHSjFaaXdnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ1lubDBaWE1nUFNCaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDbGNiaUFnZG1GeUlISmxjeUE5SUNjblhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnWW5sMFpYTXViR1Z1WjNSb095QnBJQ3M5SURJcElIdGNiaUFnSUNCeVpYTWdLejBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlNoaWVYUmxjMXRwWFNBcklHSjVkR1Z6VzJrck1WMGdLaUF5TlRZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMxeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5Oc2FXTmxJRDBnWm5WdVkzUnBiMjRnS0hOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlHeGxiaUE5SUhSb2FYTXViR1Z1WjNSb1hHNGdJSE4wWVhKMElEMGdZMnhoYlhBb2MzUmhjblFzSUd4bGJpd2dNQ2xjYmlBZ1pXNWtJRDBnWTJ4aGJYQW9aVzVrTENCc1pXNHNJR3hsYmlsY2JseHVJQ0JwWmlBb1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQkNkV1ptWlhJdVgyRjFaMjFsYm5Rb2RHaHBjeTV6ZFdKaGNuSmhlU2h6ZEdGeWRDd2daVzVrS1NsY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllYSWdjMnhwWTJWTVpXNGdQU0JsYm1RZ0xTQnpkR0Z5ZEZ4dUlDQWdJSFpoY2lCdVpYZENkV1lnUFNCdVpYY2dRblZtWm1WeUtITnNhV05sVEdWdUxDQjFibVJsWm1sdVpXUXNJSFJ5ZFdVcFhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemJHbGpaVXhsYmpzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0J1WlhkQ2RXWmJhVjBnUFNCMGFHbHpXMmtnS3lCemRHRnlkRjFjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUc1bGQwSjFabHh1SUNCOVhHNTlYRzVjYmk4dklHQm5aWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtZGxkQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvSnk1blpYUW9LU0JwY3lCa1pYQnlaV05oZEdWa0xpQkJZMk5sYzNNZ2RYTnBibWNnWVhKeVlYa2dhVzVrWlhobGN5QnBibk4wWldGa0xpY3BYRzRnSUhKbGRIVnliaUIwYUdsekxuSmxZV1JWU1c1ME9DaHZabVp6WlhRcFhHNTlYRzVjYmk4dklHQnpaWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTmxkQ0E5SUdaMWJtTjBhVzl1SUNoMkxDQnZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NXpaWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbmR5YVhSbFZVbHVkRGdvZGl3Z2IyWm1jMlYwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdjbVYwZFhKdUlIUm9hWE5iYjJabWMyVjBYVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkZWSmJuUXhOaUFvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeElEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUhaaGNpQjJZV3hjYmlBZ2FXWWdLR3hwZEhSc1pVVnVaR2xoYmlrZ2UxeHVJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURFZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURGZElEdzhJRGhjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IyWVd3Z1BTQmlkV1piYjJabWMyVjBYU0E4UENBNFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME1UWk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXhOaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzSmxZV1JWU1c1ME16SWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTXlBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNYRzRnSUdsbUlDaHNhWFIwYkdWRmJtUnBZVzRwSUh0Y2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ01pQThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFFnS3lBeVhTQThQQ0F4Tmx4dUlDQWdJR2xtSUNodlptWnpaWFFnS3lBeElEd2diR1Z1S1Z4dUlDQWdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFFnS3lBeFhTQThQQ0E0WEc0Z0lDQWdkbUZzSUh3OUlHSjFabHR2Wm1aelpYUmRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRE1nUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZENBcklETmRJRHc4SURJMElENCtQaUF3S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURFMlhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklESWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklESmRJRHc4SURoY2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ015QThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQjhQU0JpZFdaYmIyWm1jMlYwSUNzZ00xMWNiaUFnSUNCMllXd2dQU0IyWVd3Z0t5QW9ZblZtVzI5bVpuTmxkRjBnUER3Z01qUWdQajQrSURBcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5Rek1paDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xGeHVJQ0FnSUNBZ0lDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUc1bFp5QTlJSFJvYVhOYmIyWm1jMlYwWFNBbUlEQjRPREJjYmlBZ2FXWWdLRzVsWnlsY2JpQWdJQ0J5WlhSMWNtNGdLREI0Wm1ZZ0xTQjBhR2x6VzI5bVpuTmxkRjBnS3lBeEtTQXFJQzB4WEc0Z0lHVnNjMlZjYmlBZ0lDQnlaWFIxY200Z2RHaHBjMXR2Wm1aelpYUmRYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrU1c1ME1UWWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTVNBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNJRDBnWDNKbFlXUlZTVzUwTVRZb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2RISjFaU2xjYmlBZ2RtRnlJRzVsWnlBOUlIWmhiQ0FtSURCNE9EQXdNRnh1SUNCcFppQW9ibVZuS1Z4dUlDQWdJSEpsZEhWeWJpQW9NSGhtWm1abUlDMGdkbUZzSUNzZ01Ta2dLaUF0TVZ4dUlDQmxiSE5sWEc0Z0lDQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JKYm5ReE5reEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrU1c1ME1UWW9kR2hwY3l3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME1UWkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkVsdWRERTJLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpFbHVkRE15SUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklETWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklISmxZV1FnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2RtRnlJSFpoYkNBOUlGOXlaV0ZrVlVsdWRETXlLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJSFJ5ZFdVcFhHNGdJSFpoY2lCdVpXY2dQU0IyWVd3Z0ppQXdlRGd3TURBd01EQXdYRzRnSUdsbUlDaHVaV2NwWEc0Z0lDQWdjbVYwZFhKdUlDZ3dlR1ptWm1abVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXpNa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNeklvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkRE15S0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRVpzYjJGMElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z01qTXNJRFFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVac2IyRjBURVVnUFNCbWRXNWpkR2x2YmlBb2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0J5WlhSMWNtNGdYM0psWVdSR2JHOWhkQ2gwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSR2JHOWhkRUpGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JteHZZWFFvZEdocGN5d2diMlptYzJWMExDQm1ZV3h6WlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5eVpXRmtSRzkxWW14bElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUEzSUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z05USXNJRGdwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JHOTFZbXhsS0hSb2FYTXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsVlVsdWREZ2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJRHdnZEdocGN5NXNaVzVuZEdnc0lDZDBjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtZFdsdWRDaDJZV3gxWlN3Z01IaG1aaWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwSUhKbGRIVnlibHh1WEc0Z0lIUm9hWE5iYjJabWMyVjBYU0E5SUhaaGJIVmxYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXhOaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVlwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2dhaUE5SUUxaGRHZ3ViV2x1S0d4bGJpQXRJRzltWm5ObGRDd2dNaWs3SUdrZ1BDQnFPeUJwS3lzcElIdGNiaUFnSUNCaWRXWmJiMlptYzJWMElDc2dhVjBnUFZ4dUlDQWdJQ0FnSUNBb2RtRnNkV1VnSmlBb01IaG1aaUE4UENBb09DQXFJQ2hzYVhSMGJHVkZibVJwWVc0Z1B5QnBJRG9nTVNBdElHa3BLU2twSUQ0K1BseHVJQ0FnSUNBZ0lDQWdJQ0FnS0d4cGRIUnNaVVZ1WkdsaGJpQS9JR2tnT2lBeElDMGdhU2tnS2lBNFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpWVkpiblF4TmloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXpNaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVptWm1abUtWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUdvZ1BTQk5ZWFJvTG0xcGJpaHNaVzRnTFNCdlptWnpaWFFzSURRcE95QnBJRHdnYWpzZ2FTc3JLU0I3WEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMWNiaUFnSUNBZ0lDQWdLSFpoYkhWbElENCtQaUFvYkdsMGRHeGxSVzVrYVdGdUlEOGdhU0E2SURNZ0xTQnBLU0FxSURncElDWWdNSGhtWmx4dUlDQjlYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWVlNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxTVzUwT0NBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWnphVzUwS0haaGJIVmxMQ0F3ZURkbUxDQXRNSGc0TUNsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2FXWWdLSFpoYkhWbElENDlJREFwWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtEQjRabVlnS3lCMllXeDFaU0FySURFc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVWx1ZERFMklDaGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QjJZV3gxWlNjcFhHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ2Wm1aelpYUWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JRzltWm5ObGRDY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FySURFZ1BDQmlkV1l1YkdWdVozUm9MQ0FuVkhKNWFXNW5JSFJ2SUhkeWFYUmxJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdJQ0IyWlhKcFpuTnBiblFvZG1Gc2RXVXNJREI0TjJabVppd2dMVEI0T0RBd01DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbG1JQ2gyWVd4MVpTQStQU0F3S1Z4dUlDQWdJRjkzY21sMFpWVkpiblF4TmloaWRXWXNJSFpoYkhWbExDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwWEc0Z0lHVnNjMlZjYmlBZ0lDQmZkM0pwZEdWVlNXNTBNVFlvWW5WbUxDQXdlR1ptWm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkREUyVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTVRZb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVWx1ZERFMktIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzZHlhWFJsU1c1ME16SWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1jMmx1ZENoMllXeDFaU3dnTUhnM1ptWm1abVptWml3Z0xUQjRPREF3TURBd01EQXBYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQnBaaUFvZG1Gc2RXVWdQajBnTUNsY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTXpJb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdYM2R5YVhSbFZVbHVkRE15S0dKMVppd2dNSGhtWm1abVptWm1aaUFySUhaaGJIVmxJQ3NnTVN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWSmJuUXpNaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVsdWRETXlRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmZDNKcGRHVkdiRzloZENBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaSlJVVkZOelUwS0haaGJIVmxMQ0F6TGpRd01qZ3lNelEyTmpNNE5USTRPRFpsS3pNNExDQXRNeTQwTURJNE1qTTBOall6T0RVeU9EZzJaU3N6T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lESXpMQ0EwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJteHZZWFJNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkdiRzloZENoMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVWnNiMkYwUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSbXh2WVhRb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZFYjNWaWJHVWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ055QThJR0oxWmk1c1pXNW5kR2dzWEc0Z0lDQWdJQ0FnSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1TVVZGUlRjMU5DaDJZV3gxWlN3Z01TNDNPVGMyT1RNeE16UTROakl6TVRVM1JTc3pNRGdzSUMweExqYzVOelk1TXpFek5EZzJNak14TlRkRkt6TXdPQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xsWldVM05UUXVkM0pwZEdVb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSURVeUxDQTRLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUkc5MVlteGxURVVnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJHOTFZbXhsS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dUx5OGdabWxzYkNoMllXeDFaU3dnYzNSaGNuUTlNQ3dnWlc1a1BXSjFabVpsY2k1c1pXNW5kR2dwWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1acGJHd2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdhV1lnS0NGMllXeDFaU2tnZG1Gc2RXVWdQU0F3WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNrZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JseHVJQ0JwWmlBb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhaaGJIVmxJRDBnZG1Gc2RXVXVZMmhoY2tOdlpHVkJkQ2d3S1Z4dUlDQjlYRzVjYmlBZ1lYTnpaWEowS0hSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI1MWJXSmxjaWNnSmlZZ0lXbHpUbUZPS0haaGJIVmxLU3dnSjNaaGJIVmxJR2x6SUc1dmRDQmhJRzUxYldKbGNpY3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdjM1JoY25Rc0lDZGxibVFnUENCemRHRnlkQ2NwWEc1Y2JpQWdMeThnUm1sc2JDQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJvYVhNdWJHVnVaM1JvSUQwOVBTQXdLU0J5WlhSMWNtNWNibHh1SUNCaGMzTmxjblFvYzNSaGNuUWdQajBnTUNBbUppQnpkR0Z5ZENBOElIUm9hWE11YkdWdVozUm9MQ0FuYzNSaGNuUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ01DQW1KaUJsYm1RZ1BEMGdkR2hwY3k1c1pXNW5kR2dzSUNkbGJtUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BJSHRjYmlBZ0lDQjBhR2x6VzJsZElEMGdkbUZzZFdWY2JpQWdmVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtbHVjM0JsWTNRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lIWmhjaUJ2ZFhRZ1BTQmJYVnh1SUNCMllYSWdiR1Z1SUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc1pXNDdJR2tyS3lrZ2UxeHVJQ0FnSUc5MWRGdHBYU0E5SUhSdlNHVjRLSFJvYVhOYmFWMHBYRzRnSUNBZ2FXWWdLR2tnUFQwOUlHVjRjRzl5ZEhNdVNVNVRVRVZEVkY5TlFWaGZRbGxVUlZNcElIdGNiaUFnSUNBZ0lHOTFkRnRwSUNzZ01WMGdQU0FuTGk0dUoxeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlDYzhRblZtWm1WeUlDY2dLeUJ2ZFhRdWFtOXBiaWduSUNjcElDc2dKejRuWEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJRzVsZHlCZ1FYSnlZWGxDZFdabVpYSmdJSGRwZEdnZ2RHaGxJQ3BqYjNCcFpXUXFJRzFsYlc5eWVTQnZaaUIwYUdVZ1luVm1abVZ5SUdsdWMzUmhibU5sTGx4dUlDb2dRV1JrWldRZ2FXNGdUbTlrWlNBd0xqRXlMaUJQYm14NUlHRjJZV2xzWVdKc1pTQnBiaUJpY205M2MyVnljeUIwYUdGMElITjFjSEJ2Y25RZ1FYSnlZWGxDZFdabVpYSXVYRzRnS2k5Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUJjbkpoZVVKMVptWmxjaUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCVmFXNTBPRUZ5Y21GNUlDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ2UxeHVJQ0FnSUdsbUlDaENkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6S1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnS0c1bGR5QkNkV1ptWlhJb2RHaHBjeWtwTG1KMVptWmxjbHh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMllYSWdZblZtSUQwZ2JtVjNJRlZwYm5RNFFYSnlZWGtvZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdZblZtTG14bGJtZDBhRHNnYVNBOElHeGxianNnYVNBclBTQXhLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0IwYUdselcybGRYRzRnSUNBZ0lDQnlaWFIxY200Z1luVm1MbUoxWm1abGNseHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjBKMVptWmxjaTUwYjBGeWNtRjVRblZtWm1WeUlHNXZkQ0J6ZFhCd2IzSjBaV1FnYVc0Z2RHaHBjeUJpY205M2MyVnlKeWxjYmlBZ2ZWeHVmVnh1WEc0dkx5QklSVXhRUlZJZ1JsVk9RMVJKVDA1VFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUhOMGNtbHVaM1J5YVcwZ0tITjBjaWtnZTF4dUlDQnBaaUFvYzNSeUxuUnlhVzBwSUhKbGRIVnliaUJ6ZEhJdWRISnBiU2dwWEc0Z0lISmxkSFZ5YmlCemRISXVjbVZ3YkdGalpTZ3ZYbHhjY3l0OFhGeHpLeVF2Wnl3Z0p5Y3BYRzU5WEc1Y2JuWmhjaUJDVUNBOUlFSjFabVpsY2k1d2NtOTBiM1I1Y0dWY2JseHVMeW9xWEc0Z0tpQkJkV2R0Wlc1MElHRWdWV2x1ZERoQmNuSmhlU0FxYVc1emRHRnVZMlVxSUNodWIzUWdkR2hsSUZWcGJuUTRRWEp5WVhrZ1kyeGhjM01oS1NCM2FYUm9JRUoxWm1abGNpQnRaWFJvYjJSelhHNGdLaTljYmtKMVptWmxjaTVmWVhWbmJXVnVkQ0E5SUdaMWJtTjBhVzl1SUNoaGNuSXBJSHRjYmlBZ1lYSnlMbDlwYzBKMVptWmxjaUE5SUhSeWRXVmNibHh1SUNBdkx5QnpZWFpsSUhKbFptVnlaVzVqWlNCMGJ5QnZjbWxuYVc1aGJDQlZhVzUwT0VGeWNtRjVJR2RsZEM5elpYUWdiV1YwYUc5a2N5QmlaV1p2Y21VZ2IzWmxjbmR5YVhScGJtZGNiaUFnWVhKeUxsOW5aWFFnUFNCaGNuSXVaMlYwWEc0Z0lHRnljaTVmYzJWMElEMGdZWEp5TG5ObGRGeHVYRzRnSUM4dklHUmxjSEpsWTJGMFpXUXNJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJ1YjJSbElEQXVNVE1yWEc0Z0lHRnljaTVuWlhRZ1BTQkNVQzVuWlhSY2JpQWdZWEp5TG5ObGRDQTlJRUpRTG5ObGRGeHVYRzRnSUdGeWNpNTNjbWwwWlNBOUlFSlFMbmR5YVhSbFhHNGdJR0Z5Y2k1MGIxTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHh2WTJGc1pWTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHBUVDA0Z1BTQkNVQzUwYjBwVFQwNWNiaUFnWVhKeUxtTnZjSGtnUFNCQ1VDNWpiM0I1WEc0Z0lHRnljaTV6YkdsalpTQTlJRUpRTG5Oc2FXTmxYRzRnSUdGeWNpNXlaV0ZrVlVsdWREZ2dQU0JDVUM1eVpXRmtWVWx1ZERoY2JpQWdZWEp5TG5KbFlXUlZTVzUwTVRaTVJTQTlJRUpRTG5KbFlXUlZTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRlZKYm5ReE5rSkZJRDBnUWxBdWNtVmhaRlZKYm5ReE5rSkZYRzRnSUdGeWNpNXlaV0ZrVlVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrVlVsdWRETXlURVZjYmlBZ1lYSnlMbkpsWVdSVlNXNTBNekpDUlNBOUlFSlFMbkpsWVdSVlNXNTBNekpDUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRGdnUFNCQ1VDNXlaV0ZrU1c1ME9GeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlRFVWdQU0JDVUM1eVpXRmtTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlFrVWdQU0JDVUM1eVpXRmtTVzUwTVRaQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVRFVWdQU0JDVUM1eVpXRmtTVzUwTXpKTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVFrVWdQU0JDVUM1eVpXRmtTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFRFVWdQU0JDVUM1eVpXRmtSbXh2WVhSTVJWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFFrVWdQU0JDVUM1eVpXRmtSbXh2WVhSQ1JWeHVJQ0JoY25JdWNtVmhaRVJ2ZFdKc1pVeEZJRDBnUWxBdWNtVmhaRVJ2ZFdKc1pVeEZYRzRnSUdGeWNpNXlaV0ZrUkc5MVlteGxRa1VnUFNCQ1VDNXlaV0ZrUkc5MVlteGxRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRGdnUFNCQ1VDNTNjbWwwWlZWSmJuUTRYRzRnSUdGeWNpNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1FsQXVkM0pwZEdWVlNXNTBNVFpNUlZ4dUlDQmhjbkl1ZDNKcGRHVlZTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxWVWx1ZERFMlFrVmNiaUFnWVhKeUxuZHlhWFJsVlVsdWRETXlURVVnUFNCQ1VDNTNjbWwwWlZWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpWVkpiblF6TWtKRklEMGdRbEF1ZDNKcGRHVlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5RNElEMGdRbEF1ZDNKcGRHVkpiblE0WEc0Z0lHRnljaTUzY21sMFpVbHVkREUyVEVVZ1BTQkNVQzUzY21sMFpVbHVkREUyVEVWY2JpQWdZWEp5TG5keWFYUmxTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxTVzUwTVRaQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5Rek1reEZJRDBnUWxBdWQzSnBkR1ZKYm5Rek1reEZYRzRnSUdGeWNpNTNjbWwwWlVsdWRETXlRa1VnUFNCQ1VDNTNjbWwwWlVsdWRETXlRa1ZjYmlBZ1lYSnlMbmR5YVhSbFJteHZZWFJNUlNBOUlFSlFMbmR5YVhSbFJteHZZWFJNUlZ4dUlDQmhjbkl1ZDNKcGRHVkdiRzloZEVKRklEMGdRbEF1ZDNKcGRHVkdiRzloZEVKRlhHNGdJR0Z5Y2k1M2NtbDBaVVJ2ZFdKc1pVeEZJRDBnUWxBdWQzSnBkR1ZFYjNWaWJHVk1SVnh1SUNCaGNuSXVkM0pwZEdWRWIzVmliR1ZDUlNBOUlFSlFMbmR5YVhSbFJHOTFZbXhsUWtWY2JpQWdZWEp5TG1acGJHd2dQU0JDVUM1bWFXeHNYRzRnSUdGeWNpNXBibk53WldOMElEMGdRbEF1YVc1emNHVmpkRnh1SUNCaGNuSXVkRzlCY25KaGVVSjFabVpsY2lBOUlFSlFMblJ2UVhKeVlYbENkV1ptWlhKY2JseHVJQ0J5WlhSMWNtNGdZWEp5WEc1OVhHNWNiaTh2SUhOc2FXTmxLSE4wWVhKMExDQmxibVFwWEc1bWRXNWpkR2x2YmlCamJHRnRjQ0FvYVc1a1pYZ3NJR3hsYml3Z1pHVm1ZWFZzZEZaaGJIVmxLU0I3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdhVzVrWlhnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0J5WlhSMWNtNGdaR1ZtWVhWc2RGWmhiSFZsWEc0Z0lHbHVaR1Y0SUQwZ2ZuNXBibVJsZURzZ0lDOHZJRU52WlhKalpTQjBieUJwYm5SbFoyVnlMbHh1SUNCcFppQW9hVzVrWlhnZ1BqMGdiR1Z1S1NCeVpYUjFjbTRnYkdWdVhHNGdJR2xtSUNocGJtUmxlQ0ErUFNBd0tTQnlaWFIxY200Z2FXNWtaWGhjYmlBZ2FXNWtaWGdnS3owZ2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdjbVYwZFhKdUlEQmNibjFjYmx4dVpuVnVZM1JwYjI0Z1kyOWxjbU5sSUNoc1pXNW5kR2dwSUh0Y2JpQWdMeThnUTI5bGNtTmxJR3hsYm1kMGFDQjBieUJoSUc1MWJXSmxjaUFvY0c5emMybGliSGtnVG1GT0tTd2djbTkxYm1RZ2RYQmNiaUFnTHk4Z2FXNGdZMkZ6WlNCcGRDZHpJR1p5WVdOMGFXOXVZV3dnS0dVdVp5NGdNVEl6TGpRMU5pa2dkR2hsYmlCa2J5QmhYRzRnSUM4dklHUnZkV0pzWlNCdVpXZGhkR1VnZEc4Z1kyOWxjbU5sSUdFZ1RtRk9JSFJ2SURBdUlFVmhjM2tzSUhKcFoyaDBQMXh1SUNCc1pXNW5kR2dnUFNCK2ZrMWhkR2d1WTJWcGJDZ3JiR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdiR1Z1WjNSb0lEd2dNQ0EvSURBZ09pQnNaVzVuZEdoY2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQmNuSmhlU0FvYzNWaWFtVmpkQ2tnZTF4dUlDQnlaWFIxY200Z0tFRnljbUY1TG1selFYSnlZWGtnZkh3Z1puVnVZM1JwYjI0Z0tITjFZbXBsWTNRcElIdGNiaUFnSUNCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tITjFZbXBsWTNRcElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5YRzRnSUgwcEtITjFZbXBsWTNRcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUdselFYSnlZWGxwYzJnZ0tITjFZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR2x6UVhKeVlYa29jM1ZpYW1WamRDa2dmSHdnUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBJSHg4WEc0Z0lDQWdJQ0J6ZFdKcVpXTjBJQ1ltSUhSNWNHVnZaaUJ6ZFdKcVpXTjBJRDA5UFNBbmIySnFaV04wSnlBbUpseHVJQ0FnSUNBZ2RIbHdaVzltSUhOMVltcGxZM1F1YkdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SjF4dWZWeHVYRzVtZFc1amRHbHZiaUIwYjBobGVDQW9iaWtnZTF4dUlDQnBaaUFvYmlBOElERTJLU0J5WlhSMWNtNGdKekFuSUNzZ2JpNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ2NtVjBkWEp1SUc0dWRHOVRkSEpwYm1jb01UWXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVjBaamhVYjBKNWRHVnpJQ2h6ZEhJcElIdGNiaUFnZG1GeUlHSjVkR1ZCY25KaGVTQTlJRnRkWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2djM1J5TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0lnUFNCemRISXVZMmhoY2tOdlpHVkJkQ2hwS1Z4dUlDQWdJR2xtSUNoaUlEdzlJREI0TjBZcFhHNGdJQ0FnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2h6ZEhJdVkyaGhja052WkdWQmRDaHBLU2xjYmlBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUhaaGNpQnpkR0Z5ZENBOUlHbGNiaUFnSUNBZ0lHbG1JQ2hpSUQ0OUlEQjRSRGd3TUNBbUppQmlJRHc5SURCNFJFWkdSaWtnYVNzclhHNGdJQ0FnSUNCMllYSWdhQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISXVjMnhwWTJVb2MzUmhjblFzSUdrck1Ta3BMbk4xWW5OMGNpZ3hLUzV6Y0d4cGRDZ25KU2NwWEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJxSUQwZ01Ec2dhaUE4SUdndWJHVnVaM1JvT3lCcUt5c3BYRzRnSUNBZ0lDQWdJR0o1ZEdWQmNuSmhlUzV3ZFhOb0tIQmhjbk5sU1c1MEtHaGJhbDBzSURFMktTbGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzJOcGFWUnZRbmwwWlhNZ0tITjBjaWtnZTF4dUlDQjJZWElnWW5sMFpVRnljbUY1SUQwZ1cxMWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemRISXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0F2THlCT2IyUmxKM01nWTI5a1pTQnpaV1Z0Y3lCMGJ5QmlaU0JrYjJsdVp5QjBhR2x6SUdGdVpDQnViM1FnSmlBd2VEZEdMaTVjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NBbUlEQjRSa1lwWEc0Z0lIMWNiaUFnY21WMGRYSnVJR0o1ZEdWQmNuSmhlVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFkR1l4Tm14bFZHOUNlWFJsY3lBb2MzUnlLU0I3WEc0Z0lIWmhjaUJqTENCb2FTd2diRzljYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdZeUE5SUhOMGNpNWphR0Z5UTI5a1pVRjBLR2twWEc0Z0lDQWdhR2tnUFNCaklENCtJRGhjYmlBZ0lDQnNieUE5SUdNZ0pTQXlOVFpjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoc2J5bGNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2hvYVNsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCaWVYUmxRWEp5WVhsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWW1GelpUWTBWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSEpsZEhWeWJpQmlZWE5sTmpRdWRHOUNlWFJsUVhKeVlYa29jM1J5S1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJpYkdsMFFuVm1abVZ5SUNoemNtTXNJR1J6ZEN3Z2IyWm1jMlYwTENCc1pXNW5kR2dwSUh0Y2JpQWdkbUZ5SUhCdmMxeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLQ2hwSUNzZ2IyWm1jMlYwSUQ0OUlHUnpkQzVzWlc1bmRHZ3BJSHg4SUNocElENDlJSE55WXk1c1pXNW5kR2dwS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa2MzUmJhU0FySUc5bVpuTmxkRjBnUFNCemNtTmJhVjFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdhVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmtaV052WkdWVmRHWTRRMmhoY2lBb2MzUnlLU0I3WEc0Z0lIUnllU0I3WEc0Z0lDQWdjbVYwZFhKdUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSElwWEc0Z0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJSEpsZEhWeWJpQlRkSEpwYm1jdVpuSnZiVU5vWVhKRGIyUmxLREI0UmtaR1JDa2dMeThnVlZSR0lEZ2dhVzUyWVd4cFpDQmphR0Z5WEc0Z0lIMWNibjFjYmx4dUx5cGNiaUFxSUZkbElHaGhkbVVnZEc4Z2JXRnJaU0J6ZFhKbElIUm9ZWFFnZEdobElIWmhiSFZsSUdseklHRWdkbUZzYVdRZ2FXNTBaV2RsY2k0Z1ZHaHBjeUJ0WldGdWN5QjBhR0YwSUdsMFhHNGdLaUJwY3lCdWIyNHRibVZuWVhScGRtVXVJRWwwSUdoaGN5QnVieUJtY21GamRHbHZibUZzSUdOdmJYQnZibVZ1ZENCaGJtUWdkR2hoZENCcGRDQmtiMlZ6SUc1dmRGeHVJQ29nWlhoalpXVmtJSFJvWlNCdFlYaHBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlIWmxjbWxtZFdsdWRDQW9kbUZzZFdVc0lHMWhlQ2tnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQajBnTUN3Z0ozTndaV05wWm1sbFpDQmhJRzVsWjJGMGFYWmxJSFpoYkhWbElHWnZjaUIzY21sMGFXNW5JR0Z1SUhWdWMybG5ibVZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRHc5SUcxaGVDd2dKM1poYkhWbElHbHpJR3hoY21kbGNpQjBhR0Z1SUcxaGVHbHRkVzBnZG1Gc2RXVWdabTl5SUhSNWNHVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFpuTnBiblFnS0haaGJIVmxMQ0J0WVhnc0lHMXBiaWtnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQRDBnYldGNExDQW5kbUZzZFdVZ2JHRnlaMlZ5SUhSb1lXNGdiV0Y0YVcxMWJTQmhiR3h2ZDJWa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUQ0OUlHMXBiaXdnSjNaaGJIVmxJSE50WVd4c1pYSWdkR2hoYmlCdGFXNXBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFprbEZSVVUzTlRRZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzNObGNuUWdLSFJsYzNRc0lHMWxjM05oWjJVcElIdGNiaUFnYVdZZ0tDRjBaWE4wS1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvYldWemMyRm5aU0I4ZkNBblJtRnBiR1ZrSUdGemMyVnlkR2x2YmljcFhHNTlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbTtcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBuQml0cyA9IC03O1xuICB2YXIgaSA9IGlzTEUgPyBuQnl0ZXMgLSAxIDogMDtcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxO1xuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgcyA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGUgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKHMgPyAtMSA6IDEpICogSW5maW5pdHk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYztcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBydCA9IG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwO1xuICB2YXIgaSA9IGlzTEUgPyAwIDogbkJ5dGVzIC0gMTtcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xO1xuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IGUgPDwgbUxlbiB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1WNGNHOXlkSE1pTENKeVpXRmtJaXdpWW5WbVptVnlJaXdpYjJabWMyVjBJaXdpYVhOTVJTSXNJbTFNWlc0aUxDSnVRbmwwWlhNaUxDSmxJaXdpYlNJc0ltVk1aVzRpTENKbFRXRjRJaXdpWlVKcFlYTWlMQ0p1UW1sMGN5SXNJbWtpTENKa0lpd2ljeUlzSWs1aFRpSXNJa2x1Wm1sdWFYUjVJaXdpVFdGMGFDSXNJbkJ2ZHlJc0luZHlhWFJsSWl3aWRtRnNkV1VpTENKaklpd2ljblFpTENKaFluTWlMQ0pwYzA1aFRpSXNJbVpzYjI5eUlpd2liRzluSWl3aVRFNHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCUVN4UlFVRlJReXhKUVVGU0xFZEJRV1VzVlVGQlZVTXNUVUZCVml4RlFVRnJRa01zVFVGQmJFSXNSVUZCTUVKRExFbEJRVEZDTEVWQlFXZERReXhKUVVGb1F5eEZRVUZ6UTBNc1RVRkJkRU1zUlVGQk9FTTdRVUZETTBRc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFPMEZCUTBFc1RVRkJTVU1zVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsRkxGRkJRVkVzUTBGQlF5eERRVUZpTzBGQlEwRXNUVUZCU1VNc1NVRkJTVlFzVDBGQlVVVXNVMEZCVXl4RFFVRnFRaXhIUVVGelFpeERRVUU1UWp0QlFVTkJMRTFCUVVsUkxFbEJRVWxXTEU5QlFVOHNRMEZCUXl4RFFVRlNMRWRCUVZrc1EwRkJjRUk3UVVGRFFTeE5RVUZKVnl4SlFVRkpZaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGU096dEJRVVZCUVN4UFFVRkxReXhEUVVGTU96dEJRVVZCVUN4TlFVRkpVU3hKUVVGTExFTkJRVU1zUzBGQlRTeERRVUZEU0N4TFFVRlNMRWxCUVd0Q0xFTkJRVE5DTzBGQlEwRkhMRkZCUVU4c1EwRkJRMGdzUzBGQlVqdEJRVU5CUVN4WFFVRlRTQ3hKUVVGVU8wRkJRMEVzVTBGQlQwY3NVVUZCVVN4RFFVRm1MRVZCUVd0Q1RDeEpRVUZKUVN4SlFVRkpMRWRCUVVvc1IwRkJWVXdzVDBGQlQwTXNVMEZCVTFVc1EwRkJhRUlzUTBGQlpDeEZRVUZyUTBFc1MwRkJTME1zUTBGQmRrTXNSVUZCTUVOR0xGTkJRVk1zUTBGQmNrVXNSVUZCZDBVc1EwRkJSVHM3UVVGRk1VVktMRTFCUVVsRUxFbEJRVXNzUTBGQlF5eExRVUZOTEVOQlFVTkxMRXRCUVZJc1NVRkJhMElzUTBGQk0wSTdRVUZEUVV3c1VVRkJUeXhEUVVGRFN5eExRVUZTTzBGQlEwRkJMRmRCUVZOUUxFbEJRVlE3UVVGRFFTeFRRVUZQVHl4UlFVRlJMRU5CUVdZc1JVRkJhMEpLTEVsQlFVbEJMRWxCUVVrc1IwRkJTaXhIUVVGVlRpeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeERRVUZrTEVWQlFXdERRU3hMUVVGTFF5eERRVUYyUXl4RlFVRXdRMFlzVTBGQlV5eERRVUZ5UlN4RlFVRjNSU3hEUVVGRk96dEJRVVV4UlN4TlFVRkpUQ3hOUVVGTkxFTkJRVllzUlVGQllUdEJRVU5ZUVN4UlFVRkpMRWxCUVVsSkxFdEJRVkk3UVVGRFJDeEhRVVpFTEUxQlJVOHNTVUZCU1Vvc1RVRkJUVWNzU1VGQlZpeEZRVUZuUWp0QlFVTnlRaXhYUVVGUFJpeEpRVUZKVVN4SFFVRktMRWRCUVZjc1EwRkJRMFFzU1VGQlNTeERRVUZETEVOQlFVd3NSMEZCVXl4RFFVRldMRWxCUVdWRkxGRkJRV3BETzBGQlEwUXNSMEZHVFN4TlFVVkJPMEZCUTB4VUxGRkJRVWxCTEVsQlFVbFZMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJVanRCUVVOQlJTeFJRVUZKUVN4SlFVRkpTU3hMUVVGU08wRkJRMFE3UVVGRFJDeFRRVUZQTEVOQlFVTkpMRWxCUVVrc1EwRkJReXhEUVVGTUxFZEJRVk1zUTBGQlZpeEpRVUZsVUN4RFFVRm1MRWRCUVcxQ1ZTeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWldpeEpRVUZKUml4SlFVRm9RaXhEUVVFeFFqdEJRVU5FTEVOQkwwSkVPenRCUVdsRFFVd3NVVUZCVVc5Q0xFdEJRVklzUjBGQlowSXNWVUZCVld4Q0xFMUJRVllzUlVGQmEwSnRRaXhMUVVGc1FpeEZRVUY1UW14Q0xFMUJRWHBDTEVWQlFXbERReXhKUVVGcVF5eEZRVUYxUTBNc1NVRkJka01zUlVGQk5rTkRMRTFCUVRkRExFVkJRWEZFTzBGQlEyNUZMRTFCUVVsRExFTkJRVW9zUlVGQlQwTXNRMEZCVUN4RlFVRlZZeXhEUVVGV08wRkJRMEVzVFVGQlNXSXNUMEZCVDBnc1UwRkJVeXhEUVVGVUxFZEJRV0ZFTEVsQlFXSXNSMEZCYjBJc1EwRkJMMEk3UVVGRFFTeE5RVUZKU3l4UFFVRlBMRU5CUVVNc1MwRkJTMFFzU1VGQlRpeEpRVUZqTEVOQlFYcENPMEZCUTBFc1RVRkJTVVVzVVVGQlVVUXNVVUZCVVN4RFFVRndRanRCUVVOQkxFMUJRVWxoTEV0QlFVMXNRaXhUUVVGVExFVkJRVlFzUjBGQlkyRXNTMEZCUzBNc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeERRVUZETEVWQlFXSXNTVUZCYlVKRUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1EwRkJReXhGUVVGaUxFTkJRV3BETEVkQlFXOUVMRU5CUVRsRU8wRkJRMEVzVFVGQlNVNHNTVUZCU1ZRc1QwRkJUeXhEUVVGUUxFZEJRVmxGTEZOQlFWTXNRMEZCTjBJN1FVRkRRU3hOUVVGSlVTeEpRVUZKVml4UFFVRlBMRU5CUVZBc1IwRkJWeXhEUVVGRExFTkJRWEJDTzBGQlEwRXNUVUZCU1Zjc1NVRkJTVTBzVVVGQlVTeERRVUZTTEVsQlFXTkJMRlZCUVZVc1EwRkJWaXhKUVVGbExFbEJRVWxCTEV0QlFVb3NSMEZCV1N4RFFVRjZReXhIUVVFNFF5eERRVUU1UXl4SFFVRnJSQ3hEUVVFeFJEczdRVUZGUVVFc1ZVRkJVVWdzUzBGQlMwMHNSMEZCVEN4RFFVRlRTQ3hMUVVGVUxFTkJRVkk3TzBGQlJVRXNUVUZCU1Vrc1RVRkJUVW9zUzBGQlRpeExRVUZuUWtFc1ZVRkJWVW9zVVVGQk9VSXNSVUZCZDBNN1FVRkRkRU5VTEZGQlFVbHBRaXhOUVVGTlNpeExRVUZPTEVsQlFXVXNRMEZCWml4SFFVRnRRaXhEUVVGMlFqdEJRVU5CWkN4UlFVRkpSeXhKUVVGS08wRkJRMFFzUjBGSVJDeE5RVWRQTzBGQlEweElMRkZCUVVsWExFdEJRVXRSTEV0QlFVd3NRMEZCVjFJc1MwRkJTMU1zUjBGQlRDeERRVUZUVGl4TFFVRlVMRWxCUVd0Q1NDeExRVUZMVlN4SFFVRnNReXhEUVVGS08wRkJRMEVzVVVGQlNWQXNVMEZCVTBNc1NVRkJTVW9zUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRFdpeERRVUZpTEVOQlFXSXNTVUZCWjBNc1EwRkJjRU1zUlVGQmRVTTdRVUZEY2tOQk8wRkJRMEZsTEZkQlFVc3NRMEZCVER0QlFVTkVPMEZCUTBRc1VVRkJTV1lzU1VGQlNVa3NTMEZCU2l4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENWU3hsUVVGVFJTeExRVUZMUkN4RFFVRmtPMEZCUTBRc1MwRkdSQ3hOUVVWUE8wRkJRMHhFTEdWQlFWTkZMRXRCUVV0TUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1NVRkJTVklzUzBGQmFFSXNRMEZCWkR0QlFVTkVPMEZCUTBRc1VVRkJTVlVzVVVGQlVVTXNRMEZCVWl4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENaanRCUVVOQlpTeFhRVUZMTEVOQlFVdzdRVUZEUkRzN1FVRkZSQ3hSUVVGSlppeEpRVUZKU1N4TFFVRktMRWxCUVdGRUxFbEJRV3BDTEVWQlFYVkNPMEZCUTNKQ1JpeFZRVUZKTEVOQlFVbzdRVUZEUVVRc1ZVRkJTVWNzU1VGQlNqdEJRVU5FTEV0QlNFUXNUVUZIVHl4SlFVRkpTQ3hKUVVGSlNTeExRVUZLTEVsQlFXRXNRMEZCYWtJc1JVRkJiMEk3UVVGRGVrSklMRlZCUVVrc1EwRkJRMkVzVVVGQlVVTXNRMEZCVWl4SFFVRlpMRU5CUVdJc1NVRkJhMEpLTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCZEVJN1FVRkRRVVVzVlVGQlNVRXNTVUZCU1Vrc1MwRkJVanRCUVVORUxFdEJTRTBzVFVGSFFUdEJRVU5NU0N4VlFVRkpZU3hSUVVGUlNDeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWlVpeFJRVUZSTEVOQlFYQkNMRU5CUVZJc1IwRkJhVU5QTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCY2tNN1FVRkRRVVVzVlVGQlNTeERRVUZLTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGUFJpeFJRVUZSTEVOQlFXWXNSVUZCYTBKSUxFOUJRVTlETEZOQlFWTlZMRU5CUVdoQ0xFbEJRWEZDVEN4SlFVRkpMRWxCUVhwQ0xFVkJRU3RDU3l4TFFVRkxReXhEUVVGd1F5eEZRVUYxUTA0c1MwRkJTeXhIUVVFMVF5eEZRVUZwUkVnc1VVRkJVU3hEUVVFelJTeEZRVUU0UlN4RFFVRkZPenRCUVVWb1JrVXNUVUZCUzBFc1MwRkJTMFlzU1VGQlRpeEhRVUZqUnl4RFFVRnNRanRCUVVOQlF5eFZRVUZSU2l4SlFVRlNPMEZCUTBFc1UwRkJUMGtzVDBGQlR5eERRVUZrTEVWQlFXbENVQ3hQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhKUVVGeFFrNHNTVUZCU1N4SlFVRjZRaXhGUVVFclFrMHNTMEZCUzBNc1EwRkJjRU1zUlVGQmRVTlFMRXRCUVVzc1IwRkJOVU1zUlVGQmFVUkZMRkZCUVZFc1EwRkJNVVVzUlVGQk5rVXNRMEZCUlRzN1FVRkZMMFZRTEZOQlFVOURMRk5CUVZOVkxFTkJRVlFzUjBGQllVTXNRMEZCY0VJc1MwRkJNRUpETEVsQlFVa3NSMEZCT1VJN1FVRkRSQ3hEUVd4RVJDSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbVY0Y0c5eWRITXVjbVZoWkNBOUlHWjFibU4wYVc5dUlDaGlkV1ptWlhJc0lHOW1abk5sZEN3Z2FYTk1SU3dnYlV4bGJpd2dia0o1ZEdWektTQjdYRzRnSUhaaGNpQmxMQ0J0WEc0Z0lIWmhjaUJsVEdWdUlEMGdia0o1ZEdWeklDb2dPQ0F0SUcxTVpXNGdMU0F4WEc0Z0lIWmhjaUJsVFdGNElEMGdLREVnUER3Z1pVeGxiaWtnTFNBeFhHNGdJSFpoY2lCbFFtbGhjeUE5SUdWTllYZ2dQajRnTVZ4dUlDQjJZWElnYmtKcGRITWdQU0F0TjF4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBb2JrSjVkR1Z6SUMwZ01Ta2dPaUF3WEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSUMweElEb2dNVnh1SUNCMllYSWdjeUE5SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFZ4dVhHNGdJR2tnS3owZ1pGeHVYRzRnSUdVZ1BTQnpJQ1lnS0NneElEdzhJQ2d0YmtKcGRITXBLU0F0SURFcFhHNGdJSE1nUGo0OUlDZ3Ria0pwZEhNcFhHNGdJRzVDYVhSeklDczlJR1ZNWlc1Y2JpQWdabTl5SUNnN0lHNUNhWFJ6SUQ0Z01Ec2daU0E5SUdVZ0tpQXlOVFlnS3lCaWRXWm1aWEpiYjJabWMyVjBJQ3NnYVYwc0lHa2dLejBnWkN3Z2JrSnBkSE1nTFQwZ09Da2dlMzFjYmx4dUlDQnRJRDBnWlNBbUlDZ29NU0E4UENBb0xXNUNhWFJ6S1NrZ0xTQXhLVnh1SUNCbElENCtQU0FvTFc1Q2FYUnpLVnh1SUNCdVFtbDBjeUFyUFNCdFRHVnVYRzRnSUdadmNpQW9PeUJ1UW1sMGN5QStJREE3SUcwZ1BTQnRJQ29nTWpVMklDc2dZblZtWm1WeVcyOW1abk5sZENBcklHbGRMQ0JwSUNzOUlHUXNJRzVDYVhSeklDMDlJRGdwSUh0OVhHNWNiaUFnYVdZZ0tHVWdQVDA5SURBcElIdGNiaUFnSUNCbElEMGdNU0F0SUdWQ2FXRnpYRzRnSUgwZ1pXeHpaU0JwWmlBb1pTQTlQVDBnWlUxaGVDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdElEOGdUbUZPSURvZ0tDaHpJRDhnTFRFZ09pQXhLU0FxSUVsdVptbHVhWFI1S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUcwZ1BTQnRJQ3NnVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQmxJRDBnWlNBdElHVkNhV0Z6WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2h6SUQ4Z0xURWdPaUF4S1NBcUlHMGdLaUJOWVhSb0xuQnZkeWd5TENCbElDMGdiVXhsYmlsY2JuMWNibHh1Wlhod2IzSjBjeTUzY21sMFpTQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJSFpoYkhWbExDQnZabVp6WlhRc0lHbHpURVVzSUcxTVpXNHNJRzVDZVhSbGN5a2dlMXh1SUNCMllYSWdaU3dnYlN3Z1kxeHVJQ0IyWVhJZ1pVeGxiaUE5SUc1Q2VYUmxjeUFxSURnZ0xTQnRUR1Z1SUMwZ01WeHVJQ0IyWVhJZ1pVMWhlQ0E5SUNneElEdzhJR1ZNWlc0cElDMGdNVnh1SUNCMllYSWdaVUpwWVhNZ1BTQmxUV0Y0SUQ0K0lERmNiaUFnZG1GeUlISjBJRDBnS0cxTVpXNGdQVDA5SURJeklEOGdUV0YwYUM1d2IzY29NaXdnTFRJMEtTQXRJRTFoZEdndWNHOTNLRElzSUMwM055a2dPaUF3S1Z4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBd0lEb2dLRzVDZVhSbGN5QXRJREVwWEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSURFZ09pQXRNVnh1SUNCMllYSWdjeUE5SUhaaGJIVmxJRHdnTUNCOGZDQW9kbUZzZFdVZ1BUMDlJREFnSmlZZ01TQXZJSFpoYkhWbElEd2dNQ2tnUHlBeElEb2dNRnh1WEc0Z0lIWmhiSFZsSUQwZ1RXRjBhQzVoWW5Nb2RtRnNkV1VwWEc1Y2JpQWdhV1lnS0dselRtRk9LSFpoYkhWbEtTQjhmQ0IyWVd4MVpTQTlQVDBnU1c1bWFXNXBkSGtwSUh0Y2JpQWdJQ0J0SUQwZ2FYTk9ZVTRvZG1Gc2RXVXBJRDhnTVNBNklEQmNiaUFnSUNCbElEMGdaVTFoZUZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdVZ1BTQk5ZWFJvTG1ac2IyOXlLRTFoZEdndWJHOW5LSFpoYkhWbEtTQXZJRTFoZEdndVRFNHlLVnh1SUNBZ0lHbG1JQ2gyWVd4MVpTQXFJQ2hqSUQwZ1RXRjBhQzV3YjNjb01pd2dMV1VwS1NBOElERXBJSHRjYmlBZ0lDQWdJR1V0TFZ4dUlDQWdJQ0FnWXlBcVBTQXlYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxJQ3NnWlVKcFlYTWdQajBnTVNrZ2UxeHVJQ0FnSUNBZ2RtRnNkV1VnS3owZ2NuUWdMeUJqWEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIWmhiSFZsSUNzOUlISjBJQ29nVFdGMGFDNXdiM2NvTWl3Z01TQXRJR1ZDYVdGektWeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RtRnNkV1VnS2lCaklENDlJRElwSUh0Y2JpQWdJQ0FnSUdVcksxeHVJQ0FnSUNBZ1l5QXZQU0F5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0dVZ0t5QmxRbWxoY3lBK1BTQmxUV0Y0S1NCN1hHNGdJQ0FnSUNCdElEMGdNRnh1SUNBZ0lDQWdaU0E5SUdWTllYaGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0F4S1NCN1hHNGdJQ0FnSUNCdElEMGdLSFpoYkhWbElDb2dZeUF0SURFcElDb2dUV0YwYUM1d2IzY29NaXdnYlV4bGJpbGNiaUFnSUNBZ0lHVWdQU0JsSUNzZ1pVSnBZWE5jYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2JTQTlJSFpoYkhWbElDb2dUV0YwYUM1d2IzY29NaXdnWlVKcFlYTWdMU0F4S1NBcUlFMWhkR2d1Y0c5M0tESXNJRzFNWlc0cFhHNGdJQ0FnSUNCbElEMGdNRnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1p2Y2lBb095QnRUR1Z1SUQ0OUlEZzdJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBYU0E5SUcwZ0ppQXdlR1ptTENCcElDczlJR1FzSUcwZ0x6MGdNalUyTENCdFRHVnVJQzA5SURncElIdDlYRzVjYmlBZ1pTQTlJQ2hsSUR3OElHMU1aVzRwSUh3Z2JWeHVJQ0JsVEdWdUlDczlJRzFNWlc1Y2JpQWdabTl5SUNnN0lHVk1aVzRnUGlBd095QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMGdQU0JsSUNZZ01IaG1aaXdnYVNBclBTQmtMQ0JsSUM4OUlESTFOaXdnWlV4bGJpQXRQU0E0S1NCN2ZWeHVYRzRnSUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwSUMwZ1pGMGdmRDBnY3lBcUlERXlPRnh1ZlZ4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0oKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvJztcbn07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1KeWIzZHpaWEl1YW5NaVhTd2libUZ0WlhNaU9sc2ljSEp2WTJWemN5SXNJbTF2WkhWc1pTSXNJbVY0Y0c5eWRITWlMQ0p1WlhoMFZHbGpheUlzSW1OaGJsTmxkRWx0YldWa2FXRjBaU0lzSW5kcGJtUnZkeUlzSW5ObGRFbHRiV1ZrYVdGMFpTSXNJbU5oYmxCdmMzUWlMQ0p3YjNOMFRXVnpjMkZuWlNJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSm1JaXdpY1hWbGRXVWlMQ0psZGlJc0luTnZkWEpqWlNJc0ltUmhkR0VpTENKemRHOXdVSEp2Y0dGbllYUnBiMjRpTENKc1pXNW5kR2dpTENKbWJpSXNJbk5vYVdaMElpd2ljSFZ6YUNJc0luTmxkRlJwYldWdmRYUWlMQ0owYVhSc1pTSXNJbUp5YjNkelpYSWlMQ0psYm5ZaUxDSmhjbWQySWl3aWJtOXZjQ0lzSW05dUlpd2lZV1JrVEdsemRHVnVaWElpTENKdmJtTmxJaXdpYjJabUlpd2ljbVZ0YjNabFRHbHpkR1Z1WlhJaUxDSnlaVzF2ZG1WQmJHeE1hWE4wWlc1bGNuTWlMQ0psYldsMElpd2lZbWx1WkdsdVp5SXNJbTVoYldVaUxDSkZjbkp2Y2lJc0ltTjNaQ0lzSW1Ob1pHbHlJaXdpWkdseUlsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJPenRCUVVWQkxFbEJRVWxCTEZWQlFWVkRMRTlCUVU5RExFOUJRVkFzUjBGQmFVSXNSVUZCTDBJN08wRkJSVUZHTEZGQlFWRkhMRkZCUVZJc1IwRkJiMElzV1VGQldUdEJRVU0xUWl4UlFVRkpReXhyUWtGQmEwSXNUMEZCVDBNc1RVRkJVQ3hMUVVGclFpeFhRVUZzUWl4SlFVTnVRa0VzVDBGQlQwTXNXVUZFVmp0QlFVVkJMRkZCUVVsRExGVkJRVlVzVDBGQlQwWXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU5ZUVN4UFFVRlBSeXhYUVVSSkxFbEJRMWRJTEU5QlFVOUpMR2RDUVVSb1F6czdRVUZKUVN4UlFVRkpUQ3hsUVVGS0xFVkJRWEZDTzBGQlEycENMR1ZCUVU4c1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlFVVXNiVUpCUVU5TUxFOUJRVTlETEZsQlFWQXNRMEZCYjBKSkxFTkJRWEJDTEVOQlFWQTdRVUZCSzBJc1UwRkJja1E3UVVGRFNEczdRVUZGUkN4UlFVRkpTQ3hQUVVGS0xFVkJRV0U3UVVGRFZDeFpRVUZKU1N4UlFVRlJMRVZCUVZvN1FVRkRRVTRzWlVGQlQwa3NaMEpCUVZBc1EwRkJkMElzVTBGQmVFSXNSVUZCYlVNc1ZVRkJWVWNzUlVGQlZpeEZRVUZqTzBGQlF6ZERMR2RDUVVGSlF5eFRRVUZUUkN4SFFVRkhReXhOUVVGb1FqdEJRVU5CTEdkQ1FVRkpMRU5CUVVOQkxGZEJRVmRTTEUxQlFWZ3NTVUZCY1VKUkxGZEJRVmNzU1VGQmFrTXNTMEZCTUVORUxFZEJRVWRGTEVsQlFVZ3NTMEZCV1N4alFVRXhSQ3hGUVVFd1JUdEJRVU4wUlVZc2JVSkJRVWRITEdWQlFVZzdRVUZEUVN4dlFrRkJTVW9zVFVGQlRVc3NUVUZCVGl4SFFVRmxMRU5CUVc1Q0xFVkJRWE5DTzBGQlEyeENMSGRDUVVGSlF5eExRVUZMVGl4TlFVRk5UeXhMUVVGT0xFVkJRVlE3UVVGRFFVUTdRVUZEU0R0QlFVTktPMEZCUTBvc1UwRlVSQ3hGUVZOSExFbEJWRWc3TzBGQlYwRXNaVUZCVHl4VFFVRlRaQ3hSUVVGVUxFTkJRV3RDWXl4RlFVRnNRaXhGUVVGelFqdEJRVU42UWs0c2EwSkJRVTFSTEVsQlFVNHNRMEZCVjBZc1JVRkJXRHRCUVVOQldpeHRRa0ZCVDBjc1YwRkJVQ3hEUVVGdFFpeGpRVUZ1UWl4RlFVRnRReXhIUVVGdVF6dEJRVU5JTEZOQlNFUTdRVUZKU0RzN1FVRkZSQ3hYUVVGUExGTkJRVk5NTEZGQlFWUXNRMEZCYTBKakxFVkJRV3hDTEVWQlFYTkNPMEZCUTNwQ1J5eHRRa0ZCVjBnc1JVRkJXQ3hGUVVGbExFTkJRV1k3UVVGRFNDeExRVVpFTzBGQlIwZ3NRMEZxUTJ0Q0xFVkJRVzVDT3p0QlFXMURRV3BDTEZGQlFWRnhRaXhMUVVGU0xFZEJRV2RDTEZOQlFXaENPMEZCUTBGeVFpeFJRVUZSYzBJc1QwRkJVaXhIUVVGclFpeEpRVUZzUWp0QlFVTkJkRUlzVVVGQlVYVkNMRWRCUVZJc1IwRkJZeXhGUVVGa08wRkJRMEYyUWl4UlFVRlJkMElzU1VGQlVpeEhRVUZsTEVWQlFXWTdPMEZCUlVFc1UwRkJVME1zU1VGQlZDeEhRVUZuUWl4RFFVRkZPenRCUVVWc1FucENMRkZCUVZFd1FpeEZRVUZTTEVkQlFXRkVMRWxCUVdJN1FVRkRRWHBDTEZGQlFWRXlRaXhYUVVGU0xFZEJRWE5DUml4SlFVRjBRanRCUVVOQmVrSXNVVUZCVVRSQ0xFbEJRVklzUjBGQlpVZ3NTVUZCWmp0QlFVTkJla0lzVVVGQlVUWkNMRWRCUVZJc1IwRkJZMG9zU1VGQlpEdEJRVU5CZWtJc1VVRkJVVGhDTEdOQlFWSXNSMEZCZVVKTUxFbEJRWHBDTzBGQlEwRjZRaXhSUVVGUkswSXNhMEpCUVZJc1IwRkJOa0pPTEVsQlFUZENPMEZCUTBGNlFpeFJRVUZSWjBNc1NVRkJVaXhIUVVGbFVDeEpRVUZtT3p0QlFVVkJla0lzVVVGQlVXbERMRTlCUVZJc1IwRkJhMElzVlVGQlZVTXNTVUZCVml4RlFVRm5RanRCUVVNNVFpeFZRVUZOTEVsQlFVbERMRXRCUVVvc1EwRkJWU3hyUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkRzN1FVRkpRVHRCUVVOQmJrTXNVVUZCVVc5RExFZEJRVklzUjBGQll5eFpRVUZaTzBGQlFVVXNWMEZCVHl4SFFVRlFPMEZCUVZrc1EwRkJlRU03UVVGRFFYQkRMRkZCUVZGeFF5eExRVUZTTEVkQlFXZENMRlZCUVZWRExFZEJRVllzUlVGQlpUdEJRVU16UWl4VlFVRk5MRWxCUVVsSUxFdEJRVW9zUTBGQlZTeG5RMEZCVml4RFFVRk9PMEZCUTBnc1EwRkdSQ0lzSW1acGJHVWlPaUppY205M2MyVnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5OGdjMmhwYlNCbWIzSWdkWE5wYm1jZ2NISnZZMlZ6Y3lCcGJpQmljbTkzYzJWeVhHNWNiblpoY2lCd2NtOWpaWE56SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN2ZUdGNibHh1Y0hKdlkyVnpjeTV1WlhoMFZHbGpheUE5SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RtRnlJR05oYmxObGRFbHRiV1ZrYVdGMFpTQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbk5sZEVsdGJXVmthV0YwWlR0Y2JpQWdJQ0IyWVhJZ1kyRnVVRzl6ZENBOUlIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNBZ0ppWWdkMmx1Wkc5M0xuQnZjM1JOWlhOellXZGxJQ1ltSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlYRzRnSUNBZ08xeHVYRzRnSUNBZ2FXWWdLR05oYmxObGRFbHRiV1ZrYVdGMFpTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLR1lwSUhzZ2NtVjBkWEp1SUhkcGJtUnZkeTV6WlhSSmJXMWxaR2xoZEdVb1ppa2dmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWTJGdVVHOXpkQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdjWFZsZFdVZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMjFsYzNOaFoyVW5MQ0JtZFc1amRHbHZiaUFvWlhZcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpiM1Z5WTJVZ1BTQmxkaTV6YjNWeVkyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSE52ZFhKalpTQTlQVDBnZDJsdVpHOTNJSHg4SUhOdmRYSmpaU0E5UFQwZ2JuVnNiQ2tnSmlZZ1pYWXVaR0YwWVNBOVBUMGdKM0J5YjJObGMzTXRkR2xqYXljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxkaTV6ZEc5d1VISnZjR0ZuWVhScGIyNG9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NYVmxkV1V1YkdWdVozUm9JRDRnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1ptNGdQU0J4ZFdWMVpTNXphR2xtZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYmlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTd2dkSEoxWlNrN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlHNWxlSFJVYVdOcktHWnVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnhkV1YxWlM1d2RYTm9LR1p1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXdiM04wVFdWemMyRm5aU2duY0hKdlkyVnpjeTEwYVdOckp5d2dKeW9uS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYm1WNGRGUnBZMnNvWm00cElIdGNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htYml3Z01DazdYRzRnSUNBZ2ZUdGNibjBwS0NrN1hHNWNibkJ5YjJObGMzTXVkR2wwYkdVZ1BTQW5Zbkp2ZDNObGNpYzdYRzV3Y205alpYTnpMbUp5YjNkelpYSWdQU0IwY25WbE8xeHVjSEp2WTJWemN5NWxibllnUFNCN2ZUdGNibkJ5YjJObGMzTXVZWEpuZGlBOUlGdGRPMXh1WEc1bWRXNWpkR2x2YmlCdWIyOXdLQ2tnZTMxY2JseHVjSEp2WTJWemN5NXZiaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbUZrWkV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011YjI1alpTQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtOW1aaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbkpsYlc5MlpVeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWNtVnRiM1psUVd4c1RHbHpkR1Z1WlhKeklEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdVpXMXBkQ0E5SUc1dmIzQTdYRzVjYm5CeWIyTmxjM011WW1sdVpHbHVaeUE5SUdaMWJtTjBhVzl1SUNodVlXMWxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtSnBibVJwYm1jZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVmVnh1WEc0dkx5QlVUMFJQS0hOb2RIbHNiV0Z1S1Z4dWNISnZZMlZ6Y3k1amQyUWdQU0JtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlBbkx5Y2dmVHRjYm5CeWIyTmxjM011WTJoa2FYSWdQU0JtZFc1amRHbHZiaUFvWkdseUtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1Ob1pHbHlJR2x6SUc1dmRDQnpkWEJ3YjNKMFpXUW5LVHRjYm4wN1hHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXFxcXGJyb3dzZXIuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gR2FtZUFyZW5hKGVsZW1lbnQsIHdpZHRoLCBoZWlnaHQsIFBsYXllcikge1xuICAgIHRoaXMuY2FudmFzID0gZWxlbWVudDtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmN0eCk7XG5cbiAgICAvL3RoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcbiAgICB0aGlzLnN0YXJ0KCk7XG59XG5cbkdhbWVBcmVuYS5wcm90b3R5cGUgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyksIDIwKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX3RoaXMua2V5cyA9IF90aGlzLmtleXMgfHwgW107XG4gICAgICAgICAgICBfdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBlLnR5cGUgPT09ICdrZXlkb3duJztcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBlLnR5cGUgPT09ICdrZXlkb3duJztcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG4gICAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucGxheWVyLm5ld1Bvcyh7XG4gICAgICAgICAgICByaWdodDogdGhpcy5rZXlzICYmIHRoaXMua2V5c1s2OF0sXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmtleXMgJiYgdGhpcy5rZXlzWzY1XSxcbiAgICAgICAgICAgIHVwOiB0aGlzLmtleXMgJiYgdGhpcy5rZXlzWzg3XSxcbiAgICAgICAgICAgIGRvd246IHRoaXMua2V5cyAmJiB0aGlzLmtleXNbODNdXG4gICAgICAgIH0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS51cGRhdGUodGhpcy5jdHgpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gR2FtZUFyZW5hO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1kaGJXVkJjbVZ1WVM1cWN5SmRMQ0p1WVcxbGN5STZXeUpIWVcxbFFYSmxibUVpTENKbGJHVnRaVzUwSWl3aWQybGtkR2dpTENKb1pXbG5hSFFpTENKUWJHRjVaWElpTENKallXNTJZWE1pTENKamRIZ2lMQ0puWlhSRGIyNTBaWGgwSWl3aWNHeGhlV1Z5SWl3aWMzUmhjblFpTENKd2NtOTBiM1I1Y0dVaUxDSnBiblJsY25aaGJDSXNJbk5sZEVsdWRHVnlkbUZzSWl3aWRYQmtZWFJsVTNSaGRHVWlMQ0ppYVc1a0lpd2lkMmx1Wkc5M0lpd2lZV1JrUlhabGJuUk1hWE4wWlc1bGNpSXNJbVVpTENKd2NtVjJaVzUwUkdWbVlYVnNkQ0lzSW10bGVYTWlMQ0pyWlhsRGIyUmxJaXdpZEhsd1pTSXNJbk4wYjNBaUxDSmpiR1ZoY2tsdWRHVnlkbUZzSWl3aVkyeGxZWElpTENKdVpYZFFiM01pTENKeWFXZG9kQ0lzSW14bFpuUWlMQ0oxY0NJc0ltUnZkMjRpTENKMWNHUmhkR1VpTENKamJHVmhjbEpsWTNRaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN08wRkJRVUVzVTBGQlUwRXNVMEZCVkN4RFFVRnRRa01zVDBGQmJrSXNSVUZCTkVKRExFdEJRVFZDTEVWQlFXMURReXhOUVVGdVF5eEZRVUV5UTBNc1RVRkJNME1zUlVGQmJVUTdRVUZETDBNc1UwRkJTME1zVFVGQlRDeEhRVUZqU2l4UFFVRmtPMEZCUTBFc1UwRkJTMHNzUjBGQlRDeEhRVUZYTEV0QlFVdEVMRTFCUVV3c1EwRkJXVVVzVlVGQldpeERRVUYxUWl4SlFVRjJRaXhEUVVGWU8wRkJRMEVzVTBGQlMwd3NTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVTBGQlMwTXNUVUZCVEN4SFFVRmpRU3hOUVVGa08wRkJRMEVzVTBGQlMwc3NUVUZCVEN4SFFVRmpMRWxCUVVsS0xFMUJRVW9zUTBGQlZ5eExRVUZMUlN4SFFVRm9RaXhEUVVGa096dEJRVVZCTzBGQlEwRXNVMEZCUzBjc1MwRkJURHRCUVVOSU96dEJRVVZFVkN4VlFVRlZWU3hUUVVGV0xFZEJRWE5DTzBGQlEyeENSQ3hUUVVSclFpeHRRa0ZEVmp0QlFVRkJPenRCUVVOS0xHRkJRVXRLTEUxQlFVd3NRMEZCV1Vnc1MwRkJXaXhIUVVGdlFpeExRVUZMUVN4TFFVRjZRanRCUVVOQkxHRkJRVXRITEUxQlFVd3NRMEZCV1VZc1RVRkJXaXhIUVVGeFFpeExRVUZMUVN4TlFVRXhRanRCUVVOQkxHRkJRVXRSTEZGQlFVd3NSMEZCWjBKRExGbEJRVmtzUzBGQlMwTXNWMEZCVEN4RFFVRnBRa01zU1VGQmFrSXNRMEZCYzBJc1NVRkJkRUlzUTBGQldpeEZRVUY1UXl4RlFVRjZReXhEUVVGb1FqdEJRVU5CUXl4bFFVRlBReXhuUWtGQlVDeERRVUYzUWl4VFFVRjRRaXhGUVVGdFF5eFZRVUZEUXl4RFFVRkVMRVZCUVU4N1FVRkRkRU5CTEdOQlFVVkRMR05CUVVZN1FVRkRRU3hyUWtGQlMwTXNTVUZCVEN4SFFVRmhMRTFCUVV0QkxFbEJRVXdzU1VGQllTeEZRVUV4UWp0QlFVTkJMR3RDUVVGTFFTeEpRVUZNTEVOQlFWVkdMRVZCUVVWSExFOUJRVm9zU1VGQmQwSklMRVZCUVVWSkxFbEJRVVlzUzBGQlZ5eFRRVUZ1UXp0QlFVTklMRk5CU2tRN1FVRkxRVTRzWlVGQlQwTXNaMEpCUVZBc1EwRkJkMElzVDBGQmVFSXNSVUZCYVVNc1ZVRkJRME1zUTBGQlJDeEZRVUZQTzBGQlEzQkRMR3RDUVVGTFJTeEpRVUZNTEVOQlFWVkdMRVZCUVVWSExFOUJRVm9zU1VGQmQwSklMRVZCUVVWSkxFbEJRVVlzUzBGQlZ5eFRRVUZ1UXp0QlFVTklMRk5CUmtRN1FVRkhTQ3hMUVdKcFFqdEJRV05zUWtNc1VVRmthMElzYTBKQlkxZzdRVUZEU0VNc2MwSkJRV01zUzBGQlMxb3NVVUZCYmtJN1FVRkRTQ3hMUVdoQ2FVSTdRVUZwUW14Q1JTeGxRV3BDYTBJc2VVSkJhVUpLTzBGQlExWXNZVUZCUzFjc1MwRkJURHRCUVVOQkxHRkJRVXRvUWl4TlFVRk1MRU5CUTB0cFFpeE5RVVJNTEVOQlExazdRVUZEU2tNc2JVSkJRVThzUzBGQlMxQXNTVUZCVEN4SlFVRmhMRXRCUVV0QkxFbEJRVXdzUTBGQlZTeEZRVUZXTEVOQlJHaENPMEZCUlVwUkxHdENRVUZOTEV0QlFVdFNMRWxCUVV3c1NVRkJZU3hMUVVGTFFTeEpRVUZNTEVOQlFWVXNSVUZCVml4RFFVWm1PMEZCUjBwVExHZENRVUZKTEV0QlFVdFVMRWxCUVV3c1NVRkJZU3hMUVVGTFFTeEpRVUZNTEVOQlFWVXNSVUZCVml4RFFVaGlPMEZCU1VwVkxHdENRVUZOTEV0QlFVdFdMRWxCUVV3c1NVRkJZU3hMUVVGTFFTeEpRVUZNTEVOQlFWVXNSVUZCVmp0QlFVcG1MRk5CUkZvc1JVRk5UeXhMUVVGTGFrSXNTMEZPV2l4RlFVMXRRaXhMUVVGTFF5eE5RVTU0UWl4RlFVOUxNa0lzVFVGUVRDeERRVTlaTEV0QlFVdDRRaXhIUVZCcVFqdEJRVkZJTEV0Qk0wSnBRanRCUVRSQ2JFSnJRaXhUUVRWQ2EwSXNiVUpCTkVKV08wRkJRMG9zWVVGQlMyeENMRWRCUVV3c1EwRkJVM2xDTEZOQlFWUXNRMEZCYlVJc1EwRkJia0lzUlVGQmMwSXNRMEZCZEVJc1JVRkJlVUlzUzBGQlN6RkNMRTFCUVV3c1EwRkJXVWdzUzBGQmNrTXNSVUZCTkVNc1MwRkJTMGNzVFVGQlRDeERRVUZaUml4TlFVRjRSRHRCUVVOSU8wRkJPVUpwUWl4RFFVRjBRanM3YTBKQmFVTmxTQ3hUSWl3aVptbHNaU0k2SW1kaGJXVkJjbVZ1WVM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbVoxYm1OMGFXOXVJRWRoYldWQmNtVnVZU2hsYkdWdFpXNTBMQ0IzYVdSMGFDd2dhR1ZwWjJoMExDQlFiR0Y1WlhJcElIdGNjbHh1SUNBZ0lIUm9hWE11WTJGdWRtRnpJRDBnWld4bGJXVnVkRHRjY2x4dUlDQWdJSFJvYVhNdVkzUjRJRDBnZEdocGN5NWpZVzUyWVhNdVoyVjBRMjl1ZEdWNGRDZ25NbVFuS1R0Y2NseHVJQ0FnSUhSb2FYTXVkMmxrZEdnZ1BTQjNhV1IwYUR0Y2NseHVJQ0FnSUhSb2FYTXVhR1ZwWjJoMElEMGdhR1ZwWjJoME8xeHlYRzRnSUNBZ2RHaHBjeTV3YkdGNVpYSWdQU0J1WlhjZ1VHeGhlV1Z5S0hSb2FYTXVZM1I0S1R0Y2NseHVYSEpjYmlBZ0lDQXZMM1JvYVhNdVpYWmxiblJDZFhNZ1BTQmxkbVZ1ZEVKMWN6dGNjbHh1SUNBZ0lIUm9hWE11YzNSaGNuUW9LVHRjY2x4dWZWeHlYRzVjY2x4dVIyRnRaVUZ5Wlc1aExuQnliM1J2ZEhsd1pTQTlJSHRjY2x4dUlDQWdJSE4wWVhKMEtDa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMkZ1ZG1GekxuZHBaSFJvSUQwZ2RHaHBjeTUzYVdSMGFEdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtTmhiblpoY3k1b1pXbG5hSFFnUFNCMGFHbHpMbWhsYVdkb2REdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtbHVkR1Z5ZG1Gc0lEMGdjMlYwU1c1MFpYSjJZV3dvZEdocGN5NTFjR1JoZEdWVGRHRjBaUzVpYVc1a0tIUm9hWE1wTENBeU1DazdYSEpjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMnRsZVdSdmQyNG5MQ0FvWlNrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YTJWNWN5QTlJQ2gwYUdsekxtdGxlWE1nZkh3Z1cxMHBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG10bGVYTmJaUzVyWlhsRGIyUmxYU0E5SUNobExuUjVjR1VnUFQwOUlDZHJaWGxrYjNkdUp5azdYSEpjYmlBZ0lDQWdJQ0FnZlNrN1hISmNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oydGxlWFZ3Snl3Z0tHVXBJRDArSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXJaWGx6VzJVdWEyVjVRMjlrWlYwZ1BTQW9aUzUwZVhCbElEMDlQU0FuYTJWNVpHOTNiaWNwWEhKY2JpQWdJQ0FnSUNBZ2ZTazdYSEpjYmlBZ0lDQjlMRnh5WEc0Z0lDQWdjM1J2Y0NncElIdGNjbHh1SUNBZ0lDQWdJQ0JqYkdWaGNrbHVkR1Z5ZG1Gc0tIUm9hWE11YVc1MFpYSjJZV3dwTzF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0FnSUhWd1pHRjBaVk4wWVhSbEtDa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMnhsWVhJb0tUdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuQnNZWGxsY2x4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F1Ym1WM1VHOXpLSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKcFoyaDBPaUIwYUdsekxtdGxlWE1nSmlZZ2RHaHBjeTVyWlhseld6WTRYU3hjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4bFpuUTZJSFJvYVhNdWEyVjVjeUFtSmlCMGFHbHpMbXRsZVhOYk5qVmRMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZFhBNklIUm9hWE11YTJWNWN5QW1KaUIwYUdsekxtdGxlWE5iT0RkZExGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaRzkzYmpvZ2RHaHBjeTVyWlhseklDWW1JSFJvYVhNdWEyVjVjMXM0TTExY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlN3Z2RHaHBjeTUzYVdSMGFDd2dkR2hwY3k1b1pXbG5hSFFwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzUxY0dSaGRHVW9kR2hwY3k1amRIZ3BPMXh5WEc0Z0lDQWdmU3hjY2x4dUlDQWdJR05zWldGeUtDa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1I0TG1Oc1pXRnlVbVZqZENnd0xDQXdMQ0IwYUdsekxtTmhiblpoY3k1M2FXUjBhQ3dnZEdocGN5NWpZVzUyWVhNdWFHVnBaMmgwS1Z4eVhHNGdJQ0FnZlZ4eVhHNTlPMXh5WEc1Y2NseHVaWGh3YjNKMElHUmxabUYxYkhRZ1IyRnRaVUZ5Wlc1aE95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcZ2FtZUFyZW5hLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXHJcbiAqIENyZWF0ZWQgYnkgYW5kcmUgb24gMjgtSnVuLTE3LlxyXG4gKi9cbmZ1bmN0aW9uIFBsYXllcihjdHgpIHtcbiAgICB2YXIgd2lkdGggPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwO1xuICAgIHZhciBoZWlnaHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDMwO1xuICAgIHZhciBjb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogJ2dyZWVuJztcbiAgICB2YXIgeCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogNTA7XG4gICAgdmFyIHkgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IDUwO1xuXG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLnNwZWVkID0gMDtcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLm1vdmVBbmdsZSA9IDA7XG59XG5cblBsYXllci5wcm90b3R5cGUgPSB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgICAgICBjdHgucm90YXRlKHRoaXMuYW5nbGUpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMud2lkdGggLyAtMiwgdGhpcy5oZWlnaHQgLyAtMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG5ld1BvczogZnVuY3Rpb24gbmV3UG9zKG9wdGlvbiwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLm1vdmVBbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuXG4gICAgICAgIG9wdGlvbi5sZWZ0ICYmICh0aGlzLm1vdmVBbmdsZSA9IC01KTtcbiAgICAgICAgb3B0aW9uLnJpZ2h0ICYmICh0aGlzLm1vdmVBbmdsZSA9IDUpO1xuICAgICAgICBvcHRpb24udXAgJiYgKHRoaXMuc3BlZWQgPSA1KTtcbiAgICAgICAgb3B0aW9uLmRvd24gJiYgKHRoaXMuc3BlZWQgPSAtNSk7XG5cbiAgICAgICAgdGhpcy5hbmdsZSArPSB0aGlzLm1vdmVBbmdsZSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkICogTWF0aC5zaW4odGhpcy5hbmdsZSk7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkICogTWF0aC5jb3ModGhpcy5hbmdsZSk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBoZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54ID4gd2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy54IDwgMCkge1xuICAgICAgICAgICAgdGhpcy54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUGxheWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5Cc1lYbGxjaTVxY3lKZExDSnVZVzFsY3lJNld5SlFiR0Y1WlhJaUxDSmpkSGdpTENKM2FXUjBhQ0lzSW1obGFXZG9kQ0lzSW1OdmJHOXlJaXdpZUNJc0lua2lMQ0p6Y0dWbFpDSXNJbUZ1WjJ4bElpd2liVzkyWlVGdVoyeGxJaXdpY0hKdmRHOTBlWEJsSWl3aWRYQmtZWFJsSWl3aWMyRjJaU0lzSW5SeVlXNXpiR0YwWlNJc0luSnZkR0YwWlNJc0ltWnBiR3hUZEhsc1pTSXNJbVpwYkd4U1pXTjBJaXdpY21WemRHOXlaU0lzSW01bGQxQnZjeUlzSW05d2RHbHZiaUlzSW14bFpuUWlMQ0p5YVdkb2RDSXNJblZ3SWl3aVpHOTNiaUlzSWsxaGRHZ2lMQ0pRU1NJc0luTnBiaUlzSW1OdmN5SmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVRzN08wRkJSMEVzVTBGQlUwRXNUVUZCVkN4RFFVRm5Ra01zUjBGQmFFSXNSVUZCSzBVN1FVRkJRU3hSUVVFeFJFTXNTMEZCTUVRc2RVVkJRV3hFTEVWQlFXdEVPMEZCUVVFc1VVRkJPVU5ETEUxQlFUaERMSFZGUVVGeVF5eEZRVUZ4UXp0QlFVRkJMRkZCUVdwRFF5eExRVUZwUXl4MVJVRkJla0lzVDBGQmVVSTdRVUZCUVN4UlFVRm9Ra01zUTBGQlowSXNkVVZCUVZvc1JVRkJXVHRCUVVGQkxGRkJRVkpETEVOQlFWRXNkVVZCUVVvc1JVRkJTVHM3UVVGRE0wVXNVMEZCUzB3c1IwRkJUQ3hIUVVGWFFTeEhRVUZZTzBGQlEwRXNVMEZCUzBNc1MwRkJUQ3hIUVVGaFFTeExRVUZpTzBGQlEwRXNVMEZCUzBNc1RVRkJUQ3hIUVVGalFTeE5RVUZrTzBGQlEwRXNVMEZCUzBNc1MwRkJUQ3hIUVVGaFFTeExRVUZpTzBGQlEwRXNVMEZCUzBNc1EwRkJUQ3hIUVVGVFFTeERRVUZVTzBGQlEwRXNVMEZCUzBNc1EwRkJUQ3hIUVVGVFFTeERRVUZVT3p0QlFVVkJMRk5CUVV0RExFdEJRVXdzUjBGQllTeERRVUZpTzBGQlEwRXNVMEZCUzBNc1MwRkJUQ3hIUVVGaExFTkJRV0k3UVVGRFFTeFRRVUZMUXl4VFFVRk1MRWRCUVdsQ0xFTkJRV3BDTzBGQlEwZzdPMEZCUlVSVUxFOUJRVTlWTEZOQlFWQXNSMEZCYlVJN1FVRkRaa01zVlVGRVpTeHJRa0ZEVWxZc1IwRkVVU3hGUVVOS08wRkJRMUJCTEZsQlFVbFhMRWxCUVVvN1FVRkRRVmdzV1VGQlNWa3NVMEZCU2l4RFFVRmpMRXRCUVV0U0xFTkJRVzVDTEVWQlFYTkNMRXRCUVV0RExFTkJRVE5DTzBGQlEwRk1MRmxCUVVsaExFMUJRVW9zUTBGQlZ5eExRVUZMVGl4TFFVRm9RanRCUVVOQlVDeFpRVUZKWXl4VFFVRktMRWRCUVdkQ0xFdEJRVXRZTEV0QlFYSkNPMEZCUTBGSUxGbEJRVWxsTEZGQlFVb3NRMEZCWVN4TFFVRkxaQ3hMUVVGTUxFZEJRV0VzUTBGQlF5eERRVUV6UWl4RlFVRTRRaXhMUVVGTFF5eE5RVUZNTEVkQlFXTXNRMEZCUXl4RFFVRTNReXhGUVVGblJDeExRVUZMUkN4TFFVRnlSQ3hGUVVFMFJDeExRVUZMUXl4TlFVRnFSVHRCUVVOQlJpeFpRVUZKWjBJc1QwRkJTanRCUVVOQkxHVkJRVThzU1VGQlVEdEJRVU5JTEV0QlZHTTdRVUZWWmtNc1ZVRldaU3hyUWtGVlVrTXNUVUZXVVN4RlFWVkJha0lzUzBGV1FTeEZRVlZQUXl4TlFWWlFMRVZCVldNN1FVRkRla0lzWVVGQlMwMHNVMEZCVEN4SFFVRnBRaXhEUVVGcVFqdEJRVU5CTEdGQlFVdEdMRXRCUVV3c1IwRkJZU3hEUVVGaU96dEJRVVZCV1N4bFFVRlBReXhKUVVGUUxFdEJRV2RDTEV0QlFVdFlMRk5CUVV3c1IwRkJhVUlzUTBGQlF5eERRVUZzUXp0QlFVTkJWU3hsUVVGUFJTeExRVUZRTEV0QlFXbENMRXRCUVV0YUxGTkJRVXdzUjBGQmFVSXNRMEZCYkVNN1FVRkRRVlVzWlVGQlQwY3NSVUZCVUN4TFFVRmpMRXRCUVV0bUxFdEJRVXdzUjBGQllTeERRVUV6UWp0QlFVTkJXU3hsUVVGUFNTeEpRVUZRTEV0QlFXZENMRXRCUVV0b1FpeExRVUZNTEVkQlFXRXNRMEZCUXl4RFFVRTVRanM3UVVGRlFTeGhRVUZMUXl4TFFVRk1MRWxCUVdNc1MwRkJTME1zVTBGQlRDeEhRVUZwUW1Vc1MwRkJTME1zUlVGQmRFSXNSMEZCTWtJc1IwRkJla003UVVGRFFTeGhRVUZMY0VJc1EwRkJUQ3hKUVVGVkxFdEJRVXRGTEV0QlFVd3NSMEZCWVdsQ0xFdEJRVXRGTEVkQlFVd3NRMEZCVXl4TFFVRkxiRUlzUzBGQlpDeERRVUYyUWp0QlFVTkJMR0ZCUVV0R0xFTkJRVXdzU1VGQlZTeExRVUZMUXl4TFFVRk1MRWRCUVdGcFFpeExRVUZMUnl4SFFVRk1MRU5CUVZNc1MwRkJTMjVDTEV0QlFXUXNRMEZCZGtJN08wRkJSVUVzV1VGQlNTeExRVUZMUml4RFFVRk1MRWRCUVZOSUxFMUJRV0lzUlVGQmIwSTdRVUZEYUVJc2FVSkJRVXRITEVOQlFVd3NSMEZCVXl4RFFVRlVPMEZCUTBnc1UwRkdSQ3hOUVVWUExFbEJRVWtzUzBGQlMwRXNRMEZCVEN4SFFVRlRMRU5CUVdJc1JVRkJaVHRCUVVOc1FpeHBRa0ZCUzBFc1EwRkJUQ3hIUVVGVFNDeE5RVUZVTzBGQlEwZ3NVMEZHVFN4TlFVVkJMRWxCUVVrc1MwRkJTMFVzUTBGQlRDeEhRVUZUU0N4TFFVRmlMRVZCUVcxQ08wRkJRM1JDTEdsQ1FVRkxSeXhEUVVGTUxFZEJRVk1zUTBGQlZEdEJRVU5JTEZOQlJrMHNUVUZGUVN4SlFVRkpMRXRCUVV0QkxFTkJRVXdzUjBGQlV5eERRVUZpTEVWQlFXVTdRVUZEYkVJc2FVSkJRVXRCTEVOQlFVd3NSMEZCVTBnc1MwRkJWRHRCUVVOSU8wRkJRMFFzWlVGQlR5eEpRVUZRTzBGQlEwZzdRVUZxUTJNc1EwRkJia0k3TzJ0Q1FXOURaVVlzVFNJc0ltWnBiR1VpT2lKd2JHRjVaWEl1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaXBjY2x4dUlDb2dRM0psWVhSbFpDQmllU0JoYm1SeVpTQnZiaUF5T0MxS2RXNHRNVGN1WEhKY2JpQXFMMXh5WEc1bWRXNWpkR2x2YmlCUWJHRjVaWElvWTNSNExDQjNhV1IwYUNBOUlETXdMQ0JvWldsbmFIUWdQU0F6TUN3Z1kyOXNiM0lnUFNBblozSmxaVzRuTENCNElEMGdOVEFzSUhrZ1BTQTFNQ2tnZTF4eVhHNGdJQ0FnZEdocGN5NWpkSGdnUFNCamRIZzdYSEpjYmlBZ0lDQjBhR2x6TG5kcFpIUm9JRDBnZDJsa2RHZzdYSEpjYmlBZ0lDQjBhR2x6TG1obGFXZG9kQ0E5SUdobGFXZG9kRHRjY2x4dUlDQWdJSFJvYVhNdVkyOXNiM0lnUFNCamIyeHZjanRjY2x4dUlDQWdJSFJvYVhNdWVDQTlJSGc3WEhKY2JpQWdJQ0IwYUdsekxua2dQU0I1TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YzNCbFpXUWdQU0F3TzF4eVhHNGdJQ0FnZEdocGN5NWhibWRzWlNBOUlEQTdYSEpjYmlBZ0lDQjBhR2x6TG0xdmRtVkJibWRzWlNBOUlEQTdYSEpjYm4xY2NseHVYSEpjYmxCc1lYbGxjaTV3Y205MGIzUjVjR1VnUFNCN1hISmNiaUFnSUNCMWNHUmhkR1VvWTNSNEtYdGNjbHh1SUNBZ0lDQWdJQ0JqZEhndWMyRjJaU2dwTzF4eVhHNGdJQ0FnSUNBZ0lHTjBlQzUwY21GdWMyeGhkR1VvZEdocGN5NTRMQ0IwYUdsekxua3BPMXh5WEc0Z0lDQWdJQ0FnSUdOMGVDNXliM1JoZEdVb2RHaHBjeTVoYm1kc1pTazdYSEpjYmlBZ0lDQWdJQ0FnWTNSNExtWnBiR3hUZEhsc1pTQTlJSFJvYVhNdVkyOXNiM0k3WEhKY2JpQWdJQ0FnSUNBZ1kzUjRMbVpwYkd4U1pXTjBLSFJvYVhNdWQybGtkR2dnTHlBdE1pd2dkR2hwY3k1b1pXbG5hSFFnTHlBdE1pd2dkR2hwY3k1M2FXUjBhQ3dnZEdocGN5NW9aV2xuYUhRcE8xeHlYRzRnSUNBZ0lDQWdJR04wZUM1eVpYTjBiM0psS0NrN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JpQWdJQ0I5TEZ4eVhHNGdJQ0FnYm1WM1VHOXpLRzl3ZEdsdmJpd2dkMmxrZEdnc0lHaGxhV2RvZENsN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1dGIzWmxRVzVuYkdVZ1BTQXdPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM0JsWldRZ1BTQXdPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQnZjSFJwYjI0dWJHVm1kQ0FtSmlBb2RHaHBjeTV0YjNabFFXNW5iR1VnUFNBdE5TazdYSEpjYmlBZ0lDQWdJQ0FnYjNCMGFXOXVMbkpwWjJoMElDWW1JQ2gwYUdsekxtMXZkbVZCYm1kc1pTQTlJRFVwTzF4eVhHNGdJQ0FnSUNBZ0lHOXdkR2x2Ymk1MWNDQW1KaUFvZEdocGN5NXpjR1ZsWkNBOUlEVXBPMXh5WEc0Z0lDQWdJQ0FnSUc5d2RHbHZiaTVrYjNkdUlDWW1JQ2gwYUdsekxuTndaV1ZrSUQwZ0xUVXBPMXh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1GdVoyeGxJQ3M5SUhSb2FYTXViVzkyWlVGdVoyeGxJQ29nVFdGMGFDNVFTU0F2SURFNE1EdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuZ2dLejBnZEdocGN5NXpjR1ZsWkNBcUlFMWhkR2d1YzJsdUtIUm9hWE11WVc1bmJHVXBPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVlU0F0UFNCMGFHbHpMbk53WldWa0lDb2dUV0YwYUM1amIzTW9kR2hwY3k1aGJtZHNaU2s3WEhKY2JseHlYRzRnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbmtnUGlCb1pXbG5hSFFwZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxua2dQU0F3TzF4eVhHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kR2hwY3k1NUlEd2dNQ2w3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWVTQTlJR2hsYVdkb2REdGNjbHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hSb2FYTXVlQ0ErSUhkcFpIUm9LWHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1NElEMGdNRHRjY2x4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11ZUNBOElEQXBlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG5nZ1BTQjNhV1IwYUR0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNN1hISmNiaUFnSUNCOVhISmNibjA3WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQlFiR0Y1WlhJN0lsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxwbGF5ZXIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcclxuICogQ3JlYXRlZCBieSBhbmRyZSBvbiAyOS1KdW4tMTcuXHJcbiAqL1xuXG5mdW5jdGlvbiBUaW1lcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAvL3RoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcblxuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgLy8gdGhpcy5ldmVudEJ1cy5vbigndGltZTpzdGFydCcsIHRoaXMuc3RhcnRUaW1lci5iaW5kKHRoaXMpKTtcbn1cblxuVGltZXIucHJvdG90eXBlID0ge1xuICAgIHN0YXJ0VGltZXI6IGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy50aW1lKys7XG4gICAgICAgICAgICBfdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IF90aGlzLnRpbWU7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRpbWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5ScGJXVnlMbXB6SWwwc0ltNWhiV1Z6SWpwYklsUnBiV1Z5SWl3aVpXeGxiV1Z1ZENJc0luUnBiV1VpTENKemRHRnlkRlJwYldWeUlpd2ljSEp2ZEc5MGVYQmxJaXdpYVc1dVpYSklWRTFNSWl3aWRHbHRaWElpTENKelpYUkpiblJsY25aaGJDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVRzN096dEJRVWxCTEZOQlFWTkJMRXRCUVZRc1EwRkJaVU1zVDBGQlppeEZRVUYzUWp0QlFVTndRaXhUUVVGTFFTeFBRVUZNTEVkQlFXVkJMRTlCUVdZN1FVRkRRVHM3UVVGRlFTeFRRVUZMUXl4SlFVRk1MRWRCUVZrc1EwRkJXanRCUVVOQkxGTkJRVXRETEZWQlFVdzdRVUZEUVR0QlFVTklPenRCUVVWRVNDeE5RVUZOU1N4VFFVRk9MRWRCUVd0Q08wRkJRMlJFTEdOQlJHTXNkMEpCUTBZN1FVRkJRVHM3UVVGRFVpeGhRVUZMUml4UFFVRk1MRU5CUVdGSkxGTkJRV0lzUjBGQmVVSXNSVUZCZWtJN08wRkJSVUVzWVVGQlMwTXNTMEZCVEN4SFFVRmhReXhaUVVGWkxGbEJRVTA3UVVGRE0wSXNhMEpCUVV0TUxFbEJRVXc3UVVGRFFTeHJRa0ZCUzBRc1QwRkJUQ3hEUVVGaFNTeFRRVUZpTEVkQlFYbENMRTFCUVV0SUxFbEJRVGxDTzBGQlEwZ3NVMEZJV1N4RlFVZFdMRWxCU0ZVc1EwRkJZanRCUVVsSU8wRkJVbUVzUTBGQmJFSTdPMnRDUVZkbFJpeExJaXdpWm1sc1pTSTZJblJwYldWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlvcVhISmNiaUFxSUVOeVpXRjBaV1FnWW5rZ1lXNWtjbVVnYjI0Z01qa3RTblZ1TFRFM0xseHlYRzRnS2k5Y2NseHVYSEpjYm1aMWJtTjBhVzl1SUZScGJXVnlLR1ZzWlcxbGJuUXBJSHRjY2x4dUlDQWdJSFJvYVhNdVpXeGxiV1Z1ZENBOUlHVnNaVzFsYm5RN1hISmNiaUFnSUNBdkwzUm9hWE11WlhabGJuUkNkWE1nUFNCbGRtVnVkRUoxY3p0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG5ScGJXVWdQU0F3TzF4eVhHNGdJQ0FnZEdocGN5NXpkR0Z5ZEZScGJXVnlLQ2s3WEhKY2JpQWdJQ0F2THlCMGFHbHpMbVYyWlc1MFFuVnpMbTl1S0NkMGFXMWxPbk4wWVhKMEp5d2dkR2hwY3k1emRHRnlkRlJwYldWeUxtSnBibVFvZEdocGN5a3BPMXh5WEc1OVhISmNibHh5WEc1VWFXMWxjaTV3Y205MGIzUjVjR1VnUFNCN1hISmNiaUFnSUNCemRHRnlkRlJwYldWeUtDbDdYSEpjYmlBZ0lDQWdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtbHVibVZ5U0ZSTlRDQTlJQ2NuTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuUnBiV1Z5SUQwZ2MyVjBTVzUwWlhKMllXd29LQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMblJwYldVckt6dGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVsYkdWdFpXNTBMbWx1Ym1WeVNGUk5UQ0E5SUhSb2FYTXVkR2x0WlR0Y2NseHVJQ0FnSUNBZ0lDQjlMQ0F4TURBd0tUdGNjbHh1SUNBZ0lIMWNjbHh1ZlR0Y2NseHVYSEpjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRlJwYldWeU95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcdGltZXIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2V2ZW50QnVzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudEJ1cycpO1xuXG52YXIgX2V2ZW50QnVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50QnVzKTtcblxudmFyIF9yb3V0ZXIgPSByZXF1aXJlKCcuL3V0aWxzL3JvdXRlcicpO1xuXG52YXIgX3JvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXIpO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi9yb3V0ZXMvaW5kZXgnKTtcblxudmFyIF9hYm91dCA9IHJlcXVpcmUoJy4vcm91dGVzL2Fib3V0Jyk7XG5cbnZhciBfZ2FtZSA9IHJlcXVpcmUoJy4vcm91dGVzL2dhbWUnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGV2ZW50QnVzID0gbmV3IF9ldmVudEJ1czIuZGVmYXVsdCgpO1xuXG52YXIgcm91dGVzID0gW19pbmRleC5pbmRleCwgX2Fib3V0LmFib3V0LCBfZ2FtZS5nYW1lXTtcbm5ldyBfcm91dGVyMi5kZWZhdWx0KHsgcm91dGVzOiByb3V0ZXMgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVpoYTJWZlptVTJaalpoTldNdWFuTWlYU3dpYm1GdFpYTWlPbHNpWlhabGJuUkNkWE1pTENKeWIzVjBaWE1pWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUTBFN096czdRVUZEUVRzN096dEJRVVZCT3p0QlFVTkJPenRCUVVOQk96czdPMEZCUlVFc1NVRkJUVUVzVjBGQlZ5eDNRa0ZCYWtJN08wRkJSVUVzU1VGQlRVTXNVMEZCVXl4M1EwRkJaanRCUVVOQkxIRkNRVUZYTEVWQlFVTkJMR05CUVVRc1JVRkJXQ0lzSW1acGJHVWlPaUptWVd0bFgyWmxObVkyWVRWakxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWEhKY2JtbHRjRzl5ZENCRmRtVnVkRUoxY3lCbWNtOXRJQ2N1TDNWMGFXeHpMMlYyWlc1MFFuVnpKenRjY2x4dWFXMXdiM0owSUZKdmRYUmxjaUJtY205dElDY3VMM1YwYVd4ekwzSnZkWFJsY2ljN1hISmNibHh5WEc1cGJYQnZjblFnZXlCcGJtUmxlQ0I5SUdaeWIyMGdKeTR2Y205MWRHVnpMMmx1WkdWNEp6dGNjbHh1YVcxd2IzSjBJSHNnWVdKdmRYUWdmU0JtY205dElDY3VMM0p2ZFhSbGN5OWhZbTkxZENjN1hISmNibWx0Y0c5eWRDQjdJR2RoYldVZ2ZTQm1jbTl0SUNjdUwzSnZkWFJsY3k5bllXMWxKenRjY2x4dVhISmNibU52Ym5OMElHVjJaVzUwUW5WeklEMGdibVYzSUVWMlpXNTBRblZ6S0NrN1hISmNibHh5WEc1amIyNXpkQ0J5YjNWMFpYTWdQU0JiYVc1a1pYZ3NJR0ZpYjNWMExDQm5ZVzFsWFR0Y2NseHVibVYzSUZKdmRYUmxjaWg3Y205MWRHVnpmU2s3SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2ZlNmY2YTVjLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbnZhciBhYm91dCA9IHtcbiAgICBuYW1lOiAnYWJvdXQnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiBtYXRjaCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0ID09PSAnYWJvdXQnO1xuICAgIH0sXG4gICAgb25CZWZvcmVFbnRlcjogZnVuY3Rpb24gb25CZWZvcmVFbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdvbkJlZm9yZUVudGVyIGFib3V0Jyk7XG4gICAgfSxcbiAgICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzxwPtCQ0L3QtNGA0LXQuTwvcD4gPGEgaHJlZj1cImh0dHBzOi8vdmsuY29tL3N0b2xwbmVyX2FuZHJleVwiIHRhcmdldD1cIl9ibGFua1wiPlZLPC9hPic7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICByZXR1cm4gZGl2LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuYWJvdXQgPSBhYm91dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltRmliM1YwTG1weklsMHNJbTVoYldWeklqcGJJbVJwZGlJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltRmliM1YwSWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpZEdWNGRDSXNJbTl1UW1WbWIzSmxSVzUwWlhJaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWIyNUZiblJsY2lJc0ltbHVibVZ5U0ZSTlRDSXNJbTl1VEdWaGRtVWlYU3dpYldGd2NHbHVaM01pT2lJN096czdPMEZCUVVFc1NVRkJTVUVzVFVGQlRVTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeFZRVUYyUWl4RFFVRldPMEZCUTBFc1NVRkJTVU1zVVVGQlVUdEJRVU5TUXl4VlFVRk5MRTlCUkVVN1FVRkZVa01zVjBGQlR5eGxRVUZEUXl4SlFVRkVPMEZCUVVFc1pVRkJWVUVzVTBGQlV5eFBRVUZ1UWp0QlFVRkJMRXRCUmtNN1FVRkhVa01zYlVKQlFXVTdRVUZCUVN4bFFVRk5ReXhSUVVGUlF5eEhRVUZTTEhWQ1FVRk9PMEZCUVVFc1MwRklVRHRCUVVsU1F5eGhRVUZUTEcxQ1FVRk5PMEZCUTFoV0xGbEJRVWxYTEZOQlFVb3NSMEZCWjBJc0swVkJRV2hDTzBGQlEwZ3NTMEZPVHp0QlFVOVNReXhoUVVGVE8wRkJRVUVzWlVGQlRWb3NTVUZCU1Zjc1UwRkJTaXhIUVVGblFpeEZRVUYwUWp0QlFVRkJPMEZCVUVRc1EwRkJXanM3VVVGVlUxSXNTeXhIUVVGQlFTeExJaXdpWm1sc1pTSTZJbUZpYjNWMExtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpZG1GeUlHUnBkaUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KMlJwZGk1dFlXbHVKeWs3WEhKY2JuWmhjaUJoWW05MWRDQTlJSHRjY2x4dUlDQWdJRzVoYldVNklDZGhZbTkxZENjc1hISmNiaUFnSUNCdFlYUmphRG9nS0hSbGVIUXBJRDArSUhSbGVIUWdQVDA5SUNkaFltOTFkQ2NzWEhKY2JpQWdJQ0J2YmtKbFptOXlaVVZ1ZEdWeU9pQW9LU0E5UGlCamIyNXpiMnhsTG14dlp5aGdiMjVDWldadmNtVkZiblJsY2lCaFltOTFkR0FwTEZ4eVhHNGdJQ0FnYjI1RmJuUmxjam9nS0NrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUdScGRpNXBibTVsY2toVVRVd2dQU0FuUEhBKzBKRFF2ZEMwMFlEUXRkQzVQQzl3UGlBOFlTQm9jbVZtUFZ3aWFIUjBjSE02THk5MmF5NWpiMjB2YzNSdmJIQnVaWEpmWVc1a2NtVjVYQ0lnZEdGeVoyVjBQVndpWDJKc1lXNXJYQ0krVmtzOEwyRStKenRjY2x4dUlDQWdJSDBzWEhKY2JpQWdJQ0J2Ymt4bFlYWmxPaUFvS1NBOVBpQmthWFl1YVc1dVpYSklWRTFNSUQwZ0p5ZGNjbHh1ZlR0Y2NseHVYSEpjYm1WNGNHOXlkQ0I3SUdGaWIzVjBJSDA3SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcYWJvdXQuanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2FtZSA9IHVuZGVmaW5lZDtcblxudmFyIF9nYW1lQXJlbmEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2dhbWVBcmVuYScpO1xuXG52YXIgX2dhbWVBcmVuYTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nYW1lQXJlbmEpO1xuXG52YXIgX3BsYXllciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGxheWVyJyk7XG5cbnZhciBfcGxheWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BsYXllcik7XG5cbnZhciBfdGltZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RpbWVyJyk7XG5cbnZhciBfdGltZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGltZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQVJFTkFfV0lEVEggPSA3MDA7XG52YXIgQVJFTkFfSEVJR0hUID0gNDAwO1xuXG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbnZhciBnYW1lID0ge1xuICAgIG5hbWU6ICdnYW1lJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dCA9PT0gJ2dhbWUnO1xuICAgIH0sXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9ICdcXG48aDI+R2FtZTwvaDI+IDxocj5cXG48YnV0dG9uIGNsYXNzPVwic3RhcnRcIj5TdGFydDwvYnV0dG9uPlxcblxcbic7XG4gICAgICAgIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uc3RhcnQnKTtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGl2LmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJzY29yZVwiPjwvc3Bhbj48ZGl2PjxjYW52YXMgc3R5bGU9XCJib3JkZXI6IHNvbGlkIDFweCByZWRcIj48L2NhbnZhcz48L2Rpdj4nO1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdmFyIHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3Bhbi5zY29yZScpO1xuICAgICAgICAgICAgdmFyIGdhbWVBcmVuYSA9IG5ldyBfZ2FtZUFyZW5hMi5kZWZhdWx0KGNhbnZhcywgQVJFTkFfV0lEVEgsIEFSRU5BX0hFSUdIVCwgX3BsYXllcjIuZGVmYXVsdCk7XG5cbiAgICAgICAgICAgIHZhciB0aW1lciA9IG5ldyBfdGltZXIyLmRlZmF1bHQoc2NvcmUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uTGVhdmU6IGZ1bmN0aW9uIG9uTGVhdmUoKSB7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxufTtcblxuZXhwb3J0cy5nYW1lID0gZ2FtZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltZGhiV1V1YW5NaVhTd2libUZ0WlhNaU9sc2lRVkpGVGtGZlYwbEVWRWdpTENKQlVrVk9RVjlJUlVsSFNGUWlMQ0prYVhZaUxDSmtiMk4xYldWdWRDSXNJbkYxWlhKNVUyVnNaV04wYjNJaUxDSm5ZVzFsSWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpZEdWNGRDSXNJbTl1Ulc1MFpYSWlMQ0pwYm01bGNraFVUVXdpTENKaWRHNGlMQ0poWkdSRmRtVnVkRXhwYzNSbGJtVnlJaXdpWTJGdWRtRnpJaXdpYzJOdmNtVWlMQ0puWVcxbFFYSmxibUVpTENKMGFXMWxjaUlzSW05dVRHVmhkbVVpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN1FVRkJRVHM3T3p0QlFVTkJPenM3TzBGQlJVRTdPenM3T3p0QlFVVkJMRWxCUVUxQkxHTkJRV01zUjBGQmNFSTdRVUZEUVN4SlFVRk5ReXhsUVVGbExFZEJRWEpDT3p0QlFVZEJMRWxCUVVsRExFMUJRVTFETEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVlVGQmRrSXNRMEZCVmp0QlFVTkJMRWxCUVVsRExFOUJRVTg3UVVGRFVFTXNWVUZCVFN4TlFVUkRPMEZCUlZCRExGZEJRVThzWlVGQlEwTXNTVUZCUkR0QlFVRkJMR1ZCUVZWQkxGTkJRVk1zVFVGQmJrSTdRVUZCUVN4TFFVWkJPMEZCUjFCRExHRkJRVk1zYlVKQlFVMDdRVUZEV0ZBc1dVRkJTVkVzVTBGQlNqdEJRVXRCTEZsQlFVbERMRTFCUVUxU0xGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1kwRkJka0lzUTBGQlZqdEJRVU5CVHl4WlFVRkpReXhuUWtGQlNpeERRVUZ4UWl4UFFVRnlRaXhGUVVFNFFpeFpRVUZOTzBGQlEyaERWaXhuUWtGQlNWRXNVMEZCU2p0QlFVTkJMR2RDUVVGSlJ5eFRRVUZUVml4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEZGQlFYWkNMRU5CUVdJN1FVRkRRU3huUWtGQlNWVXNVVUZCVVZnc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4WlFVRjJRaXhEUVVGYU8wRkJRMEVzWjBKQlFVbFhMRmxCUVZrc2QwSkJRV05HTEUxQlFXUXNSVUZCYzBKaUxGZEJRWFJDTEVWQlFXMURReXhaUVVGdVF5eHRRa0ZCYUVJN08wRkJSVUVzWjBKQlFVbGxMRkZCUVZFc2IwSkJRVlZHTEV0QlFWWXNRMEZCV2p0QlFVTklMRk5CVUVRN1FVRlJTQ3hMUVd4Q1RUdEJRVzFDVUVjc1lVRkJVenRCUVVGQkxHVkJRVTFtTEVsQlFVbFJMRk5CUVVvc1IwRkJaMElzUlVGQmRFSTdRVUZCUVR0QlFXNUNSaXhEUVVGWU96dFJRWE5DVTB3c1NTeEhRVUZCUVN4Sklpd2labWxzWlNJNkltZGhiV1V1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ1IyRnRaVUZ5Wlc1aElHWnliMjBnSnk0dUwyTnZiWEJ2Ym1WdWRITXZaMkZ0WlVGeVpXNWhKenRjY2x4dWFXMXdiM0owSUZCc1lYbGxjaUJtY205dElDQW5MaTR2WTI5dGNHOXVaVzUwY3k5d2JHRjVaWEluTzF4eVhHNWNjbHh1YVcxd2IzSjBJRlJwYldWeUlHWnliMjBnSnk0dUwyTnZiWEJ2Ym1WdWRITXZkR2x0WlhJbk8xeHlYRzVjY2x4dVkyOXVjM1FnUVZKRlRrRmZWMGxFVkVnZ1BTQTNNREE3WEhKY2JtTnZibk4wSUVGU1JVNUJYMGhGU1VkSVZDQTlJRFF3TUR0Y2NseHVYSEpjYmx4eVhHNTJZWElnWkdsMklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnblpHbDJMbTFoYVc0bktUdGNjbHh1ZG1GeUlHZGhiV1VnUFNCN1hISmNiaUFnSUNCdVlXMWxPaUFuWjJGdFpTY3NYSEpjYmlBZ0lDQnRZWFJqYURvZ0tIUmxlSFFwSUQwK0lIUmxlSFFnUFQwOUlDZG5ZVzFsSnl4Y2NseHVJQ0FnSUc5dVJXNTBaWEk2SUNncElEMCtJSHRjY2x4dUlDQWdJQ0FnSUNCa2FYWXVhVzV1WlhKSVZFMU1JRDBnWUZ4eVhHNDhhREkrUjJGdFpUd3ZhREkrSUR4b2NqNWNjbHh1UEdKMWRIUnZiaUJqYkdGemN6MWNJbk4wWVhKMFhDSStVM1JoY25ROEwySjFkSFJ2Ymo1Y2NseHVYSEpjYm1BN1hISmNiaUFnSUNBZ0lDQWdiR1YwSUdKMGJpQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0oySjFkSFJ2Ymk1emRHRnlkQ2NwTzF4eVhHNGdJQ0FnSUNBZ0lHSjBiaTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1pHbDJMbWx1Ym1WeVNGUk5UQ0FyUFNCZ1BITndZVzRnWTJ4aGMzTTlYQ0p6WTI5eVpWd2lQand2YzNCaGJqNDhaR2wyUGp4allXNTJZWE1nYzNSNWJHVTlYQ0ppYjNKa1pYSTZJSE52Ykdsa0lERndlQ0J5WldSY0lqNDhMMk5oYm5aaGN6NDhMMlJwZGo1Z08xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdZMkZ1ZG1GeklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnblkyRnVkbUZ6SnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpZMjl5WlNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSjNOd1lXNHVjMk52Y21VbktUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2JHVjBJR2RoYldWQmNtVnVZU0E5SUc1bGR5QkhZVzFsUVhKbGJtRW9ZMkZ1ZG1GekxDQkJVa1ZPUVY5WFNVUlVTQ3dnUVZKRlRrRmZTRVZKUjBoVUxDQlFiR0Y1WlhJcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdiR1YwSUhScGJXVnlJRDBnYm1WM0lGUnBiV1Z5S0hOamIzSmxLVHRjY2x4dUlDQWdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lIMHNYSEpjYmlBZ0lDQnZia3hsWVhabE9pQW9LU0E5UGlCa2FYWXVhVzV1WlhKSVZFMU1JRDBnSnlkY2NseHVmVHRjY2x4dVhISmNibVY0Y0c5eWRDQjdJR2RoYldVZ2ZUc2lYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxnYW1lLmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1haW4nKTtcbnZhciBpbmRleCA9IHtcbiAgICBuYW1lOiAnaW5kZXgnLFxuICAgIG1hdGNoOiAnJyxcbiAgICBvbkJlZm9yZUVudGVyOiBmdW5jdGlvbiBvbkJlZm9yZUVudGVyKCkge1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ29uQmVmb3JlRW50ZXIgaW5kZXgnKTtcbiAgICB9LFxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MID0gJ9Ct0YLQviDRgdCw0LzQsNGPINC60YDRg9GC0LDRjyDQuNCz0YDQsCDQsiDQnNC40YDQtS4g0J/RgNCw0LLQuNC7INCyINC90LXQuSDQvdC10YIsINC00LXQu9Cw0Lkg0YfRgtC+INGF0L7Rh9C10YjRjCBQLlMuINCvINGB0LDQvCDQvdC1INC30L3QsNGOICknO1xuICAgIH0sXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdvbkxlYXZlIGluZGV4Jyk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5pbmRleCA9IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltUnBkaUlzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW1sdVpHVjRJaXdpYm1GdFpTSXNJbTFoZEdOb0lpd2liMjVDWldadmNtVkZiblJsY2lJc0ltTnZibk52YkdVaUxDSnNiMmNpTENKdmJrVnVkR1Z5SWl3aWFXNXVaWEpJVkUxTUlpd2liMjVNWldGMlpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVN4SlFVRkpRU3hOUVVGTlF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xGVkJRWFpDTEVOQlFWWTdRVUZEUVN4SlFVRkpReXhSUVVGUk8wRkJRMUpETEZWQlFVMHNUMEZFUlR0QlFVVlNReXhYUVVGUExFVkJSa003UVVGSFVrTXNiVUpCUVdVN1FVRkJRU3hsUVVGTlF5eFJRVUZSUXl4SFFVRlNMSFZDUVVGT08wRkJRVUVzUzBGSVVEdEJRVWxTUXl4aFFVRlRPMEZCUVVFc1pVRkJUVlFzU1VGQlNWVXNVMEZCU2l4SFFVRm5RaXgxUmtGQmRFSTdRVUZCUVN4TFFVcEVPMEZCUzFKRExHRkJRVk03UVVGQlFTeGxRVUZOU2l4UlFVRlJReXhIUVVGU0xFTkJRVmtzWlVGQldpeERRVUZPTzBGQlFVRTdRVUZNUkN4RFFVRmFPenRSUVZGVFRDeExMRWRCUVVGQkxFc2lMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUoyWVhJZ1pHbDJJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25aR2wyTG0xaGFXNG5LVHRjY2x4dWRtRnlJR2x1WkdWNElEMGdlMXh5WEc0Z0lDQWdibUZ0WlRvZ0oybHVaR1Y0Snl4Y2NseHVJQ0FnSUcxaGRHTm9PaUFuSnl4Y2NseHVJQ0FnSUc5dVFtVm1iM0psUlc1MFpYSTZJQ2dwSUQwK0lHTnZibk52YkdVdWJHOW5LR0J2YmtKbFptOXlaVVZ1ZEdWeUlHbHVaR1Y0WUNrc1hISmNiaUFnSUNCdmJrVnVkR1Z5T2lBb0tTQTlQaUJrYVhZdWFXNXVaWEpJVkUxTUlEMGdKOUN0MFlMUXZpRFJnZEN3MEx6UXNOR1BJTkM2MFlEUmc5R0MwTERSanlEUXVOQ3owWURRc0NEUXNpRFFuTkM0MFlEUXRTNGcwSi9SZ05DdzBMTFF1TkM3SU5DeUlOQzkwTFhRdVNEUXZkQzEwWUlzSU5DMDBMWFF1OUN3MExrZzBZZlJndEMrSU5HRjBMN1JoOUMxMFlqUmpDQlFMbE11SU5DdklOR0IwTERRdkNEUXZkQzFJTkMzMEwzUXNOR09JQ2tuTEZ4eVhHNGdJQ0FnYjI1TVpXRjJaVG9nS0NrZ1BUNGdZMjl1YzI5c1pTNXNiMmNvSjI5dVRHVmhkbVVnYVc1a1pYZ25LVnh5WEc1OU8xeHlYRzVjY2x4dVpYaHdiM0owSUhzZ2FXNWtaWGdnZlRzaVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcm91dGVzXFxcXGluZGV4LmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbi8qXHJcbiBkMS4g0KDQtdCw0LvQuNC30L7QstCw0YLRjCBFdmVudEJ1c1xyXG5cclxuINGB0L7Qt9C00LDRgtGMINC60L7QvdGB0YLRgNGD0LrRgtC+0YBcclxuINGB0L7Qt9C00LDRgtGMINC80LXRgtC+0LQgb25cclxuIGNv0LfQtNCw0YLRjCDQvNC10YLQvtC0IG9mZlxyXG4g0YHQvtC30LTQsNGC0Ywg0LzQtdGC0L7QtCB0cmlnZ2VyXHJcbiDRgdC+0LfQtNCw0YLRjCDQvNC10YLQvtC0IG9uY2VcclxuINCy0YvQt9Cy0LDRgtGMINC60L7QvdGB0YLRgNGD0LrRgtC+0YBcclxuICovXG5cbmZ1bmN0aW9uIEV2ZW50QnVzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG59XG5cbkV2ZW50QnVzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldiwgaGFuZGxlcikge1xuICAgIHRoaXMubGlzdGVuZXJzW2V2XSA9IHRoaXMubGlzdGVuZXJzW2V2XSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1tldl0ucHVzaChoYW5kbGVyKTtcbn07XG5FdmVudEJ1cy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldikge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICAodGhpcy5saXN0ZW5lcnNbZXZdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0pO1xufTtcbkV2ZW50QnVzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXYsIGhhbmRsZXIpIHtcbiAgICAodGhpcy5saXN0ZW5lcnNbZXZdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgIGlmIChpdGVtID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldl0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfSwgdGhpcyk7XG59O1xuRXZlbnRCdXMucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXYsIGhhbmRsZXIpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5vbihldiwgZnVuY3Rpb24gb2ZmTWV0aG9kKCkge1xuICAgICAgICBoYW5kbGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoYXQub2ZmKGV2LCBvZmZNZXRob2QpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRCdXM7XG5cbi8vIHZhciBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cygpO1xuLy8gdmFyIGhhbmRsZXIgPSAoYSwgYiwgYykgPT4gY29uc29sZS5sb2coJ0hhbmRsZXInLCBhLCBiLCBjKTtcbi8vIGV2ZW50QnVzLm9uY2UoJ29uZScsIGhhbmRsZXIpO1xuLy8gZXZlbnRCdXMudHJpZ2dlcignb25lJywgMSwyLDMpO1xuLy8gLy8gSGFuZGxlciAxIDIgM1xuLy8gZXZlbnRCdXMudHJpZ2dlcignb25lJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVYyWlc1MFFuVnpMbXB6SWwwc0ltNWhiV1Z6SWpwYklrVjJaVzUwUW5Weklpd2liR2x6ZEdWdVpYSnpJaXdpY0hKdmRHOTBlWEJsSWl3aWIyNGlMQ0psZGlJc0ltaGhibVJzWlhJaUxDSndkWE5vSWl3aWRISnBaMmRsY2lJc0ltRnlaM01pTENKbWIzSkZZV05vSWl3aVlYQndiSGtpTENKdlptWWlMQ0pwZEdWdElpd2lhU0lzSW5Od2JHbGpaU0lzSW05dVkyVWlMQ0owYUdGMElpd2liMlptVFdWMGFHOWtJaXdpWVhKbmRXMWxiblJ6SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3p0QlFVRkJPenM3T3pzN096czdPenRCUVZkQkxGTkJRVk5CTEZGQlFWUXNSMEZCYjBJN1FVRkRhRUlzVTBGQlMwTXNVMEZCVEN4SFFVRnBRaXhGUVVGcVFqdEJRVU5JT3p0QlFVVkVSQ3hUUVVGVFJTeFRRVUZVTEVOQlFXMUNReXhGUVVGdVFpeEhRVUYzUWl4VlFVRlZReXhGUVVGV0xFVkJRV05ETEU5QlFXUXNSVUZCZFVJN1FVRkRNME1zVTBGQlMwb3NVMEZCVEN4RFFVRmxSeXhGUVVGbUxFbEJRWEZDTEV0QlFVdElMRk5CUVV3c1EwRkJaVWNzUlVGQlppeExRVUZ6UWl4RlFVRXpRenRCUVVOQkxGTkJRVXRJTEZOQlFVd3NRMEZCWlVjc1JVRkJaaXhGUVVGdFFrVXNTVUZCYmtJc1EwRkJkMEpFTEU5QlFYaENPMEZCUTBnc1EwRklSRHRCUVVsQlRDeFRRVUZUUlN4VFFVRlVMRU5CUVcxQ1N5eFBRVUZ1UWl4SFFVRTJRaXhWUVVGVlNDeEZRVUZXTEVWQlFYVkNPMEZCUVVFc2MwTkJRVTVKTEVsQlFVMDdRVUZCVGtFc1dVRkJUVHRCUVVGQk96dEJRVU5vUkN4TFFVRkRMRXRCUVV0UUxGTkJRVXdzUTBGQlpVY3NSVUZCWml4TFFVRnpRaXhGUVVGMlFpeEZRVUV5UWtzc1QwRkJNMElzUTBGQmJVTXNWVUZCUTBvc1QwRkJSRHRCUVVGQkxHVkJRV0ZCTEZGQlFWRkxMRXRCUVZJc1EwRkJZeXhKUVVGa0xFVkJRVzlDUml4SlFVRndRaXhEUVVGaU8wRkJRVUVzUzBGQmJrTTdRVUZEU0N4RFFVWkVPMEZCUjBGU0xGTkJRVk5GTEZOQlFWUXNRMEZCYlVKVExFZEJRVzVDTEVkQlFYbENMRlZCUVZWUUxFVkJRVllzUlVGQlkwTXNUMEZCWkN4RlFVRjFRanRCUVVNMVF5eExRVUZETEV0QlFVdEtMRk5CUVV3c1EwRkJaVWNzUlVGQlppeExRVUZ6UWl4RlFVRjJRaXhGUVVFeVFrc3NUMEZCTTBJc1EwRkJiVU1zVlVGQlZVY3NTVUZCVml4RlFVRm5Ra01zUTBGQmFFSXNSVUZCYlVJN1FVRkRiRVFzV1VGQlNVUXNVMEZCVTFBc1QwRkJZaXhGUVVGelFqdEJRVU5zUWl4cFFrRkJTMG9zVTBGQlRDeERRVUZsUnl4RlFVRm1MRVZCUVcxQ1ZTeE5RVUZ1UWl4RFFVRXdRa1FzUTBGQk1VSXNSVUZCTmtJc1EwRkJOMEk3UVVGRFNEdEJRVU5LTEV0QlNrUXNSVUZKUnl4SlFVcElPMEZCUzBnc1EwRk9SRHRCUVU5QllpeFRRVUZUUlN4VFFVRlVMRU5CUVcxQ1lTeEpRVUZ1UWl4SFFVRXdRaXhWUVVGVldDeEZRVUZXTEVWQlFXTkRMRTlCUVdRc1JVRkJkVUk3UVVGRE4wTXNVVUZCU1Zjc1QwRkJUeXhKUVVGWU8wRkJRMEVzVTBGQlMySXNSVUZCVEN4RFFVRlJReXhGUVVGU0xFVkJRVmtzVTBGQlUyRXNVMEZCVkN4SFFVRnhRanRCUVVNM1Fsb3NaMEpCUVZGTExFdEJRVklzUTBGQll5eEpRVUZrTEVWQlFXOUNVU3hUUVVGd1FqdEJRVU5CUml4aFFVRkxUQ3hIUVVGTUxFTkJRVk5RTEVWQlFWUXNSVUZCWVdFc1UwRkJZanRCUVVOSUxFdEJTRVE3UVVGSlNDeERRVTVFT3p0clFrRlJaV3BDTEZFN08wRkJSV1k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbVYyWlc1MFFuVnpMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5cGNjbHh1SUdReExpRFFvTkMxMExEUXU5QzQwTGZRdnRDeTBMRFJndEdNSUVWMlpXNTBRblZ6WEhKY2JseHlYRzRnMFlIUXZ0QzMwTFRRc05HQzBZd2cwTHJRdnRDOTBZSFJndEdBMFlQUXV0R0MwTDdSZ0Z4eVhHNGcwWUhRdnRDMzBMVFFzTkdDMFl3ZzBMelF0ZEdDMEw3UXRDQnZibHh5WEc0Z1kyL1F0OUMwMExEUmd0R01JTkM4MExYUmd0QyswTFFnYjJabVhISmNiaURSZ2RDKzBMZlF0TkN3MFlMUmpDRFF2TkMxMFlMUXZ0QzBJSFJ5YVdkblpYSmNjbHh1SU5HQjBMN1F0OUMwMExEUmd0R01JTkM4MExYUmd0QyswTFFnYjI1alpWeHlYRzRnMExMUmk5QzMwTExRc05HQzBZd2cwTHJRdnRDOTBZSFJndEdBMFlQUXV0R0MwTDdSZ0Z4eVhHNGdLaTljY2x4dVhISmNibVoxYm1OMGFXOXVJRVYyWlc1MFFuVnpLQ2tnZTF4eVhHNGdJQ0FnZEdocGN5NXNhWE4wWlc1bGNuTWdQU0I3ZlR0Y2NseHVmVnh5WEc1Y2NseHVSWFpsYm5SQ2RYTXVjSEp2ZEc5MGVYQmxMbTl1SUQwZ1puVnVZM1JwYjI0Z0tHVjJMQ0JvWVc1a2JHVnlLU0I3WEhKY2JpQWdJQ0IwYUdsekxteHBjM1JsYm1WeWMxdGxkbDBnUFNCMGFHbHpMbXhwYzNSbGJtVnljMXRsZGwwZ2ZId2dXMTA3WEhKY2JpQWdJQ0IwYUdsekxteHBjM1JsYm1WeWMxdGxkbDB1Y0hWemFDaG9ZVzVrYkdWeUtUdGNjbHh1ZlR0Y2NseHVSWFpsYm5SQ2RYTXVjSEp2ZEc5MGVYQmxMblJ5YVdkblpYSWdQU0JtZFc1amRHbHZiaUFvWlhZc0lDNHVMbUZ5WjNNcElIdGNjbHh1SUNBZ0lDaDBhR2x6TG14cGMzUmxibVZ5YzF0bGRsMGdmSHdnVzEwcExtWnZja1ZoWTJnb0tHaGhibVJzWlhJcElEMCtJR2hoYm1Sc1pYSXVZWEJ3Ykhrb2JuVnNiQ3dnWVhKbmN5a3BPMXh5WEc1OU8xeHlYRzVGZG1WdWRFSjFjeTV3Y205MGIzUjVjR1V1YjJabUlEMGdablZ1WTNScGIyNGdLR1YyTENCb1lXNWtiR1Z5S1NCN1hISmNiaUFnSUNBb2RHaHBjeTVzYVhOMFpXNWxjbk5iWlhaZElIeDhJRnRkS1M1bWIzSkZZV05vS0daMWJtTjBhVzl1SUNocGRHVnRMQ0JwS1NCN1hISmNiaUFnSUNBZ0lDQWdhV1lnS0dsMFpXMGdQVDA5SUdoaGJtUnNaWElwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXNhWE4wWlc1bGNuTmJaWFpkTG5Od2JHbGpaU2hwTENBeEtUdGNjbHh1SUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0I5TENCMGFHbHpLVHRjY2x4dWZUdGNjbHh1UlhabGJuUkNkWE11Y0hKdmRHOTBlWEJsTG05dVkyVWdQU0JtZFc1amRHbHZiaUFvWlhZc0lHaGhibVJzWlhJcElIdGNjbHh1SUNBZ0lIWmhjaUIwYUdGMElEMGdkR2hwY3p0Y2NseHVJQ0FnSUhSb2FYTXViMjRvWlhZc0lHWjFibU4wYVc5dUlHOW1aazFsZEdodlpDZ3BJSHRjY2x4dUlDQWdJQ0FnSUNCb1lXNWtiR1Z5TG1Gd2NHeDVLRzUxYkd3c0lHRnlaM1Z0Wlc1MGN5azdYSEpjYmlBZ0lDQWdJQ0FnZEdoaGRDNXZabVlvWlhZc0lHOW1aazFsZEdodlpDazdYSEpjYmlBZ0lDQjlLVHRjY2x4dWZUdGNjbHh1WEhKY2JtVjRjRzl5ZENCa1pXWmhkV3gwSUVWMlpXNTBRblZ6TzF4eVhHNWNjbHh1THk4Z2RtRnlJR1YyWlc1MFFuVnpJRDBnYm1WM0lFVjJaVzUwUW5WektDazdYSEpjYmk4dklIWmhjaUJvWVc1a2JHVnlJRDBnS0dFc0lHSXNJR01wSUQwK0lHTnZibk52YkdVdWJHOW5LQ2RJWVc1a2JHVnlKeXdnWVN3Z1lpd2dZeWs3WEhKY2JpOHZJR1YyWlc1MFFuVnpMbTl1WTJVb0oyOXVaU2NzSUdoaGJtUnNaWElwTzF4eVhHNHZMeUJsZG1WdWRFSjFjeTUwY21sbloyVnlLQ2R2Ym1VbkxDQXhMRElzTXlrN1hISmNiaTh2SUM4dklFaGhibVJzWlhJZ01TQXlJRE5jY2x4dUx5OGdaWFpsYm5SQ2RYTXVkSEpwWjJkbGNpZ25iMjVsSnlrN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi91dGlsc1xcXFxldmVudEJ1cy5qc1wiLFwiL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKlxyXG4g0KDQtdCw0LvQuNC30L7QstCw0YLRjCBSb3V0ZXJcclxuXHJcbiDRgdC+0LfQtNCw0YLRjCDQutC+0L3RgdGC0YDRg9C60YLQvtGAXHJcbiDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQuNC30LzQtdC90LXQvdC40Y8g0LDQtNGA0LXRgdCwXHJcbiDQv9GA0Lgg0YHQvtC30LTQsNC90LjQuCDQstGL0L/Qu9C90LjQuyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQuNC30LzQtdC90LXQvdC40Y8g0LDQtNGA0LXRgdCwXHJcbiDQvdCw0YPRh9C40YLRjNGB0Y8g0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YDQvtGD0YIg0L/QviDQsNC00YDQtdGB0YMgKCDQutCw0LrQvtC5INGA0L7Rg9GCINC90YPQttC90L4g0LDQutGC0LjQstC40YDQvtCy0LDRgtGMIClcclxuINC90LDRhdC+0LTQuNGC0Ywv0YHQvtGF0YDQsNC90Y/RgtGMINC/0L7RgdC70LXQtNC90LjQuSDQsNC60YLQuNCy0L3Ri9C5INGA0L7Rg9GCXHJcbiDQstGL0LfQstCw0YLRjCBvbkxlYXZlXHJcbiDQstGL0LfQstCw0YLRjCBvbkJlZm9yZUVudGVyXHJcbiDQstGL0LfQstCw0YLRjCBvbkVudGVyXHJcbiDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0L7RgtGB0YPRgtGB0YLQstC40LUg0YTRg9C60L3RhtC40Lkt0YXRg9C60L7QslxyXG4g0L/QvtC00LTQtdGA0LbQuNCy0LDRgtGMIHByb21pc2Ug0LjQtyBvbkJlZm9yZUVudGVyXHJcbiDQv9C+0LTQtNC10YDQttC40LLQsNGC0YwgcHJvbWlzZSDQuNC3IG9uTGVhdmVcclxuICovXG52YXIgUm91dGVyID0gZnVuY3Rpb24gUm91dGVyKG9wdGlvbnMsIGV2ZW50QnVzKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSBvcHRpb25zLnJvdXRlcztcbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4gICAgdGhpcy5pbml0KCk7XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVVcmwoZXYub2xkVVJMLnNwbGl0KCcjJylbMV0gfHwgJycsIGV2Lm5ld1VSTC5zcGxpdCgnIycpWzFdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaGFuZGxlVXJsKHVuZGVmaW5lZCwgd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xuICAgIH0sXG4gICAgZ2V0UGFyYW06IGZ1bmN0aW9uIGdldFBhcmFtKG5ld1JvdXRlLCBjdXJyZW50Um91dGUpIHtcbiAgICAgICAgdmFyIHBhcmFtID0gbmV3Um91dGUubWF0Y2goY3VycmVudFJvdXRlLm1hdGNoKSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHBhcmFtWzFdO1xuICAgIH0sXG4gICAgaGFuZGxlVXJsOiBmdW5jdGlvbiBoYW5kbGVVcmwob2xkUm91dGUsIG5ld1JvdXRlKSB7XG4gICAgICAgIHZhciBjdXJyZW50Um91dGUgPSB0aGlzLnJvdXRlcy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JvdXRlID09PSBpdGVtLm1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm1hdGNoKG5ld1JvdXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5tYXRjaCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdSb3V0ZS5tYXRjaChpdGVtLm1hdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvbGRSb3V0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNSb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvbGRSb3V0ZSA9PT0gaXRlbS5tYXRjaDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm1hdGNoKG9sZFJvdXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZFJvdXRlLm1hdGNoKGl0ZW0ubWF0Y2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50UGFyYW0gPSB0aGlzLmdldFBhcmFtKG5ld1JvdXRlLCBjdXJyZW50Um91dGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnLS0tPiByb3V0ZXIgb2xkVVJMOiAnICsgb2xkUm91dGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnLS0tPiByb3V0ZXIgZmluZE5ld0FjdGl2ZVJvdXRlOiAnICsgbmV3Um91dGUgKyAnIC0tICcgKyAoY3VycmVudFJvdXRlIHx8IHt9KS5uYW1lKTtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNSb3V0ZSAmJiBwcmV2aW91c1JvdXRlLm9uTGVhdmUgJiYgcHJldmlvdXNSb3V0ZS5vbkxlYXZlKG9sZFJvdXRlLnNwbGl0KCc9JylbMV0pO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIoY3VycmVudFBhcmFtKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFJvdXRlICYmIGN1cnJlbnRSb3V0ZS5vbkVudGVyICYmIGN1cnJlbnRSb3V0ZS5vbkVudGVyKGN1cnJlbnRQYXJhbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlcjtcblxuLy8gdmFyIHJvdXRlciA9IG5ldyBSb3V0ZXIoe1xuLy8gICAgIHJvdXRlczogW3tcbi8vICAgICAgICAgbmFtZTogJ2luZGV4Jyxcbi8vICAgICAgICAgbWF0Y2g6ICcnLFxuLy8gICAgICAgICBvbkJlZm9yZUVudGVyOiAoKSA9PiBjb25zb2xlLmxvZygnb25CZWZvcmVFbnRlciBpbmRleCcpLFxuLy8gICAgICAgICBvbkVudGVyOiAoKSA9PiBjb25zb2xlLmxvZygnb25FbnRlciBpbmRleCcpLFxuLy8gICAgICAgICBvbkxlYXZlOiAoKSA9PiBjb25zb2xlLmxvZygnb25MZWF2ZSBpbmRleCcpXG4vLyAgICAgfSwge1xuLy8gICAgICAgICBuYW1lOiAnY2l0eScsXG4vLyAgICAgICAgIG1hdGNoOiAvY2l0eT0oLispLyxcbi8vICAgICAgICAgb25CZWZvcmVFbnRlcjogKGNpdHkpID0+IGNvbnNvbGUubG9nKGBvbkJlZm9yZUVudGVyIGNpdHk6JHtjaXR5fWApLFxuLy8gICAgICAgICBvbkVudGVyOiAoY2l0eSkgPT4gY29uc29sZS5sb2coYG9uRW50ZXIgY2l0eToke2NpdHl9YCksXG4vLyAgICAgICAgIG9uTGVhdmU6IChjaXR5KSA9PiBjb25zb2xlLmxvZyhgb25MZWF2ZSBjaXR5OiR7Y2l0eX1gKVxuLy8gICAgIH0sIHtcbi8vICAgICAgICAgbmFtZTogJ2Fib3V0Jyxcbi8vICAgICAgICAgbWF0Y2g6ICh0ZXh0KSA9PiB0ZXh0ID09PSAnYWJvdXQnLFxuLy8gICAgICAgICBvbkJlZm9yZUVudGVyOiAoKSA9PiBjb25zb2xlLmxvZyhgb25CZWZvcmVFbnRlciBhYm91dGApLFxuLy8gICAgICAgICBvbkVudGVyOiAoKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhgb25FbnRlciBhYm91dGApO1xuLy8gICAgICAgICAgICAgLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpLmlubmVySFRNTCA9ICc8aDE+QWJvdXQ8L2gxPic7XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIG9uTGVhdmU6ICgpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvbkxlYXZlIGFib3V0YCk7XG4vLyAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpLmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgICB9XG4vLyAgICAgfV1cbi8vIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5KdmRYUmxjaTVxY3lKZExDSnVZVzFsY3lJNld5SlNiM1YwWlhJaUxDSnZjSFJwYjI1eklpd2laWFpsYm5SQ2RYTWlMQ0p5YjNWMFpYTWlMQ0pwYm1sMElpd2ljSEp2ZEc5MGVYQmxJaXdpZDJsdVpHOTNJaXdpWVdSa1JYWmxiblJNYVhOMFpXNWxjaUlzSW1WMklpd2lhR0Z1Wkd4bFZYSnNJaXdpYjJ4a1ZWSk1JaXdpYzNCc2FYUWlMQ0p1WlhkVlVrd2lMQ0oxYm1SbFptbHVaV1FpTENKc2IyTmhkR2x2YmlJc0ltaGhjMmdpTENKemJHbGpaU0lzSW1kbGRGQmhjbUZ0SWl3aWJtVjNVbTkxZEdVaUxDSmpkWEp5Wlc1MFVtOTFkR1VpTENKd1lYSmhiU0lzSW0xaGRHTm9JaXdpYjJ4a1VtOTFkR1VpTENKbWFXNWtJaXdpYVhSbGJTSXNJbEpsWjBWNGNDSXNJbkJ5WlhacGIzVnpVbTkxZEdVaUxDSmpkWEp5Wlc1MFVHRnlZVzBpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpYm1GdFpTSXNJbEJ5YjIxcGMyVWlMQ0p5WlhOdmJIWmxJaXdpZEdobGJpSXNJbTl1VEdWaGRtVWlMQ0p2YmtKbFptOXlaVVZ1ZEdWeUlpd2liMjVGYm5SbGNpSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZCUVRzN096czdPenM3T3pzN096czdPMEZCWlVFc1NVRkJTVUVzVTBGQlV5eFRRVUZVUVN4TlFVRlRMRU5CUVZWRExFOUJRVllzUlVGQmJVSkRMRkZCUVc1Q0xFVkJRVFpDTzBGQlEzUkRMRk5CUVV0RExFMUJRVXdzUjBGQlkwWXNVVUZCVVVVc1RVRkJkRUk3UVVGRFFTeFRRVUZMUkN4UlFVRk1MRWRCUVdkQ1FTeFJRVUZvUWp0QlFVTkJMRk5CUVV0RkxFbEJRVXc3UVVGRFNDeERRVXBFT3p0QlFVMUJTaXhQUVVGUFN5eFRRVUZRTEVkQlFXMUNPMEZCUTJaRUxGVkJRVTBzWjBKQlFWazdRVUZCUVRzN1FVRkRaRVVzWlVGQlQwTXNaMEpCUVZBc1EwRkJkMElzV1VGQmVFSXNSVUZCYzBNc1ZVRkJRME1zUlVGQlJEdEJRVUZCTEcxQ1FVRlJMRTFCUVV0RExGTkJRVXdzUTBGQlpVUXNSMEZCUjBVc1RVRkJTQ3hEUVVGVlF5eExRVUZXTEVOQlFXZENMRWRCUVdoQ0xFVkJRWEZDTEVOQlFYSkNMRXRCUVRKQ0xFVkJRVEZETEVWQlFUaERTQ3hIUVVGSFNTeE5RVUZJTEVOQlFWVkVMRXRCUVZZc1EwRkJaMElzUjBGQmFFSXNSVUZCY1VJc1EwRkJja0lzUTBGQk9VTXNRMEZCVWp0QlFVRkJMRk5CUVhSRE8wRkJRMEVzWVVGQlMwWXNVMEZCVEN4RFFVRmxTU3hUUVVGbUxFVkJRVEJDVUN4UFFVRlBVU3hSUVVGUUxFTkJRV2RDUXl4SlFVRm9RaXhEUVVGeFFrTXNTMEZCY2tJc1EwRkJNa0lzUTBGQk0wSXNRMEZCTVVJN1FVRkRTQ3hMUVVwak8wRkJTMlpETEdOQlFWVXNhMEpCUVZWRExGRkJRVllzUlVGQmIwSkRMRmxCUVhCQ0xFVkJRV3RETzBGQlEzaERMRmxCUVVsRExGRkJRVkZHTEZOQlFWTkhMRXRCUVZRc1EwRkJaVVlzWVVGQllVVXNTMEZCTlVJc1MwRkJjME1zUlVGQmJFUTdRVUZEUVN4bFFVRlBSQ3hOUVVGTkxFTkJRVTRzUTBGQlVEdEJRVU5JTEV0QlVtTTdRVUZUWmxnc1pVRkJWeXh0UWtGQlZXRXNVVUZCVml4RlFVRnZRa29zVVVGQmNFSXNSVUZCT0VJN1FVRkRja01zV1VGQlNVTXNaVUZCWlN4TFFVRkxhRUlzVFVGQlRDeERRVUZaYjBJc1NVRkJXaXhEUVVGcFFpeFZRVUZEUXl4SlFVRkVMRVZCUVZVN1FVRkRNVU1zWjBKQlFVa3NUMEZCVDBFc1MwRkJTMGdzUzBGQldpeExRVUZ6UWl4UlFVRXhRaXhGUVVGdlF6dEJRVU5vUXl4MVFrRkJUMGdzWVVGQllVMHNTMEZCUzBnc1MwRkJla0k3UVVGRFNDeGhRVVpFTEUxQlJVOHNTVUZCU1N4UFFVRlBSeXhMUVVGTFNDeExRVUZhTEV0QlFYTkNMRlZCUVRGQ0xFVkJRWE5ETzBGQlEzcERMSFZDUVVGUFJ5eExRVUZMU0N4TFFVRk1MRU5CUVZkSUxGRkJRVmdzUTBGQlVEdEJRVU5JTEdGQlJrMHNUVUZGUVN4SlFVRkpUU3hMUVVGTFNDeExRVUZNTEZsQlFYTkNTU3hOUVVFeFFpeEZRVUZyUXp0QlFVTnlReXgxUWtGQlQxQXNVMEZCVTBjc1MwRkJWQ3hEUVVGbFJ5eExRVUZMU0N4TFFVRndRaXhEUVVGUU8wRkJRMGc3UVVGRFNpeFRRVkpyUWl4RFFVRnVRanRCUVZOQkxGbEJRVWxETEdGQlFXRlVMRk5CUVdwQ0xFVkJRVFJDTzBGQlEzaENMR2RDUVVGSllTeG5Ra0ZCWjBJc1MwRkJTM1pDTEUxQlFVd3NRMEZCV1c5Q0xFbEJRVm9zUTBGQmFVSXNWVUZCUTBNc1NVRkJSQ3hGUVVGVk8wRkJRek5ETEc5Q1FVRkpMRTlCUVU5QkxFdEJRVXRJTEV0QlFWb3NTMEZCYzBJc1VVRkJNVUlzUlVGQmIwTTdRVUZEYUVNc01rSkJRVTlETEdGQlFXRkZMRXRCUVV0SUxFdEJRWHBDTzBGQlEwZ3NhVUpCUmtRc1RVRkZUeXhKUVVGSkxFOUJRVTlITEV0QlFVdElMRXRCUVZvc1MwRkJjMElzVlVGQk1VSXNSVUZCYzBNN1FVRkRla01zTWtKQlFVOUhMRXRCUVV0SUxFdEJRVXdzUTBGQlYwTXNVVUZCV0N4RFFVRlFPMEZCUTBnc2FVSkJSazBzVFVGRlFTeEpRVUZKUlN4TFFVRkxTQ3hMUVVGTUxGbEJRWE5DU1N4TlFVRXhRaXhGUVVGclF6dEJRVU55UXl3eVFrRkJUMGdzVTBGQlUwUXNTMEZCVkN4RFFVRmxSeXhMUVVGTFNDeExRVUZ3UWl4RFFVRlFPMEZCUTBnN1FVRkRTaXhoUVZKdFFpeERRVUZ3UWp0QlFWTklPMEZCUTBRc1dVRkJTVTBzWlVGQlpTeExRVUZMVml4UlFVRk1MRU5CUVdORExGRkJRV1FzUlVGQmQwSkRMRmxCUVhoQ0xFTkJRVzVDTzBGQlEwRlRMR2RDUVVGUlF5eEhRVUZTTERCQ1FVRnRRMUFzVVVGQmJrTTdRVUZEUVUwc1owSkJRVkZETEVkQlFWSXNjME5CUVN0RFdDeFJRVUV2UXl4WlFVRTRSQ3hEUVVGRFF5eG5Ra0ZCWjBJc1JVRkJha0lzUlVGQmNVSlhMRWxCUVc1R08wRkJRMEZETEdkQ1FVRlJReXhQUVVGU0xFZEJRMHRETEVsQlJFd3NRMEZEVlR0QlFVRkJMRzFDUVVGTlVDeHBRa0ZCYVVKQkxHTkJRV05STEU5QlFTOUNMRWxCUVRCRFVpeGpRVUZqVVN4UFFVRmtMRU5CUVhOQ1dpeFRRVUZUV0N4TFFVRlVMRU5CUVdVc1IwRkJaaXhGUVVGdlFpeERRVUZ3UWl4RFFVRjBRaXhEUVVGb1JEdEJRVUZCTEZOQlJGWXNSVUZGUzNOQ0xFbEJSa3dzUTBGRlZUdEJRVUZCTEcxQ1FVRk5aQ3huUWtGQlowSkJMR0ZCUVdGblFpeGhRVUUzUWl4SlFVRTRRMmhDTEdGQlFXRm5RaXhoUVVGaUxFTkJRVEpDVWl4WlFVRXpRaXhEUVVGd1JEdEJRVUZCTEZOQlJsWXNSVUZIUzAwc1NVRklUQ3hEUVVkVk8wRkJRVUVzYlVKQlFVMWtMR2RDUVVGblFrRXNZVUZCWVdsQ0xFOUJRVGRDTEVsQlFYZERha0lzWVVGQllXbENMRTlCUVdJc1EwRkJjVUpVTEZsQlFYSkNMRU5CUVRsRE8wRkJRVUVzVTBGSVZqdEJRVWxJTzBGQmNrTmpMRU5CUVc1Q096dHJRa0YzUTJVelFpeE5PenRCUVVWbU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUp5YjNWMFpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktseHlYRzRnMEtEUXRkQ3cwTHZRdU5DMzBMN1FzdEN3MFlMUmpDQlNiM1YwWlhKY2NseHVYSEpjYmlEUmdkQyswTGZRdE5DdzBZTFJqQ0RRdXRDKzBMM1JnZEdDMFlEUmc5QzYwWUxRdnRHQVhISmNiaURRdnRDeDBZRFFzTkN4MEw3Umd0R0gwTGpRdWlEUXVOQzMwTHpRdGRDOTBMWFF2ZEM0MFk4ZzBMRFF0TkdBMExYUmdkQ3dYSEpjYmlEUXY5R0EwTGdnMFlIUXZ0QzMwTFRRc05DOTBMalF1Q0RRc3RHTDBML1F1OUM5MExqUXV5RFF2dEN4MFlEUXNOQ3gwTDdSZ3RHSDBMalF1aURRdU5DMzBMelF0ZEM5MExYUXZkQzQwWThnMExEUXROR0EwTFhSZ2RDd1hISmNiaURRdmRDdzBZUFJoOUM0MFlMUmpOR0IwWThnMEw3UXY5R0EwTFhRdE5DMTBMdlJqOUdDMFl3ZzBZRFF2dEdEMFlJZzBML1F2aURRc05DMDBZRFF0ZEdCMFlNZ0tDRFF1dEN3MExyUXZ0QzVJTkdBMEw3Umc5R0NJTkM5MFlQUXR0QzkwTDRnMExEUXV0R0MwTGpRc3RDNDBZRFF2dEN5MExEUmd0R01JQ2xjY2x4dUlOQzkwTERSaGRDKzBMVFF1TkdDMFl3djBZSFF2dEdGMFlEUXNOQzkwWS9SZ3RHTUlOQy8wTDdSZ2RDNzBMWFF0TkM5MExqUXVTRFFzTkM2MFlMUXVOQ3kwTDNSaTlDNUlOR0EwTDdSZzlHQ1hISmNiaURRc3RHTDBMZlFzdEN3MFlMUmpDQnZia3hsWVhabFhISmNiaURRc3RHTDBMZlFzdEN3MFlMUmpDQnZia0psWm05eVpVVnVkR1Z5WEhKY2JpRFFzdEdMMExmUXN0Q3cwWUxSakNCdmJrVnVkR1Z5WEhKY2JpRFF2dEN4MFlEUXNOQ3gwTERSZ3RHTDBMTFFzTkdDMFl3ZzBMN1JndEdCMFlQUmd0R0IwWUxRc3RDNDBMVWcwWVRSZzlDNjBMM1JodEM0MExrdDBZWFJnOUM2MEw3UXNseHlYRzRnMEwvUXZ0QzAwTFRRdGRHQTBMYlF1TkN5MExEUmd0R01JSEJ5YjIxcGMyVWcwTGpRdHlCdmJrSmxabTl5WlVWdWRHVnlYSEpjYmlEUXY5QyswTFRRdE5DMTBZRFF0dEM0MExMUXNOR0MwWXdnY0hKdmJXbHpaU0RRdU5DM0lHOXVUR1ZoZG1WY2NseHVJQ292WEhKY2JuWmhjaUJTYjNWMFpYSWdQU0JtZFc1amRHbHZiaUFvYjNCMGFXOXVjeXdnWlhabGJuUkNkWE1wSUh0Y2NseHVJQ0FnSUhSb2FYTXVjbTkxZEdWeklEMGdiM0IwYVc5dWN5NXliM1YwWlhNN1hISmNiaUFnSUNCMGFHbHpMbVYyWlc1MFFuVnpJRDBnWlhabGJuUkNkWE03WEhKY2JpQWdJQ0IwYUdsekxtbHVhWFFvS1R0Y2NseHVmVHRjY2x4dVhISmNibEp2ZFhSbGNpNXdjbTkwYjNSNWNHVWdQU0I3WEhKY2JpQWdJQ0JwYm1sME9pQm1kVzVqZEdsdmJpQW9LU0I3WEhKY2JpQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJoaGMyaGphR0Z1WjJVbkxDQW9aWFlwSUQwK0lIUm9hWE11YUdGdVpHeGxWWEpzS0dWMkxtOXNaRlZTVEM1emNHeHBkQ2duSXljcFd6RmRJSHg4SUNjbkxDQmxkaTV1WlhkVlVrd3VjM0JzYVhRb0p5TW5LVnN4WFNrcE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdWFHRnVaR3hsVlhKc0tIVnVaR1ZtYVc1bFpDd2dkMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmd1YzJ4cFkyVW9NU2twTzF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0FnSUdkbGRGQmhjbUZ0T2lCbWRXNWpkR2x2YmlBb2JtVjNVbTkxZEdVc0lHTjFjbkpsYm5SU2IzVjBaU2tnZTF4eVhHNGdJQ0FnSUNBZ0lIWmhjaUJ3WVhKaGJTQTlJRzVsZDFKdmRYUmxMbTFoZEdOb0tHTjFjbkpsYm5SU2IzVjBaUzV0WVhSamFDa2dmSHdnVzEwN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIQmhjbUZ0V3pGZE8xeHlYRzRnSUNBZ2ZTeGNjbHh1SUNBZ0lHaGhibVJzWlZWeWJEb2dablZ1WTNScGIyNGdLRzlzWkZKdmRYUmxMQ0J1WlhkU2IzVjBaU2tnZTF4eVhHNGdJQ0FnSUNBZ0lIWmhjaUJqZFhKeVpXNTBVbTkxZEdVZ1BTQjBhR2x6TG5KdmRYUmxjeTVtYVc1a0tDaHBkR1Z0S1NBOVBpQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdhWFJsYlM1dFlYUmphQ0E5UFQwZ0ozTjBjbWx1WnljcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGRTYjNWMFpTQTlQVDBnYVhSbGJTNXRZWFJqYUR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnYVhSbGJTNXRZWFJqYUNBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdsMFpXMHViV0YwWTJnb2JtVjNVbTkxZEdVcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHbDBaVzB1YldGMFkyZ2dhVzV6ZEdGdVkyVnZaaUJTWldkRmVIQXBJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhkU2IzVjBaUzV0WVhSamFDaHBkR1Z0TG0xaGRHTm9LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUgwcE8xeHlYRzRnSUNBZ0lDQWdJR2xtSUNodmJHUlNiM1YwWlNBaFBUMGdkVzVrWldacGJtVmtLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCd2NtVjJhVzkxYzFKdmRYUmxJRDBnZEdocGN5NXliM1YwWlhNdVptbHVaQ2dvYVhSbGJTa2dQVDRnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQnBkR1Z0TG0xaGRHTm9JRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ2YkdSU2IzVjBaU0E5UFQwZ2FYUmxiUzV0WVhSamFEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvZEhsd1pXOW1JR2wwWlcwdWJXRjBZMmdnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2FYUmxiUzV0WVhSamFDaHZiR1JTYjNWMFpTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dsMFpXMHViV0YwWTJnZ2FXNXpkR0Z1WTJWdlppQlNaV2RGZUhBcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYjJ4a1VtOTFkR1V1YldGMFkyZ29hWFJsYlM1dFlYUmphQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhISmNiaUFnSUNBZ0lDQWdJQ0FnSUgwcE8xeHlYRzRnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNCMllYSWdZM1Z5Y21WdWRGQmhjbUZ0SUQwZ2RHaHBjeTVuWlhSUVlYSmhiU2h1WlhkU2IzVjBaU3dnWTNWeWNtVnVkRkp2ZFhSbEtUdGNjbHh1SUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnloZ0xTMHRQaUJ5YjNWMFpYSWdiMnhrVlZKTU9pQWtlMjlzWkZKdmRYUmxmV0FwTzF4eVhHNGdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LR0F0TFMwK0lISnZkWFJsY2lCbWFXNWtUbVYzUVdOMGFYWmxVbTkxZEdVNklDUjdibVYzVW05MWRHVjlJQzB0SUNSN0tHTjFjbkpsYm5SU2IzVjBaU0I4ZkNCN2ZTa3VibUZ0WlgxZ0tUdGNjbHh1SUNBZ0lDQWdJQ0JRY205dGFYTmxMbkpsYzI5c2RtVW9LVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXVkR2hsYmlnb0tTQTlQaUJ3Y21WMmFXOTFjMUp2ZFhSbElDWW1JSEJ5WlhacGIzVnpVbTkxZEdVdWIyNU1aV0YyWlNBbUppQndjbVYyYVc5MWMxSnZkWFJsTG05dVRHVmhkbVVvYjJ4a1VtOTFkR1V1YzNCc2FYUW9KejBuS1ZzeFhTa3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDNTBhR1Z1S0NncElEMCtJR04xY25KbGJuUlNiM1YwWlNBbUppQmpkWEp5Wlc1MFVtOTFkR1V1YjI1Q1pXWnZjbVZGYm5SbGNpQW1KaUJqZFhKeVpXNTBVbTkxZEdVdWIyNUNaV1p2Y21WRmJuUmxjaWhqZFhKeVpXNTBVR0Z5WVcwcEtWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdWRHaGxiaWdvS1NBOVBpQmpkWEp5Wlc1MFVtOTFkR1VnSmlZZ1kzVnljbVZ1ZEZKdmRYUmxMbTl1Ulc1MFpYSWdKaVlnWTNWeWNtVnVkRkp2ZFhSbExtOXVSVzUwWlhJb1kzVnljbVZ1ZEZCaGNtRnRLU2xjY2x4dUlDQWdJSDFjY2x4dWZUdGNjbHh1WEhKY2JtVjRjRzl5ZENCa1pXWmhkV3gwSUZKdmRYUmxjanRjY2x4dVhISmNiaTh2SUhaaGNpQnliM1YwWlhJZ1BTQnVaWGNnVW05MWRHVnlLSHRjY2x4dUx5OGdJQ0FnSUhKdmRYUmxjem9nVzN0Y2NseHVMeThnSUNBZ0lDQWdJQ0J1WVcxbE9pQW5hVzVrWlhnbkxGeHlYRzR2THlBZ0lDQWdJQ0FnSUcxaGRHTm9PaUFuSnl4Y2NseHVMeThnSUNBZ0lDQWdJQ0J2YmtKbFptOXlaVVZ1ZEdWeU9pQW9LU0E5UGlCamIyNXpiMnhsTG14dlp5Z25iMjVDWldadmNtVkZiblJsY2lCcGJtUmxlQ2NwTEZ4eVhHNHZMeUFnSUNBZ0lDQWdJRzl1Ulc1MFpYSTZJQ2dwSUQwK0lHTnZibk52YkdVdWJHOW5LQ2R2YmtWdWRHVnlJR2x1WkdWNEp5a3NYSEpjYmk4dklDQWdJQ0FnSUNBZ2IyNU1aV0YyWlRvZ0tDa2dQVDRnWTI5dWMyOXNaUzVzYjJjb0oyOXVUR1ZoZG1VZ2FXNWtaWGduS1Z4eVhHNHZMeUFnSUNBZ2ZTd2dlMXh5WEc0dkx5QWdJQ0FnSUNBZ0lHNWhiV1U2SUNkamFYUjVKeXhjY2x4dUx5OGdJQ0FnSUNBZ0lDQnRZWFJqYURvZ0wyTnBkSGs5S0M0cktTOHNYSEpjYmk4dklDQWdJQ0FnSUNBZ2IyNUNaV1p2Y21WRmJuUmxjam9nS0dOcGRIa3BJRDArSUdOdmJuTnZiR1V1Ykc5bktHQnZia0psWm05eVpVVnVkR1Z5SUdOcGRIazZKSHRqYVhSNWZXQXBMRnh5WEc0dkx5QWdJQ0FnSUNBZ0lHOXVSVzUwWlhJNklDaGphWFI1S1NBOVBpQmpiMjV6YjJ4bExteHZaeWhnYjI1RmJuUmxjaUJqYVhSNU9pUjdZMmwwZVgxZ0tTeGNjbHh1THk4Z0lDQWdJQ0FnSUNCdmJreGxZWFpsT2lBb1kybDBlU2tnUFQ0Z1kyOXVjMjlzWlM1c2IyY29ZRzl1VEdWaGRtVWdZMmwwZVRva2UyTnBkSGw5WUNsY2NseHVMeThnSUNBZ0lIMHNJSHRjY2x4dUx5OGdJQ0FnSUNBZ0lDQnVZVzFsT2lBbllXSnZkWFFuTEZ4eVhHNHZMeUFnSUNBZ0lDQWdJRzFoZEdOb09pQW9kR1Y0ZENrZ1BUNGdkR1Y0ZENBOVBUMGdKMkZpYjNWMEp5eGNjbHh1THk4Z0lDQWdJQ0FnSUNCdmJrSmxabTl5WlVWdWRHVnlPaUFvS1NBOVBpQmpiMjV6YjJ4bExteHZaeWhnYjI1Q1pXWnZjbVZGYm5SbGNpQmhZbTkxZEdBcExGeHlYRzR2THlBZ0lDQWdJQ0FnSUc5dVJXNTBaWEk2SUNncElEMCtJSHRjY2x4dUx5OGdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1lHOXVSVzUwWlhJZ1lXSnZkWFJnS1R0Y2NseHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ0x5OWtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjalkyOXVkR1Z1ZENjcExtbHVibVZ5U0ZSTlRDQTlJQ2M4YURFK1FXSnZkWFE4TDJneFBpYzdYSEpjYmk4dklDQWdJQ0FnSUNBZ2ZTeGNjbHh1THk4Z0lDQWdJQ0FnSUNCdmJreGxZWFpsT2lBb0tTQTlQaUI3WEhKY2JpOHZJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQnZia3hsWVhabElHRmliM1YwWUNrN1hISmNiaTh2SUNBZ0lDQWdJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnlOamIyNTBaVzUwSnlrdWFXNXVaWEpJVkUxTUlEMGdKeWM3WEhKY2JpOHZJQ0FnSUNBZ0lDQWdmVnh5WEc0dkx5QWdJQ0FnZlYxY2NseHVMeThnZlNrN0lsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbHNcXFxccm91dGVyLmpzXCIsXCIvdXRpbHNcIikiXX0=
