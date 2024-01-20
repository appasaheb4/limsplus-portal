import React from 'react';

import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { observer } from 'mobx-react';

import { Calendar, Filter, RefreshCw } from 'react-feather';
import { useStores } from '@/stores';
import { Tooltip } from '@/library/components';

const Header = observer(() => {
  const { loginStore } = useStores();
  return (
    <Row className='mb-2 mb-xl-4'>
      <Col xs='auto' className='d-none d-sm-block'>
        <span>Welcome back, {loginStore.login?.fullName}</span>
      </Col>

      <Col xs='auto' className='ml-auto text-right mt-n1'>
        <UncontrolledDropdown className='d-inline mr-2'>
          <DropdownToggle caret color='light' className='bg-white shadow-sm'>
            <Calendar className='feather align-middle mt-n1' /> Today
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Today</DropdownItem>
            <DropdownItem>Week</DropdownItem>
            <DropdownItem>Month</DropdownItem>
            <DropdownItem>Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Button color='primary' className='shadow-sm mr-1'>
          <Tooltip tooltipText='Filter'>
            <Filter className='feather' />
          </Tooltip>
        </Button>
        <Button color='primary' className='shadow-sm'>
          <Tooltip tooltipText='Refresh'>
            <RefreshCw className='feather' />
          </Tooltip>
        </Button>
      </Col>
    </Row>
  );
});

export default Header;
