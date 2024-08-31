import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
  Toast,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Icons } from '@/library/components';
import { debounce } from '@/core-utils';
import { DistinctPatientResult } from '@features/registration/patient-registration/models';

interface FilterInputTableProps {
  data: Partial<DistinctPatientResult>;
  onFilter: (filter: any, type) => void;
}

type SelectedValues = {
  pLab?: string;
  department: string;
  testCode: string;
  testName: string;
  labId: string;
  name: string;
  sampleId: string;
};

export const FilterInputTable = observer(
  ({ data, onFilter }: FilterInputTableProps) => {
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
    const [filterPayload, setFilterPayload] = useState<
      Partial<DistinctPatientResult>
    >({});
    const [selectedValues, setSelectedValues] = useState<
      Partial<SelectedValues>
    >({
      pLab:
        generalResultEntryStore.filterGeneralResEntry?.pLab ||
        loginStore.login.lab,
    });

    useEffect(() => {
      setFilterPayload(data);
    }, [data]);
    // console.log({ filterPayload });

    const filterData = (searchInput, key) => {
      let result = data;
      if (!_.isEmpty(searchInput)) {
        result = data[key]?.filter(item => {
          if (key != 'testCodeName') {
            return item?._id
              ?.toString()
              .toLowerCase()
              .includes(searchInput?.toLowerCase());
          } else {
            return (
              item?._id?.testCode
                ?.toString()
                .toLowerCase()
                .includes(searchInput?.toLowerCase()) ||
              item?._id?.testName
                ?.toString()
                .toLowerCase()
                .includes(searchInput?.toLowerCase())
            );
          }
        });
      } else {
        result = data[key];
      }
      setFilterPayload({
        ...filterPayload,
        [key]: result,
      });
    };

    return (
      <div
        className='flex flex-row gap-2 items-center'
        style={{ minWidth: '100px' }}
      >
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white z-0' style={{ width: '50px' }}>
                PLab
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Department
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Test Code / Name
              </th>
              <th className='text-white z-0' style={{ width: '50px' }}>
                LabId
              </th>

              <th className='text-white z-0' style={{ width: '100px' }}>
                Patient Name
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Sample Id
              </th>
              <th className='text-white z-0' style={{ width: '10px' }}>
                Clear
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
                        disable
                        data={[]}
                        displayValue={selectedValues?.pLab || ''}
                      />
                    </div>
                  )}
                  name='plab'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.distinctPatientResult}
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
                          list: filterPayload?.department,
                          displayKey: ['_id'],
                        }}
                        displayValue={selectedValues?.department || ''}
                        onFilter={(value: string) => {
                          filterData(value, 'department');
                        }}
                        onSelect={item => {
                          setSelectedValues({
                            ...selectedValues,
                            department: item?._id,
                          });
                          onChange(item._id);
                          onFilter(
                            {
                              departement: item._id,
                            },
                            'department',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                          (function (n) {
                            setTimeout(() => {
                              setFilterPayload(n);
                            }, 1400);
                          })({
                            ...item,
                            department: [{ _id: item?._id }],
                            sampleId: data?.sampleId,
                          });
                        }}
                      />
                    )}
                    name='department'
                    rules={{ required: false }}
                    defaultValue={filterPayload?.department}
                  />
                  {/* <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          departement: undefined,
                        },
                        'department',
                      );
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
                        placeholder='Search by code'
                        displayValue={
                          selectedValues?.testCode
                            ? selectedValues?.testCode +
                              '-' +
                              selectedValues?.testName
                            : ''
                        }
                        data={{
                          list: filterPayload?.testCodeName?.map(
                            (item: any) => {
                              return {
                                ...item,
                                testCode: item?._id?.testCode,
                                testName: item._id?.testName,
                              };
                            },
                          ),
                          displayKey: ['testCode', 'testName'],
                        }}
                        onFilter={(value: string) => {
                          filterData(value, 'testCodeName');
                        }}
                        onSelect={item => {
                          setSelectedValues({
                            ...selectedValues,
                            testCode: item?.testCode,
                            testName: item?.testName,
                          });
                          onChange(item.testCode);
                          onFilter(
                            {
                              testCode: item?.testCode,
                            },
                            'testCode',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                          (function (n) {
                            setTimeout(() => {
                              setFilterPayload(n);
                            }, 1400);
                          })({
                            ...item,
                            testCodeName: [{ _id: item?._id }],
                            sampleId: data?.sampleId,
                          });
                        }}
                      />
                    )}
                    name='testCode'
                    rules={{ required: true }}
                    defaultValue={filterPayload?.testCodeName}
                  />
                  {/* <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          testCode: undefined,
                        },
                        'testCode',
                      );
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
                        hasError={!!errors.labId}
                        keyboard='number'
                        placeholder='Search by labId'
                        data={{
                          list: filterPayload?.labId,
                          displayKey: ['_id'],
                        }}
                        displayValue={selectedValues?.labId || ''}
                        onFilter={(value: string) => {
                          filterData(value, 'labId');
                        }}
                        onSelect={item => {
                          setSelectedValues({
                            ...selectedValues,
                            labId: item?._id?.toString(),
                          });
                          onChange(item?._id);
                          onFilter(
                            {
                              labId: Number.parseInt(item._id),
                            },
                            'labId',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                          (function (n) {
                            setTimeout(() => {
                              setFilterPayload(n);
                            }, 1400);
                          })({
                            ...item,
                            labId: [{ _id: item?._id }],
                            sampleId: data?.sampleId,
                          });
                        }}
                      />
                    )}
                    name='labId'
                    rules={{ required: true }}
                    defaultValue={filterPayload?.labId}
                  />
                  {/* <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          labId: undefined,
                        },
                        'labId',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext> */}
                </div>
              </td>

              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.patientName}
                      placeholder='Search by patient name'
                      data={{
                        list: filterPayload?.name,
                        displayKey: ['_id'],
                      }}
                      displayValue={selectedValues?.name || ''}
                      onFilter={(value: string) => {
                        filterData(value, 'name');
                      }}
                      onSelect={item => {
                        setSelectedValues({
                          ...selectedValues,
                          name: item?._id,
                        });
                        onChange(item?._id);
                        onFilter(
                          {
                            name: item?._id,
                          },
                          'name',
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                        console.log({ item });

                        (function (n) {
                          setTimeout(() => {
                            setFilterPayload(n);
                          }, 1400);
                        })({
                          ...item,
                          name: [{ _id: item?._id }],
                          sampleId: data?.sampleId,
                        });
                      }}
                    />
                  )}
                  name='patientName'
                  rules={{ required: false }}
                  defaultValue={filterPayload?.name}
                />
              </td>
              <td title='sampleId'>
                <div className='flex flex-row items-center gap-2'>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.sampleId}
                        keyboard='number'
                        placeholder='Search by sample id'
                        data={{
                          list: filterPayload?.sampleId,
                          displayKey: ['_id'],
                        }}
                        displayValue={selectedValues?.sampleId || ''}
                        onFilter={(value: string) => {
                          filterData(value, 'sampleId');
                        }}
                        onSelect={item => {
                          setSelectedValues({
                            ...selectedValues,
                            sampleId: item?._id,
                          });
                          onChange(item?._id);
                          onFilter(
                            {
                              sampleId: item?._id,
                            },
                            'sampleId',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                        }}
                      />
                    )}
                    name='sampleId'
                    rules={{ required: true }}
                    defaultValue={filterPayload?.sampleId}
                  />
                  {/* <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          sampleId: undefined,
                        },
                        'sampleId',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext> */}
                </div>
              </td>
              <td>
                <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    patientResultStore.filterDistinctPatientResult(
                      patientResultStore.distinctPatientResultCopy,
                    );
                    onFilter(
                      {
                        departement: undefined,
                        testCode: undefined,
                        labId: undefined,
                        sampleId: undefined,
                        name: undefined,
                      },
                      'all',
                    );
                    setSelectedValues({});
                    setFilterPayload(data);
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  },
);
