import React from "react"
import { Table } from "reactstrap"

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
// const baudRate = []
// 110
// 300
// 600
// 1200
// 2400
// 4800
// 9600
// 14400
// 19200
// 38400
// 57600
// 115200
// 128000
// 256000

const SettingForRS232Table: React.FunctionComponent = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "gray" }}>
            <th style={{ color: "red" }}>Setting for RS232</th>
            <th style={{ color: "red" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Com Port</td>
            <td>
              <select
                name="defualtLab"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const defaultLab = e.target.value
                  console.log({ defaultLab })
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
            <td>9600</td>
          </tr>
          <tr>
            <td>Data bits</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Stop bits</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Parity</td>
            <td>None</td>
          </tr>
          <tr>
            <td>Flow control (Handshaking)</td>
            <td>On</td>
          </tr>
          <tr>
            <td>Protocol</td>
            <td>1381</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default SettingForRS232Table
