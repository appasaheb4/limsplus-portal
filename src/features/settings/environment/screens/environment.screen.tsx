import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  ModalConfirm,
} from '@/library/components';
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import {useStores} from '@/stores';

import {EnvironmentVariable} from './environment-variable.screen';
import {EnvironmentSettings} from './environment-setting.screen';

const Environment = observer(() => {
  const {loginStore, environmentStore, routerStore} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>();
  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <Accordion>
        {[{title: 'Environment Variable'}, {title: 'Environment Setting'}].map(
          item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                expanded={item.title === 'Environment Setting'}
              >
                {item.title === 'Environment Variable' && (
                  <>
                    <EnvironmentVariable
                      onModalConfirm={item => setModalConfirm(item)}
                    />
                  </>
                )}
                {item.title === 'Environment Setting' && (
                  <>
                    <EnvironmentSettings
                      onModalConfirm={item => setModalConfirm(item)}
                    />
                  </>
                )}
              </AccordionItem>
            );
          },
        )}
      </Accordion>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === 'delete') {
            environmentStore.EnvironmentService.deleteRecord({
              input: {id: modalConfirm.id},
            }).then((res: any) => {
              setModalConfirm({show: false});
              if (res.removeEnviroment.success) {
                Toast.success({
                  message: `😊 ${res.removeEnviroment.message}`,
                });

                if (
                  global?.filter?.mode == 'pagination' &&
                  global?.filter?.section == 'environmentSettings'
                )
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentSettings',
                    page: global?.filter?.page,
                    limit: global?.filter?.limit,
                  });
                if (
                  global?.filter?.mode == 'pagination' &&
                  global?.filter?.section == 'environmentVariable'
                )
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentVariable',
                    page: global?.filter?.page,
                    limit: global?.filter?.limit,
                  });
                else if (
                  global?.filter?.mode == 'filter' &&
                  global?.filter?.section == 'environmentSettings'
                )
                  environmentStore.EnvironmentService.filter(
                    {
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    },
                    'environmentSettings',
                  );
                else if (
                  global?.filter?.mode == 'filter' &&
                  global?.filter?.section == 'environmentVariable'
                )
                  environmentStore.EnvironmentService.filter(
                    {
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    },
                    'environmentVariable',
                  );
                else {
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentVariable',
                  });
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentSettings',
                  });
                }
              }
            });
          } else if (type === 'update') {
            environmentStore.EnvironmentService.updateSingleFiled({
              input: {
                _id: modalConfirm.data.id,
                [modalConfirm.data.dataField]: modalConfirm.data.value,
              },
            }).then((res: any) => {
              setModalConfirm({show: false});
              if (res.updateEnviroment.success) {
                Toast.success({
                  message: `😊 ${res.updateEnviroment.message}`,
                });
                // eslint-disable-next-line unicorn/no-useless-undefined
                environmentStore.updateSelectedItems(undefined);
                // setTimeout(() => {
                //   window.location.reload()
                // }, 2000)

                if (
                  global?.filter?.mode == 'pagination' &&
                  global?.filter?.section == 'environmentSettings'
                )
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentSettings',
                    page: global?.filter?.page,
                    limit: global?.filter?.limit,
                  });
                if (
                  global?.filter?.mode == 'pagination' &&
                  global?.filter?.section == 'environmentVariable'
                )
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentVariable',
                    page: global?.filter?.page,
                    limit: global?.filter?.limit,
                  });
                else if (
                  global?.filter?.mode == 'filter' &&
                  global?.filter?.section == 'environmentSettings'
                )
                  environmentStore.EnvironmentService.filter(
                    {
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    },
                    'environmentSettings',
                  );
                else if (
                  global?.filter?.mode == 'filter' &&
                  global?.filter?.section == 'environmentVariable'
                )
                  environmentStore.EnvironmentService.filter(
                    {
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    },
                    'environmentVariable',
                  );
                else {
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentVariable',
                  });
                  environmentStore.fetchEnvironment({
                    documentType: 'environmentSettings',
                  });
                }
              }
            });
          }
        }}
        onClose={() => setModalConfirm({show: false})}
      />
    </>
  );
});

export default Environment;
