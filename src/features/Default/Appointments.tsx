import React from "react";
import { Link } from "react-router-dom";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import { MoreHorizontal } from "react-feather";


const Appointments = () => (
  <Card className="flex-fill w-100">
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Appointments
      </CardTitle>
    </CardHeader>
    <div className="p-4 bg-light">
      <h2>You have a meeting today!</h2>
      <p className="mb-0 text-sm">
        Your next meeting is in 2 hours. Check your{" "}
        <Link to="/dashboard/default">schedule</Link> to see the details.
      </p>
    </div>
    <CardBody className="d-flex"></CardBody>
  </Card>
);

export default Appointments;
