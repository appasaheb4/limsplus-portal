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
  Form,
  Svg,
  ModalImportFile,
  Icons,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import * as Models from '../../models';
import {SegmentMapping as ModelSegmentMapping} from '../models';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {
  CommonInputTable,
  SegmentMappingInputTable,
  SegmentMappingList,
} from '../components';
import {useForm, Controller} from 'react-hook-form';
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
    //setValue('environment', segmentMappingStore.segmentMapping?.environment);
    const [modalImportFile, setModalImportFile] = useState({});
    const [hideAddSegmentMapping, setHideAddSegmentMapping] =
      useState<boolean>(false);
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
          'EQUIPMENT TYPE',
          'DATA FLOW FROM',
          'DATA TYPE',
          'SEGMENTS',
          'SEGMENT USAGE',
          'FIELD NO',
          'ITEM NO',
          'FIELD REQUIRED',
          'ELEMENT NAME',
          'TRANSMITTED DATA',
          'FIELD ARRAY',
          'FIELD LENGTH',
          'FIELD TYPE',
          'REPEAT DELIMITER',
          'MANDATORY',
          'LIMS DESCRIPTIONS',
          'LIMS TABLES',
          'LIMS FIELDS',
          'REQUIRED FOR LIMS',
          'NOTES',
          'ATTACHMENTS',
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
                equipmentType: item[0],
                dataFlowFrom: item[1],
                data_type: item[2],
                segments: item[3],
                segment_usage: item[4],
                field_no: Number.parseFloat(item[5]).toFixed(2).toString(),
                item_no: Number.parseFloat(item[6]).toFixed(2).toString(),
                field_required: item[7] === 'Yes' ? true : false,
                element_name:
                  item[8] !== undefined
                    ? item[8]
                        .toString()
                        .replace(/&amp;/g, '&')
                        .replace(/&gt;/g, '>')
                        .replace(/&lt;/g, '<')
                        .replace(/&quot;/g, '"')
                        .replace(/â/g, '’')
                        .replace(/â¦/g, '…')
                        .toString()
                    : undefined,
                transmitted_data:
                  item[9] !== undefined
                    ? item[9]
                        .toString()
                        .replace(/&amp;/g, '&')
                        .replace(/&gt;/g, '>')
                        .replace(/&lt;/g, '<')
                        .replace(/&quot;/g, '"')
                        .replace(/â/g, '’')
                        .replace(/â¦/g, '…')
                        .toString()
                    : undefined,
                field_array: item[10],
                field_length:
                  item[11] !== undefined
                    ? Number.parseFloat(item[11]).toFixed(2).toString()
                    : undefined,
                field_type: item[12],
                repeat_delimiter: item[13] === 'Yes' ? true : false,
                mandatory: item[14] === 'Yes' ? true : false,
                lims_descriptions: item[15],
                lims_tables: item[16],
                lims_fields: item[17],
                required_for_lims: item[18] === 'Yes' ? true : false,
                notes: item[19],
                attachments: item[20],
              });
              fileImaport = true;
            }
          }
        });
        object = JSON.parse(JSON.stringify(object));
        // eslint-disable-next-line unicorn/no-array-reduce
        const uniqueData = object.reduce((filtered, item) => {
          if (
            !filtered.some(
              filteredItem =>
                JSON.stringify(filteredItem) == JSON.stringify(item),
            )
          )
            filtered.push(item);
          return filtered;
        }, []);
        if (fileImaport) {
          segmentMappingStore.segmentMappingService
            .importSegmentMapping({input: {data: {...uniqueData}}})
            .then(res => {
              if (res.importSegmentMapping.success) {
                Toast.success({
                  message: `😊 ${res.importSegmentMapping.success}`,
                });
                segmentMappingStore.fetchListSegmentMapping();
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
                // setTimeout(() => {
                //   window.location.reload();
                // }, 2000);
              }
              segmentMappingStore.fetchListSegmentMapping();
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
            {/* <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='EQUIPMENT TYPE'
                      id='equipment_type'
                      hasError={!!errors.equipmentType}
                    >
                      <select
                        name='equipment_type'
                        value={
                          segmentMappingStore.segmentMapping?.equipmentType
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.equipmentType
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const equipmentType = e.target.value;
                          onChange(equipmentType);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            equipmentType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {interfaceManagerStore.listInterfaceManager?.map(
                          (item: any) => (
                            <option
                              key={item.instrumentType}
                              value={item.instrumentType}
                            >
                              {item.instrumentType}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='equipmentType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='DATA FLOW FROM'
                      id='dataFlowFrom'
                      hasError={!!errors.dataFlowFrom}
                    >
                      <select
                        name='dataFlowFrom'
                        value={segmentMappingStore.segmentMapping?.dataFlowFrom}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.dataFlowFrom
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const dataFlowFrom = e.target.value;
                          onChange(dataFlowFrom);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            dataFlowFrom,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {Models.options.dataFlowFrom.map(
                          (item: any, index: number) => (
                            <option key={item.title} value={item.title}>
                              {item.title}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='dataFlowFrom'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='DATA TYPE'
                      id='data_type'
                      hasError={!!errors.data_type}
                    >
                      <select
                        name='data_type'
                        value={segmentMappingStore.segmentMapping?.data_type}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.data_type
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const data_type = e.target.value;
                          onChange(data_type);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            data_type,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {Models.options.data_type.map(
                          (item: any, index: number) => (
                            <option key={item.title} value={item.title}>
                              {item.title}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='data_type'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='SEGMENTS'
                      id='segments'
                      hasError={!!errors.segments}
                    >
                      <select
                        name='segments'
                        value={segmentMappingStore.segmentMapping?.segments}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.segments
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const segments = e.target.value;
                          onChange(segments);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            segments,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {Models.options.segments.map(
                          (item: any, index: number) => (
                            <option key={item.title} value={item.title}>
                              {item.title}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='segments'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper
                      label='SEGMENT USAGE'
                      id='segment_usage'
                      hasError={!!errors.segment_usage}
                    >
                      <select
                        name='segment_usage'
                        value={
                          segmentMappingStore.segmentMapping?.segment_usage
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.segment_usage
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const segment_usage = e.target.value;
                          onChange(segment_usage);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            segment_usage,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {Models.options.segment_usage.map(
                          (item: any, index: number) => (
                            <option key={item.title} value={item.title}>
                              {item.title}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='segment_usage'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      label='Field No'
                      name='field_no'
                      placeholder={
                        errors.field_no ? 'Please Enter field_no' : 'Field No'
                      }
                      hasError={!!errors.field_no}
                      value={segmentMappingStore.segmentMapping?.field_no}
                      onChange={field_no => {
                        onChange(field_no);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          field_no: Number.parseFloat(field_no)
                            .toFixed(2)
                            .toString(),
                        });
                      }}
                    />
                  )}
                  name='field_no'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      label='Item No'
                      name='item_no'
                      placeholder={
                        errors.item_no ? 'Please Enter item_no' : 'Item No'
                      }
                      hasError={!!errors.item_no}
                      value={segmentMappingStore.segmentMapping?.item_no}
                      onChange={item_no => {
                        onChange(item_no);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          item_no: Number.parseFloat(item_no)
                            .toFixed(2)
                            .toString(),
                        });
                      }}
                    />
                  )}
                  name='item_no'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Toggle
                      label='FIELD REQUIRED'
                      id='field_required'
                      hasError={!!errors.field_required}
                      value={segmentMappingStore.segmentMapping?.field_required}
                      onChange={field_required => {
                        onChange(field_required);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          field_required,
                        });
                      }}
                    />
                  )}
                  name='field_required'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='Element Name'
                      name='element_name'
                      placeholder={
                        errors.element_name
                          ? 'Please Enter element_name'
                          : 'Element Name'
                      }
                      hasError={!!errors.element_name}
                      value={segmentMappingStore.segmentMapping?.element_name}
                      onChange={element_name => {
                        onChange(element_name);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          element_name,
                        });
                      }}
                    />
                  )}
                  name='element_name'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='TRANSMITTED DATA'
                      name='transmitted_data'
                      placeholder={
                        errors.transmitted_data
                          ? 'Please Enter transmitted_data'
                          : 'TRANSMITTED DATA'
                      }
                      hasError={!!errors.transmitted_data}
                      value={
                        segmentMappingStore.segmentMapping?.transmitted_data
                      }
                      onChange={transmitted_data => {
                        onChange(transmitted_data);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          transmitted_data,
                        });
                      }}
                    />
                  )}
                  name='transmitted_data'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='FIELD ARRAY'
                      name='field_array'
                      placeholder={
                        errors.field_array
                          ? 'Please Enter field_array'
                          : 'FIELD ARRAY'
                      }
                      hasError={!!errors.field_array}
                      value={segmentMappingStore.segmentMapping?.field_array}
                      onChange={field_array => {
                        onChange(field_array);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          field_array,
                        });
                      }}
                    />
                  )}
                  name='field_array'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      label='FIELD LENGTH'
                      name='field_length'
                      placeholder={
                        errors.field_length
                          ? 'Please Enter field_length'
                          : 'FIELD LENGTH'
                      }
                      hasError={!!errors.field_length}
                      value={segmentMappingStore.segmentMapping?.field_length}
                      onChange={field_length => {
                        onChange(field_length);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          field_length: Number.parseFloat(field_length)
                            .toFixed(2)
                            .toString(),
                        });
                      }}
                    />
                  )}
                  name='field_length'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='FIELD TYPE'
                      name='field_type'
                      placeholder={
                        errors.field_type
                          ? 'Please Enter field_type'
                          : 'FIELD TYPE'
                      }
                      hasError={!!errors.field_type}
                      value={segmentMappingStore.segmentMapping?.field_type}
                      onChange={field_type => {
                        onChange(field_type);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          field_type,
                        });
                      }}
                    />
                  )}
                  name='field_type'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Toggle
                      label='REPEAT DELIMITER'
                      id='repeat_delimiter'
                      hasError={!!errors.repeat_delimiter}
                      value={
                        segmentMappingStore.segmentMapping?.repeat_delimiter
                      }
                      onChange={repeat_delimiter => {
                        onChange(repeat_delimiter);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          repeat_delimiter,
                        });
                      }}
                    />
                  )}
                  name='repeat_delimiter'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Toggle
                      label='MANDATORY'
                      id='mandatory'
                      hasError={!!errors.mandatory}
                      value={segmentMappingStore.segmentMapping?.mandatory}
                      onChange={mandatory => {
                        onChange(mandatory);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          mandatory,
                        });
                      }}
                    />
                  )}
                  name='mandatory'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='LIMS DESCRIPTIONS'
                      id='lims_descriptions'
                      placeholder={
                        errors.lims_descriptions
                          ? 'Please Enter lims_descriptions'
                          : 'LIMS DESCRIPTIONS'
                      }
                      hasError={!!errors.lims_descriptions}
                      value={
                        segmentMappingStore.segmentMapping?.lims_descriptions
                      }
                      onChange={lims_descriptions => {
                        onChange(lims_descriptions);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          lims_descriptions,
                        });
                      }}
                    />
                  )}
                  name='lims_descriptions'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='LIMS TABLES'
                      name='lims_tables'
                      placeholder={
                        errors.lims_tables
                          ? 'Please Enter lims_tables'
                          : 'Lims Tables'
                      }
                      hasError={!!errors.lims_tables}
                      value={segmentMappingStore.segmentMapping?.lims_tables}
                      onChange={lims_tables => {
                        onChange(lims_tables);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          lims_tables,
                        });
                      }}
                    />
                  )}
                  name='lims_tables'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='LIMS FIELDS'
                      name='lims_fields'
                      placeholder={
                        errors.lims_fields
                          ? 'Please Enter lims_fields'
                          : 'LIMS FIELDS'
                      }
                      hasError={!!errors.lims_fields}
                      value={segmentMappingStore.segmentMapping?.lims_fields}
                      onChange={lims_fields => {
                        onChange(lims_fields);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          lims_fields,
                        });
                      }}
                    />
                  )}
                  name='lims_fields'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Toggle
                      label='REQUIRED FOR LIMS'
                      id='required_for_lims'
                      hasError={!!errors.required_for_lims}
                      value={
                        segmentMappingStore.segmentMapping?.required_for_lims
                      }
                      onChange={required_for_lims => {
                        onChange(required_for_lims);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          required_for_lims,
                        });
                      }}
                    />
                  )}
                  name='required_for_lims'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      label='NOTES'
                      name='notes'
                      placeholder={
                        errors.notes ? 'Please Enter notes' : 'NOTES'
                      }
                      hasError={!!errors.notes}
                      value={segmentMappingStore.segmentMapping?.notes}
                      onChange={notes => {
                        onChange(notes);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          notes,
                        });
                      }}
                    />
                  )}
                  name='notes'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputFile
                      label='ATTACHMENTS'
                      name='attachments'
                      placeholder={
                        errors.attachments
                          ? 'Please Enter attachments'
                          : 'ATTACHMENTS'
                      }
                      hasError={!!errors.attachments}
                      multiple={true}
                      // value={segmentMappingStore.segmentMapping?.attachments}
                      onChange={e => {
                        const attachments = e.target.files[0];
                        onChange(attachments);
                        segmentMappingStore.updateSegmentMapping({
                          ...segmentMappingStore.segmentMapping,
                          attachments,
                        });
                      }}
                    />
                  )}
                  name='attachments'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.InputWrapper label='Environment'>
                      <select
                        value={segmentMappingStore.segmentMapping?.environment}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red-500  '
                            : 'border-gray-300'
                        } rounded-md`}
                        disabled={
                          loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? true
                            : false
                        }
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          segmentMappingStore.updateSegmentMapping({
                            ...segmentMappingStore.segmentMapping,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : segmentMappingStore.segmentMapping?.environment ||
                              'Select'}
                        </option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'ENVIRONMENT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='environment'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
            </Grid> */}
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
            onUpdateFields={(fields: any, id: string) => {
              console.log({fields, id});

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
                      id: segmentMappingStore.selectedItems.map(
                        (item: any) => item._id,
                      ),
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
