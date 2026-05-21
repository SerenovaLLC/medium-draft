"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
Custom style map for custom entities like Hihglight.
*/
var customStyleMap = _defineProperty(_defineProperty({}, _constants.Inline.HIGHLIGHT, {
  backgroundColor: 'yellow'
}), _constants.Inline.CODE, {
  fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  margin: '4px 0',
  fontSize: '0.9em',
  padding: '1px 3px',
  color: '#555',
  backgroundColor: '#fcfcfc',
  border: '1px solid #ccc',
  borderBottomColor: '#bbb',
  borderRadius: 3,
  boxShadow: 'inset 0 -1px 0 #bbb'
});
var _default = exports["default"] = customStyleMap;