'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	container: {
		display: 'inline-block',
		minWidth: '100px'
	},
	selected_option: {
		display: 'block',
		border: '1px solid black',
		width: '100%',
		textDecoration: 'none'
	},
	options_dropdown_wrapper: {
		display: 'block',
		position: 'realtive'
	},
	options_dropdown: {
		display: 'block',
		position: 'absolute',
		border: '1px solid black',
		borderTop: 'none',
		zIndex: 10000
	}
};

/**
 * Calculates the width our container should occupy
 */
var calculate_container_width = function calculate_container_width() {
	this.refs.container.style.minWidth = '';
	this.refs.options_dropdown.style.minWidth = '';
	this.refs.options_dropdown.style.display = '';

	var dims = this.refs.options_dropdown.getBoundingClientRect();

	this.refs.container.style.minWidth = Math.ceil(dims.width) + "px";
	this.refs.options_dropdown.style.minWidth = Math.ceil(dims.width) + "px";

	if (!this.state.open) {
		this.refs.options_dropdown.style.display = 'none';
	} else {
		this.refs.options_dropdown.style.display = '';
	}
};

var Select = function (_React$Component) {
	_inherits(Select, _React$Component);

	function Select() {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

		_this.state = {
			selectedOption: { "value": "", text: "&nbsp;" },
			focusedIndex: 0,
			open: false
		};
		return _this;
	}

	_createClass(Select, [{
		key: 'toggleSelect',
		value: function toggleSelect() {
			this.setState({
				open: !this.state.open
			});
		}
	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside(evt) {
			this.setState({
				open: false
			});
		}
	}, {
		key: 'handleOptionChange',
		value: function handleOptionChange(index, option) {
			this.setState({
				selectedOption: option,
				open: false,
				focusedIndex: index
			});

			if (this.props.onChange) {
				this.props.onChange(option);
			}
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

			var offset = 0;
			switch (event.keyCode) {
				// Down
				case 40:
					offset += 1;
					break;
				// Up
				case 38:
					offset -= 1;
					break;
			}

			switch (event.keyCode) {
				case 40:
				case 38:
				case 13:
					var focusedIndex = Math.min(Math.max(this.state.focusedIndex + offset, 0), children.length),
					    selectedOption = event.keyCode === 13 ? {
						"value": children[focusedIndex - 1] ? children[focusedIndex - 1].props.value : "",
						text: children[focusedIndex - 1] ? children[focusedIndex - 1].props.children : "&nbsp;"
					} : this.state.selectedOption;

					this.setState({
						focusedIndex: focusedIndex,
						selectedOption: selectedOption
					});

					if (event.keyCode === 13 && this.props.onChange) {
						this.props.onChange(selectedOption);
					}
					break;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			calculate_container_width.call(this);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			calculate_container_width.call(this);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter(function (child) {
				return typeof child != "undefined";
			}).reduce(function (a, b) {
				return a.concat(b);
			}, []);

			return _react2.default.createElement(
				'div',
				{ className: 'select', style: style.container, ref: 'container' },
				_react2.default.createElement('a', {
					style: _extends({}, style.selected_option), href: 'javascript:void(0)',
					onKeyDown: this.handleKeyDown.bind(this),
					className: 'selected-option',
					onClick: this.toggleSelect.bind(this),
					dangerouslySetInnerHTML: { __html: this.state.selectedOption ? this.state.selectedOption.text : "&nbsp;" } }),
				function () {
					return _react2.default.createElement(
						'div',
						{ style: style.options_dropdown_wrapper, className: 'options-dropdown-wrapper', ref: 'options_dropdown_wrapper' },
						_react2.default.createElement(
							'div',
							{ style: style.options_dropdown, className: 'options-dropdown', ref: 'options_dropdown' },
							function () {
								// We want to bind props to each child - normally we would just do {this.props.children}
								return children.map(function (child, index) {
									return _react2.default.cloneElement(child, {
										key: "option_" + (index + 1),
										focused: index + 1 === _this2.state.focusedIndex,
										onClick: _this2.handleOptionChange.bind(_this2, index + 1)
									});
								});
							}()
						)
					);
				}()
			);
		}
	}]);

	return Select;
}(_react2.default.Component);

Select.propTypes = {
	children: function children(props, propName, componentName) {
		var prop = props[propName];

		var error = null;
		_react2.default.Children.forEach(prop, function (child) {
			if (child && child.type !== _option2.default) {
				error = new Error('`' + componentName + '` children should be of type `Option`.');
			}
		});

		return error;
	}
};

module.exports = (0, _reactOnclickoutside2.default)(Select, {
	handleClickOutside: function handleClickOutside(instance) {
		return instance.handleClickOutside.bind(instance);
	}
});