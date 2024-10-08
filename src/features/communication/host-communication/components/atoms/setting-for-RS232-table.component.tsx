import React from 'react';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react';

import { useStores } from '@/stores';

const comPort = [
  { title: 'COM1' },
  { title: 'COM2' },
  { title: 'COM3' },
  { title: 'COM4' },
  { title: 'COM5' },
];
const baudRate = [
  { title: '110' },
  { title: '300' },
  { title: '600' },
  { title: '1200' },
  { title: '2400' },
  { title: '4800' },
  { title: '9600' },
  { title: '14400' },
  { title: '19200' },
  { title: '38400' },
  { title: '57600' },
  { title: '115200' },
  { title: '128000' },
  { title: '256000' },
];

const stopBits = [{ title: '1' }, { title: '1.5' }, { title: '2' }];

const dataBits = [{ title: '7' }, { title: '8' }];
const parity = [
  { title: 'None (N)' },
  { title: 'Odd (O)' },
  { title: 'Even €' },
  { title: 'Mark (M)' },
  { title: 'Space (S)' },
];
const flowControl = [
  { title: 'On' },
  { title: 'Off' },
  { title: 'None' },
  { title: 'Hardware' },
];
const protocol = [{ title: '1381' }, { title: '1394' }];

export const SettingForRS232Table = observer(() => {
  const { hostCommunicationStore } = useStores();
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: 'white' }}>Communication Settings</th>
            <th style={{ color: 'white' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Com Port</td>
            <td>
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.comPort
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const comPort = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      comPort,
                    },
                  });
                }}
              >
                <option>Select</option>
                {comPort.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>Baud rate</td>
            <td>
              {' '}
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.baudRate
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const baudRate = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      baudRate,
                    },
                  });
                }}
              >
                <option>Select</option>
                {baudRate.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Data bits</td>
            <td>
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.dataBits
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const dataBits = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      dataBits,
                    },
                  });
                }}
              >
                <option>Select</option>
                {dataBits.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Stop bits</td>
            <td>
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.stopBits
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const stopBits = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      stopBits,
                    },
                  });
                }}
              >
                <option>Select</option>
                {stopBits.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Parity</td>
            <td>
              {' '}
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.parity
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const parity = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      parity,
                    },
                  });
                }}
              >
                <option>Select</option>
                {parity.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Flow control (Handshaking)</td>
            <td>
              {' '}
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.flowControl
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const flowControl = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      flowControl,
                    },
                  });
                }}
              >
                <option>Select</option>
                {flowControl.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Protocol</td>
            <td>
              {' '}
              <select
                name='defualtLab'
                value={
                  hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.protocol
                }
                className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                onChange={e => {
                  const protocol = e.target.value;
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    serialPortCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.serialPortCommunication,
                      protocol,
                    },
                  });
                }}
              >
                <option>Select</option>
                {protocol.map((item: any) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
});
