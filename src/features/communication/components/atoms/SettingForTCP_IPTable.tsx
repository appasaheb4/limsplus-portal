import React, { useContext } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import { observer } from "mobx-react"
import RootStoreContext from "@lp/library/stores"

const SettingForTCP_IPTable: React.FunctionComponent = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "red" }}>Setting for TCP/IP</th>
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
                  rootStore.communicationStore.hostCommuication?.tcpipCommunication
                    ?.hostIpAddress
                }
                onChange={(hostIpAddress) => {
                  rootStore.communicationStore.updateHostCommuication({
                    ...rootStore.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...rootStore.communicationStore.hostCommuication
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
                  rootStore.communicationStore.hostCommuication?.tcpipCommunication
                    ?.portNumber
                }
                onChange={(portNumber) => {
                  rootStore.communicationStore.updateHostCommuication({
                    ...rootStore.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...rootStore.communicationStore.hostCommuication
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
                  rootStore.communicationStore.hostCommuication?.tcpipCommunication
                    ?.timeout
                }
                onChange={(timeout) => {
                  rootStore.communicationStore.updateHostCommuication({
                    ...rootStore.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...rootStore.communicationStore.hostCommuication
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
                  rootStore.communicationStore.hostCommuication?.tcpipCommunication
                    ?.responseTime
                }
                onChange={(responseTime) => {
                  rootStore.communicationStore.updateHostCommuication({
                    ...rootStore.communicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...rootStore.communicationStore.hostCommuication
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
