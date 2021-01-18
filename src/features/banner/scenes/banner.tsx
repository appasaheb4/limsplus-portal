import React, { useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import * as Models from "../models";
import * as Utils from "@lp/library/utils";
import moment from "moment";
import * as Features from "@lp/features";
import Contexts from "@lp/library/stores";
import * as Services from "../services";

const Banner = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore);
  const [errors, setErrors] = useState<Models.IBanner>();

  return (
    <>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <h1 className="text-2xl mb-4 text-blue-800 leading-tight">Banner</h1>
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.Input
                label="Title"
                id="title"
                placeholder="Title"
                value={rootStore.bannerStore.banner?.title}
                onChange={(title) => {
                  rootStore.bannerStore.updateBanner({
                    ...rootStore.bannerStore.banner,
                    title,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                type="file"
                label="File"
                id="file"
                placeholder="File"
                value={rootStore.bannerStore.banner?.imagePath}
                onChange={(imagePath) => {
                  rootStore.bannerStore.updateBanner({
                    ...rootStore.bannerStore.banner,
                    imagePath,
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
                rootStore.setProcessLoading(true);
                Services.addBanner(rootStore.bannerStore.banner).then((res) => {
                  console.log({ res });
                });
                // Features.Banner.(rootStore.userStore).then(
                //   (res) => {
                //     rootStore.setProcessLoading(false);
                //     LibraryComponents.ToastsStore.success(`User created.`);
                //     rootStore.userStore.clear();
                //     rootStore.userStore.loadUser();
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
                <th className="border border-green-600">Title</th>
                <th className="border border-green-600">Image</th>
                <th className="border border-green-600">Delete</th>
              </tr>
            </thead>
            {/* <tbody>
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
            </tbody> */}
          </table>
        </div>
        {/* <LibraryComponents.Modal.ModalConfirm
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
        /> */}
      </div>
    </>
  );
});

export default Banner;
