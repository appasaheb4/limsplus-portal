import React, { useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";
import * as Models from "../models";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors: any) => {
  let valid = true;
  Object.values(errors).forEach(
    (val: any) => val.length > 0 && (valid = false)
  );
  return valid;
};

const Users = observer(() => {
  let usersStore = React.useContext(UsersContext);

  const [errors, setErrors] = useState<Models.Users>();

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log({ name, value });

    switch (name) {
      case "lab":
        setErrors({
          ...errors,
          lab:
            value.length < 5
              ? `${name} must be at least 5 characters long!`
              : "",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password:
            value.length < 8
              ? `${name} must be at least 8 characters long!`
              : "",
        });
        break;
      default:
        break;
    }
  };

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
                disabled={true}
                value={usersStore.user.userId}
              />
              <LibraryComponents.Form.Input
                label="Lab"
                name="lab"
                placeholder="Lab"
                value={usersStore.user.lab}
                onChange={(e: any) => {
                  handleChange(e);
                  usersStore.updateUser({
                    ...usersStore.user,
                    lab: e.target.value,
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
                onChange={(e) => {
                  handleChange(e);
                  usersStore.updateUser({
                    ...usersStore.user,
                    password: e.target.value,
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
                onChange={(e: any) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    deginisation: e.target.value,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Status"
                id="status"
                placeholder="Status"
                // value={usersStore.user.password}
                onChange={(e) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    password: e.target.value,
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
                onChange={(e) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    fullName: e.target.value,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Department"
                id="department"
                placeholder="Department"
                value={usersStore.user.department}
                onChange={(e) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    department: e.target.value,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                type="date"
                label="Exipre Date"
                id="exipreData"
                placeholder="Exipre Date"
                value={usersStore.user.exipreDate}
                onChange={(e) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    exipreDate: e.target.value,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                value={usersStore.user.role}
                onChange={(e) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    role: e.target.value,
                  });
                }}
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
                // rootStore.setProcessLoading(true);
                // Features.LoginOut.Pipes.User.onLogin(loginStore).then(
                //   (res) => {
                //     rootStore.setProcessLoading(false);
                //     if (res.length <= 0) {
                //       ToastsStore.error(
                //         "User not found. Please enter correct information!"
                //       );
                //     } else {
                //       ToastsStore.success(`Welcome ${res[0].userId}`);
                //       Clients.storageClient.setItem("isLogin", res[0]);
                //       navigate("/dashbord");
                //     }
                //   }
                // );
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
      </div>
    </>
  );
});

export default Users;
