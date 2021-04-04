import React from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import { observer } from "mobx-react"

import {Stores} from '../../stores';

const SettingForTCP_IPTable: React.FunctionComponent = observer(() => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "green" }}>Communication Settins</th>
            <th style={{ color: "green" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Host IP address</td>
            <td>
              <LibraryComponents.Form.Input
                id="hostIpAddress"
                placeholder="Host Ip Address"
                value={
                  Stores.hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.hostIpAddress
                }
                onChange={(hostIpAddress) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      hostIpAddress,
                    },
                  })
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Port number</td>
            <td>
              {" "}
              <LibraryComponents.Form.Input
                id="portNumber"
                placeholder="Port Number"
                value={
                  Stores.hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.portNumber
                }
                onChange={(portNumber) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      portNumber,
                    },
                  })
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Timeout</td>
            <td>
              {" "}
              <LibraryComponents.Form.Input
                id="timeout"
                placeholder="Timeout"
                value={
                  Stores.hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.timeout
                }
                onChange={(timeout) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      timeout,
                    },
                  })
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Response Time</td>
            <td>
              {" "}
              <LibraryComponents.Form.Input
                id="responseTime"
                placeholder="Response Time"
                value={
                  Stores.hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.responseTime
                }
                onChange={(responseTime) => {
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.hostCommunicationStore.hostCommuication
                        ?.tcpipCommunication,
                      responseTime,
                    },
                  })
                }}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
})

export default SettingForTCP_IPTable
