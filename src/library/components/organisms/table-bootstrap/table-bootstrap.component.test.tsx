import React from 'react';
import {render} from '@testing-library/react';
import {TableBootstrap} from './table-bootstrap.component';

it('render autoComplete correctly', () => {
  const autoComplete = render(
    <TableBootstrap
      id='_id'
      data={[]}
      columns={[]}
      fileName='test'
      onSelectedRow={() => jest.fn()}
    />,
  );
  expect(autoComplete).toMatchSnapshot();
});
