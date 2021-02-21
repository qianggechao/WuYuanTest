import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { TableTypes } from "../../types/TableTypes";
import { FormItem } from "./FormItem";
import data from "../../data";

export const TableList = () => {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      key: "action",
      render: (text: any, record: any, row: any) => (
        <>
          <Button
            type="primary"
            className="marRight"
            onClick={(e) => handleEdit(record, row)}
          >
            编辑
          </Button>
          <Button type="primary" danger onClick={() => handleDle(record, row)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState(data);
  const [showTableModalVisible, setShowTableModalVisible] = useState(false);
  const [tableRow, setTableRow] = useState(-1);

  const handleEdit = (val: TableTypes, row: number) => {
    setShowTableModalVisible(true);
    setTableRow(row);
  };
  const handleDle = (val: TableTypes, row: number) => {
    dataSource.splice(row, 1);
    setDataSource([...dataSource]);
  };
  useEffect(() => {
    if (dataSource) {
      localStorage.setItem("tableList", JSON.stringify(dataSource));
    }
  }, [dataSource]);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowTableModalVisible(true);
        }}
      >
        添加
      </Button>
      <Table
        rowKey={(key) => key.key}
        dataSource={dataSource}
        columns={columns}
      />
      <FormItem
        showTableModalVisible={showTableModalVisible}
        setShowTableModalVisible={setShowTableModalVisible}
        dataSource={dataSource}
        setDataSource={setDataSource}
        tableRow={tableRow}
        setTableRow={setTableRow}
      />
    </>
  );
};
