"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("./constants");
/*
Get custom classnames for each of the different block types supported.
*/

var BASE_BLOCK_CLASS = 'md-block';
var _default = exports["default"] = function _default(block) {
  switch (block.getType()) {
    case _constants.Block.BLOCKQUOTE:
      return "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-quote md-RichEditor-blockquote");
    case _constants.Block.UNSTYLED:
      return "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-paragraph");
    case _constants.Block.ATOMIC:
      return "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-atomic");
    case _constants.Block.CAPTION:
      return "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-caption");
    case _constants.Block.TODO:
      {
        var data = block.getData();
        var checkedClass = data.get('checked') === true ? "".concat(BASE_BLOCK_CLASS, "-todo-checked") : "".concat(BASE_BLOCK_CLASS, "-todo-unchecked");
        var finalClass = "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-paragraph ");
        finalClass += "".concat(BASE_BLOCK_CLASS, "-todo ").concat(checkedClass);
        return finalClass;
      }
    case _constants.Block.IMAGE:
      return "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-image");
    case _constants.Block.BLOCKQUOTE_CAPTION:
      {
        var cls = "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-quote");
        return "".concat(cls, " md-RichEditor-blockquote ").concat(BASE_BLOCK_CLASS, "-quote-caption");
      }
    default:
      return BASE_BLOCK_CLASS;
  }
};