import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import * as Models from "../models";
import * as Utils from "@lp/library/utils";
import moment from "moment";
import * as Features from "@lp/features";
import Contexts from "@lp/library/stores";

import * as Services from "../services";

const Users = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore);
  const [errors, setErrors] = useState<Models.Users>();
  const [deleteUser, setDeleteUser] = useState<any>({});

  useEffect(() => {
    rootStore.userStore.loadUser();
  }, []);

  return (
    <>
      <div className=" mx-auto  p-4  flex-wrap">
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
                value={rootStore.userStore.user.userId}
                onChange={(userId) => {
                  setErrors({
                    ...errors,
                    userId: Utils.validate.single(
                      userId,
                      Utils.constraintsUser.userId
                    ),
                  });
                  rootStore.userStore.updateUser({
                    ...rootStore.userStore.user,
                    userId,
                  });
                }}
                onBlur={(userId) => {
                  Services.checkExitsUserId(userId).then((res) => {
                    if (res)
                      if (res.length > 0)
                        rootStore.userStore.setExitsUserId(true);
                      else rootStore.userStore.setExitsUserId(false);
                  });
                }}
              />
              {errors?.userId && (
                <span className="text-red-600 font-medium relative">
                  {errors.userId}
                </span>
              )}
              {rootStore.userStore.checkExitsUserId && (
                <span className="text-red-600 font-medium relative">
                  UserId already exits. Please use other userid.
                </span>
              )}

              <LibraryComponents.Form.InputWrapper label="Lab" id="lab">
                <select
                  name="lab"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value;
                    setErrors({
                      ...errors,
                      lab: Utils.validate.single(
                        lab,
                        Utils.constraintsUser.lab
                      ),
                    });
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
                      lab,
                    });
                  }}
                >
                  <option selected>Select</option>
                  {rootStore.labStore.listLabs.map(
                    (item: any, index: number) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>
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
                value={rootStore.userStore.user.password}
                onChange={(password) => {
                  setErrors({
                    ...errors,
                    password: Utils.validate.single(
                      password,
                      Utils.constraintsUser.password
                    ),
                  });
                  rootStore.userStore.updateUser({
                    ...rootStore.userStore.user,
                    password,
                  });
                }}
              />
              {errors?.password && (
                <span className="text-red-600 font-medium relative">
                  {errors.password}
                </span>
              )}
              <LibraryComponents.Form.InputWrapper
                label="Deginisation"
                id="deginisation"
              >
                <select
                  name="deginisation"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const deginisation = e.target.value;
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
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
                      deginisation,
                    });
                  }}
                >
                  <option selected>Select</option>
                  {rootStore.deginisationStore.listDeginisation.map(
                    (item: any, index: number) => (
                      <option key={item.description} value={item.description}>
                        {item.description}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>
              {errors?.deginisation && (
                <span className="text-red-600 font-medium relative">
                  {errors.deginisation}
                </span>
              )}
              <LibraryComponents.Form.InputRadio
                label="Status"
                name="status"
                values={["Active", "Retired", "Disable"]}
                value={rootStore.userStore.user.status}
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
                  rootStore.userStore.updateUser({
                    ...rootStore.userStore.user,
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
                value={rootStore.userStore.user.fullName}
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
                  rootStore.userStore.updateUser({
                    ...rootStore.userStore.user,
                    fullName,
                  });
                }}
              />
              {errors?.fullName && (
                <span className="text-red-600 font-medium relative">
                  {errors.fullName}
                </span>
              )}

              <LibraryComponents.Form.InputWrapper
                label="Department"
                id="department"
              >
                <select
                  name="department"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value;
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
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
                      department,
                    });
                  }}
                >
                  <option selected>Select</option>
                  {rootStore.departmentStore.listDepartment.map(
                    (item: any, index: number) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>
              {errors?.department && (
                <span className="text-red-600 font-medium relative">
                  {errors.department}
                </span>
              )}

              <LibraryComponents.List space={3} direction="row">
                <LibraryComponents.Form.InputDate
                  label="Exipre Date"
                  id="exipreData"
                  value={moment(rootStore.userStore.user.exipreDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={(e: any) => {
                    let date = new Date(e.target.value);
                    date = new Date(
                      moment(date)
                        .add(rootStore.userStore.user.exipreDays, "days")
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
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
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
                  value={rootStore.userStore.user.exipreDays}
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
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
                      exipreDays,
                    });
                  }}
                />

                <LibraryComponents.Button
                  size="small"
                  type="solid"
                  onClick={() => {
                    const date = new Date(
                      moment(rootStore.userStore.user.exipreDate)
                        .add(rootStore.userStore.user.exipreDays, "days")
                        .format("YYYY-MM-DD HH:mm:ss")
                    );
                    const exipreDate = new Date(
                      moment(date).format("YYYY-MM-DD HH:mm:ss")
                    );
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
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

              <LibraryComponents.Form.InputWrapper label="Role" id="role">
                <select
                  name="role"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const role = e.target.value;
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
                    rootStore.userStore.updateUser({
                      ...rootStore.userStore.user,
                      role,
                    });
                  }}
                >
                  <option selected>Select</option>
                  {rootStore.roleStore.listRole.map(
                    (item: any, index: number) => (
                      <option key={item.description} value={item.description}>
                        {item.description}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>
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
                  Utils.validate(
                    rootStore.userStore.user,
                    Utils.constraintsLogin
                  ) === undefined &&
                  !rootStore.userStore.checkExitsUserId
                ) {
                  rootStore.setProcessLoading(true);
                  Features.Users.Pipes.addUser(rootStore.userStore).then(
                    (res) => {
                      rootStore.setProcessLoading(false);
                      LibraryComponents.ToastsStore.success(`User created.`);
                      rootStore.userStore.clear();
                      rootStore.userStore.loadUser();
                    }
                  );
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
                rootStore.userStore.clear();
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
              {rootStore.userStore.userList?.map((item, index) => (
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
            Services.deleteUser(deleteUser.id).then((res: any) => {
              if (res.status) {
                LibraryComponents.ToastsStore.success(`User deleted.`);
                setDeleteUser({ show: false });
                rootStore.userStore.loadUser();
              }
            });
          }}
        />
      </div>
    </>
  );
});

export default Users;
