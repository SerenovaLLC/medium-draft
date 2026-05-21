"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _draftJs = require("draft-js");
require("draft-js/dist/Draft.css");
require("hint.css/hint.min.css");
require("./index.scss");
require("./components/addbutton.scss");
require("./components/toolbar.scss");
require("./components/blocks/text.scss");
require("./components/blocks/atomic.scss");
require("./components/blocks/blockquotecaption.scss");
require("./components/blocks/caption.scss");
require("./components/blocks/todo.scss");
require("./components/blocks/image.scss");
var _index2 = require("./index");
var _exporter = require("./exporter");
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable */
var newTypeMap = _index2.StringToTypeMap;
newTypeMap['2.'] = _index2.Block.OL;
var hasCommandModifier = _draftJs.KeyBindingUtil.hasCommandModifier;

/*
A demo for example editor. (Feature not built into medium-draft as too specific.)
Convert quotes to curly quotes.
*/
var DQUOTE_START = '“';
var DQUOTE_END = '”';
var SQUOTE_START = '‘';
var SQUOTE_END = '’';
var newBlockToHTML = function newBlockToHTML(block) {
  var blockType = block.type;
  if (block.type === _index2.Block.ATOMIC) {
    if (block.text === 'E') {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: '</figure>'
      };
    } else if (block.text === '-') {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-block-atomic md-block-atomic-break"
      }, /*#__PURE__*/_react["default"].createElement("hr", null));
    }
  }
  return (0, _exporter.blockToHTML)(block);
};
var newEntityToHTML = function newEntityToHTML(entity, originalText) {
  if (entity.type === 'embed') {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("a", {
      className: "embedly-card",
      href: entity.data.url,
      "data-card-controls": "0",
      "data-card-theme": "dark"
    }, "Embedded \u2015 ", entity.data.url));
  }
  return (0, _exporter.entityToHTML)(entity, originalText);
};
var handleBeforeInput = function handleBeforeInput(editorState, str, onChange) {
  if (str === '"' || str === '\'') {
    var currentBlock = (0, _index2.getCurrentBlock)(editorState);
    var selectionState = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var text = currentBlock.getText();
    var len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(_draftJs.EditorState.push(editorState, _draftJs.Modifier.insertText(contentState, selectionState, str === '"' ? DQUOTE_START : SQUOTE_START), 'transpose-characters'));
      return _index2.HANDLED;
    } else if (len > 0) {
      var lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(_draftJs.EditorState.push(editorState, _draftJs.Modifier.insertText(contentState, selectionState, str === '"' ? DQUOTE_END : SQUOTE_END), 'transpose-characters'));
      } else {
        onChange(_draftJs.EditorState.push(editorState, _draftJs.Modifier.insertText(contentState, selectionState, str === '"' ? DQUOTE_START : SQUOTE_START), 'transpose-characters'));
      }
      return _index2.HANDLED;
    }
  }
  return (0, _index2.beforeInput)(editorState, str, onChange, newTypeMap);
};
var SeparatorSideButton = /*#__PURE__*/function (_React$Component) {
  function SeparatorSideButton(props) {
    var _this;
    _classCallCheck(this, SeparatorSideButton);
    _this = _callSuper(this, SeparatorSideButton, [props]);
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }
  _inherits(SeparatorSideButton, _React$Component);
  return _createClass(SeparatorSideButton, [{
    key: "onClick",
    value: function onClick() {
      var editorState = this.props.getEditorState();
      var content = editorState.getCurrentContent();
      var contentWithEntity = content.createEntity('separator', 'IMMUTABLE', {});
      var entityKey = contentWithEntity.getLastCreatedEntityKey();
      editorState = _draftJs.EditorState.push(editorState, contentWithEntity, 'create-entity');
      this.props.setEditorState(_draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, '-'));
      this.props.close();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("button", {
        className: "md-sb-button md-sb-img-button",
        type: "button",
        title: "Add a separator",
        onClick: this.onClick
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa fa-minus"
      }));
    }
  }]);
}(_react["default"].Component);
var EmbedSideButton = /*#__PURE__*/function (_React$Component2) {
  function EmbedSideButton(props) {
    var _this2;
    _classCallCheck(this, EmbedSideButton);
    _this2 = _callSuper(this, EmbedSideButton, [props]);
    _this2.onClick = _this2.onClick.bind(_this2);
    _this2.addEmbedURL = _this2.addEmbedURL.bind(_this2);
    return _this2;
  }
  _inherits(EmbedSideButton, _React$Component2);
  return _createClass(EmbedSideButton, [{
    key: "onClick",
    value: function onClick() {
      var url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
      this.props.close();
      if (!url) {
        return;
      }
      this.addEmbedURL(url);
    }
  }, {
    key: "addEmbedURL",
    value: function addEmbedURL(url) {
      var editorState = this.props.getEditorState();
      var content = editorState.getCurrentContent();
      var contentWithEntity = content.createEntity('embed', 'IMMUTABLE', {
        url: url
      });
      var entityKey = contentWithEntity.getLastCreatedEntityKey();
      editorState = _draftJs.EditorState.push(editorState, contentWithEntity, 'create-entity');
      this.props.setEditorState(_draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'E'));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("button", {
        className: "md-sb-button md-sb-img-button",
        type: "button",
        title: "Add an Embed",
        onClick: this.onClick
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa fa-code"
      }));
    }
  }]);
}(_react["default"].Component);
EmbedSideButton.propTypes = {
  setEditorState: _propTypes["default"].func,
  getEditorState: _propTypes["default"].func,
  close: _propTypes["default"].func
};
var AtomicEmbedComponent = /*#__PURE__*/function (_React$Component3) {
  function AtomicEmbedComponent(props) {
    var _this3;
    _classCallCheck(this, AtomicEmbedComponent);
    _this3 = _callSuper(this, AtomicEmbedComponent, [props]);
    _this3.state = {
      showIframe: false
    };
    _this3.enablePreview = _this3.enablePreview.bind(_this3);
    return _this3;
  }
  _inherits(AtomicEmbedComponent, _React$Component3);
  return _createClass(AtomicEmbedComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderEmbedly();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
        this.renderEmbedly();
      }
    }
  }, {
    key: "getScript",
    value: function getScript() {
      var script = document.createElement('script');
      script.async = 1;
      script.src = '//cdn.embedly.com/widgets/platform.js';
      script.onload = function () {
        window.embedly();
      };
      document.body.appendChild(script);
    }
  }, {
    key: "renderEmbedly",
    value: function renderEmbedly() {
      if (window.embedly) {
        window.embedly();
      } else {
        this.getScript();
      }
    }
  }, {
    key: "enablePreview",
    value: function enablePreview() {
      this.setState({
        showIframe: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var url = this.props.data.url;
      var innerHTML = "<div><a class=\"embedly-card\" href=\"".concat(url, "\" data-card-controls=\"0\" data-card-theme=\"dark\">Embedded \u2015 ").concat(url, "</a></div>");
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-block-atomic-embed"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: innerHTML
        }
      }));
    }
  }]);
}(_react["default"].Component);
AtomicEmbedComponent.propTypes = {
  data: _propTypes["default"].object.isRequired
};
var AtomicSeparatorComponent = function AtomicSeparatorComponent(props) {
  return /*#__PURE__*/_react["default"].createElement("hr", null);
};
var AtomicBlock = function AtomicBlock(props) {
  var blockProps = props.blockProps,
    block = props.block;
  var content = blockProps.getEditorState().getCurrentContent();
  var entity = content.getEntity(block.getEntityAt(0));
  var data = entity.getData();
  var type = entity.getType();
  if (blockProps.components[type]) {
    var AtComponent = blockProps.components[type];
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "md-block-atomic-wrapper md-block-atomic-wrapper-".concat(type)
    }, /*#__PURE__*/_react["default"].createElement(AtComponent, {
      data: data
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("p", null, "Block of type ", /*#__PURE__*/_react["default"].createElement("b", null, type), " is not supported.");
};
var App = /*#__PURE__*/function (_React$Component4) {
  function App(props) {
    var _this4;
    _classCallCheck(this, App);
    _this4 = _callSuper(this, App, [props]);
    _this4.state = {
      editorState: (0, _index2.createEditorState)(),
      editorEnabled: true,
      placeholder: 'Write here...'
    };
    _this4.onChange = function (editorState) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (_this4.state.editorEnabled) {
        _this4.setState({
          editorState: editorState
        }, function () {
          if (callback) {
            callback();
          }
        });
      }
    };
    _this4.sideButtons = [{
      title: 'Image',
      component: _index2.ImageSideButton
    }, {
      title: 'Embed',
      component: EmbedSideButton
    }, {
      title: 'Separator',
      component: SeparatorSideButton
    }];
    _this4.exporter = (0, _exporter.setRenderOptions)({
      styleToHTML: _exporter.styleToHTML,
      blockToHTML: newBlockToHTML,
      entityToHTML: newEntityToHTML
    });
    _this4.getEditorState = function () {
      return _this4.state.editorState;
    };
    _this4.logData = _this4.logData.bind(_this4);
    _this4.renderHTML = _this4.renderHTML.bind(_this4);
    _this4.toggleEdit = _this4.toggleEdit.bind(_this4);
    _this4.fetchData = _this4.fetchData.bind(_this4);
    _this4.loadSavedData = _this4.loadSavedData.bind(_this4);
    _this4.keyBinding = _this4.keyBinding.bind(_this4);
    _this4.handleKeyCommand = _this4.handleKeyCommand.bind(_this4);
    _this4.handleDroppedFiles = _this4.handleDroppedFiles.bind(_this4);
    _this4.handleReturn = _this4.handleReturn.bind(_this4);
    return _this4;
  }
  _inherits(App, _React$Component4);
  return _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setTimeout(this.fetchData, 1000);
    }
  }, {
    key: "rendererFn",
    value: function rendererFn(setEditorState, getEditorState) {
      var atomicRenderers = {
        embed: AtomicEmbedComponent,
        separator: AtomicSeparatorComponent
      };
      var rFnOld = (0, _index2.rendererFn)(setEditorState, getEditorState);
      var rFnNew = function rFnNew(contentBlock) {
        var type = contentBlock.getType();
        switch (type) {
          case _index2.Block.ATOMIC:
            return {
              component: AtomicBlock,
              editable: false,
              props: {
                components: atomicRenderers,
                getEditorState: getEditorState
              }
            };
          default:
            return rFnOld(contentBlock);
        }
      };
      return rFnNew;
    }
  }, {
    key: "keyBinding",
    value: function keyBinding(e) {
      if (hasCommandModifier(e)) {
        if (e.which === 83) {
          /* Key S */
          return 'editor-save';
        }
        // else if (e.which === 74 /* Key J */) {
        //  return 'do-nothing';
        //}
      }
      if (e.altKey === true) {
        if (e.shiftKey === true) {
          switch (e.which) {
            /* Alt + Shift + L */
            case 76:
              return 'load-saved-data';
            /* Key E */
            // case 69: return 'toggle-edit-mode';
          }
        }
        if (e.which === 72 /* Key H */) {
          return 'toggleinline:HIGHLIGHT';
        }
      }
      return (0, _index2.keyBindingFn)(e);
    }
  }, {
    key: "handleKeyCommand",
    value: function handleKeyCommand(command) {
      if (command === 'editor-save') {
        window.localStorage['editor'] = JSON.stringify((0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent()));
        window.ga('send', 'event', 'draftjs', command);
        return true;
      } else if (command === 'load-saved-data') {
        this.loadSavedData();
        return true;
      } else if (command === 'toggle-edit-mode') {
        this.toggleEdit();
      }
      return false;
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this5 = this;
      window.ga('send', 'event', 'draftjs', 'load-data', 'ajax');
      this.setState({
        placeholder: 'Loading...'
      });
      var req = new XMLHttpRequest();
      req.open('GET', 'data.json', true);
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          var data = JSON.parse(req.responseText);
          _this5.setState({
            editorState: (0, _index2.createEditorState)(data),
            placeholder: 'Write here...'
          }, function () {
            _this5._editor.focus();
          });
          window.ga('send', 'event', 'draftjs', 'data-success');
        }
      };
      req.send();
    }
  }, {
    key: "logData",
    value: function logData(e) {
      var currentContent = this.state.editorState.getCurrentContent();
      var es = (0, _draftJs.convertToRaw)(currentContent);
      console.log(es);
      console.log(this.state.editorState.getSelection().toJS());
      window.ga('send', 'event', 'draftjs', 'log-data');
    }
  }, {
    key: "renderHTML",
    value: function renderHTML(e) {
      var currentContent = this.state.editorState.getCurrentContent();
      var eHTML = this.exporter(currentContent);
      var newWin = window.open("".concat(window.location.pathname, "rendered.html"), 'windowName', "height=".concat(window.screen.height, ",width=").concat(window.screen.wdith));
      newWin.onload = function () {
        return newWin.postMessage(eHTML, window.location.origin);
      };
    }
  }, {
    key: "loadSavedData",
    value: function loadSavedData() {
      var data = window.localStorage.getItem('editor');
      if (data === null) {
        return;
      }
      try {
        var blockData = JSON.parse(data);
        console.log(blockData);
        this.onChange(_draftJs.EditorState.push(this.state.editorState, (0, _draftJs.convertFromRaw)(blockData)), this._editor.focus);
      } catch (e) {
        console.log(e);
      }
      window.ga('send', 'event', 'draftjs', 'load-data', 'localstorage');
    }
  }, {
    key: "toggleEdit",
    value: function toggleEdit(e) {
      var _this6 = this;
      this.setState({
        editorEnabled: !this.state.editorEnabled
      }, function () {
        window.ga('send', 'event', 'draftjs', 'toggle-edit', _this6.state.editorEnabled + '');
      });
    }
  }, {
    key: "handleDroppedFiles",
    value: function handleDroppedFiles(selection, files) {
      window.ga('send', 'event', 'draftjs', 'filesdropped', files.length + ' files');
      var file = files[0];
      if (file.type.indexOf('image/') === 0) {
        // eslint-disable-next-line no-undef
        var src = URL.createObjectURL(file);
        this.onChange((0, _index2.addNewBlockAt)(this.state.editorState, selection.getAnchorKey(), _index2.Block.IMAGE, {
          src: src
        }));
        return _index2.HANDLED;
      }
      return _index2.NOT_HANDLED;
    }
  }, {
    key: "handleReturn",
    value: function handleReturn(e) {
      // const currentBlock = getCurrentBlock(this.state.editorState);
      // var text = currentBlock.getText();
      return _index2.NOT_HANDLED;
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;
      var _this$state = this.state,
        editorState = _this$state.editorState,
        editorEnabled = _this$state.editorEnabled;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "editor-action"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.logData
      }, "Log State"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.renderHTML
      }, "Render HTML"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.toggleEdit
      }, "Toggle Edit")), /*#__PURE__*/_react["default"].createElement(_index2.Editor, {
        ref: function ref(e) {
          _this7._editor = e;
        },
        editorState: editorState,
        onChange: this.onChange,
        editorEnabled: editorEnabled,
        handleDroppedFiles: this.handleDroppedFiles,
        handleKeyCommand: this.handleKeyCommand,
        placeholder: this.state.placeholder,
        keyBindingFn: this.keyBinding,
        beforeInput: handleBeforeInput,
        handleReturn: this.handleReturn,
        sideButtons: this.sideButtons,
        rendererFn: this.rendererFn
      }));
    }
  }]);
}(_react["default"].Component);
if (!__PROD__) {
  window.ga = function () {
    console.log(arguments);
  };
}
_reactDom["default"].render(/*#__PURE__*/_react["default"].createElement(App, null), document.getElementById('app'));