import {_debounce} from '../../../../helpers/utility';
const handleChangeTinhHuyenXaDoiTuongKhieuNai = _debounce(
  (
    index,
    value,
    key,
    options2,
    form,
    setDanhSachDoiTuongKN,
    DanhSachDoiTuongKN,
    handleRenderDefaultLocation,
  ) => {
    const newDanhSachDoiTuongKhieuNai = [...DanhSachDoiTuongKN];

    if (options2.key === 'TenTinh') {
      newDanhSachDoiTuongKhieuNai[index]['TenHuyen'] = '';
      newDanhSachDoiTuongKhieuNai[index]['TenXa'] = '';
      form.setFieldsValue({
        [`HuyenID${index}`]: null,
        [`XaID${index}`]: null,
      });
    }
    if (options2.key === 'TenHuyen') {
      newDanhSachDoiTuongKhieuNai[index]['TenXa'] = '';
      form.setFieldsValue({
        [`XaID${index}`]: null,
      });
    }

    newDanhSachDoiTuongKhieuNai[index][key] = value;
    newDanhSachDoiTuongKhieuNai[options2?.index][options2?.key] =
      options2?.value;
    const SoNha = newDanhSachDoiTuongKhieuNai[index]?.SoNha;
    const TenXa = newDanhSachDoiTuongKhieuNai[index]?.TenXa;
    const TenHuyen = newDanhSachDoiTuongKhieuNai[index]?.TenHuyen;
    const TenTinh = newDanhSachDoiTuongKhieuNai[index]?.TenTinh;
    const valueDiaChi = handleRenderDefaultLocation(
      TenTinh,
      TenHuyen,
      TenXa,
      SoNha,
    );

    newDanhSachDoiTuongKhieuNai[index]['DiaChiCT'] = valueDiaChi;
    form.setFieldsValue({
      [`DiaChiCT${index}`]: valueDiaChi,
    });
    setDanhSachDoiTuongKN(newDanhSachDoiTuongKhieuNai);
  },
  300,
);

export {handleChangeTinhHuyenXaDoiTuongKhieuNai};
