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
      <div>
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
          <div className='flex mx-20 items-center justify-center gap-2'>
            <div className='w-60'>
              <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='Search by Patient Name'
                data={{
                  list: _.uniqBy(
                    patientResultStore.distinctPatientResult,
                    'name',
                  )?.filter(item => item != ''),
                  displayKey: ['name'],
                }}
                displayValue={generalResultEntryStore.filterGeneralResEntry?.name?.toString()}
                onFilter={(value: string) => {
                  patientResultStore.filterDistinctPatientResult(
                    getFilteredData(
                      value,
                      'name',
                      patientResultStore.distinctPatientResultCopy,
                    ),
                  );
                }}
                onSelect={async item => {
                  await patientRegistrationStore.getPatientRegRecords(
                    'patientName',
                    item.name,
                  );
                  patientResultStore.filterDistinctPatientResult(
                    patientResultStore.distinctPatientResultCopy,
                  );
                }}
              />
            </div>

            {patientRegistrationStore.filterOptionList.pIds?.length > 1 ? (
              <select
                className={
                  'leading-4 p-2 focus:outline-none focus:ring block mt-1 h-11 shadow-sm sm:text-base border-2 border-gray-300 rounded-md w-40'
                }
                onChange={e => {
                  const pId = e.target.value;
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId,
                    labId: '',
                    mobileNo: '',
                    filterLock: false,
                  });
                  patientRegistrationStore.getPatientRegRecords(
                    'pId',
                    pId?.toString(),
                  );
                }}
              >
                <option>{'Select PId'}</option>
                {patientRegistrationStore.filterOptionList.pIds?.map(
                  (item: any, index: number) => (
                    <option key={index} value={item}>
                      {item.toString()}
                    </option>
                  ),
                )}
              </select>
            ) : (
              <Form.Input2
                placeholder='PId'
                className='w-40 arrow-hide'
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
            )}
            {patientRegistrationStore.filterOptionList.labIds?.length > 1 ? (
              <select
                className={
                  'leading-4 p-2 focus:outline-none focus:ring block mt-1 h-11 shadow-sm sm:text-base border-2 border-gray-300 rounded-md w-40'
                }
                onChange={e => {
                  const labId = e.target.value;
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId: '',
                    labId,
                    mobileNo: '',
                    filterLock: false,
                  });
                  patientRegistrationStore.getPatientRegRecords(
                    'labId',
                    labId?.toString(),
                  );
                }}
              >
                <option>{'Select LabId'}</option>
                {patientRegistrationStore.filterOptionList.labIds?.map(
                  (item: any, index: number) => (
                    <option key={index} value={item}>
                      {item.toString()}
                    </option>
                  ),
                )}
              </select>
            ) : (
              <Form.Input2
                placeholder='Lab Id'
                className='w-40 arrow-hide'
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
                    pId: '',
                    mobileNo: '',
                    filterLock: false,
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
            <Form.Input2
              placeholder='Mobile No'
              className='w-40 arrow-hide'
              type='number'
              value={patientRegistrationStore.defaultValues?.mobileNo}
              onChange={mobileNo => {
                patientRegistrationStore.updateDefaultValue({
                  ...patientRegistrationStore.defaultValues,
                  mobileNo,
                });
              }}
              onKeyDown={() => {
                patientRegistrationStore.updateDefaultValue({
                  ...patientRegistrationStore.defaultValues,
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
            <Tooltip tooltipText='Remove Filter'>
              <div
                className='p-1 shadow-md rounded-md border border-gray-400'
                onClick={() => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
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
          <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4'>
            {patientManagerStore.listPatientManger?.map(item => (
              <div
                key={item.pId}
                className='flex rounded-md shadow p-4 gap-4 items-center mb-2 border-2 border-transparent focus:border-white hover:border-white transition duration-300 ease-in-out transform hover:scale-105'
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
                <div>
                  <img
                    src={item.sex == 'M' ? icons.male : icons.female}
                    style={{ width: 40, height: 40 }}
                    alt='male'
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-bold'>
                    {item?.firstName.toUpperCase() +
                      ' ' +
                      (item?.middleName != undefined
                        ? item?.middleName.toUpperCase()
                        : '') +
                      ' ' +
                      item?.lastName.toUpperCase()}
                  </span>
                  <span>{item?.pId?.toString()}</span>
                  <span>
                    {item.sex} | <span>{item?.age + ' ' + item?.ageUnit}</span>
                  </span>
                  <span>{item?.mobileNo}</span>
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
