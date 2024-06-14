import React, { useState } from 'react';

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
import { useHistory } from 'react-router-dom';
import { Calendar, Filter, RefreshCw } from 'react-feather';
import { useStores } from '@/stores';
import { AutocompleteSearch, Tooltip } from '@/library/components';
import { connect } from 'react-redux';
import { RouterFlow } from '@/flows';

const Header = observer(({ sidebar, setCardFilter, cardFilter }) => {
  const { loginStore, routerStore } = useStores();
  const history = useHistory();
  return (
    <Row className='flex flex-row justify-between'>
      <Col xs='auto' className='d-none d-sm-block'>
        <span>Welcome back, {loginStore.login?.fullName}</span>
      </Col>

      <Col>
        {!sidebar?.isOpen && (
          <div
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              margin: '0 auto',
            }}
          >
            <AutocompleteSearch
              data={routerStore.userRouter}
              onChange={async (item: any, children: any) => {
                const { permission, selectedComp } =
                  await RouterFlow.updateSelectedCategory(
                    item?.name,
                    children?.name,
                  );
                routerStore.updateSelectedComponents(selectedComp);
                routerStore.updateUserPermission(permission);
                history.replace(children.path);
              }}
            />
          </div>
        )}
      </Col>

      <Col xs='auto'>
        <UncontrolledDropdown className='d-inline mr-2'>
          <DropdownToggle caret color='light' className='bg-white shadow-sm'>
            <Calendar className='feather align-middle mt-n1' /> {cardFilter}
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={() => setCardFilter('Today')}>
              Today
            </DropdownItem>
            <DropdownItem onClick={() => setCardFilter('Week')}>
              Week
            </DropdownItem>
            <DropdownItem onClick={() => setCardFilter('Month')}>
              Month
            </DropdownItem>
            <DropdownItem onClick={() => setCardFilter('Year')}>
              Year
            </DropdownItem>
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

export default connect((store: any) => ({
  sidebar: store.sidebar,
}))(Header);
