import styled from 'styled-components';
import {palette} from 'styled-theme';

const breadcrumb_theme = [palette('primary', 0), '#FFF'];

export default styled.div`
  // margin: 20px 0 0 20px;
  // text-align: center;
  // display: inline-block;
  // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  // overflow: hidden;
  // border-radius: 5px;
  // counter-reset: flag;
  // position: relative;
  // &.absolute {
  //   position: absolute;
  //   z-index: 99;
  // }
  
  // .breadcrumb_step {
  //   text-decoration: none;
  //   outline: none;
  //   display: block;
  //   float: left;
  //   font-size: 12px;
  //   line-height: 36px;
  //   padding: 0 20px 0 20px;
  //   position: relative;
  //   background: ${breadcrumb_theme[1]};
  //   color: ${breadcrumb_theme[0]};
  //   transition: background .5s;
  //   cursor: pointer;
    
  //   &:first-child {
  //     /* padding-left: 46px; */
  //     border-radius: 5px 0 0 5px;
      
  //     &::before {
  //       left: 14px;
  //     }
  //   }
    
  //   &:last-child {
  //     border-radius: 0 5px 5px 0;
  //     padding-right: 20px;

  //     &::after {
  //       content: none;
  //     }
  //   }
    
  //   &::after {
  //     content: '';
  //     position: absolute;
  //     top: 50%;
  //     transform: translateY(-50%);
  //     right: -5px;
  //     width: 10px;
  //     height: 10px;
  //     clip-path: circle(50% at 50% 50%);
  //     z-index: 1;
  //     background: #fff;
  //     transition: .5s;

  //   }
    
  //   &.active {
  //     color : ${breadcrumb_theme[1]};
  //     background: ${breadcrumb_theme[0]};

  //     &::before {
  //       color: ${breadcrumb_theme[0]};
  //     }

  //     &::after {
  //       background: ${breadcrumb_theme[0]};
  //     }
  //   }

  //   &:hover {
  //     color: ${breadcrumb_theme[1]};
  //     background: ${breadcrumb_theme[0]};

  //     &::before {
  //       color: ${breadcrumb_theme[0]};
  //     }
        

  //     &::after {
  //       color: ${breadcrumb_theme[0]};
  //       background: ${breadcrumb_theme[0]};
  //     }
  //   }
  // }
`;