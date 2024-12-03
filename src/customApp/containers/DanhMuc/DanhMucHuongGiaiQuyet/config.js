import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';
const apiUrl = {
  danhsach: server.v2Url + 'DanhMucHuongGiaiQuyet/DanhSachHuongGiaiQuyet',
  chitiet: server.v2Url + 'DanhMucHuongGiaiQuyet/HuongGiaiQuyetChiTiet',
  themmoi: server.v2Url + 'DanhMucHuongGiaiQuyet/ThemMoiHuongGiaiQuyet',
  capnhap: server.v2Url + 'DanhMucHuongGiaiQuyet/CapNhatHuongGiaiQuyet',
  xoa: server.v2Url + 'DanhMucHuongGiaiQuyet/XoaHuongGiaiQuyet',
};
const api = {
  DanhSachHuongGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.danhsach, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietHuongGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.chitiet, {
      ...param,
    });
  },
  ThemHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.themmoi, {
      ...param,
    });
  },
  CapNhapHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.capnhap, {
      ...param,
    });
  },
  XoaHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.xoa, param);
  },
};

export default api;
