import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import qs from "qs";

export default function DisplayTable({ tableTable, columns, user }) {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, data: tableTable });
  }, [tableTable]);

  const handleTableChange = (pagination, filters, sorter) => {
    // fetch({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // });
    console.log("yem", pagination, filters, sorter);
  };
  const { data, pagination, loading } = state;
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}
