import React from 'react';
import {PageWrap} from './pageWrap.styled';
export default (props) => {
  return <PageWrap className="wrapper-top">{props.children}</PageWrap>;
};
