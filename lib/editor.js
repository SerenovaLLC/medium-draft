"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
var _isSoftNewlineEvent = _interopRequireDefault(require("draft-js/lib/isSoftNewlineEvent"));
var _addbutton = _interopRequireDefault(require("./components/addbutton"));
var _toolbar = _interopRequireWildcard(require("./components/toolbar"));
var _LinkEditComponent = _interopRequireDefault(require("./components/LinkEditComponent"));
var _customrenderer = _interopRequireDefault(require("./components/customrenderer"));
var _customstylemap = _interopRequireDefault(require("./util/customstylemap"));
var _rendermap = _interopRequireDefault(require("./util/rendermap"));
var _keybinding = _interopRequireDefault(require("./util/keybinding"));
var _constants = require("./util/constants");
var _beforeinput = _interopRequireWildcard(require("./util/beforeinput"));
var _blockStyleFn = _interopRequireDefault(require("./util/blockStyleFn"));
var _model = require("./model");
var _image = _interopRequireDefault(require("./components/sides/image"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
/*
A wrapper over `draft-js`'s default **Editor** component which provides
some built-in customisations like custom blocks (todo, caption, etc) and
some key handling for ease of use so that users' mouse usage is minimum.
*/
var MediumDraftEditor = /*#__PURE__*/function (_React$Component) {
  function MediumDraftEditor(props) {
    var _this;
    _classCallCheck(this, MediumDraftEditor);
    _this = _callSuper(this, MediumDraftEditor, [props]);
    _this.removeLink = function (blockKey, entityKey) {
      var editorState = _this.props.editorState;
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(blockKey);
      var oldSelection = editorState.getSelection();
      block.findEntityRanges(function (character) {
        var eKey = character.getEntity();
        return eKey === entityKey;
      }, function (start, end) {
        var selection = new _draftJs.SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: start,
          focusOffset: end
        });
        var newEditorState = _draftJs.EditorState.forceSelection(_draftJs.RichUtils.toggleLink(editorState, selection, null), oldSelection);
        _this.onChange(newEditorState, _this.focus);
      });
    };
    _this.editLinkAfterSelection = function (blockKey) {
      var entityKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (entityKey === null) {
        return;
      }
      var editorState = _this.props.editorState;
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(blockKey);
      block.findEntityRanges(function (character) {
        var eKey = character.getEntity();
        return eKey === entityKey;
      }, function (start, end) {
        var selection = new _draftJs.SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: start,
          focusOffset: end
        });
        var newEditorState = _draftJs.EditorState.forceSelection(editorState, selection);
        _this.onChange(newEditorState);
        setTimeout(function () {
          if (_this.toolbar) {
            _this.toolbar.handleLinkInput(null, true);
          }
        }, 100);
      });
    };
    _this.focus = function () {
      return _this._editorNode.focus();
    };
    _this.onChange = function (editorState) {
      _this.props.onChange(editorState);
    };
    _this.getEditorState = function () {
      return _this.props.editorState;
    };
    _this.onTab = _this.onTab.bind(_this);
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.handleBeforeInput = _this.handleBeforeInput.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);
    _this.toggleBlockType = _this._toggleBlockType.bind(_this);
    _this.toggleInlineStyle = _this._toggleInlineStyle.bind(_this);
    _this.setLink = _this.setLink.bind(_this);
    _this.blockRendererFn = _this.props.rendererFn(_this.onChange, _this.getEditorState);
    return _this;
  }

  /*
  Implemented to provide nesting of upto 2 levels in ULs or OLs.
  */
  _inherits(MediumDraftEditor, _React$Component);
  return _createClass(MediumDraftEditor, [{
    key: "onTab",
    value: function onTab(e) {
      var editorState = this.props.editorState;
      var newEditorState = _draftJs.RichUtils.onTab(e, editorState, 2);
      if (newEditorState !== editorState) {
        this.onChange(newEditorState);
      }
    }

    /*
    Adds a hyperlink on the selected text with some basic checks.
    */
  }, {
    key: "setLink",
    value: function setLink(url) {
      var editorState = this.props.editorState;
      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var entityKey = null;
      var newUrl = url;
      if (url !== '') {
        if (url.indexOf('http') === -1) {
          if (url.indexOf('@') >= 0) {
            newUrl = "mailto:".concat(newUrl);
          } else {
            newUrl = "http://".concat(newUrl);
          }
        }
        var contentWithEntity = content.createEntity(_constants.Entity.LINK, 'MUTABLE', {
          url: newUrl
        });
        editorState = _draftJs.EditorState.push(editorState, contentWithEntity, 'create-entity');
        entityKey = contentWithEntity.getLastCreatedEntityKey();
      }
      this.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, entityKey), this.focus);
    }

    /*
    Handles custom commands based on various key combinations. First checks
    for some built-in commands. If found, that command's function is apllied and returns.
    If not found, it checks whether parent component handles that command or not.
    Some of the internal commands are:
     - showlinkinput -> Opens up the link input tooltip if some text is selected.
    - add-new-block -> Adds a new block at the current cursor position.
    - changetype:block-type -> If the command starts with `changetype:` and
      then succeeded by the block type, the current block will be converted to that particular type.
    - toggleinline:inline-type -> If the command starts with `toggleinline:` and
      then succeeded by the inline type, the current selection's inline type will be
      togglled.
    */
  }, {
    key: "handleKeyCommand",
    value: function handleKeyCommand(command) {
      // console.log(command);
      var editorState = this.props.editorState;
      if (this.props.handleKeyCommand) {
        var behaviour = this.props.handleKeyCommand(command);
        if (behaviour === _constants.HANDLED || behaviour === true) {
          return _constants.HANDLED;
        }
      }
      if (command === _constants.KEY_COMMANDS.showLinkInput()) {
        if (!this.props.disableToolbar && this.toolbar) {
          // For some reason, scroll is jumping sometimes for the below code.
          // Debug and fix it later.
          var isCursorLink = (0, _model.isCursorBetweenLink)(editorState);
          if (isCursorLink) {
            this.editLinkAfterSelection(isCursorLink.blockKey, isCursorLink.entityKey);
            return _constants.HANDLED;
          }
          this.toolbar.handleLinkInput(null, true);
          return _constants.HANDLED;
        }
        return _constants.NOT_HANDLED;
      } else if (command === _constants.KEY_COMMANDS.unlink()) {
        var _isCursorLink = (0, _model.isCursorBetweenLink)(editorState);
        if (_isCursorLink) {
          this.removeLink(_isCursorLink.blockKey, _isCursorLink.entityKey);
          return _constants.HANDLED;
        }
      }
      /* else if (command === KEY_COMMANDS.addNewBlock()) {
        const { editorState } = this.props;
        this.onChange(addNewBlock(editorState, Block.BLOCKQUOTE));
        return HANDLED;
      } */
      var block = (0, _model.getCurrentBlock)(editorState);
      var currentBlockType = block.getType();
      // if (command === KEY_COMMANDS.deleteBlock()) {
      //   if (currentBlockType.indexOf(Block.ATOMIC) === 0 && block.getText().length === 0) {
      //     this.onChange(resetBlockWithType(editorState, Block.UNSTYLED, { text: '' }));
      //     return HANDLED;
      //   }
      //   return NOT_HANDLED;
      // }
      if (command.indexOf("".concat(_constants.KEY_COMMANDS.changeType())) === 0) {
        var newBlockType = command.split(':')[1];
        // const currentBlockType = block.getType();
        if (currentBlockType === _constants.Block.ATOMIC) {
          return _constants.HANDLED;
        }
        if (currentBlockType === _constants.Block.BLOCKQUOTE && newBlockType === _constants.Block.CAPTION) {
          newBlockType = _constants.Block.BLOCKQUOTE_CAPTION;
        } else if (currentBlockType === _constants.Block.BLOCKQUOTE_CAPTION && newBlockType === _constants.Block.CAPTION) {
          newBlockType = _constants.Block.BLOCKQUOTE;
        }
        this.onChange(_draftJs.RichUtils.toggleBlockType(editorState, newBlockType));
        return _constants.HANDLED;
      } else if (command.indexOf("".concat(_constants.KEY_COMMANDS.toggleInline())) === 0) {
        var inline = command.split(':')[1];
        this._toggleInlineStyle(inline);
        return _constants.HANDLED;
      }
      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return _constants.HANDLED;
      }
      return _constants.NOT_HANDLED;
    }

    /*
    This function is responsible for emitting various commands based on various key combos.
    */
  }, {
    key: "handleBeforeInput",
    value: function handleBeforeInput(str) {
      return this.props.beforeInput(this.props.editorState, str, this.onChange, this.props.stringToTypeMap);
    }

    /*
    By default, it handles return key for inserting soft breaks (BRs in HTML) and
    also instead of inserting a new empty block after current empty block, it first check
    whether the current block is of a type other than `unstyled`. If yes, current block is
    simply converted to an unstyled empty block. If RETURN is pressed on an unstyled block
    default behavior is executed.
    */
  }, {
    key: "handleReturn",
    value: function handleReturn(e) {
      if (this.props.handleReturn) {
        var behavior = this.props.handleReturn();
        if (behavior === _constants.HANDLED || behavior === true) {
          return _constants.HANDLED;
        }
      }
      var editorState = this.props.editorState;
      if ((0, _isSoftNewlineEvent["default"])(e)) {
        this.onChange(_draftJs.RichUtils.insertSoftNewline(editorState));
        return _constants.HANDLED;
      }
      if (!e.altKey && !e.metaKey && !e.ctrlKey) {
        var currentBlock = (0, _model.getCurrentBlock)(editorState);
        var blockType = currentBlock.getType();
        if (blockType.indexOf(_constants.Block.ATOMIC) === 0) {
          this.onChange((0, _model.addNewBlockAt)(editorState, currentBlock.getKey()));
          return _constants.HANDLED;
        }
        if (currentBlock.getLength() === 0) {
          switch (blockType) {
            case _constants.Block.UL:
            case _constants.Block.OL:
            case _constants.Block.BLOCKQUOTE:
            case _constants.Block.BLOCKQUOTE_CAPTION:
            case _constants.Block.CAPTION:
            case _constants.Block.TODO:
            case _constants.Block.H2:
            case _constants.Block.H3:
            case _constants.Block.H1:
              this.onChange((0, _model.resetBlockWithType)(editorState, _constants.Block.UNSTYLED));
              return _constants.HANDLED;
            default:
              return _constants.NOT_HANDLED;
          }
        }
        var selection = editorState.getSelection();
        if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
          if (this.props.continuousBlocks.indexOf(blockType) < 0) {
            this.onChange((0, _model.addNewBlockAt)(editorState, currentBlock.getKey()));
            return _constants.HANDLED;
          }
          return _constants.NOT_HANDLED;
        }
        return _constants.NOT_HANDLED;
      }
      return _constants.NOT_HANDLED;
    }

    /*
    The function documented in `draft-js` to be used to toggle block types (mainly
    for some key combinations handled by default inside draft-js).
    */
  }, {
    key: "_toggleBlockType",
    value: function _toggleBlockType(blockType) {
      var type = _draftJs.RichUtils.getCurrentBlockType(this.props.editorState);
      if (type.indexOf("".concat(_constants.Block.ATOMIC, ":")) === 0) {
        return;
      }
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }

    /*
    The function documented in `draft-js` to be used to toggle inline styles of selection (mainly
    for some key combinations handled by default inside draft-js).
    */
  }, {
    key: "_toggleInlineStyle",
    value: function _toggleInlineStyle(inlineStyle) {
      var type = _draftJs.RichUtils.getCurrentBlockType(this.props.editorState);
      if (type.indexOf(_constants.Block.H1.split('-')[0]) === 0) {
        return;
      }
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
    }
  }, {
    key: "render",
    value:
    /*
    Renders the `Editor`, `Toolbar` and the side `AddButton`.
    */
    function render() {
      var _this2 = this;
      var _this$props = this.props,
        editorState = _this$props.editorState,
        editorEnabled = _this$props.editorEnabled,
        disableToolbar = _this$props.disableToolbar,
        showLinkEditToolbar = _this$props.showLinkEditToolbar;
      var showAddButton = editorEnabled;
      var editorClass = "md-RichEditor-editor".concat(!editorEnabled ? ' md-RichEditor-readonly' : '');
      var isCursorLink = false;
      if (editorEnabled && showLinkEditToolbar) {
        isCursorLink = (0, _model.isCursorBetweenLink)(editorState);
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "md-RichEditor-root"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: editorClass
      }, /*#__PURE__*/_react["default"].createElement(_draftJs.Editor, _extends({
        ref: function ref(node) {
          _this2._editorNode = node;
        }
      }, this.props, {
        editorState: editorState,
        blockRendererFn: this.blockRendererFn,
        blockStyleFn: this.props.blockStyleFn,
        onChange: this.onChange,
        onTab: this.onTab,
        blockRenderMap: this.props.blockRenderMap,
        handleKeyCommand: this.handleKeyCommand,
        handleBeforeInput: this.handleBeforeInput,
        handleReturn: this.handleReturn,
        customStyleMap: this.props.customStyleMap,
        readOnly: !editorEnabled,
        keyBindingFn: this.props.keyBindingFn,
        placeholder: this.props.placeholder,
        spellCheck: editorEnabled && this.props.spellCheck
      })), this.props.sideButtons.length > 0 && showAddButton && /*#__PURE__*/_react["default"].createElement(_addbutton["default"], {
        editorState: editorState,
        getEditorState: this.getEditorState,
        setEditorState: this.onChange,
        focus: this.focus,
        sideButtons: this.props.sideButtons
      }), !disableToolbar && /*#__PURE__*/_react["default"].createElement(_toolbar["default"], {
        ref: function ref(c) {
          _this2.toolbar = c;
        },
        editorNode: this._editorNode,
        editorState: editorState,
        toggleBlockType: this.toggleBlockType,
        toggleInlineStyle: this.toggleInlineStyle,
        editorEnabled: editorEnabled,
        setLink: this.setLink,
        focus: this.focus,
        blockButtons: this.props.blockButtons,
        inlineButtons: this.props.inlineButtons,
        maxOverhang: this.props.maxOverhang
      }), isCursorLink && /*#__PURE__*/_react["default"].createElement(_LinkEditComponent["default"], _extends({}, isCursorLink, {
        editorState: editorState,
        removeLink: this.removeLink,
        editLink: this.editLinkAfterSelection
      }))));
    }
  }]);
}(_react["default"].Component);
MediumDraftEditor.propTypes = {
  beforeInput: _propTypes["default"].func,
  keyBindingFn: _propTypes["default"].func,
  customStyleMap: _propTypes["default"].object,
  blockStyleFn: _propTypes["default"].func,
  rendererFn: _propTypes["default"].func,
  editorEnabled: _propTypes["default"].bool,
  spellCheck: _propTypes["default"].bool,
  stringToTypeMap: _propTypes["default"].object,
  blockRenderMap: _propTypes["default"].object,
  blockButtons: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, _propTypes["default"].object]),
    style: _propTypes["default"].string.isRequired,
    icon: _propTypes["default"].string,
    description: _propTypes["default"].string
  })),
  inlineButtons: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, _propTypes["default"].object]),
    style: _propTypes["default"].string.isRequired,
    icon: _propTypes["default"].string,
    description: _propTypes["default"].string
  })),
  placeholder: _propTypes["default"].string,
  continuousBlocks: _propTypes["default"].arrayOf(_propTypes["default"].string),
  sideButtons: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    title: _propTypes["default"].string.isRequired,
    component: _propTypes["default"].func
  })),
  editorState: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  handleKeyCommand: _propTypes["default"].func,
  handleReturn: _propTypes["default"].func,
  disableToolbar: _propTypes["default"].bool,
  showLinkEditToolbar: _propTypes["default"].bool,
  maxOverhang: _propTypes["default"].number
};
MediumDraftEditor.defaultProps = {
  beforeInput: _beforeinput["default"],
  keyBindingFn: _keybinding["default"],
  customStyleMap: _customstylemap["default"],
  blockStyleFn: _blockStyleFn["default"],
  rendererFn: _customrenderer["default"],
  editorEnabled: true,
  spellCheck: true,
  stringToTypeMap: _beforeinput.StringToTypeMap,
  blockRenderMap: _rendermap["default"],
  blockButtons: _toolbar.BLOCK_BUTTONS,
  inlineButtons: _toolbar.INLINE_BUTTONS,
  placeholder: 'Write your story...',
  continuousBlocks: [_constants.Block.UNSTYLED, _constants.Block.BLOCKQUOTE, _constants.Block.OL, _constants.Block.UL, _constants.Block.CODE, _constants.Block.TODO],
  sideButtons: [{
    title: 'Image',
    component: _image["default"]
  }],
  disableToolbar: false,
  showLinkEditToolbar: true,
  maxOverhang: 0
};
var _default = exports["default"] = MediumDraftEditor;