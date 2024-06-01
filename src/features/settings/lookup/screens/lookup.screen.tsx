import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Accordion, AccordionItem } from 'react-sanfona';
import { useForm } from 'react-hook-form';
import {
  Buttons,
  ModalConfirm,
  Toast,
  MainPageHeading,
} from '@/library/components';
import { LookupList } from '../components';
import { ModalLookupValuesModify } from '../components';
import _ from 'lodash';
import { dashboardRouter as dashboardRoutes } from '@/routes';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
let router = dashboardRoutes;
import { DocumentSettings } from './document-setting.screen';
import { GeneralField } from './general-field.screen';
import { toJS } from 'mobx';

const Lookup = observer(() => {
  const { loginStore, lookupStore, routerStore } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hideAddLab, setHideAddLab] = useState<boolean>(true);
  const [modalConfirm, setModalConfirm] = useState<any>();
  const [modalLookupValuesModify, setModalLookupValuesModify] = useState<any>();
  const [isExistsRecord, setIsExistsRecord] = useState(false);

  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== 'Dashboard') {
        item.toggle = false;
        item.title = item.name;
        item = item.children.filter(childernItem => {
          childernItem.title = childernItem.name;
          childernItem.toggle = false;
          return childernItem;
        });
        return item;
      }
    });
  }, []);

  const updateMultipleFields = variable => {
    lookupStore.LookupService.updateSingleFiled({
      input: {
        ...variable.fields,
        _id: variable.id,
      },
    }).then((res: any) => {
      if (res.updateLookup.success) {
        Toast.success({
          message: `😊 ${res.updateLookup.message}`,
        });
        setModalConfirm({ show: false });
        lookupStore.fetchListLookup();
      }
    });
  };

  const checkExistsRecords = async (
    fields: any = lookupStore.lookup,
    isSingleCheck = false,
  ) => {
    const requiredFields = ['documentName', 'fieldName', 'status'];
    const isEmpty = requiredFields.find(item => {
      if (_.isEmpty({ ...fields }[item])) return item;
    });
    if (isEmpty && !isSingleCheck) {
      Toast.error({
        message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
      });
      return true;
    }
    //Pass required Field in Array
    return lookupStore.LookupService.findByDocument({
      input: {
        filter: isSingleCheck
          ? { ...fields }
          : {
              ..._.pick({ ...fields }, requiredFields),
            },
      },
    }).then(res => {
      if (res.findByDocumentLookup?.success) {
        setIsExistsRecord(true);
        Toast.error({
          message: '😔 Already some record exists.',
        });
        return true;
      } else {
        setIsExistsRecord(false);
        return false;
      }
    });
  };

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />

      <div
        className='flex justify-end'
        style={{
          position: 'fixed',
          right: '30px',
          top: '135px',
          zIndex: 9999,
        }}
      >
        {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
          <Buttons.ButtonCircleAddRemoveBottom
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
      </div>
      <div className='mx-auto flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
          }
        >
          <Accordion>
            {[{ title: 'DOCUMENT SETTING' }, { title: 'GENERAL SETTING' }].map(
              (item, index) => {
                return (
                  <AccordionItem
                    title={`${item.title}`}
                    expanded={item.title === 'DOCUMENT SETTING'}
                    key={index}
                  >
                    {item.title === 'DOCUMENT SETTING' && (
                      <>
                        <DocumentSettings
                          onClose={() => setHideAddLab(!hideAddLab)}
                        />
                      </>
                    )}
                    {item.title === 'GENERAL SETTING' && (
                      <>
                        <GeneralField
                          onClose={() => setHideAddLab(!hideAddLab)}
                        />
                      </>
                    )}
                  </AccordionItem>
                );
              },
            )}
          </Accordion>
        </div>
        <div className='mx-auto'>
          <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
            <LookupList
              data={lookupStore.listLookup || []}
              uiVariable={lookupStore.uiVariable}
              totalSize={lookupStore.listLookupCount}
              extraData={{
                localInput: lookupStore.localInput,
                updateLocalInput: lookupStore.updateLocalInput,
                updateLookup: lookupStore.updateLookup,
                lookupItems: routerStore.lookupItems,
              }}
              isView={RouterFlow.checkPermission(
                routerStore.userPermission,
                'View',
              )}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isUpdate={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Update',
              )}
              isExport={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Export',
              )}
              onUpdateValues={(item, id) => {
                setModalLookupValuesModify({
                  show: true,
                  arrValues: toJS(item.arrValue),
                  defaultItems: item.defaultItem,
                  id,
                });
              }}
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: 'Do you want to delete selected record?',
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Do you want to update this record?ss',
                });
              }}
              onPageSizeChange={(page, size) => {
                lookupStore.fetchListLookup(page, size);
                global.filter = { mode: 'pagination', page, size };
              }}
              onFilter={(type, filter, page, limit) => {
                lookupStore.LookupService.filter({
                  input: { type, filter, page, limit },
                });
                global.filter = {
                  mode: 'filter',
                  type,
                  filter,
                  page,
                  limit,
                };
              }}
              onApproval={async records => {
                const isExists = await checkExistsRecords({
                  ...records,
                  status: 'A',
                });
                if (!isExists) {
                  setModalConfirm({
                    show: true,
                    type: 'Update',
                    data: { value: 'A', dataField: 'status', id: records._id },
                    title: 'Are you sure?',
                    body: 'Update lookup!',
                  });
                }
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  lookupStore.LookupService.deleteLookup({
                    input: { id: modalConfirm.id },
                  }).then((res: any) => {
                    if (res.removeLookup.success) {
                      setModalConfirm({ show: false });
                      Toast.success({
                        message: `😊 ${res.removeLookup.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        lookupStore.fetchListLookup(
                          global?.filter?.page,
                          global?.filter?.size,
                        );
                      else if (global?.filter?.mode == 'filter')
                        lookupStore.LookupService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else lookupStore.fetchListLookup();
                    }
                  });
                  break;
                }
                case 'Update': {
                  lookupStore.LookupService.updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateLookup.success) {
                      setModalConfirm({ show: false });
                      Toast.success({
                        message: `😊 ${res.updateLookup.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        lookupStore.fetchListLookup(
                          global?.filter?.page,
                          global?.filter?.size,
                        );
                      else if (global?.filter?.mode == 'filter')
                        lookupStore.LookupService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else lookupStore.fetchListLookup();
                    }
                  });
                  break;
                }
              }
            }}
            onClose={() => setModalConfirm({ show: false })}
          />

          <ModalLookupValuesModify
            {...modalLookupValuesModify}
            onClick={(row, id) => {
              updateMultipleFields({
                fields: {
                  arrValue: row.arrValues,
                  defaultItem: row.defaultItem,
                },
                id,
              });
              setModalLookupValuesModify({ show: false });
            }}
            onClose={() => {
              setModalLookupValuesModify({ show: false });
            }}
          />
        </div>
      </div>
    </>
  );
});

export default Lookup;
