import React, {useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Icons,
  Tooltip,
  Form,
} from '@/library/components';
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';
import {icons} from '@/library/assets';

import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  PatientResult,
  PatientTest,
} from './index';
import {useStores} from '@/stores';
import {stores} from '@/stores';

export const patientRegistrationOptions = [
  {title: 'PATIENT MANAGER'},
  {title: 'PATIENT VISIT'},
  {title: 'PATIENT ORDER'},
  {title: 'PATIENT TEST'},
  {title: 'PATIENT RESULT'},
  {title: 'PATIENT SAMPLE'},
];

const PatientRegistration = observer(() => {
  const [reloadPatientResult, setReloadPatientResult] = useState<Array<any>>(
    [],
  );
  const {
    loading,
    loginStore,
    patientManagerStore,
    patientRegistrationStore,
    patientVisitStore,
    patientOrderStore,
    patientTestStore,
    patientResultStore,
    patientSampleStore,
  } = useStores();

  const accordionList = useMemo(
    () => (
      <>
        <Accordion>
          {patientRegistrationOptions.map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                expanded={
                  item.title ===
                  patientRegistrationStore.defaultValues?.accordionExpandItem
                }
                // onExpand={index => {
                //   switch (index) {
                //     case 0:
                //       startupPM();
                //       break;
                //     case 1:
                //       startupPV();
                //       break;
                //     case 2:
                //       startupPO();
                //       break;
                //     default:
                //       return;
                //   }
                // }}
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
    [
      // patientManagerStore.listPatientManger,
      // patientVisitStore.listPatientVisit,
      // masterPanelStore.listMasterPanel,
      patientRegistrationStore.defaultValues?.accordionExpandItem,
    ],
  );

  return (
    <>
      <Header>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-2 items-center'>
            <PageHeading
              title={stores.routerStore.selectedComponents?.title || ''}
            />
            <div className='flex mx-20 items-center gap-2'>
              <Form.Input
                placeholder='PId'
                className='w-40'
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
                onBlur={pId => {
                  if (pId?.length > 0) {
                    patientManagerStore.patientManagerService.getFilterOptionList(
                      {
                        input: {
                          filter: {
                            type: 'pId',
                            pId: pId?.toString(),
                          },
                        },
                      },
                    );
                    patientManagerStore.patientManagerService.getPatientRegRecords(
                      {
                        input: {
                          filter: {type: 'pId', pId: pId?.toString()},
                        },
                      },
                    );
                  }
                }}
              />
              {/* <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='PId'
                className='h-4'
                data={{
                  list: [{pId: '*'}].concat(
                    _.uniqBy(
                      patientRegistrationStore.filterOptionList?.pIds?.map(
                        item => {
                          return {pId: item};
                        },
                      ),
                      'pId',
                    ),
                  ),
                  displayKey: ['pId'],
                }}
                disable={patientRegistrationStore.defaultValues?.filterLock}
                displayValue={patientRegistrationStore.defaultValues?.pId?.toString()}
                onFilter={(pId: string) => {
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'pId',
                          pId,
                        },
                      },
                    },
                  );
                }}
                onSelect={item => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId: item.pId !== '*' ? Number.parseInt(item.pId) : '*',
                    labId: '*',
                    mobileNo: '*',
                    filterLock: true,
                  });
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'pId',
                          pId: item.pId.toString(),
                        },
                      },
                    },
                  );
                  patientManagerStore.patientManagerService.getPatientRegRecords(
                    {
                      input: {
                        filter: {type: 'pId', pId: item?.pId?.toString()},
                      },
                    },
                  );
                }}
              /> */}

              {patientRegistrationStore.filterOptionList.labIds?.length > 1 ? (
                <select
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block mt-1 h-11 shadow-sm sm:text-base border-2 border-gray-300 rounded-md w-40'
                  }
                  onChange={e => {
                    const modeOfPayment = e.target.value;
                  }}
                >
                  <option selected>{'Select LabId'}</option>
                  {patientRegistrationStore.filterOptionList.labIds?.map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {item.toString()}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <Form.Input
                  placeholder='Lab Id'
                  className='w-40'
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
                      patientManagerStore.patientManagerService.getFilterOptionList(
                        {
                          input: {
                            filter: {
                              type: 'labId',
                              labId: labId?.toString(),
                            },
                          },
                        },
                      );
                      patientManagerStore.patientManagerService.getPatientRegRecords(
                        {
                          input: {
                            filter: {type: 'labId', labId: labId?.toString()},
                          },
                        },
                      );
                    }
                  }}
                />
              )}

              {/* <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='Lab Id'
                className='h-4'
                data={{
                  list: [{labId: '*'}].concat(
                    _.uniqBy(
                      patientRegistrationStore.filterOptionList?.labIds?.map(
                        item => {
                          return {labId: item};
                        },
                      ),
                      'labId',
                    ),
                  ),
                  displayKey: ['labId'],
                }}
                disable={patientRegistrationStore.defaultValues?.filterLock}
                displayValue={
                  patientRegistrationStore.defaultValues?.labId?.toString() ||
                  '*'
                }
                onFilter={(labId: string) => {
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'labId',
                          labId,
                        },
                      },
                    },
                  );
                }}
                onSelect={item => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    labId:
                      item.labId !== '*' ? Number.parseInt(item.labId) : '*',
                    pId: '*',
                    mobileNo: '*',
                    filterLock: true,
                  });
                  patientManagerStore.patientManagerService.getPatientRegRecords(
                    {
                      input: {
                        filter: {type: 'labId', labId: item.labId?.toString()},
                      },
                    },
                  );
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'labId',
                          labId: item.labId?.toString(),
                        },
                      },
                    },
                  );
                }}
              /> */}
              <Form.Input
                placeholder='Mobile No'
                className='w-40'
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
                    patientManagerStore.patientManagerService.getFilterOptionList(
                      {
                        input: {
                          filter: {
                            type: 'mobileNo',
                            mobileNo: mobileNo?.toString(),
                          },
                        },
                      },
                    );
                    patientManagerStore.patientManagerService.getPatientRegRecords(
                      {
                        input: {
                          filter: {
                            type: 'mobileNo',
                            mobileNo: mobileNo?.toString(),
                          },
                        },
                      },
                    );
                  }
                }}
              />
              {/* <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='Mobile Number'
                className='h-4'
                data={{
                  list: [{mobileNo: '*'}].concat(
                    _.uniqBy(
                      patientRegistrationStore.filterOptionList.mobileNos.map(
                        item => {
                          return {mobileNo: item};
                        },
                      ),
                      'mobileNo',
                    ),
                  ),
                  displayKey: ['mobileNo'],
                }}
                disable={patientRegistrationStore.defaultValues?.filterLock}
                displayValue={
                  patientRegistrationStore.defaultValues?.mobileNo?.toString() ||
                  '*'
                }
                onFilter={(mobileNo: string) => {
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'mobileNo',
                          mobileNo,
                        },
                      },
                    },
                  );
                }}
                onSelect={item => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    mobileNo: item.mobileNo !== '*' ? item?.mobileNo : '*',
                    pId: '*',
                    labId: '*',
                    filterLock: true,
                  });
                  patientManagerStore.patientManagerService.getPatientRegRecords(
                    {
                      input: {
                        filter: {
                          type: 'mobileNo',
                          mobileNo: item.mobileNo?.toString(),
                        },
                      },
                    },
                  );
                  patientManagerStore.patientManagerService.getFilterOptionList(
                    {
                      input: {
                        filter: {
                          type: 'mobileNo',
                          mobileNo: item.mobileNo?.toString(),
                        },
                      },
                    },
                  );
                }}
              /> */}

              {/* <Tooltip tooltipText='Lock'>
                <Buttons.Button
                  size='medium'
                  type='outline'
                  onClick={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      filterLock:
                        !patientRegistrationStore.defaultValues?.filterLock,
                    });
                  }}
                >
                  {patientRegistrationStore.defaultValues?.filterLock ? (
                    <Icons.IconBs.BsFillLockFill />
                  ) : (
                    <Icons.IconBs.BsFillUnlockFill />
                  )}
                </Buttons.Button>
              </Tooltip> */}
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
                    propsIcon={{size: 24}}
                  />
                </div>
              </Tooltip>
            </div>
            <PageHeadingLabDetails store={loginStore} />
          </div>

          <div className='flex items-center justify-center  mt-2 gap-2 just'>
            {patientManagerStore.listPatientManger?.map(item => (
              <>
                <div className='flex rounded-md shadow-md p-2 gap-1 items-center'>
                  <div>
                    <img
                      src={item.sex == 'M' ? icons.male : icons.female}
                      style={{width: 40, height: 40}}
                      alt='male'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm font-bold'>
                      {patientManagerStore.listPatientManger[0]?.firstName +
                        ' ' +
                        patientManagerStore.listPatientManger[0]?.middleName +
                        ' ' +
                        patientManagerStore.listPatientManger[0]?.lastName}
                    </span>
                    <span>
                      {item.sex} |{' '}
                      <span>
                        {patientManagerStore.listPatientManger[0]?.age +
                          ' ' +
                          patientManagerStore.listPatientManger[0]?.ageUnit}
                      </span>
                    </span>
                    <span>
                      {patientManagerStore.listPatientManger[0]?.mobileNo}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Header>
      <div>{accordionList}</div>
      {/* <div className='flex flex-col -mt-10'>
        <h4 className='underline text-center'>Activity</h4>
        <Grid cols={3}>
          <div className='p-3 border border-gray-800  relative mt-2'>
            <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
              Reload Patient Result
            </h2>
            <div className='flex flex-col items-center content-center'>
              <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='Lab Id'
                className='h-4'
                data={{
                  list: patientOrderStore.listPatientOrder?.filter(
                    item => item.labId !== undefined,
                  ),
                  displayKey: ['labId'],
                }}
                displayValue={
                  setReloadPatientResult?.length > 0
                    ? setReloadPatientResult[0]?.labId
                    : ''
                }
                onFilter={(labId: string) => {
                  patientVisitStore.patientVisitService.filterByLabId({
                    input: {
                      filter: {labId},
                    },
                  });
                }}
                onSelect={item => {
                  setReloadPatientResult([item]);
                }}
              />

              <Buttons.Button
                size='medium'
                type='solid'
                className='mt-2'
                disabled={reloadPatientResult?.length > 0 ? false : true}
                onClick={() => {
                  patientResultStore.patientResultService
                    .reloadRecordByPatientOrder({
                      input: {filter: {reloadPatientResult}},
                    })
                    .then(res => {
                      if (res.reloadPatientResult.success) {
                        Toast.success({
                          message: `😊 ${res.reloadPatientResult.message}`,
                        });
                      }
                    });
                }}
              >
                Reload
              </Buttons.Button>
            </div>
          </div>
        </Grid>
      </div> */}
    </>
  );
});

export default PatientRegistration;
