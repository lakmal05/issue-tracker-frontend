import React from "react";
import { Container } from "reactstrap";

import { Button } from "antd";
import IssueManagement from "../IssueManagement/IssueManagement";
// import ImageUploadModal from "../../Components/Common/modal/FileUploadModal";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Issue Tracker";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <IssueManagement />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
