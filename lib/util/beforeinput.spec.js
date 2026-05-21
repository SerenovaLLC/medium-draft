"use strict";

var _content = _interopRequireDefault(require("../model/content"));
var _constants = require("./constants");
var _beforeinput = _interopRequireDefault(require("./beforeinput"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('beforeInput()', function () {
  it('returns NOT_HANDLED for atomic like blocks', function () {
    var dummyData = {
      entityMap: {},
      blocks: [{
        key: 'etee',
        text: 'E',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{
          offset: 0,
          length: 1,
          key: 3
        }],
        data: {}
      }]
    };
    var es = (0, _content["default"])(dummyData);
    expect((0, _beforeinput["default"])(es)).to.equal(_constants.NOT_HANDLED);
    dummyData.blocks[0].type = _constants.Block.IMAGE;
    es = (0, _content["default"])(dummyData);
    expect((0, _beforeinput["default"])(es)).to.equal(_constants.NOT_HANDLED);
  });
});