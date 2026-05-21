"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import './atomic.scss';

var AtomicBlock = function AtomicBlock(props) {
  var content = props.getEditorState().getCurrentContent();
  var entity = content.getEntity(props.block.getEntityAt(0));
  var data = entity.getData();
  var type = entity.getType();
  if (type === 'image') {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "md-block-atomic-wrapper"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      role: "presentation",
      src: data.src
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "md-block-atomic-controls"
    }, /*#__PURE__*/_react["default"].createElement("button", null, "\xD7")));
  }
  return /*#__PURE__*/_react["default"].createElement("p", null, "No supported block for ", type);
};
AtomicBlock.propTypes = {
  block: _propTypes["default"].object,
  getEditorState: _propTypes["default"].func
};
var _default = exports["default"] = AtomicBlock;