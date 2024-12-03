import React from 'react';
import {Row, Col} from 'antd';
import styled from 'styled-components';

function Layout({children}) {
  return (
    <>
      <Row gutter={[40, 40]}>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 24}}
          lg={{span: 24}}
          xl={{span: 10}}
          xxl={{span: 9}}
          className="border-right"
        >
          {children[0]}
        </Col>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 24}}
          lg={{span: 24}}
          xl={{span: 14}}
          xxl={{span: 15}}
        >
          {children[1]}
        </Col>
      </Row>
    </>
  );
}

const PageWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TitleWrapperStyled = styled.h2`
  display: inline-block;
  font-size: 18px;
  margin-bottom: unset;
  height: 100%;
  /* padding-bottom: 10px; */
`;

export function PageWrapper({children}) {
  return <PageWrapperStyled>{children}</PageWrapperStyled>;
}

export function PageTitle({children}) {
  return <TitleWrapperStyled>{children}</TitleWrapperStyled>;
}

export default Layout;
