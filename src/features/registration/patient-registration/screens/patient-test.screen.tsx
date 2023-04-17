import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Grid,
  List,
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
  Svg,
  ModalConfirm,
} from '@/library/components';
// import * as LibraryUtils from "@/library/utils"
import '@/library/assets/css/accordion.css';
import {useForm, Controller} from 'react-hook-form';
import {PatientTestList} from '../components';
import {PatientOrderHoc} from '../hoc';

import {useStores} from '@/stores';

import {toJS} from 'mobx';
import {RouterFlow} from '@/flows';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import {PanelListTable, ExtraDataPanelListTable} from '../components';

interface PatientTestProps {
  onModalConfirm?: (item: any) => void;
}

export const PatientTest = PatientOrderHoc(
  observer((props: PatientTestProps) => {
    const {
      loading,
      patientTestStore,
      patientOrderStore,
      patientVisitStore,
      loginStore,
      routerStore,
      masterPanelStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideInputView, setHideInputView] = useState<boolean>(true);
    useEffect(() => {
      // Default value initialization
      setValue('environment', patientOrderStore.patientOrder?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onSubmitPatientOrder = () => {
      patientTestStore.patientTestService
        .addPatientTest({
          input: {
            ...patientTestStore.patientTest,
            documentType: 'patientTest',
            __typename: undefined,
          },
        })
        .then(res => {
          if (res.createPatientTest.success) {
            Toast.success({
              message: `😊 ${res.createPatientTest.message}`,
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    };
    return (
      <>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (hideInputView ? 'hidden' : 'hidden')
          }
        >
          <div className='p-2 rounded-lg shadow-xl'>
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                {patientOrderStore.listPatientOrder && (
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Form.InputWrapper
                        label='Order Id'
                        hasError={!!errors.orderId}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          placeholder='Search by orderId or patient name'
                          data={{
                            list: patientOrderStore.listPatientOrder,
                            displayKey: ['orderId', 'patientName'],
                          }}
                          hasError={!!errors.orderId}
                          onFilter={(value: string) => {
                            patientOrderStore.patientOrderService.filterByFields(
                              {
                                input: {
                                  filter: {
                                    fields: ['orderId', 'patientName'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              },
                            );
                          }}
                          onSelect={item => {
                            onChange(item.orderId);
                            patientTestStore.updateTest({
                              ...patientTestStore.patientTest,
                              orderId: item.orderId,
                              labId: item.labId,
                              patientName: item.patientName,
                              panelCode: item.panelCode,
                            });
                            setValue('labId', item.labId);
                            patientOrderStore.updatePatientOrderList(
                              patientOrderStore.listPatientOrderCopy,
                            );
                            // get panelcode list
                            patientTestStore.patientTestService.getPanelList({
                              input: {
                                filter: {
                                  panels: _.map(item.panelCode, o =>
                                    _.pick(o, ['panelCode', 'confidential']),
                                  ),
                                },
                              },
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='orderId'
                    rules={{required: true}}
                    defaultValue=''
                  />
                )}
                <Form.InputWrapper label='Panels'>
                  <List space={2} direction='row' justify='center'>
                    <div className='flex flex-row gap-2 flex-wrap'>
                      {patientTestStore.patientTest?.panelCode?.map(
                        (item, index) => (
                          <div className='mb-2' key={index}>
                            <Buttons.Button size='medium' type='solid'>
                              {`${item.panelCode}`}
                            </Buttons.Button>
                          </div>
                        ),
                      )}
                    </div>
                  </List>
                </Form.InputWrapper>
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Lab Id' hasError={!!errors.labId}>
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder='Search by lab id, visit id or name'
                        displayValue={`${
                          patientTestStore.patientTest?.labId || ''
                        } - ${patientTestStore.patientTest?.patientName || ''}`}
                        data={{
                          list: patientVisitStore.listPatientVisit,
                          displayKey: ['labId', 'patientName'],
                        }}
                        hasError={!!errors.labId}
                        onFilter={(value: string) => {
                          patientVisitStore.patientVisitService.filterByFields({
                            input: {
                              filter: {
                                fields: ['labId', 'visitId', 'patientName'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.visitId);
                          patientTestStore.updateTest({
                            ...patientTestStore.patientTest,
                            labId: item.labId,
                            patientName: item.patientName,
                          });
                          patientVisitStore.updatePatientVisitList(
                            patientVisitStore.listPatientVisitCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='labId'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Test Id'
                      placeholder={
                        errors.testId ? 'Please enter test id' : 'Test Id'
                      }
                      hasError={!!errors.testId}
                      disabled={true}
                      value={patientTestStore.patientTest?.testId}
                      onChange={testId => {
                        onChange(testId);
                        patientTestStore.updateTest({
                          ...patientTestStore.patientTest,
                          testId,
                        });
                      }}
                    />
                  )}
                  name='testId'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
            </Grid>
            <div
              className='rounded-lg shadow-xl overflow-scroll mt-2'
              style={{overflowX: 'scroll'}}
            >
              {patientOrderStore.packageList && (
                <PanelListTable
                  data={patientTestStore.patientTest?.panelList || []}
                  totalSize={patientTestStore.patientTest?.panelList?.length}
                />
              )}
            </div>
          </div>
          <br />
          <div className='extra' style={{border: '1px solid yellow'}}>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>EXTRA DATA</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <>
                    <div
                      className='rounded-lg shadow-xl overflow-scroll mt-2'
                      style={{overflowX: 'scroll'}}
                    >
                      {patientOrderStore.packageList && (
                        <ExtraDataPanelListTable
                          data={patientTestStore.patientTest?.panelList || []}
                          totalSize={
                            patientTestStore.patientTest?.panelList?.length
                          }
                        />
                      )}
                    </div>
                  </>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <br />
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitPatientOrder)}
            >
              Save
            </Buttons.Button>
            <Buttons.Button
              size='medium'
              type='outline'
              icon={Svg.Remove}
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear
            </Buttons.Button>
          </List>
        </div>

        <div
          className='p-2 rounded-lg shadow-xl overflow-scroll'
          style={{overflowX: 'scroll'}}
        >
          <PatientTestList
            data={patientTestStore.patientListTest}
            totalSize={patientTestStore.patientListTestCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Delete',
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Edit/Modify',
            )}
            onDelete={selectedUser => setModalConfirm(selectedUser)}
            onSelectedRow={rows => {
              setModalConfirm({
                show: true,
                type: 'delete',
                id: rows,
                title: 'Are you sure?',
                body: 'Delete selected items!',
              });
            }}
            onPageSizeChange={(page, limit) => {
              patientTestStore.patientTestService.listPatientTest(page, limit);
              global.filter = {mode: 'pagination', page, limit};
            }}
            onFilter={(type, filter, page, limit) => {
              patientTestStore.patientTestService.filter({
                input: {type, filter, page, limit},
              });
              global.filter = {
                mode: 'filter',
                type,
                filter,
                page,
                limit,
              };
            }}
          />
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(action?: string) => {
            if (action === 'delete') {
              patientTestStore.patientTestService
                .deletePatientTest({input: {id: modalConfirm.id}})
                .then((res: any) => {
                  setModalConfirm({show: false});
                  if (res.removePatientTest.success) {
                    Toast.success({
                      message: `😊 ${res.removePatientTest.message}`,
                    });
                    if (global?.filter?.mode == 'pagination')
                      patientTestStore.patientTestService.listPatientTest(
                        global?.filter?.page,
                        global?.filter?.limit,
                      );
                    else if (global?.filter?.mode == 'filter')
                      patientTestStore.patientTestService.filter({
                        input: {
                          type: global?.filter?.type,
                          filter: global?.filter?.filter,
                          page: global?.filter?.page,
                          limit: global?.filter?.limit,
                        },
                      });
                    else patientTestStore.patientTestService.listPatientTest();
                  }
                });
            }
          }}
          onClose={() => setModalConfirm({show: false})}
        />
      </>
    );
  }),
);
