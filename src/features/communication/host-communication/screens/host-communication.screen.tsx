/* eslint-disable unicorn/prefer-add-event-listener */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  ModalImportFile,
  Toast,
  MainPageHeading,
} from '@/library/components';
import { Accordion, AccordionItem } from 'react-sanfona';
import '@/library/assets/css/accordion.css';
import { Table } from 'reactstrap';
import { useStores } from '@/stores';

import {
  HL7Table,
  SettingForRS232Table,
  SettingForTCP_IPTable,
} from '../components';
import { HostCommunicationFlows, HexToAsciiFlow } from '../../flows';
import { HostCommunicationHoc } from '../hoc';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import * as Realm from 'realm-web';

const HostCommunication = HostCommunicationHoc(
  observer(() => {
    const {
      loginStore,
      interfaceManagerStore,
      dataConversationStore,
      hostCommunicationStore,
      routerStore,
      segmentMappingStore,
    } = useStores();
    const [deleteItem, setDeleteItem] = useState<any>({});
    const [modalImportFile, setModalImportFile] = useState({});
    const [hideAddHostCommunication, setHideAddHostCommunication] =
      useState<boolean>(true);
    const [messageWebSocket, setMessageWebSocket] = useState('');

    const getTcpIpData = async () => {
      const appId = 'limsplus-portal-prod-fezny';
      const appConfig = {
        id: appId,
        timeout: 100_000,
      };
      const app: any = new Realm.App(appConfig);
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
      try {
        const mongodb = app.currentUser.mongoClient('mongodb-atlas');
        const collection = mongodb.db('limsplus-prod').collection('tcpips');
        const user = await app.logIn(credentials);
        const tcpTempMessage: any[] = [];
        for await (const change of collection.watch()) {
          if (
            change?.operationType == 'insert' &&
            change?.fullDocument?.documentType == 'duplicate'
          ) {
            const hostDetails =
              hostCommunicationStore.hostCommuication.tcpipCommunication;
            const allData = await user.functions.tcpipCommunicaiton({
              ipAddress: hostDetails?.host,
              port: hostDetails?.port,
              documentType: 'duplicate',
            });
            if (allData?.length > 0) {
              hostCommunicationStore.updateArrTcpIpMessage(
                JSON.parse(allData[0].message),
              );
            }
            await user.functions.tcpIpDeleteRecords({
              ipAddress: hostDetails?.host,
              port: hostDetails?.port,
              documentType: 'duplicate',
            });
          }
        }
      } catch (err) {
        console.error({ err });
      }
    };

    useEffect(() => {
      getTcpIpData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />

        <div className='mx-auto'>
          <div className='p-2 rounded-lg shadow-xl'>
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Grid cols={2}>
                  <Form.Toggle
                    label={
                      hostCommunicationStore.hostCommuication
                        ?.manualAutomaticMode
                        ? 'Automatic'
                        : 'Manual'
                    }
                    id='manualMode'
                    value={
                      hostCommunicationStore.hostCommuication
                        ?.manualAutomaticMode
                    }
                    onChange={manualAutomaticMode => {
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        manualAutomaticMode,
                      });
                    }}
                  />
                  <div>
                    <label>
                      Connection Estabilished :{' '}
                      {`${
                        hostCommunicationStore.hostCommuication.connectStatus
                          ? 'On'
                          : 'Off'
                      }`}
                    </label>
                    <label
                      style={{
                        color: hostCommunicationStore.hostCommuication
                          ?.connectStatus
                          ? 'green'
                          : 'red',
                      }}
                    >
                      {hostCommunicationStore.hostCommuication
                        ?.connectMessage || ''}
                    </label>
                  </div>
                </Grid>

                <Form.InputWrapper label='Inst Type'>
                  <select
                    value={hostCommunicationStore.hostCommuication?.instType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const instType = e.target.value;
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        instType,
                      });
                      const selectedInterfaceManager =
                        interfaceManagerStore.listInterfaceManager?.find(
                          item => item.instrumentType === instType,
                        );
                      hostCommunicationStore.updateSelectedInterfaceManager(
                        selectedInterfaceManager as any,
                      );
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        instrumentName:
                          selectedInterfaceManager?.instrumentName as string,
                      });
                    }}
                  >
                    <option>Select</option>
                    {interfaceManagerStore.listInterfaceManager?.map(
                      (item: any) => (
                        <option
                          key={item.instrumentType}
                          value={item.instrumentType}
                        >
                          {`${item.instrumentType} - ${item.dataFlowFrom
                            ?.replaceAll(/&amp;/g, '&')
                            ?.replaceAll(/&gt;/g, '>')
                            ?.replaceAll(/&lt;/g, '<')
                            ?.replaceAll(/&quot;/g, '"')
                            ?.replaceAll(/â/g, '’')
                            ?.replaceAll(/â¦/g, '…')
                            ?.toString()}`}
                        </option>
                      ),
                    )}
                  </select>
                </Form.InputWrapper>

                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {!!errors.fullName}
                  </span>
                )} */}
                <Form.Input
                  label='Instrument Name'
                  id='instrumentName'
                  placeholder='Instrument Name'
                  value={
                    hostCommunicationStore.hostCommuication?.instrumentName
                  }
                  onChange={instrumentName => {
                    hostCommunicationStore.updateHostCommuication({
                      ...hostCommunicationStore.hostCommuication,
                      instrumentName,
                    });
                  }}
                />
                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {!!errors.fullName}
                  </span>
                )} */}
                <Form.InputWrapper
                  label='Mode of Communication'
                  id='modeOfCommunication'
                >
                  <select
                    name='defualtLab'
                    value={
                      hostCommunicationStore.hostCommuication
                        ?.modeOfCommunication
                    }
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const modeOfCommunication = e.target.value;
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        modeOfCommunication,
                      });
                    }}
                  >
                    <option>Select</option>
                    {[
                      { title: 'Broadcasting' },
                      { title: 'Host Query' },
                      { title: 'File based' },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </Form.InputWrapper>
                <Form.InputWrapper label='Type of Query' id='typeOfQuery'>
                  <select
                    name='defualtLab'
                    value={hostCommunicationStore.hostCommuication?.typeOfQuery}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const typeOfQuery = e.target.value;
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        typeOfQuery,
                      });
                    }}
                  >
                    <option>Select</option>
                    {[
                      { title: 'Unidirectional' },
                      { title: 'Bidirectional' },
                      { title: 'Host Query ' },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </Form.InputWrapper>
              </List>

              <List direction='col' space={4} justify='stretch' fill>
                <Form.InputWrapper
                  label='Mode of Connection '
                  id='modeOfConnection'
                >
                  <select
                    name='defualtLab'
                    value={
                      hostCommunicationStore.hostCommuication?.modeOfConnection
                    }
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const modeOfConnection = e.target.value;
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        modeOfConnection,
                      });
                    }}
                  >
                    <option>Select</option>
                    {[
                      { title: 'Serial Port Communication' },
                      { title: 'TCP/IP Communication' },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </Form.InputWrapper>
                {hostCommunicationStore.hostCommuication?.modeOfConnection ===
                  'Serial Port Communication' && <SettingForRS232Table />}
                {hostCommunicationStore.hostCommuication?.modeOfConnection ===
                  'TCP/IP Communication' && (
                  <SettingForTCP_IPTable
                    hostDetails={
                      hostCommunicationStore.hostCommuication.tcpipCommunication
                    }
                    isConnect={
                      hostCommunicationStore.hostCommuication.connectStatus
                    }
                    onChange={details => {
                      hostCommunicationStore.updateHostCommuication({
                        ...hostCommunicationStore.hostCommuication,
                        tcpipCommunication: details,
                      });
                    }}
                    onConnect={details => {
                      if (!hostCommunicationStore.hostCommuication.instType)
                        return alert('Please select inst type.');
                      hostCommunicationStore.hostCommunicationService
                        .connectHostCommunication({
                          input: {
                            ...details,
                            instType:
                              hostCommunicationStore.hostCommuication.instType,
                            pushToken: loginStore.login.webPushTokenFcm,
                            type: 'tcpIP',
                            isConnect: false,
                          },
                        })
                        .then(res => {
                          hostCommunicationStore.updateHostCommuication({
                            ...hostCommunicationStore.hostCommuication,
                            connectMessage:
                              res.connectHostCommunication?.message,
                            connectStatus:
                              res.connectHostCommunication?.success,
                          });
                        });
                    }}
                    onDisConnect={details => {
                      hostCommunicationStore.hostCommunicationService
                        .connectHostCommunication({
                          input: {
                            ...details,
                            instType:
                              hostCommunicationStore.hostCommuication.instType,
                            pushToken: loginStore.login.webPushTokenFcm,
                            type: 'tcpIP',
                            isConnect: true,
                          },
                        })
                        .then(res => {
                          console.log({ res });
                          hostCommunicationStore.updateHostCommuication({
                            ...hostCommunicationStore.hostCommuication,
                            connectMessage: 'Connection established closed.',
                            connectStatus: false,
                          });
                        });
                    }}
                  />
                )}
              </List>

              <List direction='col' space={10} align='between' justify='center'>
                <label>Status : Pending</label>
                <div className='flex'>
                  <Buttons.Button size='medium' type='solid' onClick={() => {}}>
                    Save Setting
                  </Buttons.Button>
                </div>

                <div className='flex mb-2'>
                  <Buttons.Button size='medium' type='solid' onClick={() => {}}>
                    Generate Driver
                  </Buttons.Button>
                </div>
              </List>

              <div className='clearfix'></div>
            </Grid>

            <Grid cols={2}>
              <Form.InputWrapper label='Apply Filtr on' id='applyFiltrOn'>
                <select
                  name='defualtLab'
                  value={hostCommunicationStore.hostCommuication?.applyFiltrOn}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const applyFiltrOn = e.target.value;
                    hostCommunicationStore.updateHostCommuication({
                      ...hostCommunicationStore.hostCommuication,
                      applyFiltrOn,
                    });
                  }}
                >
                  <option>Select</option>
                  {[
                    { title: 'Patient Data / QC Data' },
                    { title: 'Output Filter' },
                    { title: 'Import' },
                  ].map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </Form.InputWrapper>
              <Form.Input
                label='Log File'
                id='logFileDataReceivefromInstrument'
                placeholder='Log File'
                //value={rootStore.userStore.user.fullName}
                onChange={logFileDataReceivefromInstrument => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    logFileDataReceivefromInstrument,
                  });
                }}
              />
              <div className='clerfix' />
            </Grid>

            <Table striped bordered hover>
              <tbody>
                {hostCommunicationStore.arrTcpIpMessage?.length > 0 &&
                  hostCommunicationStore.arrTcpIpMessage.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.message || item}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <Accordion allowMultiple>
              {[
                { title: 'Hex to ASCII' },
                { title: 'Source File' },
                { title: 'Send data to Intrument' },
                { title: 'Convert to' },
                { title: 'Output in' },
              ].map((item, index) => {
                return (
                  <AccordionItem title={`${item.title}`} key={index}>
                    {item.title === 'Hex to ASCII' && (
                      <>
                        <List
                          direction='col'
                          space={4}
                          justify='stretch'
                          fill
                          key={index}
                        >
                          <div className={'grid grid-cols-3 gap-4'}>
                            <div className='col-span-2'>
                              <Form.MultilineInput
                                label=''
                                id='txtHexToAscii'
                                disabled={
                                  dataConversationStore.listdataConversation !=
                                    undefined &&
                                  hostCommunicationStore.hostCommuication
                                    ?.instType !== undefined
                                    ? dataConversationStore.listdataConversation
                                        ?.length > 0
                                      ? false
                                      : true
                                    : true
                                }
                                placeholder='Hex'
                                value={messageWebSocket}
                                onChange={hex => {
                                  HexToAsciiFlow.hextoascii(hex);
                                  hostCommunicationStore.updateHostCommuication(
                                    {
                                      ...hostCommunicationStore.hostCommuication,
                                      hex,
                                    },
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className='clearfix' />
                        </List>
                      </>
                    )}
                    {item.title === 'Source File' && (
                      <>
                        <Grid cols={2}>
                          <Form.InputWrapper
                            label='Source File'
                            id='sourceFileDataReceivefromInstrument'
                          >
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.sourceFileDataReceivefromInstrument
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const sourceFileDataReceivefromInstrument =
                                  e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  sourceFileDataReceivefromInstrument,
                                });
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Hex decimal' },
                                { title: 'HL7' },
                                { title: 'ASTM' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>

                          <Form.InputWrapper
                            label='Source Repository'
                            id='SourceRepositoryDataReceivefromInstrument'
                          >
                            <select
                              name='defualtLab'
                              disabled={
                                segmentMappingStore.listSegmentMapping !=
                                  undefined &&
                                hostCommunicationStore.hostCommuication
                                  ?.instType !== undefined
                                  ? segmentMappingStore.listSegmentMapping
                                      ?.length > 0
                                    ? false
                                    : true
                                  : true
                              }
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.SourceRepositoryDataReceivefromInstrument
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const SourceRepositoryDataReceivefromInstrument =
                                  e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  SourceRepositoryDataReceivefromInstrument,
                                });
                                if (
                                  SourceRepositoryDataReceivefromInstrument ===
                                  'Phiysical file Location'
                                ) {
                                  hostCommunicationStore.hostCommuication;
                                  if (
                                    !hostCommunicationStore.hostCommuication
                                      ?.instType
                                  )
                                    return alert(
                                      'Please enter instrument type',
                                    );
                                  setModalImportFile({
                                    show: true,
                                    title: 'Import file!',
                                  });
                                }
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Phiysical file Location' },
                                { title: 'Collection of a database' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                          <div className='clearfix'></div>
                        </Grid>
                        <List direction='col' space={4} justify='stretch' fill>
                          <div className={'grid grid-cols-3 gap-4'}>
                            <div className='col-span-2'>
                              <Form.MultilineInput
                                label=''
                                id='txtDataReceivefromInstrument'
                                placeholder='Source file (Data Received Data from Instrument)'
                                disabled={
                                  segmentMappingStore.listSegmentMapping !=
                                    undefined &&
                                  hostCommunicationStore.hostCommuication
                                    ?.instType !== undefined
                                    ? segmentMappingStore.listSegmentMapping
                                        ?.length > 0
                                      ? false
                                      : true
                                    : true
                                }
                                value={
                                  hostCommunicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument
                                }
                                onChange={txtDataReceivefromInstrument => {
                                  HostCommunicationFlows.newMessage(
                                    txtDataReceivefromInstrument,
                                  );
                                }}
                              />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                              <div>
                                <Buttons.Button
                                  size='medium'
                                  type='solid'
                                  onClick={() => {
                                    // socket.emit(
                                    //   'hostCommunicationSourceFile',
                                    //   hostCommunicationStore.hostCommuication
                                    //     ?.txtDataReceivefromInstrument,
                                    // );
                                  }}
                                >
                                  Send
                                </Buttons.Button>
                              </div>
                            </div>
                          </div>

                          <div className='clearfix' />
                        </List>
                      </>
                    )}
                    {item.title === 'Send data to Intrument' && (
                      <>
                        <div className={'grid grid-cols-3 gap-4'}>
                          <div className='col-span-2'>
                            <Form.MultilineInput
                              label=''
                              id='txtSendDatafromInstrument'
                              placeholder='Send data to Instrument'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.txtSendDatafromInstrument
                              }
                              onChange={txtSendDatafromInstrument => {
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  txtSendDatafromInstrument,
                                });
                              }}
                            />
                          </div>
                          <div className='flex flex-col items-center justify-center'>
                            <div>
                              <Buttons.Button
                                size='medium'
                                type='solid'
                                onClick={() => {
                                  // socket.emit(
                                  //   'hostCommunicationSendDataToInstrument',
                                  //   hostCommunicationStore.hostCommuication
                                  //     ?.txtSendDatafromInstrument,
                                  // );
                                }}
                              >
                                Send
                              </Buttons.Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {item.title === 'Convert to' && (
                      <>
                        <Grid cols={2}>
                          <Form.InputWrapper label='Convert to' id='convertTo'>
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.convertTo
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={async e => {
                                const convertTo = e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  convertTo,
                                  SourceRepositoryDataReceivefromInstrument: '',
                                });
                                await HostCommunicationFlows.convetTo(
                                  convertTo,
                                  hostCommunicationStore.selectedInterfaceManager,
                                  hostCommunicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument || '',
                                );
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Hex decimal' },
                                { title: 'HL7' },
                                { title: 'ASTM' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>

                          <Form.InputWrapper
                            label='Output Repository'
                            id='outputRepository'
                          >
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.outputRepository
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const outputRepository = e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  outputRepository,
                                });
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Phiysical file Location' },
                                { title: 'Collection of a database' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                          <div className='clearfix'></div>
                        </Grid>
                        <List direction='col' space={4} justify='stretch' fill>
                          <div className={'grid grid-cols-3 gap-4'}>
                            <div className='col-span-2'>
                              {hostCommunicationStore.convertTo?.hl7 !==
                                undefined && (
                                <HL7Table
                                  data={toJS(
                                    hostCommunicationStore.convertTo.hl7,
                                  )}
                                />
                              )}
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                              <div>
                                <Buttons.Button
                                  size='medium'
                                  type='solid'
                                  onClick={() => {
                                    console.log({
                                      message:
                                        hostCommunicationStore.convertTo.hl7,
                                    });

                                    hostCommunicationStore.hostCommunicationService
                                      .createTransmittedMessage({
                                        input: {
                                          filter: {
                                            message:
                                              hostCommunicationStore.convertTo
                                                .hl7,
                                            instType:
                                              hostCommunicationStore
                                                .hostCommuication.instType,
                                          },
                                        },
                                      })
                                      .then(res => {
                                        if (
                                          res.createTransmittedMessage.success
                                        ) {
                                          Toast.success({
                                            message: `😊 ${res.createTransmittedMessage.message}`,
                                          });
                                        }
                                      });
                                  }}
                                >
                                  Save
                                </Buttons.Button>
                              </div>
                            </div>
                          </div>

                          <div className='clearfix' />
                        </List>
                      </>
                    )}
                    {item.title === 'Output in' && (
                      <>
                        <List direction='col' space={4} justify='start'>
                          <Form.InputWrapper label='Output in' id='outPutIn'>
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.outPutIn
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const outPutIn = e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  outPutIn,
                                });
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'PDF' },
                                { title: 'CSV' },
                                { title: 'TXT' },
                                { title: 'Table/Collection' },
                                { title: 'API' },
                                { title: 'Graph' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                          <div className='clearfix'></div>
                        </List>
                        <List direction='col' space={4} justify='stretch' fill>
                          <div className={'grid grid-cols-3 gap-4'}>
                            <div className='col-span-2'>
                              <Form.MultilineInput
                                id='txtOutputin'
                                placeholder='Output in'
                                value={
                                  hostCommunicationStore.hostCommuication
                                    ?.txtOutputin
                                }
                                onChange={txtOutputin => {
                                  hostCommunicationStore.updateHostCommuication(
                                    {
                                      ...hostCommunicationStore.hostCommuication,
                                      txtOutputin,
                                    },
                                  );
                                }}
                              />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                              <div>
                                <Buttons.Button
                                  size='medium'
                                  type='solid'
                                  onClick={() => {}}
                                >
                                  Output
                                </Buttons.Button>
                              </div>
                            </div>
                          </div>
                          <div className='clearfix' />
                        </List>

                        <Grid cols={2}>
                          <Form.InputWrapper
                            label='Output for Third party Software'
                            id='outputforThirdpartySoftware'
                          >
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.outputforThirdpartySoftware
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const outputforThirdpartySoftware =
                                  e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  outputforThirdpartySoftware,
                                });
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Serial to Serial' },
                                { title: 'HL7' },
                                { title: 'ASTM' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                          {/* <Form.Input
                label="Log File"
                id="logFileThiredPartySoftare"
                placeholder="Log File"
                value={
                  hostCommunicationStore.hostCommuication
                    ?.logFileThiredPartySoftare
                }
                onChange={(logFileThiredPartySoftare) => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    logFileThiredPartySoftare,
                  })
                }}
              /> */}
                          <Form.InputWrapper
                            label='Output Repository'
                            id='SourceRepositoryThiredPartySoftare'
                          >
                            <select
                              name='defualtLab'
                              value={
                                hostCommunicationStore.hostCommuication
                                  ?.SourceRepositoryThiredPartySoftare
                              }
                              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                              onChange={e => {
                                const SourceRepositoryThiredPartySoftare =
                                  e.target.value;
                                hostCommunicationStore.updateHostCommuication({
                                  ...hostCommunicationStore.hostCommuication,
                                  SourceRepositoryThiredPartySoftare,
                                });
                              }}
                            >
                              <option>Select</option>
                              {[
                                { title: 'Phiysical file Location' },
                                { title: 'Collection of a database' },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                          <div className='clearfix'></div>
                        </Grid>
                      </>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>

            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={() => {}}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <br />
          <ModalConfirm
            {...deleteItem}
            click={() => {
              // dataConversationStore.dataConversationService
              //   .deletedepartment(deleteItem.id)
              //   .then((res: any) => {
              //     if (res.status === 200) {
              //       Toast.success({
              //         message: `😊 Department deleted.`,
              //       })
              //       setDeleteItem({ show: false })
              //       // rootStore.departmentStore.fetchListDepartment()
              //     }
              //   })
            }}
          />
        </div>
        <ModalImportFile
          accept='.csv,.xlsx,.xls,.txt,.hl7'
          {...modalImportFile}
          click={(file: any) => {
            setModalImportFile({ show: false });

            const reader = new FileReader();
            reader.addEventListener('load', (e: any) => {
              const file = e.target.result;
              const lines = file.split(/\r/);

              const message = lines.join('\n');
              HostCommunicationFlows.newMessage(message);
            });
            reader.addEventListener('error', (e: any) =>
              console.log(e.target.error.name),
            );
            reader.readAsText(file);
          }}
          close={() => {
            setModalImportFile({ show: false });
          }}
        />
      </>
    );
  }),
);

export default HostCommunication;
