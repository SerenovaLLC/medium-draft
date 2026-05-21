"use strict";

var _constants = require("./constants");
describe('constants', function () {
  it('changeType should return appended with block type', function () {
    expect(_constants.KEY_COMMANDS.changeType()).to.equal('changetype:');
    expect(_constants.KEY_COMMANDS.changeType('')).to.equal('changetype:');
    expect(_constants.KEY_COMMANDS.changeType(_constants.Block.ATOMIC)).to.equal("changetype:".concat(_constants.Block.ATOMIC));
    expect(_constants.KEY_COMMANDS.changeType(_constants.Block.IMAGE)).to.equal("changetype:".concat(_constants.Block.IMAGE));
  });
  it('toggleInline should return appended with inline type', function () {
    expect(_constants.KEY_COMMANDS.toggleInline()).to.equal('toggleinline:');
    expect(_constants.KEY_COMMANDS.toggleInline('')).to.equal('toggleinline:');
    expect(_constants.KEY_COMMANDS.toggleInline(_constants.Inline.BOLD)).to.equal("toggleinline:".concat(_constants.Inline.BOLD));
    expect(_constants.KEY_COMMANDS.toggleInline(_constants.Inline.ITALIC)).to.equal("toggleinline:".concat(_constants.Inline.ITALIC));
  });
  it('showLinkInput', function () {
    expect(_constants.KEY_COMMANDS.showLinkInput()).to.equal('showlinkinput');
  });
  it('addNewBlock', function () {
    expect(_constants.KEY_COMMANDS.addNewBlock()).to.equal('add-new-block');
  });
  it('deleteBlock', function () {
    expect(_constants.KEY_COMMANDS.deleteBlock()).to.equal('delete-block');
  });
});