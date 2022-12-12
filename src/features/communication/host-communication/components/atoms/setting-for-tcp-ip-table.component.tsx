import React, {useState} from 'react';
import {Table} from 'reactstrap';
import {Form, Buttons} from '@/library/components';

interface SettingForTCP_IPTableProps {
  isConnect?: boolean;
  onConnect: (details: any) => void;
}

export const SettingForTCP_IPTable = ({
  isConnect = false,
  onConnect,
}: SettingForTCP_IPTableProps) => {
  const [details, setDetails] = useState<any>({
    host: '192.168.1.3',
    port: 1009,
  });
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
                value={details?.host}
                onChange={host => {
                  setDetails({
                    ...details,
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
                value={details?.port.toString()}
                onChange={port => {
                  setDetails({
                    ...details,
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
                  onConnect && onConnect(details);
                }}
              >
                {isConnect ? 'Connected' : 'Connect'}
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
