"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
var _stylebutton = _interopRequireDefault(require("./stylebutton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var BlockToolbar = function BlockToolbar(props) {
  if (props.buttons.length < 1) {
    return null;
  }
  var editorState = props.editorState;
  var blockType = _draftJs.RichUtils.getCurrentBlockType(editorState);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "md-RichEditor-controls md-RichEditor-controls-block"
  }, props.buttons.map(function (type) {
    var iconLabel = {};
    iconLabel.label = type.label;
    return /*#__PURE__*/_react["default"].createElement(_stylebutton["default"], _extends({}, iconLabel, {
      key: type.style,
      active: type.style === blockType,
      onToggle: props.onToggle,
      style: type.style,
      description: type.description
    }));
  }));
};
BlockToolbar.propTypes = {
  buttons: _propTypes["default"].array,
  editorState: _propTypes["default"].object.isRequired,
  onToggle: _propTypes["default"].func
};
var _default = exports["default"] = BlockToolbar;