"use strict";

var _rendermap = _interopRequireDefault(require("./rendermap"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('rendermap', function () {
  it('returns cite for CAPTION', function () {
    expect(_rendermap["default"].get(_constants.Block.CAPTION)).to.deep.equal({
      element: 'cite'
    });
  });
  it('returns blockquote for BLOCKQUOTE_CAPTION', function () {
    expect(_rendermap["default"].get(_constants.Block.BLOCKQUOTE_CAPTION)).to.deep.equal({
      element: 'blockquote'
    });
  });
  it('returns div for TODO', function () {
    expect(_rendermap["default"].get(_constants.Block.TODO)).to.deep.equal({
      element: 'div'
    });
  });
  it('returns figure for IMAGE', function () {
    expect(_rendermap["default"].get(_constants.Block.IMAGE)).to.deep.equal({
      element: 'figure'
    });
  });
});