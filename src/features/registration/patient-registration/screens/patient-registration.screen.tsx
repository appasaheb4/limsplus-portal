import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Icons,
  Tooltip,
  Form,
  Tabs,
  AutocompleteSearch,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Accordion, AccordionItem } from 'react-sanfona';
import '@/library/assets/css/accordion.css';
import { icons } from '@/library/assets';
import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  PatientResult,
  PatientTest,
} from './index';
import { useStores } from '@/stores';
import { stores } from '@/stores';
import { FileImportExport } from './import-from-file.screen';
import FileSaver from 'file-saver';
import { RouterFlow } from '@/flows';
import { connect } from 'react-redux';
import { toJS } from 'mobx';
import { FaPhone } from 'react-icons/fa6';
import dayjs from 'dayjs';

export const patientRegistrationOptions = [
  { title: 'PATIENT MANAGER' },
  { title: 'PATIENT VISIT' },
  { title: 'PATIENT ORDER' },
  { title: 'PATIENT TEST' },
  { title: 'PATIENT RESULT' },
  { title: 'PATIENT SAMPLE' },
];

const PatientRegistration = observer(({ sidebar }) => {
  const {
    loading,
    routerStore,
    patientManagerStore,
    patientRegistrationStore,
    patientVisitStore,
    patientOrderStore,
    patientTestStore,
    patientResultStore,
    patientSampleStore,
    importFromFileStore,
    generalResultEntryStore,
  } = useStores();
  const [reload, setReload] = useState(false);
  const [isImport, setIsImport] = useState<boolean>(false);
  const history = useHistory();
  const ageUnitsMap = {
    Y: 'Years',
    M: 'Months',
    D: 'Days',
    W: 'Weeks',
    H: 'Hours',
  };

  useEffect(() => {
    setReload(!reload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientRegistrationStore.defaultValues?.accordionExpandItem]);

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

  const accordionList = useMemo(
    () => (
      <>
        <Accordion>
          {patientRegistrationOptions.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                title={`${item.title}`}
                expanded={
                  item.title ===
                  patientRegistrationStore.defaultValues?.accordionExpandItem
                }
              >
                {item.title === 'PATIENT MANAGER' && <PatientManager />}
                {item.title === 'PATIENT VISIT' && <PatientVisit />}
                {item.title === 'PATIENT ORDER' && <PatientOrder />}
                {item.title === 'PATIENT TEST' && <PatientTest />}
                {item.title === 'PATIENT RESULT' && <PatientResult />}
                {item.title === 'PATIENT SAMPLE' && <PatientSample />}
              </AccordionItem>
            );
          })}
        </Accordion>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patientRegistrationStore.defaultValues?.accordionExpandItem],
  );

  return (
    <>
      <div className='relative'>
        <Header>
          <PageHeading
            title={stores.routerStore.selectedComponents?.title || ''}
          />
          <PageHeadingLabDetails store={stores.loginStore} />
        </Header>

        <div className='absolute left-[50%] top-7 transform -translate-x-1/2 -translate-y-1/2 w-[500px] z-99'>
          {!sidebar.isOpen && (
            <AutocompleteSearch
              data={stores.routerStore.userRouter}
              onChange={async (item: any, children: any) => {
                const { permission, selectedComp } =
                  await RouterFlow.updateSelectedCategory(
                    item?.name,
                    children?.name,
                  );
                stores.routerStore.updateSelectedComponents(selectedComp);
                stores.routerStore.updateUserPermission(permission);
                history.replace(children.path);
              }}
            />
          )}
        </div>
      </div>
      <div className='hidden md:block'>
        <Tabs
          tabs={
            RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Import',
            )
              ? [
                  { title: 'Manual Entry', icon: 'AiOutlineUnorderedList' },
                  { title: 'Import from file', icon: 'CiImport' },
                  { title: 'Export file', icon: 'CiExport' },
                ]
              : [{ title: 'Manual Entry', icon: 'AiOutlineUnorderedList' }]
          }
          onClick={item => {
            if (item == 'Import from file') {
              setIsImport(true);
              importFromFileStore.fileImportExportService.listFileImportExport();
            } else {
              if (item !== 'Export file') {
                setIsImport(false);
              } else {
                FileSaver.saveAs(
                  'https://limsplussolutions.blob.core.windows.net/assets/registration/Export Template File.xlsx',
                  'Export Template File.xlsx',
                );
              }
            }
          }}
        />
      </div>
      {!isImport ? (
        <div>
          <div className='grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-5 md:gap-4'>
            <div className='col-span-1 md:col-span-1 mt-1'>
              <div className='w-full'>
                <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                  loader={loading}
                  placeholder='Search by Patient Name'
                  data={{
                    list: _.uniqBy(
                      patientManagerStore.distinctPatientManager,
                      'pId',
                    ),
                    displayKey: [
                      'title',
                      'firstName',
                      'middleName',
                      'lastName',
                      'pId',
                    ],
                  }}
                  displayValue={
                    patientRegistrationStore.defaultValues?.patientName
                  }
                  onFilter={(value: string) => {
                    patientManagerStore.patientManagerService.filterByFields(
                      {
                        input: {
                          filter: {
                            fields: ['firstName', 'middleName', 'lastName'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      },
                      'filterDistinct',
                    );
                  }}
                  onSelect={async item => {
                    await patientRegistrationStore.getPatientRegRecords(
                      'patientName',
                      '',
                      'fetch',
                      item?.pId,
                    );
                    patientManagerStore.filterDistinctPatientManager(
                      patientManagerStore.distinctPatientManagerCopy,
                    );
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      patientName: [
                        item?.title,
                        item?.firstName || '#',
                        item?.middleName || '#',
                        item?.lastName || '#',
                        item?.pId?.toString(),
                      ]
                        .join(' - ')
                        ?.replaceAll('- #', ''),
                      pId: item?.pId,
                      mobileNo: '',
                      filterLock: false,
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-span-1 md:col-span-1'>
              <div className='w-full'>
                <Form.Input2
                  placeholder='PId'
                  className='w-full arrow-hide'
                  type='number'
                  value={patientRegistrationStore.defaultValues?.pId}
                  onChange={pId => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      pId,
                    });
                  }}
                  onKeyDown={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      patientName: '',
                      labId: '',
                      mobileNo: '',
                      filterLock: false,
                    });
                  }}
                  onBlur={async pId => {
                    if (pId?.length > 0) {
                      await patientRegistrationStore.getPatientRegRecords(
                        'pId',
                        pId?.toString(),
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className='col-span-1 md:col-span-1'>
              <div className='w-full mt-1'>
                {patientVisitStore.listPatientVisit?.length > 1 ? (
                  <select
                    className='leading-4 p-2 focus:outline-none focus:ring block h-11 shadow-sm sm:text-base border-2 border-gray-300 rounded-md w-full'
                    onChange={e => {
                      const labId = e.target.value;
                      patientRegistrationStore.updateDefaultValue({
                        ...patientRegistrationStore.defaultValues,
                        patientName: '',
                        pId: '',
                        labId,
                        mobileNo: '',
                        filterLock: false,
                        isPOLabIdLock: false,
                      });
                      patientRegistrationStore.getPatientRegRecords(
                        'labId',
                        labId?.toString(),
                      );
                    }}
                  >
                    <option>{'Select LabId'}</option>
                    {patientVisitStore.listPatientVisit?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item?.labId}>
                          {item?.labId?.toString()}
                        </option>
                      ),
                    )}
                  </select>
                ) : (
                  <Form.Input2
                    placeholder='Lab Id'
                    className='w-full arrow-hide'
                    type='number'
                    value={patientRegistrationStore.defaultValues?.labId}
                    onChange={labId => {
                      patientRegistrationStore.updateDefaultValue({
                        ...patientRegistrationStore.defaultValues,
                        labId,
                      });
                    }}
                    onKeyDown={() => {
                      patientRegistrationStore.updateDefaultValue({
                        ...patientRegistrationStore.defaultValues,
                        patientName: '',
                        pId: '',
                        mobileNo: '',
                        filterLock: false,
                        isPOLabIdLock: false,
                      });
                    }}
                    onBlur={labId => {
                      if (labId?.length > 0) {
                        patientRegistrationStore.getPatientRegRecords(
                          'labId',
                          labId?.toString(),
                        );
                      }
                    }}
                  />
                )}
              </div>
            </div>
            <div className='col-span-1 md:col-span-1'>
              <div className='w-full'>
                <Form.Input2
                  placeholder='Mobile No'
                  className='w-full arrow-hide'
                  type='number'
                  value={patientRegistrationStore.defaultValues?.mobileNo || ''}
                  onChange={mobileNo => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      mobileNo,
                    });
                  }}
                  onKeyDown={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      patientName: '',
                      pId: '',
                      labId: '',
                      filterLock: false,
                    });
                  }}
                  onBlur={mobileNo => {
                    if (mobileNo?.length > 0) {
                      patientRegistrationStore.getPatientRegRecords(
                        'mobileNo',
                        mobileNo?.toString(),
                      );
                      patientManagerStore.updatePatientManager({
                        ...patientManagerStore.patientManger,
                        mobileNo,
                        extraData: {
                          ...patientManagerStore.patientManger?.extraData,
                          whatsappNumber: mobileNo,
                        },
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className='col-span-1 md:col-span-1 flex justify-center mt-1'>
              <Tooltip tooltipText='Remove Filter'>
                <div
                  className='p-1 shadow-md rounded-md border border-gray-400 flex items-center justify-center w-10 h-10'
                  onClick={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      patientName: '',
                      pId: '',
                      labId: '',
                      mobileNo: '',
                      filterLock: false,
                    });
                    patientManagerStore.updatePatientManager({
                      ...patientManagerStore.patientManger,
                      mobileNo: '',
                    });
                    patientManagerStore.reset();
                    patientVisitStore.reset();
                    patientOrderStore.reset();
                    patientTestStore.reset();
                    patientResultStore.reset();
                    patientSampleStore.reset();
                  }}
                >
                  <Icons.RIcon
                    nameIcon='AiFillCloseCircle'
                    propsIcon={{
                      size: 24,
                      color:
                        stores.appStore.applicationSetting.theme === 'dark'
                          ? '#ffffff'
                          : '#000000',
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          </div>

          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4'>
            {patientManagerStore.listPatientManger?.map(item => (
              <div
                key={item.pId}
                className='flex flex-col md:flex-row items-start rounded-md shadow p-4 gap-4 mb-2 border-2 border-transparent focus:border-white hover:border-white transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId: item?.pId?.toString(),
                  });
                  patientRegistrationStore.getPatientRegRecords(
                    'pId',
                    item?.pId?.toString(),
                  );
                }}
              >
                <div className='flex-shrink-0'>
                  <img
                    src={item.sex === 'M' ? icons.male : icons.female}
                    style={{ width: 40, height: 40 }}
                    alt={item.sex === 'M' ? 'male' : 'female'}
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold'>
                    PId: {item?.pId?.toString()}
                  </span>
                  <span className='text-sm font-bold'>
                    {(item?.title?.toUpperCase() || '') +
                      (item?.firstName
                        ? ' ' + item.firstName.toUpperCase()
                        : '') +
                      (item?.middleName
                        ? ' ' + item.middleName.toUpperCase()
                        : '') +
                      (item?.lastName ? ' ' + item.lastName.toUpperCase() : '')}
                  </span>
                  <span>
                    {item.birthDate &&
                      dayjs(item.birthDate).format('DD-MM-YYYY')}
                  </span>
                  <span>
                    {item.sex === 'M' ? 'Male' : 'Female'} |{' '}
                    {item?.age !== undefined && item?.ageUnit !== undefined && (
                      <span>
                        {item.age + ' ' + (ageUnitsMap[item.ageUnit] || '')}
                      </span>
                    )}
                  </span>
                  <span className='flex items-center gap-2'>
                    <FaPhone />
                    {item?.mobileNo || ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {accordionList}
        </div>
      ) : (
        <>
          <FileImportExport />
        </>
      )}
    </>
  );
});
export default connect((store: any) => ({
  sidebar: store.sidebar,
}))(PatientRegistration);
