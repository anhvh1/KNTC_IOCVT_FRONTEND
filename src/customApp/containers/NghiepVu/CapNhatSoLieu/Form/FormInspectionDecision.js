import React from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Wrapper = styled.div`
  .form-item {
    margin-bottom: 16px;
  }
`;

const InspectionDecisionForm = ({
  onSubmit,
  form,
  Form,
  Select,
  Option,
  Input,
  Upload,
  Button,
  message,
  DatePicker,
  REQUIRED,
}) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [externalMember, setExternalMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", unit: "" });

  const handleFinish = (values) => {
    onSubmit(values);
  };

  const handleAddMember = () => {
    const member = form.getFieldsValue();
    setTeamMembers([...teamMembers, member]);
    form.resetFields();
  };

  const handleRemoveMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record, index) => (
        <Button onClick={() => handleRemoveMember(index)}>Xóa</Button>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Item name="soVanBan" label="Số văn bản" rules={[{ ...REQUIRED }]}>
        <Input />
      </Item>

      <Item name="ngayBanHanh" label="Ngày ban hành" rules={[{ ...REQUIRED }]}>
        <DatePicker style={{ width: "100%" }} />
      </Item>

      <Item
        name="donVi"
        label="Đơn vị, cơ quan ban hành"
        rules={[{ ...REQUIRED }]}
      >
        <Input />
      </Item>

      <Item name="trichYeu" label="Trích yếu">
        <Input.TextArea />
      </Item>

      <Item name="nguoiKy" label="Người ký" rules={[{ ...REQUIRED }]}>
        <Input />
      </Item>

      <Item name="chucVu" label="Chức vụ người ký" rules={[{ ...REQUIRED }]}>
        <Input />
      </Item>

      <Item name="thanhVien" label="Thành viên" rules={[{ ...REQUIRED }]}>
        <Select mode="multiple" placeholder="Chọn thành viên">
          <Option value="1">Trần Văn Thanh</Option>
          <Option value="2">Nguyễn Văn Hoa</Option>
          {/* Add more options as needed */}
        </Select>
      </Item>

      <Item>
        <Checkbox
          checked={externalMember}
          onChange={(e) => setExternalMember(e.target.checked)}
        >
          Thành viên ngoài đơn vị
        </Checkbox>
      </Item>

      {externalMember && (
        <Item name="hoVaTen" label="Họ và tên" rules={[{ ...REQUIRED }]}>
          <Input
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
          />
        </Item>
      )}

      <Item
        name="donViLienNganh"
        label="Đơn vị liên ngành"
        rules={[{ ...REQUIRED }]}
      >
        <Input />
      </Item>

      <Item name="fileDinhKem" label="File đính kèm" rules={[{ ...REQUIRED }]}>
        <Upload
          onChange={({ file }) => {
            if (file.status === "done") {
              message.success(`${file.name} file uploaded successfully`);
            } else if (file.status === "error") {
              message.error(`${file.name} file upload failed.`);
            }
          }}
          beforeUpload={() => false} // Prevent automatic upload
        >
          <Button icon={<UploadOutlined />}>Tải tệp từ máy tính lên</Button>
        </Upload>
      </Item>

      <Button type="add" onClick={handleAddMember}>
        Thêm thành viên
      </Button>

      <Table
        columns={columns}
        dataSource={teamMembers.map((member, index) => ({ ...member, index }))}
        pagination={false}
        rowKey="index"
        style={{ marginTop: 20 }}
      />
    </Form>
  );
};

export default InspectionDecisionForm;
