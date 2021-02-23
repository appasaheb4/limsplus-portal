import React from "react"
import { Table } from "reactstrap"

// interface SettingForTCP_IPTableProps {
//   onClick?: () => void
// }

const SettingForTCP_IPTable: React.FunctionComponent = () => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "gray" }}>
            <th style={{ color: "red" }}>Setting for TCP/IP</th>
            <th style={{ color: "red" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Host IP address</td>
            <td></td>
          </tr>

          <tr>
            <td>Port number</td>
            <td></td>
          </tr>
          <tr>
            <td>Timeout</td>
            <td></td>
          </tr>
          <tr>
            <td>Response Time</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default SettingForTCP_IPTable
