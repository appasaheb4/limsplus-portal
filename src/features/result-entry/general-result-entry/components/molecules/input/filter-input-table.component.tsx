import React from 'react';
import {Table} from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';
import {Icons} from '@/library/components';

export const FilterInputTable = observer(() => {
  const {loading, patientResultStore, loginStore, generalResultEntryStore} =
    useStores();
  const {
    control,
    formState: {errors},
  } = useForm({mode: 'all'});

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
      style={{minWidth: '500px'}}
    >
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white ' style={{minWidth: 190}}>
              PLab
            </th>
            <th className='text-white' style={{minWidth: 190}}>
              Test Code / Name
            </th>
            <th className='text-white' style={{minWidth: 190}}>
              Department
            </th>
            <th className='text-white' style={{minWidth: 190}}>
              Test Status
            </th>
            <th className='text-white' style={{minWidth: 190}}>
              LabId
            </th>
            <th className='text-white' style={{minWidth: 190}}>
              Finish Result
            </th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          <tr>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
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
                    {/* <Icons.IconContext
                      color='#000000'
                      size='30'
                      onClick={() => {
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            pLab: '',
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
                          pLab: '',
                        });
                      }}
                    >
                      <Icons.Iconai.AiFillCloseCircle />
                    </Icons.IconContext> */}
                  </div>
                )}
                name='plab'
                rules={{required: true}}
                defaultValue={generalResultEntryStore.filterGeneralResEntry}
              />
            </td>
            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
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
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry?.testCode
                      }
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
                  rules={{required: true}}
                  defaultValue={generalResultEntryStore.filterGeneralResEntry}
                />
                {/* <Icons.IconContext
                  color='#000000'
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testCode: '',
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
                      testCode: '',
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
                  render={({field: {onChange}}) => (
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
                  rules={{required: true}}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color='#000000'
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
                </Icons.IconContext>
              </div>
            </td>
            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.testStatus}
                      placeholder='Search by test status'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.testStatus !== undefined,
                          ),
                          'testStatus',
                        ),
                        displayKey: ['testStatus'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry
                          ?.testStatus
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'testStatus',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.testStatus);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          testStatus: item.testStatus,
                        });
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            testStatus: item.testStatus,
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
                  name='testStatus'
                  rules={{required: true}}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color='#000000'
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testStatus: '',
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
                      testStatus: '',
                    });
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td>
            {/* <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.resultStatus}
                      placeholder='Search by result status'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.resultStatus !== undefined,
                          ),
                          'resultStatus',
                        ),
                        displayKey: ['resultStatus'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry
                          ?.resultStatus
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'resultStatus',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.resultStatus);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          resultStatus: item.resultStatus,
                        });
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            resultStatus: item.resultStatus,
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
                  name='resultStatus'
                  rules={{required: true}}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color='#000000'
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        resultStatus: '',
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
                      resultStatus: '',
                    });
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td> */}

            {/* <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.analyteCode}
                      placeholder='Search by code'
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.analyteCode !== undefined,
                          ),
                          'analyteCode',
                        ),
                        displayKey: ['analyteCode', 'analyteName'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry
                          ?.analyteCode
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'analyteCode',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.analyteCode);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          analyteCode: item.analyteCode,
                        });
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            analyteCode: item.analyteCode,
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
                  name='analyteCode'
                  rules={{required: true}}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color='#000000'
                  size='30'
                  onClick={() => {
                    const input = _.pickBy(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        analyteCode: '',
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
                      analyteCode: '',
                    });
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </div>
            </td> */}
            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
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
                        onChange(item.labId);
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
                  rules={{required: true}}
                  defaultValue={patientResultStore.patientResultList}
                />
                <Icons.IconContext
                  color='#000000'
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
                </Icons.IconContext>
              </div>
            </td>

            <td>
              <div className='flex flex-row items-center gap-2'>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <select
                      value={value}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                      }
                      onChange={e => {
                        const finishResult = e.target.value;
                        onChange(finishResult);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          finishResult,
                        });
                        const input = _.pickBy(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            finishResult,
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
                      }}
                    >
                      <option selected>Select</option>
                      {[
                        {code: 'P', value: 'Pending'},
                        {code: 'D', value: 'Done'},
                      ].map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  )}
                  name='finishResult'
                  rules={{required: false}}
                  defaultValue={''}
                />
                <Icons.IconContext
                  color='#000000'
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
                </Icons.IconContext>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <Buttons.Button
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
              testCode: generalResultEntryStore.filterGeneralResEntry?.testCode,
              finishResult: 'P',
            },
          );
        }}
      >
        {'Clear Filter'}
      </Buttons.Button>
    </div>
  );
});
