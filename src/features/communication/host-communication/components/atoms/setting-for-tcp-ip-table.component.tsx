import React from 'react';
import {Table} from 'reactstrap';
import {Form, Buttons} from '@/library/components';

interface SettingForTCP_IPTableProps {
  hostDetails: any;
  isConnect?: boolean;
  onConnect: (details: any) => void;
  onDisConnect: (details: any) => void;
  onChange: (details: any) => void;
}

export const SettingForTCP_IPTable = ({
  hostDetails,
  isConnect = false,
  onDisConnect,
  onConnect,
  onChange,
}: SettingForTCP_IPTableProps) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{color: 'white'}}>Communication Setting</th>
            <th style={{color: 'white'}}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Host IP address</td>
            <td>
              <Form.Input
                id='hostIpAddress'
                placeholder='Host Ip Address'
                value={hostDetails?.host}
                onChange={host => {
                  onChange({
                    ...hostDetails,
                    host,
                  });
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Port number</td>
            <td>
              {' '}
              <Form.Input
                id='portNumber'
                placeholder='Port Number'
                value={hostDetails?.port.toString()}
                onChange={port => {
                  onChange({
                    ...hostDetails,
                    port: Number.parseInt(port),
                  });
                }}
              />
            </td>
          </tr>
          {/* <tr>
            <td>Timeout</td>
            <td>
              {' '}
              <Form.Input
                id='timeout'
                placeholder='Timeout'
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.timeout
                }
                onChange={timeout => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      timeout,
                    },
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Response Time</td>
            <td>
              {' '}
              <Form.Input
                id='responseTime'
                placeholder='Response Time'
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.responseTime
                }
                onChange={responseTime => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      responseTime,
                    },
                  });
                }}
              />
            </td>
          </tr> */}
          <tr className='items-center'>
            <td colSpan={2} className='items-center'>
              <Buttons.Button
                size='medium'
                type='solid'
                buttonStyle={{
                  backgroundColor: isConnect ? 'green' : null,
                }}
                onClick={() => {
                  isConnect
                    ? onDisConnect && onDisConnect(hostDetails)
                    : onConnect && onConnect(hostDetails);
                }}
              >
                {isConnect ? 'Disconnect' : 'Connect'}
              </Buttons.Button>
              <span className='text-red mt-4'>
                Note: Please run limsplus.exe file then communication machine to
                web start.
              </span>
              <br />
              <a
                className='mt-2 text-blue-800'
                href='https://limsplussolutions.blob.core.windows.net/assets/limsplus.exe'
              >
                Download limsplus.exe
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
