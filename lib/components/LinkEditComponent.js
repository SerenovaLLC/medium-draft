"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _draftJs = require("draft-js");
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _getRelativeParent = function getRelativeParent(element) {
  if (!element) {
    return null;
  }
  var position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }
  return _getRelativeParent(element.parentElement);
};
var LinkEditComponent = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function LinkEditComponent(props) {
    var _this;
    _classCallCheck(this, LinkEditComponent);
    _this = _callSuper(this, LinkEditComponent, [props]);
    _this.calculatePosition = function () {
      if (!_this.toolbar) {
        return;
      }
      var relativeParent = _getRelativeParent(_this.toolbar.parentElement);
      var relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : window.document.body.getBoundingClientRect();
      var selectionRect = (0, _draftJs.getVisibleSelectionRect)(window);
      if (!selectionRect) {
        return;
      }
      var position = {
        top: selectionRect.top - relativeRect.top + 35,
        left: selectionRect.left - relativeRect.left + selectionRect.width / 2,
        transform: 'translate(-50%) scale(1)'
      };
      _this.setState({
        position: position
      });
    };
    _this.removeLink = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.removeLink(_this.props.blockKey, _this.props.entityKey);
    };
    _this.editLink = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.props.editLink(_this.props.blockKey, _this.props.entityKey);
    };
    _this.state = {
      position: {}
    };
    _this.renderedOnce = false;
    return _this;
  }
  _inherits(LinkEditComponent, _React$Component);
  return _createClass(LinkEditComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setTimeout(this.calculatePosition, 0);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps) {
      if (this.renderedOnce) {
        var ret = this.props.blockKey !== newProps.blockKey || this.props.entityKey !== newProps.entityKey;
        if (ret) {
          this.renderedOnce = false;
        }
        return ret;
      }
      this.renderedOnce = true;
      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      setTimeout(this.calculatePosition, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var url = this.props.url;
      if (url.length > 30) {
        url = "".concat(url.slice(0, 30), "...");
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-editor-toolbar md-editor-toolbar--isopen md-editor-toolbar-edit-link",
        style: this.state.position,
        ref: function ref(element) {
          _this2.toolbar = element;
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: this.props.url,
        title: this.props.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, url), /*#__PURE__*/_react["default"].createElement("button", {
        className: "md-editor-toolbar-unlink-button",
        onClick: this.removeLink
      }, "Unlink"), /*#__PURE__*/_react["default"].createElement("button", {
        className: "md-editor-toolbar-edit-button",
        onClick: this.editLink
      }, "Edit"));
    }
  }]);
}(_react["default"].Component);
LinkEditComponent.propTypes = {
  editorState: _propTypes["default"].object.isRequired,
  url: _propTypes["default"].string.isRequired,
  blockKey: _propTypes["default"].string.isRequired,
  entityKey: _propTypes["default"].string.isRequired,
  removeLink: _propTypes["default"].func.isRequired,
  editLink: _propTypes["default"].func.isRequired
};