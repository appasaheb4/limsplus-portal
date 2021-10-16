/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
   
interface AdminstrativeDivListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

export const AdminstrativeDivList = observer((props: AdminstrativeDivListProps) => {
  return (
    <LibraryComponents.Organisms.TableBootstrap
      id="_id"
      data={props.data}
      totalSize={props.totalSize}
      columns={[
        {
          dataField: "_id",
          text: "Id",
          hidden: true,
          csvExport: false,
        },
        {
          dataField: "country",
          text: "Country",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "state",
          text: "State",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.List
                space={2}
                direction="row"
                justify="center"
              >
                {row.state.map((item) => (
                  <div className="mb-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {}}
                    >
                      {`${item.state}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </LibraryComponents.Atoms.List>
            </>
          ),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        
                        placeholder={"Please Enter state"}
                        value={row.state || ""}
                        onChange={(state) => {
                          props.onUpdateItem && props.onUpdateItem(state,column.dataField,row._id)
                        }}
                      />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const state = row.state
                        if (state === undefined) return alert("Please Enter State")
                        if (state !== undefined) {
                          let arrState = props.extraData.administrativeDiv && row.state;
                          props.onUpdateItem && props.onUpdateItem(arrState,"state",row._id)
                          //  Stores.administrativeDivStore.updateAdministrativeDiv({
                          //    ...Stores.administrativeDivStore.administrativeDiv,
                          //    state: arrState? arrState.concat(state): [state] 
                          //  })
                           props.extraData.updateLocalState({
                            ...props.extraData.localState,
                            state:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {row.state?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row.state?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row.state?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                props.extraData.updateAdministrativeDiv({
                                  ...props.extraData.administrativeDiv,
                                  state: finalArray,
                                })
                                props.onUpdateItem && props.onUpdateItem(finalArray,"state",row._id)
                              }}
                            >
                             {item}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
            </>
          ),
        },
        {
          dataField: "district",
          text: "District",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.List
                space={2}
                direction="row"
                justify="center"
              >
                {row.district.map((item) => (
                  <div className="mb-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {}}
                    >
                      {`${item.district}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </LibraryComponents.Atoms.List>
            </>
          ),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        
                        placeholder={"Please Enter district"}
                        value={row.district || ""}
                        onChange={(district) => {
                          props.onUpdateItem && props.onUpdateItem(district,column.dataField,row._id)
                        }}
                      />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const district = row.district
                        if (district === undefined) return alert("Please Enter District")
                        if (district !== undefined) {
                          let arrState = props.extraData.administrativeDiv && row.district;
                          props.onUpdateItem && props.onUpdateItem(arrState,"district",row._id)
                          //  Stores.administrativeDivStore.updateAdministrativeDiv({
                          //    ...Stores.administrativeDivStore.administrativeDiv,
                          //    state: arrState? arrState.concat(state): [state] 
                          //  })
                           props.extraData.updateLocalDistrict({
                            ...props.extraData.localState,
                            district:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {row.district?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row.district?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row.district?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                props.extraData.updateAdministrativeDiv({
                                  ...props.extraData.administrativeDiv,
                                  district: finalArray,
                                })
                                props.onUpdateItem && props.onUpdateItem(finalArray,"district",row._id)
                              }}
                            >
                             {item}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
            </>
          ),
        },
        {
          dataField: "city",
          text: "City",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.List
                space={2}
                direction="row"
                justify="center"
              >
                {row.city.map((item) => (
                  <div className="mb-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {}}
                    >
                      {`${item.city}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </LibraryComponents.Atoms.List>
            </>
          ),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        
                        placeholder={"Please Enter City"}
                        value={row.city || ""}
                        onChange={(city) => {
                          props.onUpdateItem && props.onUpdateItem(city,column.dataField,row._id)
                        }}
                      />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const city = row.city
                        if (city === undefined) return alert("Please Enter City")
                        if (city !== undefined) {
                          let arrState = props.extraData.administrativeDiv && row.city;
                          props.onUpdateItem && props.onUpdateItem(arrState,"city",row._id)
                          //  Stores.administrativeDivStore.updateAdministrativeDiv({
                          //    ...Stores.administrativeDivStore.administrativeDiv,
                          //    state: arrState? arrState.concat(state): [state] 
                          //  })
                           props.extraData.updateLocalCity({
                            ...props.extraData.localState,
                            city:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {row.city?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row.city?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row.city?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                props.extraData.updateAdministrativeDiv({
                                  ...props.extraData.administrativeDiv,
                                  city: finalArray,
                                })
                                props.onUpdateItem && props.onUpdateItem(finalArray,"city",row._id)
                              }}
                            >
                             {item}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
            </>
          ),
        },
        {
          dataField: "area",
          text: "Area",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.List
                space={2}
                direction="row"
                justify="center"
              >
                {row.area.map((item) => (
                  <div className="mb-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {}}
                    >
                      {`${item.area}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </LibraryComponents.Atoms.List>
            </>
          ),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        
                        placeholder={"Please Enter Area"}
                        value={row.area || ""}
                        onChange={(area) => {
                          props.onUpdateItem && props.onUpdateItem(area,column.dataField,row._id)
                        }}
                      />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const area = row.area
                        if (area === undefined) return alert("Please Enter Area")
                        if (area !== undefined) {
                          let arrState = props.extraData.administrativeDiv && row.area;
                          props.onUpdateItem && props.onUpdateItem(arrState,"area",row._id)
                          //  Stores.administrativeDivStore.updateAdministrativeDiv({
                          //    ...Stores.administrativeDivStore.administrativeDiv,
                          //    state: arrState? arrState.concat(state): [state] 
                          //  })
                           props.extraData.updateLocalArea({
                            ...props.extraData.localState,
                            area:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {row.area?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row.area?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row.area?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                props.extraData.updateAdministrativeDiv({
                                  ...props.extraData.administrativeDiv,
                                  area: finalArray,
                                })
                                props.onUpdateItem && props.onUpdateItem(finalArray,"area",row._id)
                              }}
                            >
                             {item}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
            </>
          ),
        },
        {
          dataField: "postalCode",
          text: "Postcode",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.List
                space={2}
                direction="row"
                justify="center"
              >
                {row.postalCode.map((item) => (
                  <div className="mb-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {}}
                    >
                      {`${item.postalCode}`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                ))}
              </LibraryComponents.Atoms.List>
            </>
          ),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Grid cols={2}>
                      <LibraryComponents.Atoms.Form.Input
                        
                        placeholder={"Please Enter postcode"}
                        value={row.postalCode || ""}
                        onChange={(postalCode) => {
                          props.onUpdateItem && props.onUpdateItem(postalCode,column.dataField,row._id)
                        }}
                      />
                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const postalCode = row.postalCode
                        if (postalCode === undefined) return alert("Please Enter PostalCode")
                        if (postalCode !== undefined) {
                          let arrState = props.extraData.administrativeDiv && row.postalCode;
                          props.onUpdateItem && props.onUpdateItem(arrState,"postalCode",row._id)
                          //  Stores.administrativeDivStore.updateAdministrativeDiv({
                          //    ...Stores.administrativeDivStore.administrativeDiv,
                          //    state: arrState? arrState.concat(state): [state] 
                          //  })
                           props.extraData.updateLocalPostalCode({
                            ...props.extraData.localState,
                            postalCode:''
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                </LibraryComponents.Atoms.Grid>
                <br/>
                <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    <div>
                      {row.postalCode?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row.postalCode?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row.postalCode?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ]
                                props.extraData.updateAdministrativeDiv({
                                  ...props.extraData.administrativeDiv,
                                  postalCode: finalArray,
                                })
                                props.onUpdateItem && props.onUpdateItem(finalArray,"postalCode",row._id)
                              }}
                            >
                             {item}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
            </>
          ),

        },
        {
          dataField: "sbu",
          text: "SBU",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Form.InputWrapper
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 
                       rounded-md`}
                      onChange={(e) => {
                        const sbu = e.target.value
                        props.onUpdateItem && props.onUpdateItem(sbu,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SBU"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "zone",
          text: "Zone",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Form.InputWrapper
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const zone = e.target.value
                        props.onUpdateItem && props.onUpdateItem(zone,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "ZONE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "environment",
          text: "Environment",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={row.environment}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                    
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "opration",
          text: "Action",
          editable: false,
          csvExport: false,
          hidden: !props.isDelete,
          formatter: (cellContent, row) => (
            <>
             <div className="flex flex-row">
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete" >
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "Delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </div>
            </>
          ),
        },
      ]}
      isEditModify={props.isEditModify}
      isSelectRow={true}
      fileName="Methods"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
      onPageSizeChange={(page,size)=>{
        props.onPageSizeChange && props.onPageSizeChange(page,size)
      }}
    />
  )
})
