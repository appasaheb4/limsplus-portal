/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-console */
import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TableBootstrap} from './table-bootstrap.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Organisms/TableBootstrap',
  component: TableBootstrap,
} as ComponentMeta<typeof TableBootstrap>;

const columns = [
  {
    dataField: 'id',
    text: 'Product ID',
  },
  {
    dataField: 'name',
    text: 'Product Name',
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
export const _TableBootstrap: ComponentStory<typeof TableBootstrap> = () => (
  <TableBootstrap
    id='_id'
    columns={columns}
    data={data}
    fileName='StoryBook'
    totalSize={26}
    onDelete={() => {}}
    onFilter={() => {}}
    onSelectedRow={() => {}}
    onPageSizeChange={() => {}}
    onUpdateItem={() => {}}
    clearAllFilter={() => {}}
  />
);
