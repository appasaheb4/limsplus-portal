import React, { useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"

interface HL7TableProps {
  data?: any
}

const HL7Table = (props: HL7TableProps) => {
  const [selectSegment, setSelectSegment] = useState(props.data[0][1])
  const [field, setField] = useState(props.data[0][0])
  return (
    <>
      <div className="mb-2">
        <LibraryComponents.List space={2} direction="row" justify="center">
          {props.data.map((item: any, index: number) => (
            <LibraryComponents.Buttons.Button
              key={index}
              size="medium"
              type="solid"
              onClick={() => {
                setSelectSegment(item[1])
                setField(item[0])
              }}
              style={{ margin: 4 }}
            >
              {item[0]}
            </LibraryComponents.Buttons.Button>
          ))}
        </LibraryComponents.List>
      </div>
      <div className="rounded-lg overflow-auto">
        <Table bordered>
          <thead>
            <th style={{ color: "green" }}>{field}</th>
            <th style={{ color: "green" }}>Value</th>
          </thead>
          <tbody>
            {selectSegment.map((item: any, index: number) => (
              <tr key={index}>
                <th>
                  {`${item.field_no}. ${
                    item.filed.charAt(0).toUpperCase() +
                    item.filed.slice(1).replaceAll("_", " ")
                  }`}
                </th>
                <th>{item.value}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default HL7Table
