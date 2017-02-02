'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	container: {
		display: 'block',
		textDecoration: 'none',
		whiteSpace: 'nowrap'
	}
};

var props_to_response = function props_to_response(props) {
	return {
		text: Array.isArray(props.children) ? props.children.join(' ') : props.children,
		"value": props.value
	};
};

var Option = function (_React$Component) {
	_inherits(Option, _React$Component);

	function Option(props) {
		_classCallCheck(this, Option);

		return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));
	}

	_createClass(Option, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.selected) {
				this.props.onClick(props_to_response(this.props));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'a',
				{ className: "option" + (this.props.focused ? " focused" : ""), style: _extends({}, style.container, this.props.style), onClick: function onClick() {
						_this2.props.onClick(props_to_response(_this2.props));
					}, href: 'javascript:void(0);' },
				this.props.children
			);
		}
	}]);

	return Option;
}(_react2.default.Component);

module.exports = Option;