import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Icons, Form } from '@/library/components';
import { getDefaultLookupItem, lookupItems } from '@/library/utils';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import _ from 'lodash';
import dayjs from 'dayjs';

interface TablePackagesListProps {
  data: any;
  isDelete?: boolean;
}

export const TablePackagesList = observer(
  ({ data, isDelete = true }: TablePackagesListProps) => {
    const { patientOrderStore, routerStore } = useStores();
    const [packages, setPackages] = useState(data);
    const [editableRow, setEditableRow] = useState<{
      [key: string]: number | null;
    }>({
      pacakgeListS: null,
      pacakgeListM: null,
      pacakgeListN: null,
      pacakgeListK: null,
    });

    useEffect(() => {
      const panelStatus = 'P';
      const orderStatus = getDefaultLookupItem(
        routerStore.lookupItems,
        'PATIENT ORDER - ORDER_STATUS',
      );
      const status = getDefaultLookupItem(
        routerStore.lookupItems,
        'PATIENT ORDER - STATUS',
      );
      let pacakgeListS = data?.pacakgeListS;
      if (data.pacakgeListS) {
        pacakgeListS = _.map(data.pacakgeListS, o =>
          _.extend({ panelStatus, orderStatus, status }, o),
        );
      }
      let pacakgeListM = data.pacakgeListM;
      if (data.pacakgeListM) {
        pacakgeListM = _.map(data.pacakgeListM, o =>
          _.extend({ panelStatus, orderStatus, status }, o),
        );
      }
      let pacakgeListN = data.pacakgeListN;
      if (data.pacakgeListN) {
        pacakgeListN = _.map(data.pacakgeListN, o =>
          _.extend({ panelStatus, orderStatus, status }, o),
        );
      }
      let pacakgeListK = data.pacakgeListK;
      if (data.pacakgeListK) {
        pacakgeListK = _.map(data.pacakgeListK, o =>
          _.extend({ panelStatus, orderStatus, status }, o),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      data = {
        ...data,
        pacakgeListS,
        pacakgeListM,
        pacakgeListN,
        pacakgeListK,
      };
      setPackages(data);
    }, [data]);

    const onDeletePackage = (id, delPanelCode) => {
      let panels = patientOrderStore.selectedItems?.panels;
      panels = panels.filter(items => {
        return items._id !== id;
      });
      patientOrderStore.updateSelectedItems({
        ...patientOrderStore.selectedItems,
        panels,
        serviceTypes: _.union(_.map(panels, 'serviceType')),
      });
      //get packages list
      patientOrderStore.patientOrderService.getPackageList({
        input: {
          filter: {
            panel: _.map(panels, o =>
              _.pick(o, [
                '_id',
                'panelCode',
                'panelName',
                'bill',
                'serviceType',
              ]),
            ),
          },
        },
      });
      const panelCode = patientOrderStore.patientOrder?.panelCode?.filter(
        item => item.panelCode != delPanelCode,
      );
      patientOrderStore.updatePatientOrder({
        ...patientOrderStore.patientOrder,
        panelCode,
      });
    };

    const onRemoveItem = (serviceType, packageCode, index, delPanelCode) => {
      const packageList = patientOrderStore.packageList;
      let pacakgeListS: any[] = [];
      let pacakgeListM: any[] = [];
      if (serviceType === 'M') {
        pacakgeListM = packageList.pacakgeListM.filter(item => {
          if (item.packageCode !== packageCode) return item;
          else {
            if (item.index === index && item.packageCode === packageCode)
              return;
            else return item;
          }
        });
      } else {
        pacakgeListS = packageList.pacakgeListS.filter(
          item => item.packageCode === packageCode,
        );
        let panels = patientOrderStore.selectedItems?.panels;
        _.compact(_.map(pacakgeListS, '_id')).filter(id => {
          panels = panels.filter(items => {
            return items._id !== id;
          });
        });
        patientOrderStore.updateSelectedItems({
          ...patientOrderStore.selectedItems,
          panels,
          serviceTypes: _.union(_.map(panels, 'serviceType')),
        });
        //get packages list
        patientOrderStore.patientOrderService.getPackageList({
          input: {
            filter: {
              panel: _.map(panels, o =>
                _.pick(o, ['_id', 'panelCode', 'panelName', 'serviceType']),
              ),
            },
          },
        });
      }
      patientOrderStore.updatePackageList({
        ...patientOrderStore.packageList,
        pacakgeListM,
      });
      const panelCode = patientOrderStore.patientOrder?.panelCode?.filter(
        item => item.panelCode != delPanelCode,
      );
      patientOrderStore.updatePatientOrder({
        ...patientOrderStore.patientOrder,
        panelCode,
      });
    };

    return (
      <>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              {isDelete && (
                <th className='text-white sticky left-0 z-10'>Action</th>
              )}
              <th className='text-white'>Panel Code</th>
              <th className='text-white'>Panel Name</th>
              <th className='text-white'>Package</th>
              <th className='text-white'>Service Type</th>
              <th className='text-white'>Department</th>
              <th className='text-white'>Section</th>
              <th className='text-white'>PLab</th>
              <th className='text-white'>RLab</th>
              <th className='text-white'>Report Group</th>
              <th className='text-white'>Bill</th>
              <th className='text-white'>Gross Amt</th>
              <th className='text-white'>Net Amt</th>
              <th className='text-white'>Discount Amount</th>
              <th className='text-white'>Discount%</th>
              <th className='text-white'>Miscellaneous Charges</th>
              <th className='text-white'>Due Date</th>
              <th className='text-white'>Result Date</th>
              <th className='text-white'>Order Status</th>
              <th className='text-white'>Status</th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            {packages?.pacakgeListS?.map((item, index) => (
              <tr key={item.panelCode}>
                {isDelete && (
                  <td className='sticky left-0 bg-gray-500'>
                    <div className='flex'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          if (item._id)
                            onDeletePackage(item._id, item.panelCode);
                          else
                            onRemoveItem(
                              'S',
                              item.packageCode,
                              item.index,
                              item.panelCode,
                            );
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          setEditableRow(prevState => ({
                            ...prevState,
                            ['pacakgeListS']: index,
                          }));
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBi.BiEdit)}
                      </Icons.IconContext>
                    </div>
                  </td>
                )}
                <td>{item?.panelCode}</td>
                <td>{item?.panelName}</td>
                <td>{item.serviceType !== 'M' ? item?.packageCode : ''}</td>
                <td>{item.serviceType}</td>
                <td>{item.department}</td>
                <td>{item.section?.code}</td>
                <td>{item.pLab}</td>
                <td>{item.rLab}</td>
                <td>{item.reportGroup}</td>
                <td>
                  <Form.Toggle
                    label=''
                    value={item?.bill || false}
                    disabled={editableRow.pacakgeListS !== index}
                    onChange={bill => {
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, { bill });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Gross Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.grossAmount}
                    disabled={editableRow.pacakgeListS !== index}
                    onChange={e => {
                      const grossAmount = Number.parseFloat(e) || 0;
                      const netAmount = item.netAmount || 0;
                      let discountPer = 0;
                      if (grossAmount !== netAmount) {
                        discountPer = grossAmount
                          ? ((grossAmount - netAmount) / grossAmount) * 100
                          : 0;
                      }

                      const discountAmount = grossAmount - netAmount;
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        grossAmount,
                        netAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Net Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.netAmount}
                    disabled={editableRow.pacakgeListS !== index}
                    onChange={e => {
                      let netAmount = Number.parseFloat(e) || 0;
                      const grossAmount = item.grossAmount || 0;

                      if (netAmount > grossAmount) {
                        netAmount = grossAmount;
                      }
                      const discountAmount = grossAmount - netAmount;
                      const discountPer = grossAmount
                        ? (discountAmount / grossAmount) * 100
                        : 0;

                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        netAmount,
                        grossAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount Amount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountAmount}
                    disabled={true}
                    onChange={discountAmount => {
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        discountAmount: Number.parseFloat(discountAmount),
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountPer}
                    disabled={editableRow.pacakgeListS !== index}
                    onChange={e => {
                      const discountPer = Number.parseFloat(e) || 0;
                      const grossAmount = item.grossAmount || 0;
                      const discountAmount = (grossAmount * discountPer) / 100;
                      const netAmount = grossAmount - discountAmount;
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        discountPer,
                        discountAmount,
                        netAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Miscellaneous Charges'
                    type='number'
                    style={{ width: 120 }}
                    value={item.miscellaneousCharges}
                    disabled={true}
                    onChange={miscellaneousCharges => {
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        miscellaneousCharges:
                          Number.parseFloat(miscellaneousCharges),
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  {item?.dueDate && (
                    <Form.InputDateTime
                      label=''
                      disabled={true}
                      style={{ width: 300 }}
                      placeholder='Due Date'
                      value={item.dueDate}
                      onChange={dueDate => {
                        const pacakgeListS =
                          patientOrderStore.packageList.pacakgeListS;
                        pacakgeListS[index] = Object.assign(item, { dueDate });
                        patientOrderStore.updatePackageList({
                          ...patientOrderStore.packageList,
                          pacakgeListS,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  <Form.InputDateTime
                    label=''
                    disabled={true}
                    style={{ width: 300 }}
                    placeholder='Result Date'
                    value={item.resultDate}
                    onChange={resultDate => {
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, { resultDate });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  />
                </td>
                <td>
                  <select
                    value={item.orderStatus}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const orderStatus = e.target.value;
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, {
                        orderStatus,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - ORDER_STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={item.status}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const status = e.target.value;
                      const pacakgeListS =
                        patientOrderStore.packageList.pacakgeListS;
                      pacakgeListS[index] = Object.assign(item, { status });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {packages?.pacakgeListM?.map((item, index) => (
              <tr key={item.panelCode}>
                {isDelete && (
                  <td className='sticky left-0 bg-gray-500'>
                    <div className='flex'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          if (item._id)
                            onDeletePackage(item._id, item.panelCode);
                          else
                            onRemoveItem(
                              'M',
                              item.packageCode,
                              item.index,
                              item.panelCode,
                            );
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          setEditableRow(prevState => ({
                            ...prevState,
                            ['pacakgeListM']: index,
                          }));
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBi.BiEdit)}
                      </Icons.IconContext>
                    </div>
                  </td>
                )}
                <td>{item?.panelCode}</td>
                <td>{item?.panelName}</td>
                <td>{item?.serviceType !== 'M' ? item.packageCode : ''}</td>
                <td>{item.serviceType}</td>
                <td>{item.department}</td>
                <td>{item.section?.code}</td>
                <td>{item.pLab}</td>
                <td>{item.rLab}</td>
                <td>{item.reportGroup}</td>
                <td>
                  <Form.Toggle
                    label=''
                    value={item?.bill || false}
                    disabled={editableRow.pacakgeListM !== index}
                    onChange={bill => {
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, { bill });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Gross Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.grossAmount}
                    disabled={editableRow.pacakgeListM !== index}
                    onChange={e => {
                      const grossAmount = e;
                      const netAmount = item.netAmount || 0;
                      let discountPer = 0;
                      if (grossAmount !== netAmount) {
                        discountPer = grossAmount
                          ? ((grossAmount - netAmount) / grossAmount) * 100
                          : 0;
                      }

                      const discountAmount = grossAmount - netAmount;
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        grossAmount,
                        netAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Net Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.netAmount}
                    disabled={editableRow.pacakgeListM !== index}
                    onChange={e => {
                      let netAmount = e;
                      const grossAmount = item.grossAmount || 0;

                      if (netAmount > grossAmount) {
                        netAmount = grossAmount;
                      }
                      const discountAmount = grossAmount - netAmount;
                      const discountPer = grossAmount
                        ? (discountAmount / grossAmount) * 100
                        : 0;

                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        netAmount,
                        grossAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount Amount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountAmount}
                    disabled={true}
                    onChange={discountAmount => {
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        discountAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountPer}
                    disabled={editableRow.pacakgeListM !== index}
                    onChange={e => {
                      const discountPer = e;
                      const grossAmount = item.grossAmount || 0;
                      const discountAmount = (grossAmount * discountPer) / 100;
                      const netAmount = grossAmount - discountAmount;
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        discountPer,
                        discountAmount,
                        netAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Miscellaneous Charges'
                    type='number'
                    style={{ width: 120 }}
                    value={item.miscellaneousCharges}
                    disabled={true}
                    onChange={miscellaneousCharges => {
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        miscellaneousCharges,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  {item?.dueDate && (
                    <Form.InputDateTime
                      label=''
                      disabled={true}
                      style={{ width: 300 }}
                      placeholder='Due Date'
                      value={item.dueDate}
                      onChange={dueDate => {
                        const pacakgeListM =
                          patientOrderStore.packageList.pacakgeListM;
                        pacakgeListM[index] = Object.assign(item, { dueDate });
                        patientOrderStore.updatePackageList({
                          ...patientOrderStore.packageList,
                          pacakgeListM,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  <Form.InputDateTime
                    label=''
                    disabled={true}
                    style={{ width: 300 }}
                    placeholder='Result Date'
                    value={item.resultDate}
                    onChange={resultDate => {
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, { resultDate });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  />
                </td>
                <td>
                  <select
                    value={item.orderStatus}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    disabled={true}
                    onChange={e => {
                      const orderStatus = e.target.value;
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, {
                        orderStatus,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - ORDER_STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={item.status}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    disabled={true}
                    onChange={e => {
                      const status = e.target.value;
                      const pacakgeListM =
                        patientOrderStore.packageList.pacakgeListM;
                      pacakgeListM[index] = Object.assign(item, { status });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {packages?.pacakgeListN?.map((item, index) => (
              <tr key={item?.panelCode}>
                {isDelete && (
                  <td className='sticky left-0 bg-gray-500'>
                    <div className='flex'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          onDeletePackage(item._id, item.panelCode);
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          setEditableRow(prevState => ({
                            ...prevState,
                            ['pacakgeListN']: index,
                          }));
                        }}
                      >
                        {Icons.getIconTag(Icons.IconBi.BiEdit)}
                      </Icons.IconContext>
                    </div>
                  </td>
                )}
                <td>{item?.panelCode}</td>
                <td>{item?.panelName}</td>
                {/* <td>{item?.packageCode}</td> */}
                <td>{''}</td>
                <td>{item?.serviceType}</td>
                <td>{item?.department}</td>
                <td>{item?.section?.code}</td>
                <td>{item?.pLab}</td>
                <td>{item?.rLab}</td>
                <td>{item?.reportGroup}</td>
                <td>
                  <Form.Toggle
                    label=''
                    value={item?.bill || false}
                    disabled={editableRow.pacakgeListN !== index}
                    onChange={bill => {
                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, { bill });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Gross Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item?.grossAmount}
                    disabled={editableRow.pacakgeListN !== index}
                    onChange={e => {
                      const grossAmount = e;
                      const netAmount = item.netAmount || 0;
                      let discountPer = 0;
                      if (grossAmount !== netAmount) {
                        discountPer = grossAmount
                          ? ((grossAmount - netAmount) / grossAmount) * 100
                          : 0;
                      }

                      const discountAmount = grossAmount - netAmount;

                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        grossAmount,
                        netAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Net Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item?.netAmount}
                    disabled={editableRow.pacakgeListN !== index}
                    onChange={e => {
                      let netAmount = e;
                      const grossAmount = item.grossAmount || 0;

                      if (netAmount > grossAmount) {
                        netAmount = grossAmount;
                      }
                      const discountAmount = grossAmount - netAmount;
                      const discountPer = grossAmount
                        ? (discountAmount / grossAmount) * 100
                        : 0;

                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        netAmount,
                        grossAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount Amount'
                    type='number'
                    style={{ width: 120 }}
                    value={item?.discountAmount}
                    disabled={true}
                    onChange={discountAmount => {
                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        discountAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount'
                    type='number'
                    style={{ width: 120 }}
                    value={item?.discountPer}
                    disabled={editableRow.pacakgeListN !== index}
                    onChange={e => {
                      const discountPer = e;
                      const grossAmount = item.grossAmount || 0;
                      const discountAmount = (grossAmount * discountPer) / 100;
                      const netAmount = grossAmount - discountAmount;

                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        discountPer,
                        discountAmount,
                        netAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Miscellaneous Charges'
                    type='number'
                    style={{ width: 120 }}
                    value={item?.miscellaneousCharges}
                    disabled={true}
                    onChange={miscellaneousCharges => {
                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        miscellaneousCharges,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  />
                </td>
                <td>
                  {item?.dueDate && (
                    <Form.InputDateTime
                      label=''
                      disabled={true}
                      style={{ width: 300 }}
                      placeholder='Due Date'
                      value={dayjs(item?.dueDate).toDate()}
                      onChange={dueDate => {
                        const pacakgeListN =
                          patientOrderStore.packageList.pacakgeListN;
                        pacakgeListN[index] = Object.assign(item, { dueDate });
                        patientOrderStore.updatePackageList({
                          ...patientOrderStore.packageList,
                          pacakgeListN,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  {item?.resultDate && (
                    <Form.InputDateTime
                      label=''
                      disabled={true}
                      style={{ width: 300 }}
                      placeholder='Result Date'
                      value={dayjs(item?.resultDate).toDate()}
                      onChange={resultDate => {
                        const pacakgeListN =
                          patientOrderStore.packageList.pacakgeListN;
                        pacakgeListN[index] = Object.assign(item, {
                          resultDate,
                        });
                        patientOrderStore.updatePackageList({
                          ...patientOrderStore.packageList,
                          pacakgeListN,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  <select
                    value={item?.orderStatus}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const orderStatus = e.target.value;
                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, {
                        orderStatus,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - ORDER_STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={item?.status}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const status = e.target.value;
                      const pacakgeListN =
                        patientOrderStore.packageList.pacakgeListN;
                      pacakgeListN[index] = Object.assign(item, { status });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore?.lookupItems,
                      'PATIENT ORDER - STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {packages?.pacakgeListK?.map((item, index) => (
              <tr key={item.panelCode}>
                {isDelete && (
                  <td className='sticky left-0 bg-gray-500'>
                    {item.serviceType === 'K' && (
                      <>
                        <div className='flex'>
                          <Icons.IconContext
                            color='#ffffff'
                            size='20'
                            onClick={() => {
                              onDeletePackage(item._id, item.panelCode);
                            }}
                          >
                            {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                          </Icons.IconContext>
                          <Icons.IconContext
                            color='#ffffff'
                            size='20'
                            onClick={() => {
                              setEditableRow(prevState => ({
                                ...prevState,
                                ['pacakgeListK']: index,
                              }));
                            }}
                          >
                            {Icons.getIconTag(Icons.IconBi.BiEdit)}
                          </Icons.IconContext>
                        </div>
                      </>
                    )}
                  </td>
                )}
                <td>{item?.panelCode}</td>
                <td>{item?.panelName}</td>
                <td>{item?.packageCode}</td>
                <td>{item.serviceType}</td>
                <td>{item.department}</td>
                <td>{item.section?.code}</td>
                <td>{item.pLab}</td>
                <td>{item.rLab}</td>
                <td>{item.reportGroup}</td>
                <td>
                  <Form.Toggle
                    label=''
                    value={item?.bill || false}
                    disabled={editableRow.pacakgeListK !== index}
                    onChange={bill => {
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, { bill });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Gross Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.grossAmount}
                    disabled={editableRow.pacakgeListK !== index}
                    onChange={e => {
                      const grossAmount = e;
                      const netAmount = item.netAmount || 0;
                      let discountPer = 0;
                      if (grossAmount !== netAmount) {
                        discountPer = grossAmount
                          ? ((grossAmount - netAmount) / grossAmount) * 100
                          : 0;
                      }

                      const discountAmount = grossAmount - netAmount;
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        grossAmount,
                        netAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Net Amt'
                    type='number'
                    style={{ width: 120 }}
                    value={item.netAmount}
                    disabled={editableRow.pacakgeListK !== index}
                    onChange={e => {
                      let netAmount = e;
                      const grossAmount = item.grossAmount || 0;

                      if (netAmount > grossAmount) {
                        netAmount = grossAmount;
                      }
                      const discountAmount = grossAmount - netAmount;
                      const discountPer = grossAmount
                        ? (discountAmount / grossAmount) * 100
                        : 0;

                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        netAmount,
                        grossAmount,
                        discountAmount,
                        discountPer,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount Amount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountAmount}
                    disabled={true}
                    onChange={discountAmount => {
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        discountAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Discount'
                    type='number'
                    style={{ width: 120 }}
                    value={item.discountPer}
                    disabled={editableRow.pacakgeListK !== index}
                    onChange={e => {
                      const discountPer = e;
                      const grossAmount = item.grossAmount || 0;
                      const discountAmount = (grossAmount * discountPer) / 100;
                      const netAmount = grossAmount - discountAmount;
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        discountPer,
                        discountAmount,
                        netAmount,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Input
                    label=''
                    placeholder='Miscellaneous Charges'
                    type='number'
                    style={{ width: 120 }}
                    value={item.miscellaneousCharges}
                    disabled={true}
                    onChange={miscellaneousCharges => {
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        miscellaneousCharges,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  {item?.dueDate && (
                    <Form.InputDateTime
                      label=''
                      disabled={true}
                      style={{ width: 300 }}
                      placeholder='Due Date'
                      value={item.dueDate}
                      onChange={dueDate => {
                        const pacakgeListK =
                          patientOrderStore.packageList.pacakgeListK;
                        pacakgeListK[index] = Object.assign(item, { dueDate });
                        patientOrderStore.updatePackageList({
                          ...patientOrderStore.packageList,
                          pacakgeListK,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  <Form.InputDateTime
                    label=''
                    disabled={true}
                    style={{ width: 300 }}
                    placeholder='Result Date'
                    value={item.resultDate}
                    onChange={resultDate => {
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, { resultDate });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  />
                </td>
                <td>
                  <select
                    value={item.orderStatus}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const orderStatus = e.target.value;
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, {
                        orderStatus,
                      });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - ORDER_STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={item.status}
                    disabled={true}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120'
                    }
                    onChange={e => {
                      const status = e.target.value;
                      const pacakgeListK =
                        patientOrderStore.packageList.pacakgeListK;
                      pacakgeListK[index] = Object.assign(item, { status });
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      });
                    }}
                  >
                    <option>{item?.status || 'Select'}</option>
                    {lookupItems(
                      routerStore.lookupItems,
                      'PATIENT ORDER - STATUS',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  },
);
