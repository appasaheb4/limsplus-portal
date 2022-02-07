import React from "react"
import { Table } from "reactstrap"
import {Form} from "@lp/library/components"
import { observer } from "mobx-react"
import {useStores} from '@lp/stores';

export const SettingForTCP_IPTable: React.FunctionComponent = observer(() => {
  const {hostCommunicationStore} =useStores()
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
              <Form.Input
                id="hostIpAddress"
                placeholder="Host Ip Address"
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.hostIpAddress
                }
                onChange={(hostIpAddress) => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
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
              <Form.Input
                id="portNumber"
                placeholder="Port Number"
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.portNumber
                }
                onChange={(portNumber) => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
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
              <Form.Input
                id="timeout"
                placeholder="Timeout"
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.timeout
                }
                onChange={(timeout) => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
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
              <Form.Input
                id="responseTime"
                placeholder="Response Time"
                value={
                  hostCommunicationStore.hostCommuication?.tcpipCommunication
                    ?.responseTime
                }
                onChange={(responseTime) => {
                  hostCommunicationStore.updateHostCommuication({
                    ...hostCommunicationStore.hostCommuication,
                    tcpipCommunication: {
                      ...hostCommunicationStore.hostCommuication
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


