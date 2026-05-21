"use strict";

var _immutable = require("immutable");
var _draftJs = require("draft-js");
var _content = _interopRequireDefault(require("./content"));
var _ = require("./");
var _constants = require("../util/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('model/index', function () {
  describe('getDefaultBlockData()', function () {
    it('returns proper data for todo block', function () {
      expect((0, _.getDefaultBlockData)(_constants.Block.TODO)).to.deep.equal({
        checked: false
      });
    });
    it('returns passed data for any other block', function () {
      expect((0, _.getDefaultBlockData)(_constants.Block.IMAGE, {
        src: 'https://www.google.com',
        alt: 'Google'
      })).to.deep.equal({
        src: 'https://www.google.com',
        alt: 'Google'
      });
    });
  });
  var block1 = {
    key: '2vr7c',
    text: 'medium-draft',
    type: 'header-three',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  };
  var block2 = {
    key: 'fksil',
    text: 'This page is fully editable.',
    type: 'header-three',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  };
  var es = (0, _content["default"])({
    entityMap: {},
    blocks: [block1, block2]
  });
  describe('getCurrentBlock()', function () {
    it('always returns currently focused/selected block', function () {
      expect((0, _.getCurrentBlock)(es).getKey()).to.equal(block1.key);
      var selection = _draftJs.SelectionState.createEmpty(block2.key);
      var es2 = _draftJs.EditorState.acceptSelection(es, selection);
      expect((0, _.getCurrentBlock)(es2).getKey()).to.equal(block2.key);
    });
  });
  describe('resetBlockWithType()', function () {
    it('change selected block type to provided type', function () {
      var es3 = (0, _.resetBlockWithType)(es, _constants.Block.UNSTYLED, {
        text: 'hola'
      });
      var currentBlock = (0, _.getCurrentBlock)(es3);
      expect(currentBlock.getType()).to.equal(_constants.Block.UNSTYLED);
      expect(currentBlock.getText()).to.equal('hola');
      var es4 = (0, _.resetBlockWithType)(es, _constants.Block.TODO);
      currentBlock = (0, _.getCurrentBlock)(es4);
      expect(currentBlock.getType()).to.equal(_constants.Block.TODO);
      expect(currentBlock.getData().toJS()).to.deep.equal({
        checked: false
      });
      expect(currentBlock.getText()).to.equal(block1.text);
      expect(es4.getLastChangeType()).to.equal('change-block-type');
    });
  });
  describe('updateDataOfBlock()', function () {
    it('should update data of provided block', function () {
      var es3 = (0, _.resetBlockWithType)(es, _constants.Block.TODO);
      var es4 = (0, _.updateDataOfBlock)(es3, (0, _.getCurrentBlock)(es), (0, _immutable.Map)({
        checked: true
      }));
      expect((0, _.getCurrentBlock)(es4).getData().toJS()).to.deep.equal({
        checked: true
      });
      expect(es4.getLastChangeType()).to.equal('change-block-data');
    });
  });
  describe('addNewBlockAt()', function () {
    it('should add new block after pivot block', function () {
      var es3 = (0, _.addNewBlockAt)(es, block1.key);
      expect(es3.getCurrentContent().getBlockMap().count()).to.equal(3);
      var currentBlock = (0, _.getCurrentBlock)(es3);
      expect(currentBlock.toJS()).to.deep.equal(es3.getCurrentContent().getBlockMap().get(currentBlock.getKey()).toJS());
      expect(currentBlock.getData().toJS()).to.deep.equal({});
      var es4 = (0, _.addNewBlockAt)(es3, currentBlock.getKey(), _constants.Block.TODO, {
        checked: true
      });
      currentBlock = (0, _.getCurrentBlock)(es4);
      expect(es4.getCurrentContent().getBlockMap().count()).to.equal(4);
      expect(function () {
        return (0, _.addNewBlockAt)(es, 'random-key');
      }).to["throw"](Error);
    });
  });
});