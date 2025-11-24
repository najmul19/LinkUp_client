import { Outlet } from "react-router-dom";

import Navbar from "../components/Shared/Navbar/Navbar";

export default function RootLayouts() {
  return (
    <div className="">
        <Navbar/>
      <Outlet />
    </div>
  );
}
