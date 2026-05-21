"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _CSSTransitionGroup = _interopRequireDefault(require("react-transition-group/CSSTransitionGroup"));
var _util = require("../util");
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // import './addbutton.scss';
/*
Implementation of the medium-link side `+` button to insert various rich blocks
like Images/Embeds/Videos.
*/
var AddButton = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function AddButton(props) {
    var _this;
    _classCallCheck(this, AddButton);
    _this = _callSuper(this, AddButton, [props]);
    _this.state = {
      style: {},
      visible: false,
      isOpen: false
    };
    _this.node = null;
    _this.blockKey = '';
    _this.blockType = '';
    _this.blockLength = -1;
    _this.findNode = _this.findNode.bind(_this);
    _this.hideBlock = _this.hideBlock.bind(_this);
    _this.openToolbar = _this.openToolbar.bind(_this);
    return _this;
  }

  // To show + button only when text length == 0
  _inherits(AddButton, _React$Component);
  return _createClass(AddButton, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var editorState = newProps.editorState;
      var contentState = editorState.getCurrentContent();
      var selectionState = editorState.getSelection();
      if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey || contentState.getBlockForKey(selectionState.getAnchorKey()).getType().indexOf('atomic') >= 0) {
        // console.log('no sel');
        this.hideBlock();
        return;
      }
      var block = contentState.getBlockForKey(selectionState.anchorKey);
      var bkey = block.getKey();
      if (block.getLength() > 0) {
        this.hideBlock();
        return;
      }
      if (block.getType() !== this.blockType) {
        this.blockType = block.getType();
        if (block.getLength() === 0) {
          setTimeout(this.findNode, 0);
        }
        this.blockKey = bkey;
        return;
      }
      if (this.blockKey === bkey) {
        // console.log('block exists');
        if (block.getLength() > 0) {
          this.hideBlock();
        } else {
          this.setState({
            visible: true
          });
        }
        return;
      }
      this.blockKey = bkey;
      if (block.getLength() > 0) {
        // console.log('no len');
        this.hideBlock();
        return;
      }
      setTimeout(this.findNode, 0);
    }

    // Show + button regardless of block length
    // componentWillReceiveProps(newProps) {
    //   const { editorState } = newProps;
    //   const contentState = editorState.getCurrentContent();
    //   const selectionState = editorState.getSelection();
    //   if (!selectionState.isCollapsed() || selectionState.anchorKey != selectionState.focusKey) {
    //     this.hideBlock();
    //     return;
    //   }
    //   const block = contentState.getBlockForKey(selectionState.anchorKey);
    //   const bkey = block.getKey();
    //   if (block.getType() !== this.blockType) {
    //     this.blockType = block.getType();
    //     setTimeout(this.findNode, 0);
    //     return;
    //   }
    //   if (this.blockKey === bkey) {
    //     this.setState({
    //       visible: true
    //     });
    //     return;
    //   }
    //   this.blockKey = bkey;
    //   setTimeout(this.findNode, 0);
    // }
  }, {
    key: "hideBlock",
    value: function hideBlock() {
      if (this.state.visible) {
        this.setState({
          visible: false,
          isOpen: false
        });
      }
    }
  }, {
    key: "openToolbar",
    value: function openToolbar() {
      this.setState({
        isOpen: !this.state.isOpen
      }, this.props.focus);
    }
  }, {
    key: "findNode",
    value: function findNode() {
      // eslint-disable-next-line no-undef
      var node = (0, _util.getSelectedBlockNode)(window);
      if (node === this.node) {
        // console.log('Node exists');
        return;
      }
      if (!node) {
        // console.log('no node');
        this.setState({
          visible: false,
          isOpen: false
        });
        return;
      }
      // const rect = node.getBoundingClientRect();
      this.node = node;
      this.setState({
        visible: true,
        style: {
          top: node.offsetTop - 3
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.state.visible) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "md-side-toolbar",
          style: this.state.style
        }, /*#__PURE__*/_react["default"].createElement("button", {
          onClick: this.openToolbar,
          className: "md-sb-button md-add-button".concat(this.state.isOpen ? ' md-open-button' : ''),
          type: "button"
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          viewBox: "0 0 8 8",
          height: "14",
          width: "14"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          d: "M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"
        }))), this.state.isOpen ? /*#__PURE__*/_react["default"].createElement(_CSSTransitionGroup["default"], {
          transitionName: "md-example",
          transitionEnterTimeout: 200,
          transitionLeaveTimeout: 100,
          transitionAppear: true,
          transitionAppearTimeout: 100
        }, this.props.sideButtons.map(function (button) {
          var Button = button.component;
          return /*#__PURE__*/_react["default"].createElement(Button, {
            key: button.title,
            getEditorState: _this2.props.getEditorState,
            setEditorState: _this2.props.setEditorState,
            close: _this2.openToolbar
          });
        })) : null);
      }
      return null;
    }
  }]);
}(_react["default"].Component);
AddButton.propTypes = {
  focus: _propTypes["default"].func,
  getEditorState: _propTypes["default"].func.isRequired,
  setEditorState: _propTypes["default"].func.isRequired,
  sideButtons: _propTypes["default"].arrayOf(_propTypes["default"].object)
};