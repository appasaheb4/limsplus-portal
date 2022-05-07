import React from 'react';
import {render} from '@utils';
import {TableBootstrap} from './TableBootstrap.component';

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
