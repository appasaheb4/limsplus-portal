import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
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
} from '@/library/components';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {
  CommonInputTable,
  SegmentMappingInputTable,
  SegmentMappingList,
} from '../components';
import {useForm} from 'react-hook-form';
import {SegmentMappingHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const SegmentMapping = SegmentMappingHoc(
  observer(() => {
    const {
      loginStore,
      interfaceManagerStore,
      segmentMappingStore,
      routerStore,
    } = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();
    const [modalImportFile, setModalImportFile] = useState({});
    const [hideAddSegmentMapping, setHideAddSegmentMapping] =
      useState<boolean>(true);
    const [saveTitle, setSaveTitle] = useState('Save');
    const [arrInstType, setArrInstType] = useState([]);
    const [modalConfirm, setModalConfirm] = useState<any>();

    useEffect(() => {
      interfaceManagerStore.interfaceManagerService
        .findByFields({
          input: {
            filter: {
              interfaceType: 'INSTRUMENT',
            },
          },
        })
        .then(res => {
          if (res.findByFieldsInterfaceManager.success) {
            setArrInstType(res.findByFieldsInterfaceManager.data);
          }
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header: 1});
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
          'Lims Document Type',
          'Lims Fields',
          'Environment',
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
                limsDocumentType: item[18],
                limsFields: item[19],
                environment: item[20],
              });
              fileImaport = true;
            }
          }
        });
        object = JSON.parse(JSON.stringify(object));
        if (fileImaport) {
          segmentMappingStore.segmentMappingService
            .addSegmentMapping({
              input: {
                filter: {segmentMapping: object},
              },
            })
            .then(res => {
              if (res.createSegmentMapping.success) {
                Toast.success({
                  message: `😊 ${res.createSegmentMapping.message}`,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            });
        }
      });
      reader.readAsBinaryString(file);
    };

    const onSubmitSegmentMapping = () => {
      if (segmentMappingStore.segmentMapping?.length > 0) {
        segmentMappingStore.segmentMappingService
          .addSegmentMapping({
            input: {
              filter: {segmentMapping: segmentMappingStore.segmentMapping},
            },
          })
          .then(res => {
            if (res.createSegmentMapping.success) {
              Toast.success({
                message: `😊 ${res.createSegmentMapping.message}`,
              });
              if (saveTitle === 'Save') {
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            }
          });
      } else {
        Toast.warning({
          message: '😔 Please enter all information!',
        });
      }
    };

    const inputTable = useMemo(
      () =>
        segmentMappingStore.segmentMapping?.length > 0 && (
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <SegmentMappingInputTable
              data={toJS(segmentMappingStore.segmentMapping)}
              extraData={routerStore}
              onDelete={index => {
                const position = _.findIndex(
                  segmentMappingStore.segmentMapping,
                  {
                    index,
                  },
                );
                const firstArr =
                  segmentMappingStore.segmentMapping?.slice(0, position) || [];
                const secondArr =
                  segmentMappingStore.segmentMapping?.slice(position + 1) || [];
                const finalArray = [...firstArr, ...secondArr];
                segmentMappingStore.updateSegmentMapping(finalArray);
              }}
              onUpdateItems={(items, index) => {
                const position = _.findIndex(
                  segmentMappingStore.segmentMapping,
                  {
                    index,
                  },
                );
                const segmentMapping = segmentMappingStore.segmentMapping;
                segmentMapping[position] = {
                  ...segmentMapping[position],
                  ...items,
                };
                segmentMappingStore.updateSegmentMapping(segmentMapping);
              }}
              onDuplicate={item => {
                const segmentMapping = segmentMappingStore.segmentMapping;
                segmentMapping?.push({
                  ...item,
                  index: segmentMapping?.length + 1,
                });
                segmentMappingStore.updateSegmentMapping(segmentMapping);
              }}
            />
          </div>
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.parse(JSON.stringify(segmentMappingStore.segmentMapping))],
    );

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddSegmentMapping}
            onClick={status => setHideAddSegmentMapping(!hideAddSegmentMapping)}
          />
        )}

        <div className=' mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' +
              (hideAddSegmentMapping ? 'hidden' : 'shown')
            }
          >
            <CommonInputTable extraData={{arrInstType}} />
            {inputTable}
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitSegmentMapping)}
              >
                {saveTitle}
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
          <SegmentMappingList
            data={segmentMappingStore.listSegmentMapping || []}
            totalSize={segmentMappingStore.listSegmentMappingCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              arrInstType,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Delete',
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Edit/Modify',
            )}
            onDelete={selectedItem => setModalConfirm(selectedItem)}
            onSelectedRow={rows => {
              setModalConfirm({
                show: true,
                type: 'delete',
                id: rows,
                title: 'Are you sure?',
                body: 'Delete selected items!',
              });
            }}
            onUpdateFields={(fields: any, id: string) => {
              setModalConfirm({
                show: true,
                type: 'updateFields',
                data: {fields, id},
                title: 'Are you sure?',
                body: 'Update records',
              });
            }}
            onPageSizeChange={(page, limit) => {
              segmentMappingStore.fetchListSegmentMapping(page, limit);
            }}
            onFilter={(type, filter, page, limit) => {
              segmentMappingStore.segmentMappingService.filter({
                input: {type, filter, page, limit},
              });
            }}
          />
        </div>
        <ModalImportFile
          accept='.csv,.xlsx,.xls'
          {...modalImportFile}
          click={(file: any) => {
            setModalImportFile({show: false});
            handleFileUpload(file);
          }}
          close={() => {
            setModalImportFile({show: false});
          }}
        />
        <ModalConfirm
          {...modalConfirm}
          click={type => {
            setModalConfirm({show: false});
            if (segmentMappingStore.selectedItems) {
              if (type === 'delete') {
                segmentMappingStore.segmentMappingService
                  .deleteSegmentMapping({
                    input: {
                      id: modalConfirm.id,
                    },
                  })
                  .then(res => {
                    if (res.removeSegmentMapping.success) {
                      segmentMappingStore.fetchListSegmentMapping();
                      segmentMappingStore.updateSelectedItem([]);
                      Toast.success({
                        message: `😊 ${res.removeSegmentMapping.message}`,
                      });
                    }
                  });
              } else if (type == 'updateFields') {
                segmentMappingStore.segmentMappingService
                  .updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fields,
                      _id: modalConfirm.data.id,
                    },
                  })
                  .then(res => {
                    if (res.updateSegmentMapping.success) {
                      segmentMappingStore.fetchListSegmentMapping();
                      Toast.success({
                        message: ` ${res.updateSegmentMapping.message}`,
                      });
                    }
                  });
              }
            }
          }}
          onClose={() => setModalConfirm({show: false})}
        />
      </>
    );
  }),
);

export default SegmentMapping;
