import React from 'react';

const style = {
	container: {
		display: 'block',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
	}
};

const props_to_response = (props) => {
	return {
		text: (Array.isArray(props.children) ? props.children.join(' ') : props.children) ,
		"value": props.value
	};
};

class Option extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.selected) {
			this.props.onClick(props_to_response(this.props));
		}
	}

	render() {
		return (
			<a className={"option"+((this.props.focused)? " focused" : "")} style={{...style.container,...this.props.style}} onClick={() => {
				this.props.onClick(props_to_response(this.props));
			}} href="javascript:void(0);">{this.props.children}</a>
		);
	}
}

module.exports = Option;