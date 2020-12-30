import React, { useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";

const Users = observer(() => {
  let usersStore = React.useContext(UsersContext);

  console.log("user");
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
                //value={loginStore.inputLogin.userId}
                onChange={(userId) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   userId,
                  // });
                }}
              />
              <LibraryComponents.Form.Input
                label="Deginisation"
                id="deginisation"
                placeholder="Deginisation"
                // value={loginStore.inputLogin.password}
                onChange={(password) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   password,
                  // });
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
                // value={loginStore.inputLogin.lab}
                onChange={(lab) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   lab,
                  // });
                }}
              />
              <LibraryComponents.Form.Input
                label="Department"
                id="department"
                placeholder="Department"
                //value={loginStore.inputLogin.userId}
                onChange={(userId) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   userId,
                  // });
                }}
              />
              <LibraryComponents.Form.Input
                type="date"
                label="Exipre Date"
                id="exipreData"
                placeholder="Exipre Date"
                // value={loginStore.inputLogin.password}
                onChange={(password) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   password,
                  // });
                }}
              />
              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                //value={loginStore.inputLogin.userId}
                onChange={(userId) => {
                  // loginStore.updateInputUser({
                  //   ...loginStore.inputLogin,
                  //   userId,
                  // });
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
                // loginStore.clear();
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
