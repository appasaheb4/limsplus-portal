import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";
import * as Models from "@lp/features/users/models";
import * as Utils from "@lp/library/utils";
import * as Clients from "@lp/library/clients";
import * as Services from "@lp/features/users/services";

const Dashbord = observer(() => {
  const [changePassword, setChangePassword] = useState(false);
  let userStore = useContext(UsersContext);
  Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
    if (isLogin.changePass !== true) setChangePassword(true);
  });
  return (
    <>
      <div className=" mx-auto  p-4  flex-wrap   ">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <h1 className="text-2xl text-blue-800 leading-tight">Dashborad</h1>
        </div>
      </div>
      {changePassword && (
        <LibraryComponents.Modal.ModalChangePassword
          click={() => {
            Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
              Clients.storageClient.setItem("isLogin", {
                ...isLogin,
                changePass: true,
              });
              const body = Object.assign(isLogin, userStore.changePassword);
              Services.Users.changePassword(body).then((res) => {
                if (res) {
                  LibraryComponents.ToastsStore.success(`Password changed!`);
                } else {
                  LibraryComponents.ToastsStore.error(
                    `Please enter correct old password`
                  );
                }
              });
            });
            setChangePassword(false);
          }}
          close={() => {
            console.log("close");
          }}
        />
      )}
    </>
  );
});

export default Dashbord;
