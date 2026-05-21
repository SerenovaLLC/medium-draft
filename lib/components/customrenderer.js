"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blockquotecaption = _interopRequireDefault(require("./blocks/blockquotecaption"));
var _caption = _interopRequireDefault(require("./blocks/caption"));
var _atomic = _interopRequireDefault(require("./blocks/atomic"));
var _todo = _interopRequireDefault(require("./blocks/todo"));
var _image = _interopRequireDefault(require("./blocks/image"));
var _break = _interopRequireDefault(require("./blocks/break"));
var _constants = require("../util/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(setEditorState, getEditorState) {
  return function (contentBlock) {
    // console.log(editorState, onChange);
    var type = contentBlock.getType();
    switch (type) {
      case _constants.Block.BLOCKQUOTE_CAPTION:
        return {
          component: _blockquotecaption["default"]
        };
      case _constants.Block.CAPTION:
        return {
          component: _caption["default"]
        };
      case _constants.Block.ATOMIC:
        return {
          component: _atomic["default"],
          editable: false,
          props: {
            getEditorState: getEditorState
          }
        };
      case _constants.Block.TODO:
        return {
          component: _todo["default"],
          props: {
            setEditorState: setEditorState,
            getEditorState: getEditorState
          }
        };
      case _constants.Block.IMAGE:
        return {
          component: _image["default"],
          props: {
            setEditorState: setEditorState,
            getEditorState: getEditorState
          }
        };
      case _constants.Block.BREAK:
        return {
          component: _break["default"],
          editable: false
        };
      default:
        return null;
    }
  };
};