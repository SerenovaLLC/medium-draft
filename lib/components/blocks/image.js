"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
var _model = require("../../model/");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ImageBlock = function ImageBlock(props) {
  var block = props.block,
    blockProps = props.blockProps;
  var getEditorState = blockProps.getEditorState;
  var data = block.getData();
  var src = data.get('src');
  var currentBlock = (0, _model.getCurrentBlock)(getEditorState());
  var className = currentBlock.getKey() === block.getKey() ? 'md-image-is-selected' : '';
  if (src !== null) {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "md-block-image-inner-container"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      role: "presentation",
      className: className,
      src: src
    })), /*#__PURE__*/_react["default"].createElement("figcaption", null, /*#__PURE__*/_react["default"].createElement(_draftJs.EditorBlock, props)));
  }
  return /*#__PURE__*/_react["default"].createElement(_draftJs.EditorBlock, props);
};
ImageBlock.propTypes = {
  block: _propTypes["default"].object,
  blockProps: _propTypes["default"].object
};
var _default = exports["default"] = ImageBlock;