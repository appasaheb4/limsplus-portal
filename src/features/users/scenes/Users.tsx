import React, { useEffect } from "react";
import { observer } from "mobx-react";

const Users = observer(() => {
  return (
    <>
      <div className=" mx-auto  p-4  flex-wrap   ">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <h1 className="text-2xl text-blue-800 leading-tight">Users</h1>
        </div>
      </div>
    </>
  );
});

export default Users;
