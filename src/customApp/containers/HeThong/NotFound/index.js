import React, {useState, useEffect} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Wrapper = styled.div`
  .notification {
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 150px;
  }
  .title {
    font-size: 40px;
    font-weight: 600;
  }
  .subtitle {
    font-size: 20px;
    font-weight: 500;
  }
  .redirect {
    font-size: 18px;
    font-weight: 500;
  }
`;

const NotFound = (props) => {
  document.title = 'Quản lý chức năng';
  return (
    <LayoutWrapper>
      <Wrapper>
        <div className="notification">
          <p className="title">Access to this page is restricted</p>
          <p className="subtitle">Bạn không đủ quyền thực hiện chức năng này</p>
          <Link to="/dashboard">
            <p className="redirect">Trang chủ</p>
          </Link>
        </div>
      </Wrapper>
    </LayoutWrapper>
  );
};

export default NotFound;
