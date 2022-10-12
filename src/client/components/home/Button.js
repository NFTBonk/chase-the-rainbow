import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../../utils/styles';

const transition = css`
  transition: box-shadow 0.15s;
  padding: ${({ size }) => (size === 'large' ? '17px 140px' : '17px 50px')};
`;

export const PrimaryButton = styled.button`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: ${colors.PINK};
  border: 1px solid black;
  box-shadow: 5px 5px 0 black;
  border-radius: 10px;
  cursor: pointer;

  ${transition}
  :hover {
    box-shadow: 0 0 0 black;
  }
`;

export const SecondaryButton = styled.button`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: transparent;
  border: 1px solid white;
  box-shadow: 5px 5px 0 white;
  color: white;
  border-radius: 10px;
  cursor: pointer;

  ${transition}
  :hover {
    box-shadow: 0 0 0 white;
  }
`;

export const TextButton = styled.button`
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  background: transparent;
  border: 0;
  box-shadow: none;
  cursor: pointer;

  :hover {
    color: white;
  }
`;

export default function Button({
  priority, size, children, ...props
}) {
  let ChosenButton;

  switch (priority) {
    case 'primary':
      ChosenButton = PrimaryButton;
      break;
    case 'secondary':
      ChosenButton = SecondaryButton;
      break;
    case 'text':
      ChosenButton = TextButton;
      break;
    default:
      ChosenButton = PrimaryButton;
  }

  return (
    <ChosenButton size={size} {...props}>
      {children}
    </ChosenButton>
  );
}

Button.defaultProps = {
  priority: 'primary',
  size: 'normal',
};

Button.propTypes = {
  priority: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['normal', 'large']),
  children: PropTypes.any,
};
