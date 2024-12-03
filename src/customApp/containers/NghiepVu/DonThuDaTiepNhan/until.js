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
  ) => {
    const newDanhSachDoiTuongKhieuNai = [...DanhSachDoiTuongKN];
    newDanhSachDoiTuongKhieuNai[index][key] = value;
    newDanhSachDoiTuongKhieuNai[options2?.index][options2?.key] =
      options2?.value;
    let valueDiaChi;
    if (options2.key === 'TenTinh') {
      newDanhSachDoiTuongKhieuNai[index]['TenHuyen'] = '';
      newDanhSachDoiTuongKhieuNai[index]['TenXa'] = '';
      valueDiaChi = options2?.value
        ? ` ${
            newDanhSachDoiTuongKhieuNai[index]?.SoNha
              ? `${newDanhSachDoiTuongKhieuNai[index]?.SoNha}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenXa &&
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Xã ${newDanhSachDoiTuongKhieuNai[index]?.TenXa}`
              : ''
          }  ${
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Huyện ${newDanhSachDoiTuongKhieuNai[index]?.TenHuyen}`
              : ''
          } ${options2?.value ? `, Tỉnh ${options2?.value}` : ''} `
        : '';
      form.setFieldsValue({
        [`HuyenID${index}`]: null,
        [`XaID${index}`]: null,
        [`DiaChiCT${index}`]: valueDiaChi,
      });
    }
    if (options2.key === 'TenHuyen') {
      newDanhSachDoiTuongKhieuNai[index]['TenXa'] = '';
      valueDiaChi = newDanhSachDoiTuongKhieuNai[index]?.TenTinh
        ? `${
            newDanhSachDoiTuongKhieuNai[index]?.SoNha
              ? `${newDanhSachDoiTuongKhieuNai[index]?.SoNha}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenXa &&
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Xã ${newDanhSachDoiTuongKhieuNai[index]?.TenXa}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Huyện ${newDanhSachDoiTuongKhieuNai[index]?.TenHuyen}`
              : ''
          }  ${
            newDanhSachDoiTuongKhieuNai[index]?.TenTinh
              ? `, Tỉnh ${newDanhSachDoiTuongKhieuNai[index]?.TenTinh}`
              : ''
          }  `
        : '';
      form.setFieldsValue({
        [`XaID${index}`]: null,
        [`DiaChiCT${index}`]: valueDiaChi,
      });
    }
    if (options2.key === 'TenXa') {
      valueDiaChi = newDanhSachDoiTuongKhieuNai[index]?.TenTinh
        ? ` ${
            newDanhSachDoiTuongKhieuNai[index]?.SoNha
              ? `${newDanhSachDoiTuongKhieuNai[index]?.SoNha}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenXa &&
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Xã ${newDanhSachDoiTuongKhieuNai[index]?.TenXa}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Huyện ${newDanhSachDoiTuongKhieuNai[index]?.TenHuyen}`
              : ''
          }  ${
            newDanhSachDoiTuongKhieuNai[index]?.TenTinh
              ? `, Tỉnh ${newDanhSachDoiTuongKhieuNai[index]?.TenTinh}`
              : ''
          } `
        : '';
      form.setFieldsValue({
        [`DiaChiCT${index}`]: valueDiaChi,
      });
    }
    if (options2.key === 'SoNha') {
      valueDiaChi = newDanhSachDoiTuongKhieuNai[index]?.TenTinh
        ? ` ${
            newDanhSachDoiTuongKhieuNai[index]?.SoNha
              ? `${newDanhSachDoiTuongKhieuNai[index]?.SoNha}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenXa &&
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Xã ${newDanhSachDoiTuongKhieuNai[index]?.TenXa}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenHuyen
              ? `, Huyện ${newDanhSachDoiTuongKhieuNai[index]?.TenHuyen}`
              : ''
          } ${
            newDanhSachDoiTuongKhieuNai[index]?.TenTinh
              ? `, Tỉnh ${newDanhSachDoiTuongKhieuNai[index]?.TenTinh}`
              : ''
          }  `
        : '';
      form.setFieldsValue({
        [`DiaChiCT${index}`]: valueDiaChi,
      });
    }
    newDanhSachDoiTuongKhieuNai[index]['DiaChiCT'] = valueDiaChi;
    setDanhSachDoiTuongKN(newDanhSachDoiTuongKhieuNai);
  },
  300,
);
const handleChangeTinhHuyenXaDoiTuongBiKN = _debounce(
  (key, value, options2) => {
    const newThongTinDoiTuongBiKhieuNai = {...DoiTuongBiKN};
    newThongTinDoiTuongBiKhieuNai[key] = value;
    newThongTinDoiTuongBiKhieuNai[options2.key] = options2.value;
    if (options2?.key === 'TenTinh') {
      newThongTinDoiTuongBiKhieuNai['TenHuyen'] = '';
      newThongTinDoiTuongBiKhieuNai['TenXa'] = '';
      form.setFieldsValue({
        HuyenIDDoiTuongBiKN: null,
        XaIDDoiTuongBiKN: null,
        DiaChiCTDoiTuongBiKN: options2.value
          ? `${
              newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN
                ? `${newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN}`
                : ''
            } ${
              newThongTinDoiTuongBiKhieuNai?.TenXa &&
              newThongTinDoiTuongBiKhieuNai?.TenHuyen
                ? `, Xã ${newThongTinDoiTuongBiKhieuNai?.TenXa}`
                : ''
            } ${
              newThongTinDoiTuongBiKhieuNai?.TenHuyen
                ? `, Huyện ${newThongTinDoiTuongBiKhieuNai?.TenHuyen}`
                : ''
            }  ${options2.value ? `, Tỉnh ${options2.value}` : ''}`
          : null,
      });
    }
    if (options2?.key === 'TenHuyen') {
      newThongTinDoiTuongBiKhieuNai['TenXa'] = '';
      form.setFieldsValue({
        XaIDDoiTuongBiKN: null,
        DiaChiCTDoiTuongBiKN: `${
          newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN
            ? `${newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN}`
            : ''
        } ${
          newThongTinDoiTuongBiKhieuNai?.TenXa &&
          newThongTinDoiTuongBiKhieuNai?.TenHuyen
            ? `, Xã ${newThongTinDoiTuongBiKhieuNai?.TenXa}`
            : ''
        } ${options2.value ? `, Huyện ${options2.value}` : ''}${
          newThongTinDoiTuongBiKhieuNai?.TenTinh
            ? `, Tỉnh ${newThongTinDoiTuongBiKhieuNai?.TenTinh}`
            : ''
        }  `,
      });
    }
    if (options2?.key === 'TenXa') {
      form.setFieldsValue({
        DiaChiCTDoiTuongBiKN: `${
          newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN
            ? `${newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN}`
            : ''
        }  ${options2.value ? `, Xã ${options2.value}` : ''} ${
          newThongTinDoiTuongBiKhieuNai?.TenHuyen
            ? `, Huyện ${newThongTinDoiTuongBiKhieuNai?.TenHuyen}`
            : ''
        } ${
          newThongTinDoiTuongBiKhieuNai?.TenTinh
            ? `, Tỉnh ${newThongTinDoiTuongBiKhieuNai?.TenTinh}`
            : ''
        } `,
      });
    }
    if (options2?.key === 'SoNhaDoiTuongBiKN') {
      form.setFieldsValue({
        DiaChiCTDoiTuongBiKN: `${options2.value ? `${options2.value}` : ''} ${
          newThongTinDoiTuongBiKhieuNai?.TenXa
            ? `, Xã ${newThongTinDoiTuongBiKhieuNai?.TenXa}`
            : ''
        } ${
          newThongTinDoiTuongBiKhieuNai?.TenHuyen
            ? `, Huyện ${newThongTinDoiTuongBiKhieuNai?.TenHuyen}`
            : ''
        }  ${
          newThongTinDoiTuongBiKhieuNai?.TenTinh
            ? `, Tỉnh ${newThongTinDoiTuongBiKhieuNai?.TenTinh}`
            : ''
        }  `,
      });
    }
    setDoiTuongBiKN(newThongTinDoiTuongBiKhieuNai);
  },
  300,
);
export {handleChangeTinhHuyenXaDoiTuongKhieuNai};
