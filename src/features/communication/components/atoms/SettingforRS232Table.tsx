import React from "react"
import { Table } from "reactstrap"
import { observer } from "mobx-react"

import {Stores} from '../../stores';

interface SettingForRS232TableProps {
  onClick?: () => void
}

const comPort = [
  { title: "COM1" },
  { title: "COM2" },
  { title: "COM3" },
  { title: "COM4" },
  { title: "COM5" },
]
const baudRate = [
  { title: "110" },
  { title: "300" },
  { title: "600" },
  { title: "1200" },
  { title: "2400" },
  { title: "4800" },
  { title: "9600" },
  { title: "14400" },
  { title: "19200" },
  { title: "38400" },
  { title: "57600" },
  { title: "115200" },
  { title: "128000" },
  { title: "256000" },
]

const stopBits = [{ title: "1" }, { title: "1.5" }, { title: "2" }]

const dataBits = [{ title: "7" }, { title: "8" }]
const parity = [
  { title: "None (N)" },
  { title: "Odd (O)" },
  { title: "Even €" },
  { title: "Mark (M)" },
  { title: "Space (S)" },
]
const flowControl = [
  { title: "On" },
  { title: "Off" },
  { title: "None" },
  { title: "Hardware" },
]
const protocol = [{ title: "1381" }, { title: "1394" }]

const SettingForRS232Table: React.FunctionComponent = observer(() => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "green" }}>Communication Settings</th>
            <th style={{ color: "green" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Com Port</td>
            <td>
              <select
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.comPort
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const comPort = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   comPort,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
              {" "}
              <select
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.baudRate
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const baudRate = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   baudRate,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.dataBits
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const dataBits = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   dataBits,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.stopBits
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const stopBits = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   stopBits,
                    // },
                  })             
                   }}
              >
                <option selected>Select</option>
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
              {" "}
              <select
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.parity
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const parity = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   parity,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
              {" "}
              <select
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.flowControl
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const flowControl = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   flowControl,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
              {" "}
              <select
                name="defualtLab"
                value={
                  Stores.hostCommunicationStore.hostCommuication
                    ?.serialPortCommunication?.protocol
                }
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const protocol = e.target.value
                  Stores.hostCommunicationStore.updateHostCommuication({
                    ...Stores.hostCommunicationStore.hostCommuication,
                    // serialPortCommunication: {
                    //   ...Stores.hostCommunicationStore.hostCommuication
                    //     ?.serialPortCommunication,
                    //   protocol,
                    // },
                  })
                }}
              >
                <option selected>Select</option>
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
  )
})

export default SettingForRS232Table
