import React from "react";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
function ReloadButton({ loading, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        fontSize: "25px",
        border: "2px solid #e87040",
        borderRadius: "10px",
        float: "right",
        padding: "5px 10px",
        marginTop: "-50px",
        cursor: "pointer",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        color: "#e87040",
      }}
    >
      {loading ? <LoadingOutlined /> : <ReloadOutlined />}
      <span style={{ fontSize: "13px", marginLeft: "10px", fontWeight: "900" }}>
        {loading ? "Fetching Data" : "Refresh Data"}
      </span>
    </span>
  );
}

export default ReloadButton;
