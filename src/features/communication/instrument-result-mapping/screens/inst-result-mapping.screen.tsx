import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  ModalConfirm,
  List,
  Svg,
  ModalImportFile,
  Icons,
  MainPageHeading,
} from '@/library/components';
import * as XLSX from 'xlsx';
import { Styles } from '@/config';
import {
  InstResultMappingInputTable,
  InstResultMappingList,
} from '../components';
import { useForm } from 'react-hook-form';
import { useStores } from '@/stores';
import { getDefaultLookupItem } from '@/library/utils';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';

const InstResultMapping = observer(() => {
  const {
    loginStore,
    instResultMappingStore,
    routerStore,
    testAnalyteMappingStore,
    segmentMappingStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [modalImportFile, setModalImportFile] = useState({});
  const [isInputView, setInputView] = useState<boolean>(true);

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [pLabs, setPLabs] = useState<Array<string>>();
  const [instTypes, setInstTypes] = useState<Array<string>>();

  const getInstTypes = () => {
    segmentMappingStore.segmentMappingService
      .fetchKeyValue({ input: { key: 'instType' } })
      .then(res => {
        if (res.fetchKeyValueSegmentMapping.success) {
          setInstTypes(res.fetchKeyValueSegmentMapping.result);
        }
      });
  };

  const getLabFromAnalyteMapping = () => {
    testAnalyteMappingStore.testAnalyteMappingService
      .fetchKeyValue({
        input: { key: 'lab' },
      })
      .then(res => {
        if (res.fetchKeyValueTestAnalyteMapping.success) {
          setPLabs(res.fetchKeyValueTestAnalyteMapping.result);
        }
      });
  };

  useEffect(() => {
    getLabFromAnalyteMapping();
    getInstTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileUpload = (file: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const defaultHeader: string[] = [
        'Inst Type',
        'Data Flow',
        'Protocol',
        'Segments',
        'Segment Order',
        'Segment Required',
        'Element No',
        'Element Name',
        'Element Required',
        'Element Sequence',
        'Transmitted Data',
        'Default Value',
        'Field Array',
        'Repeat Delimiter',
        'Field Type',
        'Field Length',
        'Required For Lims',
        'Lims Tables',
        'Lims Fields',
        'Environment',
        'Company Code',
      ];
      const headers: any = [];
      let object: any = [];
      let fileImaport: boolean = false;
      // eslint-disable-next-line unicorn/no-array-for-each
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item);
          if (JSON.stringify(headers[0]) !== JSON.stringify(defaultHeader))
            return alert('Please select correct file!');
        } else {
          if (JSON.stringify(headers[0]) === JSON.stringify(defaultHeader)) {
            object.push({
              index,
              instType: item[0],
              dataFlow: item[1],
              protocol: item[2],
              segments: item[3],
              segmentOrder: item[4],
              segmentRequired: item[5] === 'Yes' ? true : false,
              elementNo: item[6],
              elementName: item[7],
              elementRequired: item[8] === 'Yes' ? true : false,
              elementSequence: item[9],
              transmittedData: item[10],
              defaultValue: item[11],
              fieldArray: item[12],
              repeatDelimiter: item[13] === 'Yes' ? true : false,
              fieldType: item[14],
              fieldLength: item[15],
              requiredForLims: item[16] === 'Yes' ? true : false,
              limsTables: item[17],
              limsFields: item[18],
              environment: item[19],
              companyCode: item[20],
            });
            fileImaport = true;
          }
        }
      });
      object = JSON.parse(JSON.stringify(object));
      if (fileImaport) {
        // instResultMappingStore.InstResultMappingService.addInstResultMapping({
        //   input: {
        //     filter: {InstResultMapping: object},
        //   },
        // }).then(res => {
        //   if (res.createInstResultMapping.success) {
        //     Toast.success({
        //       message: `😊 ${res.createInstResultMapping.message}`,
        //     });
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 2000);
        //   }
        // });
      }
    });
    reader.readAsBinaryString(file);
  };

  const onSubmitInstResultMapping = () => {
    if (instResultMappingStore.instResultMapping?.length > 0) {
      instResultMappingStore.instResultMappingService
        .addInstResultMapping({
          input: {
            filter: {
              instResultMapping: instResultMappingStore.instResultMapping,
            },
          },
        })
        .then(res => {
          if (res.createInstrumentResultMapping.success) {
            Toast.success({
              message: `😊 ${res.createInstrumentResultMapping.message}`,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } else {
      Toast.warning({
        message: '😔 Please enter all information!',
      });
    }
  };

  const addItem = () => {
    const instResultMapping = instResultMappingStore.instResultMapping;
    instResultMapping?.push({
      index: instResultMapping?.length + 1,
      pLab:
        instResultMapping?.length == 1
          ? instResultMapping[instResultMapping.length - 1].pLab
          : undefined,
      instType:
        instResultMapping?.length == 1
          ? instResultMapping[instResultMapping.length - 1].instType
          : undefined,
      instId:
        instResultMapping?.length == 1
          ? instResultMapping[instResultMapping.length - 1].instId
          : undefined,
      environment: getDefaultLookupItem(routerStore.lookupItems, 'ENVIRONMENT'),
    });
    instResultMappingStore.updateInstResultMapping(instResultMapping);
  };

  const getTestDetails = lab => {
    return testAnalyteMappingStore.testAnalyteMappingService
      .findByFileds(
        {
          input: {
            filter: { lab },
          },
        },
        true,
      )
      .then(res => {
        if (res.findByFiledsTestAnalyteMappings.success) {
          return res.findByFiledsTestAnalyteMappings.data;
        }
      });
  };

  const getAnalyteDetails = testCode => {
    return testAnalyteMappingStore.testAnalyteMappingService
      .findByFileds(
        {
          input: {
            filter: { testCode },
          },
        },
        true,
      )
      .then(res => {
        if (res.findByFiledsTestAnalyteMappings.success) {
          return res.findByFiledsTestAnalyteMappings.data;
        }
      });
  };

  const inputTableInstResultMapping = useMemo(
    () =>
      instResultMappingStore.instResultMapping?.length > 0 && (
        <>
          <div className='p-2 rounded-lg shadow-xl'>
            <InstResultMappingInputTable
              addItem={() => addItem()}
              getTestDetails={lab => getTestDetails(lab)}
              getAnalyteDetails={testCode => getAnalyteDetails(testCode)}
              data={instResultMappingStore.instResultMapping}
              extraData={{
                pLabs,
                instTypes,
                lookupItems: routerStore.lookupItems,
              }}
              onUpdateItems={(items, index) => {
                const position = _.findIndex(
                  instResultMappingStore.instResultMapping,
                  {
                    index,
                  },
                );
                const instResultMapping =
                  instResultMappingStore.instResultMapping;
                instResultMapping[position] = {
                  ...instResultMapping[position],
                  ...items,
                };
                instResultMappingStore.updateInstResultMapping(
                  instResultMapping,
                );
              }}
              onDelete={index => {
                const position = _.findIndex(
                  instResultMappingStore.instResultMapping,
                  {
                    index,
                  },
                );
                const firstArr =
                  instResultMappingStore.instResultMapping?.slice(
                    0,
                    position,
                  ) || [];
                const secondArr =
                  instResultMappingStore.instResultMapping?.slice(
                    position + 1,
                  ) || [];
                const finalArray = [...firstArr, ...secondArr];
                instResultMappingStore.updateInstResultMapping(finalArray);
              }}
              onDuplicate={item => {
                const instResultMapping =
                  instResultMappingStore.instResultMapping;
                instResultMapping?.push({
                  ...item,
                  index: instResultMapping?.length + 1,
                });
                instResultMappingStore.updateInstResultMapping(
                  instResultMapping,
                );
              }}
            />
          </div>
        </>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.parse(JSON.stringify(instResultMappingStore.instResultMapping))],
  );

  return (
    <>
      <MainPageHeading
        title={routerStore.selectedComponents?.title || ''}
        store={loginStore}
      />

      <div
        className='flex justify-end'
        style={{ position: 'fixed', right: '17px' }}
      >
        {!isInputView && (
          <>
            {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
              <Buttons.ButtonCircleAddRemoveBottom
                show={isInputView}
                onClick={() => setInputView(!isInputView)}
              />
            )}
          </>
        )}
      </div>

      <div className=' mx-auto flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (isInputView ? 'show' : 'hidden')
          }
        >
          {inputTableInstResultMapping}
          <br />
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitInstResultMapping)}
            >
              Save
            </Buttons.Button>
            <Buttons.Button
              size='medium'
              type='outline'
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: 'Import excel file!',
                });
              }}
            >
              <span className='flex flex-row'>
                <Icons.EvaIcon
                  icon='arrowhead-down-outline'
                  size='medium'
                  color={Styles.COLORS.BLACK}
                />
                Import
              </span>
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
      </div>

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <InstResultMappingList
          data={instResultMappingStore.instResultMappingList || []}
          totalSize={instResultMappingStore.instResultMappingListCount}
          getTestDetails={lab => getTestDetails(lab)}
          getAnalyteDetails={testCode => getAnalyteDetails(testCode)}
          extraData={{
            lookupItems: routerStore.lookupItems,
            pLabs,
            instTypes,
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
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateItems={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'updateFields',
              data: { fields, id },
              title: 'Are you sure?',
              body: 'Update records',
            });
          }}
          onPageSizeChange={(page, limit) => {
            instResultMappingStore.instResultMappingService.listInstResultMapping(
              page,
              limit,
            );
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            instResultMappingStore.instResultMappingService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, filter, page, limit };
          }}
          isInputView={isInputView}
          setInputView={setInputView}
        />
      </div>
      <ModalImportFile
        accept='.csv,.xlsx,.xls'
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({ show: false });
          handleFileUpload(file);
        }}
        close={() => {
          setModalImportFile({ show: false });
        }}
      />
      <ModalConfirm
        {...modalConfirm}
        click={action => {
          setModalConfirm({ show: false });
          if (action === 'delete') {
            instResultMappingStore.instResultMappingService
              .deleteInstResultMapping({
                input: {
                  id: modalConfirm.id,
                },
              })
              .then(res => {
                if (res.removeInstrumentResultMapping.success) {
                  Toast.success({
                    message: `😊 ${res.removeInstrumentResultMapping.message}`,
                  });
                  if (global?.filter?.mode == 'pagination')
                    instResultMappingStore.instResultMappingService.listInstResultMapping(
                      global?.filter?.page,
                      global?.filter?.limit,
                    );
                  else if (global?.filter?.mode == 'filter')
                    instResultMappingStore.instResultMappingService.filter({
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    });
                  else
                    instResultMappingStore.instResultMappingService.listInstResultMapping();
                }
              });
          } else if (action == 'updateFields') {
            instResultMappingStore.instResultMappingService
              .update({
                input: {
                  ...modalConfirm.data.fields,
                  _id: modalConfirm.data.id,
                },
              })
              .then(res => {
                if (res.updateInstrumentResultMapping.success) {
                  Toast.success({
                    message: ` ${res.updateInstrumentResultMapping.message}`,
                  });
                  if (global?.filter?.mode == 'pagination')
                    instResultMappingStore.instResultMappingService.listInstResultMapping(
                      global?.filter?.page,
                      global?.filter?.limit,
                    );
                  else if (global?.filter?.mode == 'filter')
                    instResultMappingStore.instResultMappingService.filter({
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    });
                  else
                    instResultMappingStore.instResultMappingService.listInstResultMapping();
                }
              });
          }
        }}
        close={() => setModalConfirm({ show: false })}
      />
    </>
  );
});

export default InstResultMapping;
