import React from 'react';
import { Table } from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Icons, Form } from '@/library/components';

export const FilterInputTable = observer(() => {
  const {
    loading,
    patientResultStore,
    loginStore,
    generalResultEntryStore,
    appStore,
  } = useStores();
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const getFilteredData = (searchInput, key, itemList) => {
    if (!_.isEmpty(searchInput)) {
      return itemList.filter(item => {
        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(searchInput?.toLowerCase());
      });
    }
    return itemList;
  };

  return (
    <div
      className='flex flex-row gap-2 items-center '
      style={{ minWidth: '100px' }}
    >
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white ' style={{ width: '50px' }}>
              PLab
            </th>
            <th className='text-white' style={{ width: '100px' }}>
              Department
            </th>
            <th className='text-white' style={{ width: '100px' }}>
              Test Code / Name
            </th>
            <th className='text-white' style={{ width: '50px' }}>
              LabId
            </th>
            <th className='text-white' style={{ width: '100px' }}>
              Patient Name
            </th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          <tr>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <div className='flex flex-row items-center gap-2'>
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.analyte}
                      placeholder='Search by plab'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.pLab !== undefined,
                          ),
                          'pLab',
                        ),
                        displayKey: ['pLab'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry?.pLab ||
                        loginStore.login?.lab
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'pLab',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.pLab);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          pLab: item.pLab,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            pLab: item.pLab,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  </div>
                )}
                name='plab'
                rules={{ required: true }}
                defaultValue={generalResultEntryStore.filterGeneralResEntry}
              />
            </td>

            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.analyte}
                      placeholder='Search by department'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.departement !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab,
                          ),
                          'departement',
                        ),
                        displayKey: ['departement'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry
                          ?.departement
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'departement',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.departement);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          departement: item.departement,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            departement: item.departement,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='department'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      departement: undefined,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        departement: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
                    );
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td>
            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.testCode}
                      placeholder='Search by code '
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry?.testCode
                      }
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.testCode !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab &&
                              item.departement ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.departement &&
                              item.labId ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.labId,
                          ),
                          'testCode',
                        ),
                        displayKey: ['testCode', 'testName'],
                      }}
                      // displayValue={
                      //   generalResultEntryStore.filterGeneralResEntry?.testCode
                      // }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'testCode',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.testCode);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          testCode: item.testCode,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            testCode: item.testCode,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='testCode'
                  rules={{ required: true }}
                  defaultValue={''}
                />
                <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      testCode: undefined,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testCode: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
                    );
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td>

            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.labId}
                      placeholder='Search by labId'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.labId !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab &&
                              item.departement ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.departement,
                          ),
                          'labId',
                        ),
                        displayKey: ['labId'],
                      }}
                      displayValue={generalResultEntryStore.filterGeneralResEntry?.labId?.toString()}
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'labId',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item?.labId);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          labId: Number.parseInt(item.labId),
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            labId: item.labId,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='labId'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      labId: undefined,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        labId: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
                    );
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td>

            <td>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Input
                    // label='Age From'
                    type='text'
                    placeholder='Search Patient Name..'
                    value={value?.toString()}
                    onChange={patientName => {
                      onChange(patientName);
                    }}
                  />
                )}
                name='patientName'
                rules={{ required: false }}
                defaultValue=''
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});
