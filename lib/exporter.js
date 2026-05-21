"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleToHTML = exports.setRenderOptions = exports.options = exports.entityToHTML = exports["default"] = exports.blockToHTML = void 0;
var _react = _interopRequireDefault(require("react"));
var _draftConvert = require("draft-convert");
var _constants = require("./util/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var styleToHTML = exports.styleToHTML = function styleToHTML(style) {
  switch (style) {
    case _constants.Inline.ITALIC:
      return /*#__PURE__*/_react["default"].createElement("em", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    case _constants.Inline.BOLD:
      return /*#__PURE__*/_react["default"].createElement("strong", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    case _constants.Inline.STRIKETHROUGH:
      return /*#__PURE__*/_react["default"].createElement("strike", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    case _constants.Inline.UNDERLINE:
      return /*#__PURE__*/_react["default"].createElement("u", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    case _constants.Inline.HIGHLIGHT:
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    case _constants.Inline.CODE:
      return /*#__PURE__*/_react["default"].createElement("code", {
        className: "md-inline-".concat(style.toLowerCase())
      });
    default:
      return null;
  }
};
var blockToHTML = exports.blockToHTML = function blockToHTML(block) {
  var blockType = block.type;
  switch (blockType) {
    case _constants.Block.H1:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h1", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.H2:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h2", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.H3:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h3", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.H4:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h4", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.H5:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h5", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.H6:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return /*#__PURE__*/_react["default"].createElement("h6", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.BLOCKQUOTE_CAPTION:
    case _constants.Block.CAPTION:
      return {
        start: "<p class=\"md-block-".concat(blockType.toLowerCase(), "\"><caption>"),
        end: '</caption></p>'
      };
    case _constants.Block.IMAGE:
      {
        var imgData = block.data;
        var text = block.text;
        var extraClass = text.length > 0 ? ' md-block-image-has-caption' : '';
        return {
          start: "<figure class=\"md-block-image".concat(extraClass, "\"><img src=\"").concat(imgData.src, "\" alt=\"").concat(block.text, "\" /><figcaption className=\"md-block-image-caption\">"),
          end: '</figcaption></figure>'
        };
      }
    case _constants.Block.ATOMIC:
      return {
        start: "<figure className=\"md-block-".concat(blockType.toLowerCase(), "\">"),
        end: '</figure>'
      };
    case _constants.Block.TODO:
      {
        var checked = block.data.checked || false;
        var inp = '';
        var containerClass = '';
        if (checked) {
          inp = '<input type=checkbox disabled checked="checked" />';
          containerClass = 'md-block-todo-checked';
        } else {
          inp = '<input type=checkbox disabled />';
          containerClass = 'md-block-todo-unchecked';
        }
        return {
          start: "<div class=\"md-block-".concat(blockType.toLowerCase(), " ").concat(containerClass, "\">").concat(inp, "<p>"),
          end: '</p></div>'
        };
      }
    case _constants.Block.BREAK:
      return /*#__PURE__*/_react["default"].createElement("hr", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.BLOCKQUOTE:
      return /*#__PURE__*/_react["default"].createElement("blockquote", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    case _constants.Block.OL:
      return {
        element: /*#__PURE__*/_react["default"].createElement("li", null),
        nest: /*#__PURE__*/_react["default"].createElement("ol", {
          className: "md-block-".concat(blockType.toLowerCase())
        })
      };
    case _constants.Block.UL:
      return {
        element: /*#__PURE__*/_react["default"].createElement("li", null),
        nest: /*#__PURE__*/_react["default"].createElement("ul", {
          className: "md-block-".concat(blockType.toLowerCase())
        })
      };
    case _constants.Block.UNSTYLED:
      if (block.text.length < 1) {
        return /*#__PURE__*/_react["default"].createElement("p", {
          className: "md-block-".concat(blockType.toLowerCase())
        }, /*#__PURE__*/_react["default"].createElement("br", null));
      }
      return /*#__PURE__*/_react["default"].createElement("p", {
        className: "md-block-".concat(blockType.toLowerCase())
      });
    default:
      return null;
  }
};
var entityToHTML = exports.entityToHTML = function entityToHTML(entity, originalText) {
  if (entity.type === _constants.Entity.LINK) {
    return /*#__PURE__*/_react["default"].createElement("a", {
      className: "md-inline-link",
      href: entity.data.url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, originalText);
  }
  return originalText;
};
var options = exports.options = {
  styleToHTML: styleToHTML,
  blockToHTML: blockToHTML,
  entityToHTML: entityToHTML
};
var setRenderOptions = exports.setRenderOptions = function setRenderOptions() {
  var htmlOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options;
  return (0, _draftConvert.convertToHTML)(htmlOptions);
};
var _default = exports["default"] = function _default(contentState) {
  var htmlOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
  return (0, _draftConvert.convertToHTML)(htmlOptions)(contentState);
};