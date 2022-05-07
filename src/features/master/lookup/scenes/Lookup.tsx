/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Accordion, AccordionItem} from 'react-sanfona';

import {useForm, Controller} from 'react-hook-form';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  ModalConfirm,
  Toast,
} from '@/library/components';
import {LookupList} from '../components';
import {Container} from 'reactstrap';

import {dashboardRouter as dashboardRoutes} from '@/routes';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
let router = dashboardRoutes;

import {DocumentSettings} from './DocumentSettings';
import {GeneralField} from './GeneralField';

const Lookup = observer(() => {
  const {loginStore, lookupStore, routerStore} = useStores();
  const [hideAddLab, setHideAddLab] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();

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

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}

      <div className='mx-auto flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
          }
        >
          <Accordion>
            {[{title: 'DOCUMENT SETTING'}, {title: 'GENERAL SETTING'}].map(
              item => {
                return (
                  <AccordionItem
                    title={`${item.title}`}
                    expanded={item.title === 'DOCUMENT SETTING'}
                  >
                    {item.title === 'DOCUMENT SETTING' && (
                      <>
                        <DocumentSettings />
                      </>
                    )}
                    {item.title === 'GENERAL SETTING' && (
                      <>
                        <GeneralField />
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
              totalSize={lookupStore.listLookupCount}
              extraData={{
                localInput: lookupStore.localInput,
                updateLocalInput: lookupStore.updateLocalInput,
                updateLookup: lookupStore.updateLookup,
                lookupItems: routerStore.lookupItems,
              }}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Edit/Modify',
              )}
              onDelete={selectedItem => setModalConfirm(selectedItem)}
              onSelectedRow={rows => {
                setModalConfirm({
                  show: true,
                  type: 'Delete',
                  id: rows,
                  title: 'Are you sure?',
                  body: `Delete selected items!`,
                });
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: {value, dataField, id},
                  title: 'Are you sure?',
                  body: `Update Lookup!`,
                });
              }}
              onPageSizeChange={(page, size) => {
                lookupStore.fetchListLookup(page, size);
              }}
              onFilter={(type, filter, page, limit) => {
                lookupStore.LookupService.filter({
                  input: {type, filter, page, limit},
                });
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === 'Delete') {
                lookupStore.LookupService.deleteLookup({
                  input: {id: modalConfirm.id},
                }).then((res: any) => {
                  if (res.removeLookup.success) {
                    Toast.success({
                      message: `😊 ${res.removeLookup.message}`,
                    });
                    setModalConfirm({show: false});
                    lookupStore.fetchListLookup();
                  }
                });
              } else if (type === 'Update') {
                lookupStore.LookupService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateLookup.success) {
                    Toast.success({
                      message: `😊 ${res.updateLookup.message}`,
                    });
                    setModalConfirm({show: false});
                    lookupStore.fetchListLookup();
                  }
                });
              }
            }}
            onClose={() => setModalConfirm({show: false})}
          />
        </div>
      </div>
    </>
  );
});

export default Lookup;
