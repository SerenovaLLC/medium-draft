"use strict";

var _immutable = require("immutable");
var _draftJs = require("draft-js");
var _blockStyleFn = _interopRequireDefault(require("./blockStyleFn"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BASE_BLOCK_CLASS = 'md-block';
describe('blockStyleFn()', function () {
  it('should return block class for UNKNOWN', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: 'some-unknown-type'
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal(BASE_BLOCK_CLASS);
  });
  it('should return block class for UNSTYLED', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.UNSTYLED
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-paragraph"));
  });
  it('should return block class for CAPTION', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.CAPTION
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-caption"));
  });
  it('should return block class for BLOCKQUOTE_CAPTION', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.BLOCKQUOTE_CAPTION
    });
    var cls = "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-quote");
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(cls, " md-RichEditor-blockquote ").concat(BASE_BLOCK_CLASS, "-quote-caption"));
  });
  it('should return block class for BLOCKQUOTE', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.BLOCKQUOTE
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-quote md-RichEditor-blockquote"));
  });
  it('should return block class for ATOMIC', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.ATOMIC
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-atomic"));
  });
  it('should return block class for IMAGE', function () {
    var normalBlock = new _draftJs.ContentBlock({
      type: _constants.Block.IMAGE
    });
    expect((0, _blockStyleFn["default"])(normalBlock)).to.equal("".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-image"));
  });
  it('should return block class for TODO', function () {
    var todoBlock = new _draftJs.ContentBlock({
      type: _constants.Block.TODO
    });
    var todoBlockChecked = new _draftJs.ContentBlock({
      type: _constants.Block.TODO,
      data: (0, _immutable.Map)({
        checked: true
      })
    });
    var baseTodoClass = "".concat(BASE_BLOCK_CLASS, " ").concat(BASE_BLOCK_CLASS, "-paragraph");
    expect((0, _blockStyleFn["default"])(todoBlock)).to.equal("".concat(baseTodoClass, " ").concat(BASE_BLOCK_CLASS, "-todo ").concat(BASE_BLOCK_CLASS, "-todo-unchecked"));
    expect((0, _blockStyleFn["default"])(todoBlockChecked)).to.equal("".concat(baseTodoClass, " ").concat(BASE_BLOCK_CLASS, "-todo ").concat(BASE_BLOCK_CLASS, "-todo-checked"));
  });
});