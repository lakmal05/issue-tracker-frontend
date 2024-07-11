import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import moment from "moment/moment";
import {
  customToastMsg,
  handleError,
  popUploader,
} from "../../../common/commonFunctions";
import * as issueService from "../../../service/issueService";
import { useDispatch } from "react-redux";

const AddIssue = ({ isOpen, toggle, updateValue, isUpdate }) => {
  const [isDone, setIsDone] = useState(false);

  const priorityLevels = [
    { value: "CRITICAL", label: "Critical" },
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
  ];
  const statusOptions = [
    { value: "NEW", label: "New" },
    { value: "WORKING_ON_IT", label: "Working On It" },
    { value: "STUCK", label: "Stuck" },
    { value: "DONE", label: "Done" },
  ];
  const [email, setEmail] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(updateValue, "---------------------");
    if (isUpdate) {
      let isSetData = setDetailsToInputs();
      setIsDone(isSetData);
    } else {
      setIsDone(true);
    }
  }, [isOpen]);

  const setDetailsToInputs = () => {
    setDescription(updateValue?.description);
    setEmail(updateValue?.email);
    setSelectedPriority(updateValue?.priority);
    setSelectedStatus(updateValue?.issueStatus);
    setTitle(updateValue?.title);
    return true;
  };

  const clearInputs = () => {
    setDescription("");
    setEmail("");
    setSelectedPriority("");
    setSelectedStatus("");
    setTitle("");
  };

  const createNewIssue = () => {
    let isValidated = false;

    title === ""
      ? customToastMsg("Title  cannot be empty")
      : selectedStatus === "" || selectedStatus === null
      ? customToastMsg("Select status of the issue")
      : selectedPriority === "" || selectedPriority === null
      ? customToastMsg("Select priority level of the issue")
      : email === ""
      ? customToastMsg("Email cannot be empty")
      : description === ""
      ? customToastMsg("Description cannot be empty")
      : (isValidated = true);

    const data = {
      title: title,
      email: email,
      issueStatus: selectedStatus,
      priority: selectedPriority,
      description: description,
    };
    console.log(data, "create data staff");

    if (isValidated) {
      popUploader(dispatch, true);

      issueService
        .create(data)
        .then(async (res) => {
          console.log(res, "creatd response");
          popUploader(dispatch, false);

          clearInputs();
          await toggle();
          await customToastMsg("Issue successfully created", 1);
        })
        .catch((err) => {
          popUploader(dispatch, false);

          console.log(err);
          handleError(err);
        });
    }
  };

  const updateIssue = () => {
    let isValidated = false;
    title === ""
      ? customToastMsg("Title  cannot be empty")
      : selectedStatus === "" || selectedStatus === null
      ? customToastMsg("Select status of the issue")
      : selectedPriority === "" || selectedPriority === null
      ? customToastMsg("Select priority level of the issue")
      : email === ""
      ? customToastMsg("Email cannot be empty")
      : description === ""
      ? customToastMsg("Description cannot be empty")
      : (isValidated = true);

    const data = {
      title: title,
      email: email,
      issueStatus: selectedStatus,
      priority: selectedPriority,
      description: description,
    };
    console.log(data, "create data staff");

    if (isValidated) {
      popUploader(dispatch, true);

      issueService
        .update(data, updateValue?.id)
        .then(async (res) => {
          console.log(res, "creatd response");
          popUploader(dispatch, false);

          clearInputs();
          await toggle();
          await customToastMsg("Issue successfully updated", 1);
        })
        .catch((err) => {
          popUploader(dispatch, false);

          console.log(err);
          handleError(err);
        });
    }
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      toggle={() => {
        toggle(updateValue);
        clearInputs();
      }}
    >
      {isUpdate ? (
        <ModalHeader
          toggle={(e) => {
            toggle(updateValue);
            clearInputs();
          }}
        >
          Update Issue
        </ModalHeader>
      ) : (
        <ModalHeader
          toggle={(e) => {
            toggle(updateValue);
            clearInputs();
          }}
        >
          Add New Issue
        </ModalHeader>
      )}
      {isDone && (
        <ModalBody>
          <Form>
            {isUpdate && (
              <h5 className="mt-2 mb-4">
                Tracking Number :{updateValue?.trackingNumber}
              </h5>
            )}
            <Row>
              <FormGroup className="col-12 col-lg-3">
                <Label for="email">Title</Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="col-12 col-lg-3">
                <Label for="role">Select Status</Label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  isClearable
                  value={
                    statusOptions.find(
                      (option) => option.value === selectedStatus
                    ) || null
                  }
                  onChange={(e) => {
                    setSelectedStatus(
                      e?.value === undefined ? "" : e === null ? "" : e.value
                    );
                  }}
                  options={statusOptions}
                />
              </FormGroup>
              <FormGroup className="col-12 col-lg-3">
                <Label for="role">Select Priority</Label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  isClearable
                  value={
                    priorityLevels.find(
                      (option) => option.value === selectedPriority
                    ) || null
                  }
                  onChange={(e) => {
                    console.log(e);
                    setSelectedPriority(
                      e?.value === undefined ? "" : e === null ? "" : e.value
                    );
                  }}
                  options={priorityLevels}
                />
              </FormGroup>
              <FormGroup className="col-12 col-lg-3">
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup className="col-12 col-lg-12">
                <Label for="email">Description</Label>
                <Input
                  type="textarea"
                  id="email"
                  placeholder="Enter your description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>
            </Row>
          </Form>
        </ModalBody>
      )}

      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            toggle(updateValue);
            clearInputs();
          }}
        >
          Cancel
        </Button>{" "}
        {isUpdate ? (
          <Button
            color="primary"
            onClick={() => {
              updateIssue();
            }}
          >
            Update Issue
          </Button>
        ) : (
          <Button
            // disabled={!isUploading}
            color="primary"
            onClick={() => {
              createNewIssue();
            }}
          >
            Add New Issue
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
export default AddIssue;
