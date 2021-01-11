import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";
import * as Models from "../models";
import * as Utils from "@lp/library/utils";
import moment from "moment";
import * as Features from "@lp/features";
import RootStoreContext from "@lp/library/stores";
import * as Services from "../services";

const LabMapping = observer(() => {
  // const rootStore = useContext(RootStoreContext);
  // let usersStore = React.useContext(UsersContext);
  // const [errors, setErrors] = useState<Models.Users>();
  // const [deleteUser, setDeleteUser] = useState<any>({});

  // useEffect(() => {
  //   usersStore.loadUser();
  // }, []);

  return (
    <>
      {/* <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <h1 className="text-2xl mb-4 text-blue-800 leading-tight">Users</h1>
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.Input
                label="User Id"
                id="userId"
                placeholder="User Id"
                disabled={true}
                value={usersStore.user.userId}
              />
              <LibraryComponents.Form.Input
                label="Lab"
                name="lab"
                placeholder="Lab"
                value={usersStore.user.lab}
                onChange={(lab) => {
                  setErrors({
                    ...errors,
                    lab: Utils.validate.single(lab, Utils.constraintsUser.lab),
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    lab,
                  });
                }}
              />
              {errors?.lab && (
                <span className="text-red-600 font-medium relative">
                  {errors.lab}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                value={usersStore.user.password}
                onChange={(password) => {
                  setErrors({
                    ...errors,
                    password: Utils.validate.single(
                      password,
                      Utils.constraintsUser.password
                    ),
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    password,
                  });
                }}
              />
              {errors?.password && (
                <span className="text-red-600 font-medium relative">
                  {errors.password}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Deginisation"
                id="deginisation"
                placeholder="Deginisation"
                value={usersStore.user.deginisation}
                onChange={(deginisation) => {
                  setErrors({
                    ...errors,
                    deginisation:
                      deginisation !== ""
                        ? Utils.validate.single(
                            deginisation,
                            Utils.constraintsUser.deginisation
                          )
                        : "Deginisation requried",
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    deginisation,
                  });
                }}
              />
              {errors?.deginisation && (
                <span className="text-red-600 font-medium relative">
                  {errors.deginisation}
                </span>
              )}
              <LibraryComponents.Form.InputRadio
                label="Status"
                name="status"
                values={["Active", "Retired", "Disable"]}
                value={usersStore.user.status}
                onChange={(status) => {
                  setErrors({
                    ...errors,
                    status:
                      status !== ""
                        ? Utils.validate.single(
                            status,
                            Utils.constraintsUser.status
                          )
                        : "Status requried",
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    status,
                  });
                }}
              />
            </LibraryComponents.List>
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.Input
                label="Full Name"
                id="fullName"
                placeholder="Full Name"
                value={usersStore.user.fullName}
                onChange={(fullName) => {
                  setErrors({
                    ...errors,
                    fullName:
                      fullName !== ""
                        ? Utils.validate.single(
                            fullName,
                            Utils.constraintsUser.fullName
                          )
                        : "Full Name required!",
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    fullName,
                  });
                }}
              />
              {errors?.fullName && (
                <span className="text-red-600 font-medium relative">
                  {errors.fullName}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Department"
                id="department"
                placeholder="Department"
                value={usersStore.user.department}
                onChange={(department) => {
                  setErrors({
                    ...errors,
                    department:
                      department !== ""
                        ? Utils.validate.single(
                            department,
                            Utils.constraintsUser.department
                          )
                        : "Department required!",
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    department,
                  });
                }}
              />
              {errors?.department && (
                <span className="text-red-600 font-medium relative">
                  {errors.department}
                </span>
              )}

              <LibraryComponents.List space={3} direction="row">
                <LibraryComponents.Form.InputDate
                  label="Exipre Date"
                  id="exipreData"
                  value={moment(usersStore.user.exipreDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={(e: any) => {
                    let date = new Date(e.target.value);
                    date = new Date(
                      moment(date)
                        .add(usersStore.user.exipreDays, "days")
                        .format("YYYY-MM-DD HH:mm:ss")
                    );
                    const formatDate = moment(date).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    setErrors({
                      ...errors,
                      exipreDate: Utils.validate.single(
                        formatDate,
                        Utils.constraintsUser.exipreDate
                      ),
                    });
                    usersStore.updateUser({
                      ...usersStore.user,
                      exipreDate: new Date(formatDate),
                    });
                  }}
                />
                {errors?.exipreDate && (
                  <span className="text-red-600 font-medium relative">
                    {errors.exipreDate}
                  </span>
                )}

                <LibraryComponents.Form.Input
                  type="number"
                  label="Exipre Days"
                  id="exipreDays"
                  placeholder="Exipre Days"
                  value={usersStore.user.exipreDays}
                  onChange={(exipreDays) => {
                    setErrors({
                      ...errors,
                      exipreDays:
                        exipreDays !== ""
                          ? Utils.validate.single(
                              exipreDays,
                              Utils.constraintsUser.exipreDays
                            )
                          : "Exipre Days required!",
                    });
                    usersStore.updateUser({
                      ...usersStore.user,
                      exipreDays,
                    });
                  }}
                />

                <LibraryComponents.Button
                  size="small"
                  type="solid"
                  onClick={() => {
                    const date = new Date(
                      moment(usersStore.user.exipreDate)
                        .add(usersStore.user.exipreDays, "days")
                        .format("YYYY-MM-DD HH:mm:ss")
                    );
                    const exipreDate = new Date(
                      moment(date).format("YYYY-MM-DD HH:mm:ss")
                    );
                    usersStore.updateUser({
                      ...usersStore.user,
                      exipreDate,
                    });
                  }}
                >
                  Apply Days
                </LibraryComponents.Button>
                {errors?.exipreDays && (
                  <span className="text-red-600 font-medium relative">
                    {errors.exipreDays}
                  </span>
                )}
              </LibraryComponents.List>

              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                value={usersStore.user.role}
                onChange={(role) => {
                  setErrors({
                    ...errors,
                    role:
                      role !== ""
                        ? Utils.validate.single(
                            role,
                            Utils.constraintsUser.role
                          )
                        : "Role required!",
                  });
                  usersStore.updateUser({
                    ...usersStore.user,
                    role,
                  });
                }}
              />
              {errors?.role && (
                <span className="text-red-600 font-medium relative">
                  {errors.role}
                </span>
              )}
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
                  Utils.validate(usersStore.user, Utils.constraintsLogin) ===
                  undefined
                ) {
                  rootStore.setProcessLoading(true);
                  Features.Users.Pipes.User.addUser(usersStore).then((res) => {
                    rootStore.setProcessLoading(false);
                    LibraryComponents.ToastsStore.success(`User created.`);
                    usersStore.clear();
                    usersStore.loadUser();
                  });
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  );
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
                usersStore.clear();
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
                <th className="border border-green-600">User Id</th>
                <th className="border border-green-600">Lab</th>
                <th className="border border-green-600">Full Name</th>
                <th className="border border-green-600">Department</th>
                <th className="border border-green-600">Deginisation</th>
                <th className="border border-green-600">Role</th>
                <th className="border border-green-600">Exipre Date</th>
                <th className="border border-green-600">Status</th>
                <th className="border border-green-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {usersStore.userList?.map((item, index) => (
                <tr>
                  <td className="border border-green-600 text-center">
                    {item.userId}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.lab}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.fullName}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.department}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.deginisation}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.role}
                  </td>
                  <td className="border border-green-600 text-center">
                    {moment(item.exipreDate).format("YYYY-MM-DD")}
                  </td>
                  <td className="border border-green-600 text-center">
                    {item.status}
                  </td>
                  <td className="border border-green-600 text-center p-1">
                    <LibraryComponents.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Icons.Remove}
                      onClick={() => {
                        setDeleteUser({
                          show: true,
                          id: item._id,
                          title: "Are you sure?",
                          body: `Delete ${item.fullName} user!`,
                        });
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
          {...deleteUser}
          click={() => {
            Services.Users.deleteUser(deleteUser.id).then((res: any) => {
              if (res.status) {
                LibraryComponents.ToastsStore.success(`User deleted.`);
                setDeleteUser({ show: false });
                usersStore.loadUser();
              }
            });
          }}
        />
      </div> */}
    </>
  );
});

export default LabMapping;
