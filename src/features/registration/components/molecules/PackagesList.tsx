import React from "react"
import { Table } from "reactstrap"

interface PackagesListProps {
  data: any
}

export const PackagesList = ({ data }: PackagesListProps) => {
  return (
    <>
      {data?.pacakgeListS && data?.pacakgeListS?.length > 0 && (
        <>
          <h4 className="text-center"> Service Type: S</h4>
          <Table striped bordered>
            <thead>
              <tr className="p-0 text-xs">
                <th className="text-white">Panel Code</th>
                <th className="text-white">Panel Name</th>
                <th className="text-white">Package</th>
                <th className="text-white">Service Type</th>
                <th className="text-white">Operation</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListS?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item?.packageCode}</td>
                  <td>{item.serviceType}</td>
                  <td>Delete</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {data?.pacakgeListM && data?.pacakgeListM?.length > 0 && (
        <>
          <h4 className="text-center"> Service Type: M</h4>
          <Table striped bordered>
            <thead>
              <tr className="p-0 text-xs">
                <th className="text-white">Panel Code</th>
                <th className="text-white">Panel Name</th>
                <th className="text-white">Package</th>
                <th className="text-white">Service Type</th>
                <th className="text-white">Operation</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListM?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item?.packageCode}</td>
                  <td>{item.serviceType}</td>
                  <td>Delete</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}
