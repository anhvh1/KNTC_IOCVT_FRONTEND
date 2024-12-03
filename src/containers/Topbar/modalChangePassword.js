import React, {Component} from 'react';
import api from './config';
import Constants, {
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../settings/constants';
import {Form, Input, message, Modal} from 'antd';
import {ModalCustom, Button} from '../../components/uielements/exportComponent';

const {Item} = Form;

class ModalChangePassword extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleLocal: true,
      loading: false,
    };
  }

  onOk = async (e) => {
    e.preventDefault();
    const value = await this.formRef.current.validateFields();
    if (value.OldPassword === value.NewPassword) {
      Modal.error({
        title: 'Thông báo',
        content: 'Mật khẩu mới không được giống mật khẩu cũ',
      });
    } else if (value.NewPassword.indexOf(' ') >= 0) {
      Modal.error({
        title: 'Thông báo',
        content: 'Mật khẩu không được chứa khoảng trắng',
      });
    } else if (value.NewPassword !== value.ConfirmPassword) {
      Modal.error({
        title: 'Thông báo',
        content: 'Mật khẩu mới không trùng với nhập lại mật khẩu',
      });
    } else {
      this.setState({loading: true}, () => {
        api
          .changePassword(value)
          .then((response) => {
            this.setState({loading: false}, () => {
              if (response.data.Status > 0) {
                message.success('Cập nhật mật khẩu thành công');
                this.onCancelLocal();
                setTimeout(() => {
                  this.props.logout();
                }, 1000);
              } else {
                message.destroy();
                message.error(response.data.Message);
              }
            });
          })
          .catch((error) => {
            this.setState({loading: false});
            message.destroy();
            message.error(error.toString());
          });
      });
    }
  };

  onCancelLocal = () => {
    this.setState({visibleLocal: false}, () => {
      this.props.onCancel();
    });
  };

  render() {
    let visible = false;
    if (this.props.visible && this.state.visibleLocal) {
      visible = true;
    }
    return (
      <ModalCustom
        title="Thay đổi mật khẩu"
        width={500}
        visible={visible}
        onCancel={this.onCancelLocal}
        footer={[
          <Button key="back" onClick={this.onCancelLocal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            form="myForm"
            loading={this.state.loading}
            onClick={this.onOk}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form ref={this.formRef}>
          <Item
            label="Mật khẩu hiện tại"
            name={'OldPassword'}
            rules={[{...REQUIRED}]}
            {...ITEM_LAYOUT_SMALL_2}
          >
            <Input.Password autoFocus />
          </Item>
          <Item
            label="Mật khẩu mới"
            name={'NewPassword'}
            rules={[
              {...REQUIRED},
              {min: 6, message: 'Mật khẩu của bạn quá ngắn'},
              {
                max: 30,
                message: 'Mật khẩu của bạn quá dài',
              },
            ]}
            {...ITEM_LAYOUT_SMALL_2}
          >
            <Input.Password />
          </Item>
          <Item
            label="Nhập lại mật khẩu"
            name={'ConfirmPassword'}
            rules={[{...REQUIRED}]}
            {...ITEM_LAYOUT_SMALL_2}
          >
            <Input.Password />
          </Item>
        </Form>
      </ModalCustom>
    );
  }
}

export {ModalChangePassword};
