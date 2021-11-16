import React from "react"

import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap"
import { observer } from "mobx-react"

import { Calendar, Filter, RefreshCw } from "react-feather"
import { useStores } from "@lp/stores"

const Header = observer(() => {
  const {loginStore}  = useStores()
  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, {loginStore.login?.fullName}</h3>
      </Col>

      <Col xs="auto" className="ml-auto text-right mt-n1">
        <UncontrolledDropdown className="d-inline mr-2">
          <DropdownToggle caret color="light" className="bg-white shadow-sm">
            <Calendar className="feather align-middle mt-n1" /> Today
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Today</DropdownItem>
            <DropdownItem>Week</DropdownItem>
            <DropdownItem>Month</DropdownItem>
            <DropdownItem>Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Button color="primary" className="shadow-sm mr-1">
          <Filter className="feather" />
        </Button>
        <Button color="primary" className="shadow-sm">
          <RefreshCw className="feather" />
        </Button>
      </Col>
    </Row>
  )
})

export default Header
