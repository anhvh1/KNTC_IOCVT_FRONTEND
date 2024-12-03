import React from "react";
import {
  Button,
  Modal
} from "../../../../components/uielements/exportComponent";
import styled from 'styled-components';
import moment from "moment";

export default function (props) {
  const {visible, dataDetail, onCancel} = props;

  return (
    <Modal title={'Chi tiết nhật ký'}
           width={400}
           visible={visible}
           onCancel={onCancel}
           footer={<><Button key="back" onClick={onCancel}>Đóng</Button></>}
    >
      <Styled>
        <div className={'title'}>Người thực hiện</div>
        <div className={'content'}>{dataDetail.TenCanBo}</div>
        <div className={'title'}>Chi tiết</div>
        <div className={'content'}>{dataDetail.LogInfo}</div>
        <div className={'title'}>Thời gian</div>
        <div className={'content'}>
          {dataDetail.LogTime ? moment(dataDetail.LogTime).format('DD/MM/YYYY HH:mm:ss') : ""}
        </div>
      </Styled>
    </Modal>
  )
}

const Styled = styled.div`
 .title {
   margin-bottom: 10px;
   font-weight: bold;
 }
 
 .content {
    margin-left: 20px;
    margin-bottom: 10px;
 }
`;