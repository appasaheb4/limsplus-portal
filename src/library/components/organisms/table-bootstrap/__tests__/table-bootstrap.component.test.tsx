// eslint-disable-next-line folders/match-regex
import React from 'react';
import { render } from '@testing-library/react';
import { TableBootstrap } from '../table-bootstrap.component';
const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
  },
  {
    dataField: 'name',
    text: 'Product Name',
    formatter: (cellContent, row) => {
      const maxLength = 5;
      const displayTestName =
        row.name.length > maxLength
          ? row.name.slice(0, Math.max(0, maxLength)) + '...'
          : row.name;
      return (
        <div className='flex flex-row'>
          <span title={row.name}>{`${displayTestName}`}</span>
        </div>
      );
    },
  },
  {
    dataField: 'price',
    text: 'Product Price',
  },
];
const data = [
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
  {
    id: '001',
    name: 'Limsplus',
    price: '100000',
  },
];
describe('TableBootstrap component', () => {
  it('render tableBootstrap correctly', () => {
    const tableBootstrap = render(
      <TableBootstrap
        id='_id'
        columns={columns}
        data={data}
        fileName='StoryBook'
        totalSize={26}
      />,
    );
    expect(tableBootstrap).toMatchSnapshot();
  });
});
