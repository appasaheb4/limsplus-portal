import React from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"

interface PackagesListProps {
  data: any
  onDeletePackage: (string) => void
  onRemoveItem?: (serviceType,packageCode, index) => void
}

export const PackagesList = ({
  data,
  onDeletePackage,
  onRemoveItem,
}: PackagesListProps) => {
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
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListS?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item.serviceType !== "M" && item?.packageCode}</td>
                  <td>{item.serviceType}</td>
                  <td>
                    {" "}
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#000"
                      size="20"
                      onClick={() => {
                        if (item._id) onDeletePackage(item._id)
                        else onRemoveItem && onRemoveItem("S", item.packageCode, item.index)
                      }}
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </td>
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
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListM?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item?.packageCode}</td>
                  <td>{item.serviceType !== 'M' ?item.serviceType :''}</td>
                  <td>
                    {" "}
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#000"
                      size="20"
                      onClick={() => {
                        if (item._id) onDeletePackage(item._id)
                        else onRemoveItem && onRemoveItem("M", item.packageCode, item.index)
                      }}
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {data?.pacakgeListN && data?.pacakgeListN?.length > 0 && (
        <>
          <h4 className="text-center"> Service Type: N</h4>
          <Table striped bordered>
            <thead>
              <tr className="p-0 text-xs">
                <th className="text-white">Panel Code</th>
                <th className="text-white">Panel Name</th>
                <th className="text-white">Package</th>
                <th className="text-white">Service Type</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListN?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item?.packageCode}</td>
                  <td>{item.serviceType}</td>
                  <td>
                    {" "}
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#000"
                      size="20"
                      onClick={() => {
                        onDeletePackage(item._id)
                      }}
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {data?.pacakgeListK && data?.pacakgeListK?.length > 0 && (
        <>
          <h4 className="text-center"> Service Type: K</h4>
          <Table striped bordered>
            <thead>
              <tr className="p-0 text-xs">
                <th className="text-white">Panel Code</th>
                <th className="text-white">Panel Name</th>
                <th className="text-white">Package</th>
                <th className="text-white">Service Type</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data?.pacakgeListK?.map((item) => (
                <tr key={item.panelCode}>
                  <td>{item?.panelCode}</td>
                  <td>{item?.panelName}</td>
                  <td>{item?.packageCode}</td>
                  <td>{item.serviceType}</td>
                  <td>
                    {item.serviceType === "K" && (
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() => {
                          onDeletePackage(item._id)
                        }}
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}
