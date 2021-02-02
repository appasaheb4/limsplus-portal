import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Contexts from "@lp/library/stores"
import * as Services from "../services"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Checkbox from "@material-ui/core/Checkbox"
import * as Router from "@lp/routes"

const UserMapping = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore)
  const [deleteItem, setDeleteItem] = useState<any>({})
  const userList: any = rootStore.userStore.userList || []
  const fullName = userList[0].fullName
  const [value, setValue] = React.useState<string | null>(fullName)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>()
  const [selectedPages, setSelectedPages] = useState<any>()
  const [selectedUserPermision, setSelectedUserPermission] = useState<any>()

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="User Mapping"
          subTitle="Add, Edit & Delete User Roles"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedUserInfo(newValue)
                  setValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  console.log({ newInputValue })
                  setInputValue(newInputValue)
                }}
                id="fullName"
                options={userList}
                getOptionLabel={(option: any) => option.fullName}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" variant="outlined" />
                )}
              />
              <LibraryComponents.Form.Input
                label="User Id"
                id="userId"
                placeholder="User Id"
                disabled={true}
                value={selectedUserInfo?.userId}
              />
              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                disabled={true}
                value={selectedUserInfo?.role}
              />
            </LibraryComponents.List>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <Autocomplete
                multiple
                id="pages"
                options={Router.UserPermission}
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  setSelectedPages(newValue)
                }}
                groupBy={(option) => option.path}
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Pages"
                    placeholder="Pages"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="userPermision"
                options={[
                  { title: "Add" },
                  { title: "Delete" },
                  { title: "Edit/Update" },
                ]}
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  setSelectedUserPermission(newValue)
                }}
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="User Permission"
                    placeholder="User Permission"
                  />
                )}
              />
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <br />

          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                if (
                  selectedUserInfo !== undefined &&
                  selectedPages !== undefined &&
                  selectedUserPermision !== undefined
                ) {
                  Services.addUserMapping({
                    user: selectedUserInfo,
                    pages: selectedPages,
                    userPermissions: selectedUserPermision,
                  }).then((res) => {
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.ToastsStore.success(`Created.`)
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000)
                    } else {
                      alert("Not added data.")
                    }
                  })
                }
              }}
            >
              Save
            </LibraryComponents.Button>
            <LibraryComponents.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                rootStore.userStore.clear()
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <table className="border-separate border border-green-800 w-full">
            <thead>
              <tr>
                <th className="border border-green-600">Title</th>
                <th className="border border-green-600">Image</th>
                <th className="border border-green-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rootStore.bannerStore.listBanner?.map((item, key) => (
                <tr key={key}>
                  <td className="border border-green-600 text-center">
                    {item.title}
                  </td>
                  <td className="border border-green-600">
                    <img src={item.image} className="w-60 h-40 ml-6" alt="logo" />
                  </td>

                  <td className="border border-green-600 text-center p-1">
                    <LibraryComponents.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Icons.Remove}
                      onClick={() => {
                        setDeleteItem({
                          show: true,
                          id: item._id,
                          title: "Are you sure?",
                          body: `Delete ${item.title}!`,
                        })
                      }}
                    >
                      Delete
                    </LibraryComponents.Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            // Services.deleteBanner(deleteItem.id).then((res: any) => {
            //   console.log({ res })
            //   if (res.status) {
            //     LibraryComponents.ToastsStore.success(`Banner deleted.`)
            //     setDeleteItem({ show: false })
            //     rootStore.bannerStore.fetchListBanner()
            //   }
            // })
          }}
        />
      </div>
    </>
  )
})

export default UserMapping
