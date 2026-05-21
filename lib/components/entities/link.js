"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLinkEntities = exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _constants = require("../../util/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var findLinkEntities = exports.findLinkEntities = function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === _constants.Entity.LINK;
  }, callback);
};
var Link = function Link(props) {
  var contentState = props.contentState,
    entityKey = props.entityKey;
  var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
    url = _contentState$getEnti.url;
  return /*#__PURE__*/_react["default"].createElement("a", {
    className: "md-link",
    href: url,
    rel: "noopener noreferrer",
    target: "_blank",
    "aria-label": url
  }, props.children);
};
Link.propTypes = {
  children: _propTypes["default"].node,
  entityKey: _propTypes["default"].string,
  contentState: _propTypes["default"].object.isRequired
};
var _default = exports["default"] = Link;