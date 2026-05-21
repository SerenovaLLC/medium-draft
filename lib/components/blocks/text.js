"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import './text.scss';
// export default class Paragraph extends Component {
//    render(){
//     return (
//       <EditorBlock {...this.props} />
//     );
//    }
// }
var _default = exports["default"] = function _default(props) {
  return /*#__PURE__*/_react["default"].createElement(_draftJs.EditorBlock, props);
};