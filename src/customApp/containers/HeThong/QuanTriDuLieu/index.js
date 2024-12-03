import React, {Component} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from '../../../../components/utility/pageHeader';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {Input, message, Modal, Row, Col} from 'antd';
import Button from '../../../../components/uielements/button';
import actions from '../../../redux/HeThong/QuanTriDuLieu/actions';
import api from './config';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
} from '../../../../helpers/utility';
import queryString from 'query-string';
import {
  Select,
  OptionSelect,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {CloudUploadOutlined, CloudDownloadOutlined} from '@ant-design/icons';
import PageWrap from '../../../../components/utility/PageWrap';

const {Search} = Input;

class SaoLuuDuLieu extends Component {
  constructor(props) {
    super(props);
    document.title = 'Sao lưu, phục hồi dữ liệu';
    const filterData = queryString.parse(this.props.location.search);
    this.state = {
      filterData: filterData,
      tenFileSave: '',
      filePhucHoi: undefined,
      tenFileUpload: '',
      fileUpload: '',
      loading: false,
      filterByName: '',
    };
  }

  componentDidMount() {
    this.props.getInitData(this.state.filterData);
  }

  onSearch = (value, property) => {
    let oldFilterData = this.state.filterData;
    let onFilter = {value, property};
    let filterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    this.setState({filterData}, () => {
      changeUrlFilter(this.state.filterData); //change url
      this.props.getList(this.state.filterData); //get list
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = this.state.filterData;
    let onOrder = {pagination, filters, sorter};
    let filterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    this.setState({filterData}, () => {
      changeUrlFilter(this.state.filterData); //change url
      this.props.getList(this.state.filterData); //get list
    });
  };

  catChuoi = (e) => {
    e.target.value.trim().replace(/ +/g, ' ');
    const key = e.charCode;
    if (
      (key === 32 && e.target.value[e.target.value.length - 1] === ' ') ||
      (key === 32 && e.target.value.length === 0)
    ) {
      e.preventDefault();
    }
    // const regex = /^[^\t\r\n\\\/<>:"|?*]*[^\t\r\n\\\/<>:"|?*.\s]$/gm;
    if (
      key === 92 ||
      key === 47 ||
      key === 58 ||
      key === 42 ||
      key === 63 ||
      key === 34 ||
      key === 60 ||
      key === 62 ||
      key === 124
    ) {
      e.preventDefault();
      message.warn(
        'Tên file không được chứa kí tự đặc biệt ( / : * ? " < > |)',
      );
    }
    const tenFileSave = this.state.tenFileSave;
    if (tenFileSave.length === 50) {
      message.warn('Tên file chỉ chứa tối đa 50 ký tự');
    }
  };

  changeTenFile = (e) => {
    this.setState({tenFileSave: e.target.value});
  };

  saoLuu = () => {
    let tenFile = this.state.tenFileSave.trim();
    if (tenFile === '') {
      Modal.error({
        title: 'Lỗi',
        content: 'Chưa nhập tên file sao lưu',
        okText: 'Quay lại',
      });
    } else {
      //Call API sao lưu
      Modal.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn sao lưu dữ liệu hiện tại không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          const param = {fileName: tenFile};
          this.setState({loading: true});
          api
            .saoLuu(param)
            .then((response) => {
              this.setState({loading: false});
              if (response.data.Status > 0) {
                message.success(response.data.Message);
                this.props.getList(this.state.filterData);
                //GET NOTIFICATION
                this.props.getNotifications();
                this.setState({tenFileSave: ''});
              } else {
                this.setState({loading: false});
                Modal.error({
                  title: 'Lỗi',
                  content: response.data.Message,
                });
              }
            })
            .catch((error) => {
              this.setState({loading: false});
              Modal.error({
                title: 'Lỗi',
                content: 'Lỗi hệ thống',
              });
            });
        },
      });
    }
  };

  phucHoi = () => {
    const idPhucHoi = this.state.filePhucHoi;
    if (idPhucHoi === undefined) {
      Modal.error({
        title: 'Lỗi',
        content: 'Chưa chọn file phục hồi',
        okText: 'Quay lại',
      });
    } else {
      Modal.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn phục hồi dữ liệu này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          this.setState({loading: true});
          const param = {fileName: idPhucHoi};
          api
            .phucHoi(param)
            .then((response) => {
              this.setState({loading: false});
              if (response.data.Status > 0) {
                message.success(response.data.Message);
                this.setState({filePhucHoi: undefined});
                this.props.getList(this.state.filterData);
                //GET NOTIFICATION
                this.props.getNotifications();
              } else {
                this.setState({loading: false});
                Modal.error({
                  title: 'Lỗi',
                  content: response.data.Message,
                });
              }
            })
            .catch((error) => {
              this.setState({loading: false});
              Modal.error({
                title: 'Lỗi',
                content: 'Lỗi hệ thống',
              });
            });
        },
      });
    }
  };

  changeFilePhucHoi = (value) => {
    this.setState({filePhucHoi: value});
  };

  changeFilterByName = (value) => {
    this.setState({filterByName: value.target.value});
  };

  render() {
    const {LichSuSaoLuu, TotalRow, role} = this.props;
    const DanhSachPhucHoi = this.props.DanhSachPhucHoi
      ? this.props.DanhSachPhucHoi
      : [];
    const {filterData, loading, filePhucHoi, tenFileSave} = this.state;
    const PageNumber = filterData.PageNumber
      ? parseInt(filterData.PageNumber)
      : 1;
    const PageSize = filterData.PageSize
      ? parseInt(filterData.PageSize)
      : getDefaultPageSize();
    const column = [
      {
        title: 'STT',
        align: 'center',
        width: '5%',
        render: (text, record, index) => (
          <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
        ),
      },
      {
        title: 'Thời gian',
        dataIndex: 'LogTime',
        align: 'center',
        width: '30%',
        render: (text) => (
          <span>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</span>
        ),
      },
      {
        title: 'Thao tác',
        dataIndex: 'LogInfo',
        width: '35%',
      },
      {
        title: 'Người thực hiện',
        dataIndex: 'TenCanBo',
        width: '30%',
      },
    ];
    return (
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>SAO LƯU, PHỤC HỒI DỮ LIỆU</PageHeader>
        </PageWrap>
        {/* <Box></Box> */}
        <Box>
          <Row gutter={[16, 16]}>
            <Col span={24} xl={12}>
              {/*<Box>*/}
              <b style={{fontSize: 20}}>Sao lưu</b>
              <br />
              Tên file:
              <Input
                style={{width: '50%', marginLeft: 40, marginRight: 20}}
                value={tenFileSave}
                onChange={(value) => this.changeTenFile(value)}
                onKeyPress={(e) => this.catChuoi(e)}
                allowClear
                maxLength={50}
                disabled={loading}
                placeholder={'Nhập tên file sao lưu'}
                addonBefore={'NNCH_'}
              />
              <Button
                type={'primary'}
                style={{width: 110}}
                onClick={this.saoLuu}
                disabled={
                  loading && role.view && role.add && role.delete && role.edit
                }
              >
                <CloudUploadOutlined /> Sao lưu
              </Button>
              {/*</Box>*/}
            </Col>
            <Col span={24} xl={12}>
              {/*<Box>*/}
              <b style={{fontSize: 20}}>Phục hồi</b>
              <br />
              File sao lưu:
              <Select
                style={{width: '50%', marginLeft: 13, marginRight: 20}}
                notFoundContent={'Không có dữ liệu'}
                placeholder={'Chọn file phục hồi'}
                value={filePhucHoi}
                onChange={(value) => this.changeFilePhucHoi(value)}
                allowClear
                disabled={
                  loading && role.view && role.add && role.delete && role.view
                }
                showSearch
              >
                {DanhSachPhucHoi.map((item) => (
                  <OptionSelect value={item.TenFile}>
                    {item.TenFile}
                  </OptionSelect>
                ))}
              </Select>
              <Button
                style={{width: 110}}
                type={'primary'}
                onClick={this.phucHoi}
                disabled={this.state.loading}
              >
                <CloudDownloadOutlined /> Phục hồi
              </Button>
              <br />
              <br />
              <b>Chú ý</b>: Quá trình khôi phục dữ liệu có thể kéo dài. Trong
              quá trình này, những người dùng khác không thể truy cập hệ thống.
              {/*</Box>*/}
            </Col>
          </Row>
          <b style={{fontSize: 20}}>Lịch sử sao lưu</b>
          <BoxFilter>
            <Search
              placeholder={'Nhập thông tin cần tìm kiếm'}
              onSearch={(value) => this.onSearch(value, 'Keyword')}
              style={{width: 300}}
              value={this.state.filterByName}
              onChange={(value) => this.changeFilterByName(value)}
            />
          </BoxFilter>
          <BoxTable
            columns={column}
            dataSource={LichSuSaoLuu}
            loading={this.props.TableLoading}
            onChange={this.onTableChange}
            pagination={{
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Từ ${range[0]} đến ${range[1]} trên ${total}`,
              total: TotalRow,
              current: PageNumber,
              pageSize: PageSize,
            }}
          />
        </Box>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.SaoLuuDuLieu,
  };
}

export default connect(mapStateToProps, actions)(SaoLuuDuLieu);
