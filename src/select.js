import React from 'react';
import Option from './option';
import onClickOutside from 'react-onclickoutside';

const style = {
	container: {
		display: 'inline-block',
		minWidth: '100px'
	},
	selected_option: {
		display: 'block',
		border: '1px solid black',
		width: '100%',
		textDecoration: 'none',
	},
	options_dropdown_wrapper: {
		display: 'block',
		position: 'realtive',
	},
	options_dropdown: {
		display: 'block',
		position: 'absolute',
		border: '1px solid black',
		borderTop: 'none',
		zIndex: 10000,
	}
};

/**
 * Calculates the width our container should occupy
 */
const calculate_container_width = function() {
	this.refs.container.style.minWidth = '';
	this.refs.options_dropdown.style.minWidth = '';
	this.refs.options_dropdown.style.display = '';

	const dims = this.refs.options_dropdown.getBoundingClientRect();

	this.refs.container.style.minWidth = Math.ceil(dims.width)+"px";
	this.refs.options_dropdown.style.minWidth = Math.ceil(dims.width)+"px";

	if (!this.state.open) {
		this.refs.options_dropdown.style.display = 'none';
	}
	else {
		this.refs.options_dropdown.style.display = '';
	}
}

class Select extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedOption: {"value": "", text: "&nbsp;"},
			focusedIndex: 0,
			open: false
		};
	}
	toggleSelect() {
		this.setState({
			open: !this.state.open,
		});
	}
	handleClickOutside(evt) {
		this.setState({
			open: false
		});
	}
	handleOptionChange(index, option) {
		this.setState({
			selectedOption: option,
			open: false,
			focusedIndex: index,
		});

		if (this.props.onChange) {
			this.props.onChange(option);
		}
	}
	handleKeyDown(event) {
		let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

		let offset = 0;
		switch(event.keyCode) {
			// Down
			case 40:
				offset += 1;
				break;
			// Up
			case 38:
				offset -= 1;
				break;
		}

		switch(event.keyCode) {
			case 40:
			case 38:
			case 13:
				const focusedIndex = Math.min(Math.max(this.state.focusedIndex+offset,0), children.length),
				selectedOption = ((event.keyCode === 13)? {
					"value": (children[focusedIndex-1] ? children[focusedIndex-1].props.value : ""),
					text: (children[focusedIndex-1] ? children[focusedIndex-1].props.children : "&nbsp;"),
				} : this.state.selectedOption);

				this.setState({
					focusedIndex: focusedIndex,
					selectedOption: selectedOption,
				});

				if ((event.keyCode === 13) && this.props.onChange) {
					this.props.onChange(selectedOption);
				}
				break;
		}
	}
	componentDidMount() {
		calculate_container_width.call(this);
	}
	componentDidUpdate() {
		calculate_container_width.call(this);
	}
	render() {
		const children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child) => {
			return typeof(child) != "undefined";
		}).reduce((a, b) => {
			return a.concat(b);
		}, []);

		return (
			<div className="select" style={style.container} ref="container">
				<a
					style={{...style.selected_option}} href="javascript:void(0)"
					onKeyDown={this.handleKeyDown.bind(this)}
					className="selected-option"
					onClick={this.toggleSelect.bind(this)}
					dangerouslySetInnerHTML={{__html: ((this.state.selectedOption) ? this.state.selectedOption.text : "&nbsp;")}}></a>
				{(() => {
					return (
						<div style={style.options_dropdown_wrapper} className="options-dropdown-wrapper" ref="options_dropdown_wrapper">
							<div style={style.options_dropdown} className="options-dropdown" ref="options_dropdown">
								{(() => {
									// We want to bind props to each child - normally we would just do {this.props.children}
									return children.map((child, index) => {
										return React.cloneElement(child, {
											key: "option_"+(index+1),
											focused: ((index+1) === this.state.focusedIndex),
											onClick: this.handleOptionChange.bind(this, (index+1))
										})
									})
								})()}
							</div>
						</div>
					);
				})()}
			</div>
		);
	}
}

Select.propTypes = {
	children: function (props, propName, componentName) {
		const prop = props[propName];

		let error = null
		React.Children.forEach(prop, function (child) {
			if (child && child.type !== Option) {
				error = new Error('`' + componentName + '` children should be of type `Option`.');
			}
		});

		return error;
	}
}

module.exports = onClickOutside(Select, {
	handleClickOutside: function(instance) {
		return instance.handleClickOutside.bind(instance);
	}
});