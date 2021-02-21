import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { TableTypes } from "../../types/TableTypes";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

interface FormItemProps {
  dataSource: TableTypes[];
  showTableModalVisible: boolean;
  setShowTableModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDataSource: React.Dispatch<React.SetStateAction<TableTypes[]>>;
  setTableRow: React.Dispatch<React.SetStateAction<number>>;
  tableRow: number;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    dataSource = [],
    setShowTableModalVisible,
    setDataSource,
    tableRow = -1,
    setTableRow,
    showTableModalVisible = false,
  } = props;

  const [form] = Form.useForm();

  if (tableRow !== -1 && dataSource?.length) {
    form.setFieldsValue({
      name: dataSource[tableRow].name,
      age: dataSource[tableRow].age,
      address: dataSource[tableRow].address,
    });
  }

  const resetFormEmpty = () => {
    setTableRow(-1);
    form.resetFields();
  };

  const handleCancel = () => {
    setShowTableModalVisible(false);
    resetFormEmpty();
  };

  const onFinish = (values: TableTypes) => {
    if (showTableModalVisible && tableRow !== -1) {
      dataSource[tableRow] = { ...values };
      setDataSource([...dataSource]);
    } else {
      setDataSource([...dataSource, values]);
    }
    resetFormEmpty();
    setShowTableModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={tableRow !== -1 ? "编辑" : "添加"}
      visible={showTableModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: "请输入姓名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: "请输入年龄" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="地址"
          name="address"
          rules={[{ required: true, message: "请输入地址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
