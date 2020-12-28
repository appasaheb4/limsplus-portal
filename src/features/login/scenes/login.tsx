import React, { useEffect } from "react";
import { observer } from "mobx-react";


const Login = observer(() => {
 
  return (
    <>
      <div className="max-w-xl mx-auto  flex-wrap p-4  bg-gray-100  rounded-lg shadow-xl">
        <h1 className="text-2xl text-blue-800 leading-tight text-center">
          LIMS PLUS
        </h1>
        <p className="text-base text-gray-700">Building apps together</p>
      </div>
    </>
  );
});

export default Login;
