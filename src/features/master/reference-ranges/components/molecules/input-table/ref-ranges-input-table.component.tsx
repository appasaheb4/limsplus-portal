import React from 'react';
import dayjs from 'dayjs';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Form,
  Icons,
  Toast,
} from '@/library/components';
import {lookupItems, getDefaultLookupItem, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {TableBootstrap} from './TableBootstrap';
import {FormHelper} from '@/helper';
import {getDays} from '../../../utils';
interface RefRangesInputTableProps {
  data: any;
  extraData?: any;
  onDelete?: (id: number) => void;
  onUpdateItems?: (item: any, id) => void;
}

export const RefRangesInputTable = observer(
  ({data, extraData, onDelete, onUpdateItems}: RefRangesInputTableProps) => {
    const {
      masterAnalyteStore,
      loading,
      departmentStore,
      interfaceManagerStore,
      labStore,
      refernceRangesStore,
    } = useStores();

    const duplicateCombination = () => {
      const {refRangesInputList} = refernceRangesStore.referenceRanges;
      const arr: any = _.map(refRangesInputList, o =>
        _.pick(o, [
          'analyteCode',
          'species',
          'sex',
          'rangeSetOn',
          'rangeType',
          'ageFrom',
          'ageTo',
          'ageUnit',
          'environment',
        ]),
      );
      const set = new Set(arr.map(JSON.stringify));
      const hasDuplicates = set.size < arr.length;
      if (hasDuplicates) {
        Toast.warning({
          message: '😔 Duplicate record found!',
        });
      }
      refernceRangesStore.updateExistsRecord(hasDuplicates);
    };

    return (
      <div style={{position: 'relative'}}>
        <TableBootstrap
          id='rangeId'
          data={data}
          columns={[
            {
              dataField: 'rangeId',
              text: 'Range Id',
              editable: false,
              csvExport: false,
            },
            {
              dataField: 'rangeType',
              text: 'Range Type',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.rangeType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const rangeType = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            rangeType,
                            colorLo: getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_LW_COLOR`,
                            ),
                            colorHi: getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_HI_COLOR`,
                            ),
                            colorNormal: getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_NO_COLOR`,
                            ),
                          },
                          row.rangeId,
                        );
                      setTimeout(() => {
                        duplicateCombination();
                      }, 1000);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'RANGE_TYPE').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },

            {
              dataField: 'ageFrom',
              text: 'Age From',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.ageFrom}
                    type='text'
                    pattern={FormHelper.patterns.decimalPatterm}
                    onBlur={ageFrom => {
                      const days = getDays(
                        ageFrom,
                        row?.ageFromUnit,
                        row?.ageTo,
                        row?.ageToUnit,
                      );
                      if (days) {
                        onUpdateItems &&
                          onUpdateItems({ageFrom, days}, row.rangeId);
                        setTimeout(() => {
                          duplicateCombination();
                        }, 1000);
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'ageFromUnit',
              text: 'Age From Unit',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const ageFromUnit = e.target.value;
                      const days = getDays(
                        row?.ageFrom,
                        ageFromUnit,
                        row?.ageTo,
                        row?.ageToUnit,
                      );
                      if (days) {
                        onUpdateItems &&
                          onUpdateItems({ageFromUnit, days}, row.rangeId);
                        setTimeout(() => {
                          duplicateCombination();
                        }, 1000);
                      }
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'AGE_UNIT').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'ageTo',
              text: 'Age To',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.ageTo}
                    type='text'
                    pattern={FormHelper.patterns.decimalPatterm}
                    onBlur={ageTo => {
                      const days = getDays(
                        row?.ageFrom,
                        row?.ageFromUnit,
                        ageTo,
                        row?.ageToUnit,
                      );
                      if (days) {
                        onUpdateItems &&
                          onUpdateItems({ageTo, days}, row.rangeId);
                        setTimeout(() => {
                          duplicateCombination();
                        }, 1000);
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'ageToUnit',
              text: 'Age To Unit',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const ageToUnit = e.target.value;
                      const days = getDays(
                        row?.ageFrom,
                        row?.ageFromUnit,
                        row?.ageTo,
                        ageToUnit,
                      );
                      if (days) {
                        onUpdateItems &&
                          onUpdateItems({ageToUnit, days}, row.rangeId);
                        setTimeout(() => {
                          duplicateCombination();
                        }, 1000);
                      }
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'AGE_UNIT').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'low',
              text: 'Low',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.low}
                    onBlur={low => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(low) &&
                        FormHelper.isNumberAvailable(low)
                      ) {
                        const isNumber = Number(low);
                        if (isNumber) {
                          onUpdateItems &&
                            onUpdateItems(
                              {
                                low: row?.picture
                                  ? Number.parseFloat(low).toFixed(row?.picture)
                                  : low,
                              },
                              row.rangeId,
                            );
                        } else {
                          onUpdateItems &&
                            onUpdateItems({low: low}, row.rangeId);
                        }
                      } else {
                        Toast.warning({
                          message:
                            '😔 Only > and < sign and numbers should be allowed',
                        });
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'high',
              text: 'High',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.high}
                    onBlur={high => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/);
                      if (
                        regex.test(high) &&
                        FormHelper.isNumberAvailable(high)
                      ) {
                        const isNumber = Number(high);
                        if (isNumber) {
                          onUpdateItems &&
                            onUpdateItems(
                              {
                                high: row?.picture
                                  ? Number.parseFloat(high).toFixed(
                                      row?.picture,
                                    )
                                  : high,
                              },
                              row.rangeId,
                            );
                        } else {
                          onUpdateItems && onUpdateItems({high}, row.rangeId);
                        }
                      } else {
                        Toast.warning({
                          message:
                            '😔 Only > and < sign and numbers should be allowed',
                        });
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'alpha',
              text: 'Allpha',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.alpha}
                    onBlur={alpha => {
                      onUpdateItems && onUpdateItems({alpha}, row.rangeId);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder='Search by code or name'
                    data={{
                      list: masterAnalyteStore.listMasterAnalyte,
                      displayKey: ['analyteCode', 'analyteName'],
                    }}
                    displayValue={row?.analyteCode}
                    onFilter={(value: string) => {
                      masterAnalyteStore.masterAnalyteService.filterByFields({
                        input: {
                          filter: {
                            fields: ['analyteCode', 'analyteName'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            analyteCode: item.analyteCode,
                            analyteName: item.analyteName,
                            analyteDepartments: item.departments,
                            lab: item.lab,
                          },
                          row.rangeId,
                        );
                      masterAnalyteStore.updateMasterAnalyteList(
                        masterAnalyteStore.listMasterAnalyteCopy,
                      );
                      duplicateCombination();
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'department',
              text: 'Department',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder='Search by code or name'
                    data={{
                      list: departmentStore.listDepartment.filter(item =>
                        row?.analyteDepartments?.includes(item.code),
                      ),
                      displayKey: ['code', 'name'],
                    }}
                    displayValue={row?.department}
                    onFilter={(value: string) => {
                      departmentStore.DepartmentService.filterByFields({
                        input: {
                          filter: {
                            fields: ['code', 'name'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onUpdateItems &&
                        onUpdateItems({department: item.code}, row.rangeId);
                      departmentStore.updateDepartmentList(
                        departmentStore.listDepartmentCopy,
                      );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'species',
              text: 'Species',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row?.species}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const species = e.target.value as string;
                      onUpdateItems && onUpdateItems({species}, row.rangeId);
                      setTimeout(() => {
                        duplicateCombination();
                      }, 1000);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'SPECIES').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'sex',
              text: 'Sex',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const sex = e.target.value;
                      onUpdateItems && onUpdateItems({sex}, row.rangeId);
                      setTimeout(() => {
                        duplicateCombination();
                      }, 1000);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'SEX').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'rangeSetOn',
              text: 'Range Set On',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row?.rangeSetOn}
                    className={
                      'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                    }
                    onChange={e => {
                      const rangeSetOn = e.target.value as string;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            rangeSetOn,
                            equipmentType:
                              rangeSetOn === 'L'
                                ? undefined
                                : row?.equipmentType,
                            lab: rangeSetOn === 'I' ? undefined : row?.lab,
                          },
                          row.rangeId,
                        );
                      setTimeout(() => {
                        duplicateCombination();
                      }, 1000);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'RANGE_SET_ON').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'equipmentType',
              text: 'Equipment Type',
              csvExport: false,
              headerClasses: 'textHeader4',
              editable: (content, row, rowIndex, columnIndex) =>
                row?.rangeSetOn === 'L' ? false : true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder='Search by instrumentType'
                    data={{
                      list: interfaceManagerStore.listInterfaceManager,
                      displayKey: ['instrumentType'],
                    }}
                    onFilter={(value: string) => {
                      interfaceManagerStore.interfaceManagerService.filterByFields(
                        {
                          input: {
                            filter: {
                              fields: ['instrumentType'],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                    onSelect={item => {
                      onUpdateItems &&
                        onUpdateItems(
                          {equipmentType: item.instrumentType},
                          row.rangeId,
                        );
                      interfaceManagerStore.updateInterfaceManagerList(
                        interfaceManagerStore.listInterfaceManagerCopy,
                      );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'lab',
              text: 'Lab',
              csvExport: false,
              headerClasses: 'textHeader4',
              // editable: (content, row, rowIndex, columnIndex) =>
              //   row?.rangeSetOn === "I" ? false : true,
              editable: false,
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <AutoCompleteFilterSingleSelectMultiFieldsDisplay
              //       loader={loading}
              //       placeholder='Search by code or name'
              //       data={{
              //         list: labStore.listLabs,
              //         displayKey: ['code', 'name'],
              //       }}
              //       onFilter={(value: string) => {
              //         labStore.LabService.filterByFields({
              //           input: {
              //             filter: {
              //               fields: ['code', 'name'],
              //               srText: value,
              //             },
              //             page: 0,
              //             limit: 10,
              //           },
              //         });
              //       }}
              //       onSelect={item => {
              //         onUpdateItems &&
              //           onUpdateItems({lab: item.code}, row.rangeId);
              //         labStore.updateLabList(labStore.listLabsCopy);
              //       }}
              //     />
              //   </>
              // ),
            },

            {
              dataField: 'deltaType',
              text: 'Delta Type',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.deltaType}
                    onBlur={deltaType => {
                      onUpdateItems && onUpdateItems({deltaType}, row.rangeId);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'deltaInterval',
              text: 'Delta Interval',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.deltaInterval}
                    onBlur={deltaInterval => {
                      onUpdateItems &&
                        onUpdateItems({deltaInterval}, row.rangeId);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'intervalUnit',
              text: 'Interval Unit',
              headerClasses: 'textHeaderm',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const intervalUnit = e.target.value;
                      onUpdateItems &&
                        onUpdateItems({intervalUnit}, row.rangeId);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'INTERVAL_UNIT').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'colorLo',
              text: 'Color Lo',
              headerClasses: 'textHeaderm',
              csvExport: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        extraData.lookupItems,
                        `${row.rangeType}_LW_COLOR`,
                      ).find(item => item.code === row.colorLo)?.value
                    }
                  </>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.colorLo}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const colorLo = e.target.value;
                      onUpdateItems && onUpdateItems({colorLo}, row.rangeId);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_LW_COLOR`,
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'colorHi',
              text: 'Color Hi',
              headerClasses: 'textHeaderm',
              csvExport: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        extraData.lookupItems,
                        `${row.rangeType}_HI_COLOR`,
                      ).find(item => item.code == row.colorHi)?.value
                    }
                  </>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.colorHi}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const colorHi = e.target.value;
                      onUpdateItems && onUpdateItems({colorHi}, row.rangeId);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_HI_COLOR`,
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'colorNormal',
              text: 'Color No',
              headerClasses: 'textHeaderm',
              csvExport: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        extraData.lookupItems,
                        `${row.rangeType}_NO_COLOR`,
                      ).find(item => item.code == row.colorNormal)?.value
                    }
                  </>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.colorNormal}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const colorNormal = e.target.value;
                      onUpdateItems &&
                        onUpdateItems({colorNormal}, row.rangeId);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_NO_COLOR`,
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'enterBy',
              text: 'Enter By',
              csvExport: false,
              headerClasses: 'textHeader4',
            },
            {
              dataField: 'environment',
              text: 'Environment',
              csvExport: false,
              headerClasses: 'textHeader4',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const environment = e.target.value;
                      onUpdateItems &&
                        onUpdateItems({environment}, row.rangeId);
                      setTimeout(() => {
                        duplicateCombination();
                      }, 1000);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'ENVIRONMENT').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'dateCreation',
              text: 'Date Creation',
              csvExport: false,
              headerClasses: 'textHeader4',
              formatter: (cell, row) => {
                return <>{dayjs(row.dateCreation).format('YYYY-MM-DD')}</>;
              },
            },
            {
              dataField: 'dateActive',
              text: 'Date Active',
              csvExport: false,
              headerClasses: 'textHeader4',
              formatter: (cell, row) => {
                return <>{dayjs(row.dateActive).format('YYYY-MM-DD')}</>;
              },
            },
            {
              dataField: 'dateExpire',
              text: 'Date Expire',
              csvExport: false,
              headerClasses: 'textHeader4',
              formatter: (cell, row) => {
                return <>{dayjs(row.dateExpire).format('YYYY-MM-DD')}</>;
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.InputDateTime
                    value={new Date(row.dateExpire)}
                    onFocusRemove={dateExpire => {
                      onUpdateItems && onUpdateItems({dateExpire}, row.rangeId);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'version',
              text: 'Version',
              csvExport: false,
              headerClasses: 'textHeader4',
            },

            {
              dataField: 'opration',
              text: 'Action',
              editable: false,
              csvExport: false,
              hidden: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => onDelete && onDelete(row.rangeId)}
                    >
                      {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                    </Icons.IconContext>
                  </div>
                </>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={true}
          isSelectRow={true}
          fileName='Doctors'
          // onSelectedRow={rows => {
          //   {
          //   }
          // }}
          // onUpdateItem={(value: any, dataField: string, id: string) => {
          //   {
          //   }
          // }}
          // onPageSizeChange={(page, size) => {
          //   {
          //   }
          // }}
          // onFilter={(type, filter, page, size) => {
          //   {
          //   }
          // }}
          // clearAllFilter={() => {
          //   {
          //   }
          // }}
        />
      </div>
    );
  },
);
