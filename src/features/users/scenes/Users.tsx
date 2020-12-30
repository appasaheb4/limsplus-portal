import React, { useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";

const Users = observer(() => {
  let usersStore = React.useContext(UsersContext);

  const [fields, setFields] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleValidation = () => {
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      setErrors({ name: "Cannot be empty" });
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setErrors({ name: "Only letters" });
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      setErrors({ email: "Cannot be empty" });
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        setErrors({ email: "Email is not valid" });
      }
    }
    return formIsValid;
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
                id="lab"
                placeholder="Lab"
                value={usersStore.user.lab}
                onChange={(lab) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    lab,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                value={usersStore.user.password}
                onChange={(password) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    password,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Deginisation"
                id="deginisation"
                placeholder="Deginisation"
                value={usersStore.user.deginisation}
                onChange={(deginisation) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    deginisation,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Status"
                id="status"
                placeholder="Status"
                // value={loginStore.inputLogin.password}
                onChange={(password) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   password,
                  // });
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
                  usersStore.updateUser({
                    ...usersStore.user,
                    fullName,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Department"
                id="department"
                placeholder="Department"
                value={usersStore.user.department}
                onChange={(department) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    department,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                type="date"
                label="Exipre Date"
                id="exipreData"
                placeholder="Exipre Date"
                value={usersStore.user.exipreDate}
                onChange={(exipreDate) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    exipreDate,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                value={usersStore.user.role}
                onChange={(role) => {
                  usersStore.updateUser({
                    ...usersStore.user,
                    role,
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
