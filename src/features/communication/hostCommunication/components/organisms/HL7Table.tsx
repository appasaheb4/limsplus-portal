import React, { useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"

interface HL7TableProps {
  data?: any
}

export const HL7Table = (props: HL7TableProps) => {
  console.log({ data: props.data })

  const [selectSegment, setSelectSegment] = useState(props.data[0][1])
  const [field, setField] = useState(props.data[0][0])
  return (
    <>
      <div className="mb-2">
        <LibraryComponents.Atoms.List space={2} direction="row" justify="center" fill>
          <div>
            {props.data.map((item: any, index: number) => (
              <div
                className="mb-2"
                style={{ display: "inline-block", marginLeft: 2, marginBottom: 2 }}
                key={index}
              >
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  key={index}
                  type="solid"
                  onClick={() => {
                    setSelectSegment(item[1])
                    setField(item[0])
                  }}
                  style={{ margin: 4 }}
                >
                  {item[0]}
                </LibraryComponents.Atoms.Buttons.Button>
              </div>
            ))}
          </div>
        </LibraryComponents.Atoms.List>
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


