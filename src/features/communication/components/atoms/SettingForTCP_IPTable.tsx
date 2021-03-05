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
            <th style={{ color: "red" }}>Communication Settins</th>
            <th style={{ color: "red" }}>Value</th>
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
                  Stores.communicationStore.hostCommuication?.tcpipCommunication
                    ?.hostIpAddress
                }
                onChange={(hostIpAddress) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.communicationStore.hostCommuication
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
                  Stores.communicationStore.hostCommuication?.tcpipCommunication
                    ?.portNumber
                }
                onChange={(portNumber) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.communicationStore.hostCommuication
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
                  Stores.communicationStore.hostCommuication?.tcpipCommunication
                    ?.timeout
                }
                onChange={(timeout) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.communicationStore.hostCommuication
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
                  Stores.communicationStore.hostCommuication?.tcpipCommunication
                    ?.responseTime
                }
                onChange={(responseTime) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...Stores.communicationStore.hostCommuication
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
