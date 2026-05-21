"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _stylebutton = _interopRequireDefault(require("./stylebutton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var InlineToolbar = function InlineToolbar(props) {
  if (props.buttons.length < 1) {
    return null;
  }
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "md-RichEditor-controls md-RichEditor-controls-inline"
  }, props.buttons.map(function (type) {
    var iconLabel = {};
    iconLabel.label = type.label;
    return /*#__PURE__*/_react["default"].createElement(_stylebutton["default"], _extends({}, iconLabel, {
      key: type.style,
      active: currentStyle.has(type.style),
      onToggle: props.onToggle,
      style: type.style,
      description: type.description
    }));
  }));
};
InlineToolbar.propTypes = {
  buttons: _propTypes["default"].array,
  editorState: _propTypes["default"].object.isRequired,
  onToggle: _propTypes["default"].func
};
var _default = exports["default"] = InlineToolbar;