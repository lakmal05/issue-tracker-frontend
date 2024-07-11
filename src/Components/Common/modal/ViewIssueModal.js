import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import {
  customToastMsg,
  handleError,
  popUploader,
} from "../../../common/commonFunctions";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";

const ViewIssueModal = ({ isOpen, currentData, onClose }) => {
  useEffect(() => {
    console.log(currentData, "62596235+++++++++++++++");
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        onClose();
      }}
    >
      <ModalHeader
        toggle={() => {
          onClose();
        }}
      >
        Tracking Number : {currentData?.trackingNumber}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col sm={12} md={12} lg={12} xl={12}>
            <h6 className="mb-3" style={{ fontSize: 16 }}>
              {currentData?.title}
            </h6>
          </Col>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Label>Email : {currentData?.email}</Label>
          </Col>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Label>
              Created at : {new Date(currentData?.createdAt).toLocaleString()}
            </Label>
          </Col>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Label>
              Priority Level :{" "}
              <Tag
                color={
                  currentData?.priority === "CRITICAL"
                    ? "magenta"
                    : currentData?.priority === "MEDIUM"
                    ? "purple"
                    : currentData?.priority === "HIGH"
                    ? "volcano"
                    : currentData?.priority === "LOW"
                    ? "blue"
                    : "default"
                }
                key={currentData?.priority}
              >
                {currentData?.priority === "CRITICAL"
                  ? "CRITICAL"
                  : currentData?.priority === "HIGH"
                  ? "HIGH"
                  : currentData?.priority === "MEDIUM"
                  ? "MEDIUM"
                  : currentData?.priority === "LOW"
                  ? "LOW"
                  : "none"}
              </Tag>{" "}
            </Label>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12}>
            <Label>
              Status Level :{" "}
              <Tag
                color={
                  currentData?.issueStatus === "NEW"
                    ? "cyan"
                    : currentData?.issueStatus === "WORKING_ON_IT"
                    ? "processing"
                    : currentData?.issueStatus === "STUCK"
                    ? "error"
                    : currentData?.issueStatus === "DONE"
                    ? "success"
                    : "default"
                }
                key={currentData?.issueStatus}
              >
                {currentData?.issueStatus === "NEW"
                  ? "New"
                  : currentData?.issueStatus === "WORKING_ON_IT"
                  ? "Working On It"
                  : currentData?.issueStatus === "STUCK"
                  ? "Stuck"
                  : currentData?.issueStatus === "DONE"
                  ? "Done"
                  : "none"}
              </Tag>
            </Label>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12}>
            <Label for="supplierContactNo">Note :</Label>
            <p className="ms-4">{currentData?.description}</p>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ViewIssueModal;
