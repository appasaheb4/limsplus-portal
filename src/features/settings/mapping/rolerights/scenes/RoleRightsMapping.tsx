/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"

const RoleRightsMapping = observer(() => {
  // const option = [{ title: "Add" }, { title: "Delete" }, { title: "Edit/Update" }]
  // const rootStore = React.useContext(Contexts.rootStore)
  // const [deleteItem, setDeleteItem] = useState<any>({})
  // const userList: any = rootStore.userStore.userList || []
  // const fullName = userList[0].fullName
  // const [value, setValue] = React.useState<string | null>(fullName)
  // const [inputValue, setInputValue] = React.useState("")
  // const [selectedUserInfo, setSelectedUserInfo] = useState<any>()

  // useEffect(() => {
  //   rootStore.roleRightsMappingStore.fetchRoleMappingList()
  // }, [])

  return (
    <></>
    // <>
    //   <LibraryComponents.Atoms.Header>
    //     <LibraryComponents.Atoms.PageHeading
    //       title="Role Rights Mapping"
    //       subTitle="Add, Edit & Delete"
    //     />
    //   </LibraryComponents.Atoms.Header>
    //   <div className=" mx-auto  p-4  flex-wrap">
    //     <div className="m-1 p-2 rounded-lg shadow-xl">
    //       <LibraryComponents.Atoms.Grid cols={2}>
    //         <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
    //           <Autocomplete
    //             value={value}
    //             onChange={(event: any, newValue: string | null) => {
    //               setSelectedUserInfo(newValue)
    //               setValue(newValue)
    //             }}
    //             inputValue={inputValue}
    //             onInputChange={(event, newInputValue) => {
    //               setInputValue(newInputValue)
    //             }}
    //             id="fullName"
    //             options={userList}
    //             getOptionLabel={(option: any) => option.fullName}
    //             renderInput={(params) => (
    //               <TextField {...params} label="Full Name" variant="outlined" />
    //             )}
    //           />
    //           <LibraryComponents.Atoms.Form.Input
    //             label="User Id"
    //             id="userId"
    //             placeholder="User Id"
    //             disabled={true}
    //             value={selectedUserInfo?.userId}
    //           />
    //           <LibraryComponents.Atoms.Form.Input
    //             label="Role"
    //             id="role"
    //             placeholder="Role"
    //             disabled={true}
    //             value={selectedUserInfo?.role}
    //           />
    //         </LibraryComponents.Atoms.List>
    //         <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
    //           <Autocomplete
    //             multiple
    //             id="rols"
    //             options={RoleStore.roleStore.listRole}
    //             disableCloseOnSelect
    //             onChange={(event, newValue) => {
    //               rootStore.roleRightsMappingStore.updateRole(newValue)
    //             }}
    //             getOptionLabel={(option) => option.description || ""}
    //             renderOption={(option, { selected }) => (
    //               <React.Fragment>
    //                 <Checkbox style={{ marginRight: 8 }} checked={selected} />
    //                 {option.description}
    //               </React.Fragment>
    //             )}
    //             renderInput={(params) => (
    //               <TextField
    //                 {...params}
    //                 variant="outlined"
    //                 label="Roles"
    //                 placeholder="Roles"
    //               />
    //             )}
    //           />
    //         </LibraryComponents.Atoms.List>
    //       </LibraryComponents.Atoms.Grid>
    //       <br />
    //       <LibraryComponents.Atoms.List direction="row" space={3} align="center">
    //         <LibraryComponents.Atoms.Buttons.Button
    //           size="medium"
    //           type="solid"
    //           icon={LibraryComponents.Atoms.Icon.Save}
    //           onClick={() => {
    //             if (
    //               selectedUserInfo !== undefined &&
    //               rootStore.roleRightsMappingStore.arrSelectedRole !== undefined
    //             ) {
    //               Services.addRoleMapping({
    //                 user: selectedUserInfo,
    //                 roles: rootStore.roleRightsMappingStore.arrSelectedRole,
    //               }).then((res) => {
    //                 if (res.status === LibraryModels.StatusCode.CREATED) {
    //                   LibraryComponents.Atoms.ToastsStore.success(`Created.`)
    //                   setTimeout(() => {
    //                     window.location.reload()
    //                   }, 2000)
    //                 } else {
    //                   alert("Not added data.")
    //                 }
    //               })
    //             }
    //           }}
    //         >
    //           Save
    //         </LibraryComponents.Atoms.Buttons.Button>
    //         <LibraryComponents.Atoms.Buttons.Button
    //           size="medium"
    //           type="outline"
    //           icon={LibraryComponents.Atoms.Icon.Remove}
    //           onClick={() => {
    //             window.location.reload()
    //           }}
    //         >
    //           Clear
    //         </LibraryComponents.Atoms.Buttons.Button>
    //       </LibraryComponents.Atoms.List>
    //     </div>
    //     <br />
    //     <div className="m-1 p-2 rounded-lg shadow-xl">
    //       <ToolkitProvider
    //         keyField="id"
    //         data={rootStore.roleRightsMappingStore.roleMappingList || []}
    //         columns={[
    //           {
    //             dataField: "user.fullName",
    //             text: "User name",
    //             sort: true,
    //             editable: false,
    //           },
    //           {
    //             dataField: "user.userId",
    //             text: "User Id",
    //           },
    //           {
    //             dataField: "user.role",
    //             text: "Role",
    //           },
    //           {
    //             dataField: "roles",
    //             text: "Roles",
    //             style: { width: 200 },
    //             csvFormatter: (cell, row, rowIndex) =>
    //               `${row.roles.map((item) => item.description)}`,
    //             formatter: (cellContent, row) => (
    //               <>
    //                 {/* <Autocomplete
    //                   disabled
    //                   multiple
    //                   id="pages"
    //                   options={row.pages}
    //                   disableCloseOnSelect
    //                   onChange={(event, newValue) => {
    //                     rootStore.userMappingStore.updatePages(newValue)
    //                   }}
    //                   groupBy={(option: any) => option.path}
    //                   getOptionLabel={(option) => option.name}
    //                   renderOption={(option, { selected }) => (
    //                     <React.Fragment>
    //                       <Checkbox style={{ marginRight: 8 }} checked={selected} />
    //                       {option.name}
    //                     </React.Fragment>
    //                   )}
    //                   renderInput={(params) => (
    //                     <TextField
    //                       {...params}
    //                       variant="outlined"
    //                       label="Pages"
    //                       placeholder="Pages"
    //                     />
    //                   )}
    //                 />*/}
    //                 <ul>
    //                   {row.roles.map((item) => (
    //                     <li>{item.description}</li>
    //                   ))}
    //                 </ul>
    //               </>
    //             ),
    //           },
    //           {
    //             dataField: "opration",
    //             text: "Delete",
    //             editable: false,
    //             csvExport: false,
    //             formatter: (cellContent, row) => (
    //               <>
    //                 <LibraryComponents.Atoms.Buttons.Button
    //                   size="small"
    //                   type="outline"
    //                   icon={LibraryComponents.Atoms.Icon.Remove}
    //                   onClick={() => {
    //                     setDeleteItem({
    //                       show: true,
    //                       id: row._id,
    //                       title: "Are you sure?",
    //                       body: `Delete this  mapping!`,
    //                     })
    //                   }}
    //                 >
    //                   Delete
    //                 </LibraryComponents.Atoms.Buttons.Button>
    //               </>
    //             ),
    //           },
    //         ]}
    //         search
    //         exportCSV={{
    //           fileName: `usersMapping_${moment(new Date()).format(
    //             "YYYY-MM-DD HH:mm"
    //           )}.csv`,
    //           noAutoBOM: false,
    //           blobType: "text/csv;charset=ansi",
    //         }}
    //       >
    //         {(props) => (
    //           <div>
    //             <SearchBar {...props.searchProps} />
    //             <ClearSearchButton
    //               className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
    //               {...props.searchProps}
    //             />
    //             <ExportCSVButton
    //               className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
    //               {...props.csvProps}
    //             >
    //               Export CSV!!
    //             </ExportCSVButton>
    //             <hr />
    //             <BootstrapTable
    //               {...props.baseProps}
    //               noDataIndication="Table is Empty"
    //               hover
    //             />
    //           </div>
    //         )}
    //       </ToolkitProvider>
    //     </div>
    //     <LibraryComponents.Molecules.ModalConfirm
    //       {...deleteItem}
    //       click={() => {
    //         Services.deleteRoleMapping(deleteItem.id).then((res: any) => {
    //           if (res.status === LibraryModels.StatusCode.SUCCESS) {
    //             LibraryComponents.Atoms.ToastsStore.success(`Deleted.`)
    //             setDeleteItem({ show: false })
    //             rootStore.roleRightsMappingStore.fetchRoleMappingList()
    //           }
    //         })
    //       }}
    //     />
    //   </div>
    // </>
  )
})

export default RoleRightsMapping
