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
import { Icons } from '@/library/components';

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
      style={{ minWidth: '500px' }}
    >
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white ' style={{ minWidth: 190 }}>
              PLab
            </th>
            <th className='text-white' style={{ minWidth: 190 }}>
              Department
            </th>
            <th className='text-white' style={{ minWidth: 190 }}>
              Test Code / Name
            </th>

            <th className='text-white' style={{ minWidth: 190 }}>
              LabId
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
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            pLab: item.pLab,
                          },
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          function (value, key) {
                            return !(
                              value === undefined ||
                              value === null ||
                              value === ''
                            );
                          },
                        );
                        patientResultStore.patientResultService.patientListForGeneralResultEntry(
                          {
                            input: {
                              filter: {
                                ...input,
                              },
                              page: 0,
                              limit: 10,
                            },
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
                      placeholder='Search by departement'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.departement !== undefined,
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
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            departement: item.departement,
                          },
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          function (value, key) {
                            return !(
                              value === undefined ||
                              value === null ||
                              value === ''
                            );
                          },
                        );
                        patientResultStore.patientResultService.patientListForGeneralResultEntry(
                          {
                            input: {
                              filter: {
                                ...input,
                              },
                              page: 0,
                              limit: 10,
                            },
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
                {/* <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        departement: '',
                      },
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      function (value, key) {
                        return !(
                          value === undefined ||
                          value === null ||
                          value === ''
                        );
                      },
                    );
                    patientResultStore.patientResultService.patientListForGeneralResultEntry(
                      {
                        input: {
                          filter: {
                            ...input,
                          },
                          page: 0,
                          limit: 10,
                        },
                      },
                    );
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      departement: '',
                    });
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext> */}
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
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.testCode !== undefined,
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
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            testCode: item.testCode,
                          },
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          function (value, key) {
                            return !(
                              value === undefined ||
                              value === null ||
                              value === ''
                            );
                          },
                        );
                        patientResultStore.patientResultService.patientListForGeneralResultEntry(
                          {
                            input: {
                              filter: {
                                ...input,
                              },
                              page: 0,
                              limit: 10,
                            },
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
                            item => item.labId !== undefined,
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
                          labId: item.labId,
                        });
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            labId: Number.parseInt(item.labId),
                          },
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          function (value, key) {
                            return !(
                              value === undefined ||
                              value === null ||
                              value === ''
                            );
                          },
                        );
                        patientResultStore.patientResultService.patientListForGeneralResultEntry(
                          {
                            input: {
                              filter: {
                                ...input,
                              },
                              page: 0,
                              limit: 10,
                            },
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
                {/* <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        labId: '',
                      },
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      function (value, key) {
                        return !(
                          value === undefined ||
                          value === null ||
                          value === ''
                        );
                      },
                    );
                    patientResultStore.patientResultService.patientListForGeneralResultEntry(
                      {
                        input: {
                          filter: {
                            ...input,
                          },
                          page: 0,
                          limit: 10,
                        },
                      },
                    );
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      labId: '',
                    });
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext> */}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Buttons.Button
        size='small'
        type='solid'
        onClick={() => {
          generalResultEntryStore.updateFilterGeneralResEntry({
            ...generalResultEntryStore.filterGeneralResEntry,
            pLab: '',
            departement: '',
            testStatus: '',
            resultStatus: '',
            testCode: '',
            analyteCode: '',
            labId: '',
            finishResult: '',
          });
          patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
            {
              pLab: loginStore.login?.lab,
              // testCode: generalResultEntryStore.filterGeneralResEntry?.testCode,
              finishResult: 'P',
            },
          );
        }}
      >
        {'Clear Filter'}
      </Buttons.Button> */}
    </div>
  );
});
