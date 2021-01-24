import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import * as Clients from "@lp/library/clients";



const Dashbord = observer(() => {
  

 

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Dashboard" />
      </LibraryComponents.Header>
     
    </>
  );
});

export default Dashbord;
