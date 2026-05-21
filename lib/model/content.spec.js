"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _draftJs = require("draft-js");
var _content = _interopRequireDefault(require("./content"));
var _constants = require("../util/constants");
var _data = _interopRequireDefault(require("../../docs/data.json"));
var _link = _interopRequireWildcard(require("../components/entities/link"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('createEditorState', function () {
  var es = (0, _content["default"])();
  it('creates empty editorState when no argument or null is passed', function () {
    var raw = (0, _draftJs.convertToRaw)(es.getCurrentContent());
    expect(raw.blocks).to.be["instanceof"](Array);
    expect(raw.blocks[0].type).to.equal(_constants.Block.UNSTYLED);
    expect(raw.blocks[0].text).to.equal('');
    expect(raw.blocks[0]).to.include.keys('data', 'key');
  });
  it('adds link decorator by default in CompositeDecorator', function () {
    expect(es.getDecorator()).to.be["instanceof"](_draftJs.CompositeDecorator);
    expect(es.getDecorator()._decorators.length).to.equal(1);
    expect(es.getDecorator()._decorators[0]).to.deep.equal({
      strategy: _link.findLinkEntities,
      component: _link["default"]
    });
  });
  var esContent = (0, _content["default"])(_data["default"]);
  it('fills data from provided json', function () {
    var blocks = esContent.getCurrentContent().getBlockMap();
    expect(blocks.size).to.be.above(1);
    expect(esContent.getDecorator()).to.be["instanceof"](_draftJs.CompositeDecorator);
    expect(esContent.getDecorator()._decorators.length).to.equal(1);
    expect(esContent.getDecorator()._decorators[0]).to.deep.equal({
      strategy: _link.findLinkEntities,
      component: _link["default"]
    });
  });
});