import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { Table, Tag } from "antd";
import { Plus } from "react-feather";
import { IssueTableColumns } from "../../common/tableColumns";
import AddIssueModal from "../../Components/Common/modal/AddIssueModal";
import * as issueService from "../../service/issueService";
// import { hideLoader, showLoader } from "../../../slices/loader/loader";
import { useDispatch } from "react-redux";
import {
  customSweetAlert,
  customToastMsg,
  handleError,
  popUploader,
} from "../../common/commonFunctions";
import ViewIssueModal from "../../Components/Common/modal/ViewIssueModal";
const IssueManagement = () => {
  document.title = "Issues ";

  const [issueTableList, setIssueTableList] = useState([]);
  const [isViewIssueModalOpen, setIsViewIssueModalOpen] = useState(false);
  const [isAddIssueModalOpen, setIsAddIssueModalOpen] = useState(false);
  const [isUpdateIssueModalOpen, setIsUpdateIssueModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    loadAllIssues();
  }, []);

  const loadAllIssues = () => {
    popUploader(dispatch, true);

    issueService
      .getAll()
      .then((res) => {
        popUploader(dispatch, false);

        console.log(res, ":::::");
        const formattedData = res.data.map((record) => ({
          id: record.id,
          title: record.title,
          email: record?.email,
          trackingNumber: record.trackingNumber,
          email: record?.email,
          priority: record?.priority,
          issueStatus: record.issueStatus,
          createdAt: new Date(record.createdAt).toLocaleString(),
          action: (
            <>
              <Button
                color="primary"
                className="mx-2"
                outline
                onClick={(e) => {
                  openViewIssueModal(record);
                }}
              >
                <span>View</span>
              </Button>
              <Button
                color="warning"
                className="mx-2"
                outline
                onClick={(e) => {
                  toggleModal(record);
                }}
              >
                <span>Update</span>
              </Button>
              <Button
                color="danger"
                className=""
                outline
                onClick={() => deleteIssue(record.id)}
              >
                <span>Remove</span>
              </Button>
            </>
          ),
        }));
        console.log(formattedData, "formated data");
        setIssueTableList(formattedData);
      })
      .catch((err) => {
        popUploader(dispatch, false);
        handleError(err);
      });
  };

  const deleteIssue = async (id) => {
    console.log(id);
    customSweetAlert("Are you sure to delete this issue ?", 0, () => {
      popUploader(dispatch, true);
      issueService
        .remove(id)
        .then(async (res) => {
          console.log(res);
          await loadAllIssues();
          popUploader(dispatch, false);
          customToastMsg("Issue has been successfully deleted", 1);
        })
        .catch(async (err) => {
          handleError(err);
          console.log(err);
          popUploader(dispatch, false);
        });
    });
  };

  // const handleSearchEmailChange = (e) => {
  //   const { value } = e.target; // Extract value from event target
  //   setSearchEmail(value);
  //   if (value === "") {
  //     // If search input is empty, load all staff records
  //     loadAllIssues();
  //   }

  const toggleModal = (val) => {
    console.log(val, "00000000000");
    if (val !== undefined) {
      setIsAddIssueModalOpen(true);
      setIsUpdateIssueModalOpen(true);
      setSelectedIssue(val);
      loadAllIssues();
    } else {
      setIsAddIssueModalOpen(true);
      loadAllIssues();
    }
  };

  // useEffect(() => {
  //   const filteredStaff = staffTableList.filter((staff) =>
  //     staff.email.toLowerCase().includes(searchEmail.toLowerCase())
  //   );
  //   setStaffTableList(filteredStaff);
  // }, [searchEmail]);

  const closeStaffModal = () => {
    setIsAddIssueModalOpen(false);
    setIsUpdateIssueModalOpen(false);
    setSelectedIssue([]);
    loadAllIssues();
  };

  const openViewIssueModal = (selectedIssue) => {
    setSelectedIssue(selectedIssue);
    setIsViewIssueModalOpen(true);
  };

  const closeViewIssueModal = () => {
    setIsViewIssueModalOpen(false);
  };

  return (
    <div>
      <AddIssueModal
        isUpdate={isUpdateIssueModalOpen}
        updateValue={selectedIssue}
        isOpen={isAddIssueModalOpen}
        toggle={(e) => {
          loadAllIssues();
          closeStaffModal();
        }}
      />
      <ViewIssueModal
        isOpen={isViewIssueModalOpen}
        onClose={closeViewIssueModal}
        currentData={selectedIssue}
      />

      <div className="row mt-3">
        <h4>Issues </h4>
      </div>
      <Card>
        <Row className="d-flex mt-4 mb-2 mx-1 justify-content-end">
          <Col
            sm={12}
            md={3}
            lg={3}
            xl={3}
            className="d-flex justify-content-end"
          >
            <Button
              color="primary"
              onClick={() => {
                toggleModal();
              }}
            >
              <Plus size={24} /> Add New
            </Button>
          </Col>
        </Row>
        <Row className="mx-2">
          {/* <Col sm={12} md={6} lg={3} xl={3}>
              <FormGroup>
                <Label for="username">Search by Name</Label>
                <Input
                  id="username"
                  name="name"
                  placeholder="Search by name"
                  type="text"
                />
              </FormGroup>
            </Col> */}
          <Col sm={12} md={6} lg={3} xl={3}>
            <FormGroup>
              <Label for="email">Search by Tracking Code</Label>
              <Input
                id="email"
                name="email"
                placeholder="Search by tacking code"
                type="text"
                //   value={searchEmail}
                //   onChange={handleSearchEmailChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={12} xl={12}>
            <Table
              className="mx-3 my-4"
              pagination={true}
              columns={IssueTableColumns}
              dataSource={issueTableList}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default IssueManagement;
