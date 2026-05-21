"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INLINE_BUTTONS = exports.BLOCK_BUTTONS = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _blocktoolbar = _interopRequireDefault(require("./blocktoolbar"));
var _inlinetoolbar = _interopRequireDefault(require("./inlinetoolbar"));
var _index = require("../util/index");
var _index2 = require("../model/index");
var _constants = require("../util/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // import './toolbar.scss';
var Toolbar = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function Toolbar(props) {
    var _this;
    _classCallCheck(this, Toolbar);
    _this = _callSuper(this, Toolbar, [props]);
    _this.state = {
      showURLInput: false,
      urlInputValue: ''
    };
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.handleLinkInput = _this.handleLinkInput.bind(_this);
    _this.hideLinkInput = _this.hideLinkInput.bind(_this);
    return _this;
  }
  _inherits(Toolbar, _React$Component);
  return _createClass(Toolbar, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var editorState = newProps.editorState;
      if (!newProps.editorEnabled) {
        return;
      }
      var selectionState = editorState.getSelection();
      if (selectionState.isCollapsed()) {
        if (this.state.showURLInput) {
          this.setState({
            showURLInput: false,
            urlInputValue: ''
          });
        }
        return;
      }
    }

    // shouldComponentUpdate(newProps, newState) {
    //   console.log(newState, this.state);
    //   if (newState.showURLInput !== this.state.showURLInput && newState.urlInputValue !== this.state.urlInputValue) {
    //     return true;
    //   }
    //   return false;
    // }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // eslint-disable-next-line react/no-find-dom-node
      var toolbarNode = this._toolbarNode;
      var selectionState = this.props.editorState.getSelection();
      if (selectionState.isCollapsed()) {
        toolbarNode.style.cssText = '';
      }
      if (!this.props.editorEnabled || this.state.showURLInput) {
        return;
      }
      if (selectionState.isCollapsed()) {
        return;
      }
      var maxOverhang = this.props.maxOverhang;
      // eslint-disable-next-line no-undef
      var nativeSelection = (0, _index.getSelection)(window);
      if (!nativeSelection.rangeCount) {
        return;
      }
      var selectionBoundary = (0, _index.getSelectionRect)(nativeSelection);
      var toolbarBoundary = toolbarNode.getBoundingClientRect();

      // eslint-disable-next-line react/no-find-dom-node
      var parent = _reactDom["default"].findDOMNode(this.props.editorNode);
      var parentBoundary = parent.getBoundingClientRect();
      /*
      * Main logic for setting the toolbar position.
      */

      toolbarNode.style.top = "".concat(selectionBoundary.top - parentBoundary.top - toolbarBoundary.height - 5, "px");
      // toolbarNode.style.width = `${toolbarBoundary.width}px`;
      var widthDiff = selectionBoundary.width - toolbarBoundary.width;
      if (widthDiff >= 0) {
        toolbarNode.style.left = "".concat(selectionBoundary.left - parentBoundary.left + widthDiff / 2, "px");
      } else {
        var left = selectionBoundary.left - parentBoundary.left;
        left += widthDiff / 2;
        var initialLeft = left;
        if (left + toolbarBoundary.width > parentBoundary.width + maxOverhang) {
          left = parentBoundary.width - toolbarBoundary.width + maxOverhang;
        }
        if (left < -maxOverhang) left = -maxOverhang;
        toolbarNode.style.left = "".concat(left, "px");
        var arrowLeft = initialLeft - left + toolbarBoundary.width / 2;
        if (arrowLeft < 9) arrowLeft = 9;
        if (arrowLeft > toolbarBoundary.width - 9) arrowLeft = toolbarBoundary.width - 9;
        this._arrowNode.style.left = "".concat(arrowLeft, "px");
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.which === 13) {
        e.preventDefault();
        e.stopPropagation();
        this.props.setLink(this.state.urlInputValue);
        this.hideLinkInput();
      } else if (e.which === 27) {
        this.hideLinkInput();
      }
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        urlInputValue: e.target.value
      });
    }
  }, {
    key: "handleLinkInput",
    value: function handleLinkInput(e) {
      var _this2 = this;
      var direct = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (direct !== true) {
        e.preventDefault();
        e.stopPropagation();
      }
      var editorState = this.props.editorState;
      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        this.props.focus();
        return;
      }
      var currentBlock = (0, _index2.getCurrentBlock)(editorState);
      var selectedEntity = '';
      var linkFound = false;
      currentBlock.findEntityRanges(function (character) {
        var entityKey = character.getEntity();
        selectedEntity = entityKey;
        return entityKey !== null && editorState.getCurrentContent().getEntity(entityKey).getType() === _constants.Entity.LINK;
      }, function (start, end) {
        var selStart = selection.getAnchorOffset();
        var selEnd = selection.getFocusOffset();
        if (selection.getIsBackward()) {
          selStart = selection.getFocusOffset();
          selEnd = selection.getAnchorOffset();
        }
        if (start === selStart && end === selEnd) {
          linkFound = true;
          var _editorState$getCurre = editorState.getCurrentContent().getEntity(selectedEntity).getData(),
            url = _editorState$getCurre.url;
          _this2.setState({
            showURLInput: true,
            urlInputValue: url
          }, function () {
            setTimeout(function () {
              _this2.urlinput.focus();
              _this2.urlinput.select();
            }, 0);
          });
        }
      });
      if (!linkFound) {
        this.setState({
          showURLInput: true
        }, function () {
          setTimeout(function () {
            _this2.urlinput.focus();
          }, 0);
        });
      }
    }
  }, {
    key: "hideLinkInput",
    value: function hideLinkInput() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (e !== null) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.setState({
        showURLInput: false,
        urlInputValue: ''
      }, this.props.focus);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        editorState = _this$props.editorState,
        editorEnabled = _this$props.editorEnabled,
        inlineButtons = _this$props.inlineButtons;
      var _this$state = this.state,
        showURLInput = _this$state.showURLInput,
        urlInputValue = _this$state.urlInputValue;
      var isOpen = true;
      if (!editorEnabled || editorState.getSelection().isCollapsed()) {
        isOpen = false;
      }
      if (showURLInput) {
        var className = "md-editor-toolbar".concat(isOpen ? ' md-editor-toolbar--isopen' : '');
        className += ' md-editor-toolbar--linkinput';
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "md-RichEditor-controls md-RichEditor-show-link-input",
          style: {
            display: 'block'
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "md-url-input-close",
          onClick: this.hideLinkInput
        }, "\xD7"), /*#__PURE__*/_react["default"].createElement("input", {
          ref: function ref(node) {
            _this3.urlinput = node;
          },
          type: "text",
          className: "md-url-input",
          onKeyDown: this.onKeyDown,
          onChange: this.onChange,
          placeholder: "Press ENTER or ESC",
          value: urlInputValue
        })));
      }
      var hasHyperLink = false;
      var hyperlinkLabel = '#';
      var hyperlinkDescription = 'Add a link';
      for (var cnt = 0; cnt < inlineButtons.length; cnt++) {
        if (inlineButtons[cnt].style === _constants.HYPERLINK) {
          hasHyperLink = true;
          if (inlineButtons[cnt].label) {
            hyperlinkLabel = inlineButtons[cnt].label;
          }
          if (inlineButtons[cnt].description) {
            hyperlinkDescription = inlineButtons[cnt].description;
          }
          break;
        }
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-editor-toolbar".concat(isOpen ? ' md-editor-toolbar--isopen' : ''),
        ref: function ref(node) {
          _this3._toolbarNode = node;
        }
      }, this.props.inlineButtons.length > 0 ? /*#__PURE__*/_react["default"].createElement(_inlinetoolbar["default"], {
        editorState: editorState,
        onToggle: this.props.toggleInlineStyle,
        buttons: this.props.inlineButtons
      }) : null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-editor-toolbar--arrow",
        ref: function ref(node) {
          _this3._arrowNode = node;
        }
      }), this.props.blockButtons.length > 0 ? /*#__PURE__*/_react["default"].createElement(_blocktoolbar["default"], {
        editorState: editorState,
        onToggle: this.props.toggleBlockType,
        buttons: this.props.blockButtons
      }) : null, hasHyperLink && /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-RichEditor-controls"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "md-RichEditor-styleButton md-RichEditor-linkButton hint--top",
        onClick: this.handleLinkInput,
        "aria-label": hyperlinkDescription
      }, hyperlinkLabel)));
    }
  }]);
}(_react["default"].Component);
Toolbar.propTypes = {
  editorEnabled: _propTypes["default"].bool,
  editorState: _propTypes["default"].object,
  toggleBlockType: _propTypes["default"].func,
  toggleInlineStyle: _propTypes["default"].func,
  inlineButtons: _propTypes["default"].arrayOf(_propTypes["default"].object),
  blockButtons: _propTypes["default"].arrayOf(_propTypes["default"].object),
  editorNode: _propTypes["default"].object,
  setLink: _propTypes["default"].func,
  focus: _propTypes["default"].func,
  maxOverhang: _propTypes["default"].number
};
Toolbar.defaultProps = {
  blockButtons: BLOCK_BUTTONS,
  inlineButtons: INLINE_BUTTONS
};
var BLOCK_BUTTONS = exports.BLOCK_BUTTONS = [{
  label: 'H3',
  style: 'header-three',
  icon: 'header',
  description: 'Heading 3'
}, {
  label: /*#__PURE__*/_react["default"].createElement("svg", {
    width: "10.83",
    height: "10",
    viewBox: "0 0 13 12"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(-357.000000, -255.000000)",
    fill: "#FFFFFF"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(260.000000, 165.000000)"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(0.000000, 75.000000)"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(19.000000, 0.000000)"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M90.500768,15 L91,15.56 C88.9631235,17.0533408 87.9447005,18.666658 87.9447005,20.4 C87.9447005,21.8800074 88.75012,23.1466614 90.3609831,24.2 L87.5453149,27 C85.9211388,25.7866606 85.109063,24.346675 85.109063,22.68 C85.109063,20.3199882 86.90628,17.7600138 90.500768,15 Z M83.3917051,15 L83.890937,15.56 C81.8540605,17.0533408 80.8356375,18.666658 80.8356375,20.4 C80.8356375,21.8800074 81.6344006,23.1466614 83.2319508,24.2 L80.4362519,27 C78.8120759,25.7866606 78,24.346675 78,22.68 C78,20.3199882 79.7972171,17.7600138 83.3917051,15 Z"
  }))))))),
  style: 'blockquote',
  icon: 'quote-right',
  description: 'Blockquote'
}, {
  label: 'UL',
  style: 'unordered-list-item',
  icon: 'list-ul',
  description: 'Unordered List'
}, {
  label: 'OL',
  style: 'ordered-list-item',
  icon: 'list-ol',
  description: 'Ordered List'
}, {
  label: '✓',
  style: 'todo',
  description: 'Todo List'
}];
var INLINE_BUTTONS = exports.INLINE_BUTTONS = [{
  label: 'B',
  style: 'BOLD',
  icon: 'bold',
  description: 'Bold'
}, {
  label: 'I',
  style: 'ITALIC',
  icon: 'italic',
  description: 'Italic'
}, {
  label: 'U',
  style: 'UNDERLINE',
  icon: 'underline',
  description: 'Underline'
}, {
  label: 'Hi',
  style: 'HIGHLIGHT',
  description: 'Highlight selection'
}, {
  label: /*#__PURE__*/_react["default"].createElement("svg", {
    width: "20",
    height: "15",
    viewBox: "0 0 14 14"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(-468.000000, -254.000000)",
    stroke: "#FFFFFF"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(260.000000, 165.000000)"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(0.000000, 75.000000)"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(19.000000, 0.000000)"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(196.424621, 21.424621) rotate(45.000000) translate(-196.424621, -21.424621) translate(193.424621, 13.924621)"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0.5,5.69098301 L0.5,2 C0.5,1.82069363 0.550664909,1.51670417 0.697213595,1.2236068 C0.927818928,0.762396132 1.32141313,0.5 2,0.5 L4,0.5 C4.67858687,0.5 5.07218107,0.762396132 5.3027864,1.2236068 C5.44933509,1.51670417 5.5,1.82069363 5.5,2 L5.5,6 C5.5,6.67858687 5.23760387,7.07218107 4.7763932,7.3027864 C4.53586606,7.42304998 4.28800365,7.47874077 4.1077327,7.49484936 L0.5,5.69098301 Z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M0.5,12.690983 L0.5,9 C0.5,8.82069363 0.550664909,8.51670417 0.697213595,8.2236068 C0.927818928,7.76239613 1.32141313,7.5 2,7.5 L4,7.5 C4.67858687,7.5 5.07218107,7.76239613 5.3027864,8.2236068 C5.44933509,8.51670417 5.5,8.82069363 5.5,9 L5.5,13 C5.5,13.6785869 5.23760387,14.0721811 4.7763932,14.3027864 C4.53586606,14.42305 4.28800365,14.4787408 4.1077327,14.4948494 L0.5,12.690983 Z",
    transform: "translate(3.000000, 11.000000) scale(-1, -1) translate(-3.000000, -11.000000) "
  })))))))),
  style: _constants.HYPERLINK,
  icon: 'link',
  description: 'Add a link'
}];