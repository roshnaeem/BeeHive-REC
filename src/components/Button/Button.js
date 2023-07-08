// Button.js
import React, { Component } from 'react';
import { Container, Icon, Header, Segment} from 'semantic-ui-react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleButtonClick = () => {
    const { onClick, index } = this.props;
    onClick(index);
  };

  handleButtonHover = () => {
    this.setState({ isHovered: true });
  };

  handleButtonLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { buttonText, iconName, active } = this.props;
    const { isHovered } = this.state;
    const buttonColor = active ? '#21BA45' : '#FFFFFF';
    const textColor = (isHovered || active) ? '#FFFFFF' : '#21BA45';
    const hoverColor = '#21BA45';
    const outlineColor = '#FFFFFF';

    return (
      <button
        className="button"
        style={{
          backgroundColor: isHovered ? hoverColor : buttonColor,
          color: textColor,
          outlineColor: outlineColor,
        }}
        onMouseEnter={this.handleButtonHover}
        onMouseLeave={this.handleButtonLeave}
        onClick={this.handleButtonClick}
      >
        <span style={{ fontWeight: 'bold' }}><Icon name={iconName} />{buttonText}</span>
      </button>
    );
  }
}

export default Button;
