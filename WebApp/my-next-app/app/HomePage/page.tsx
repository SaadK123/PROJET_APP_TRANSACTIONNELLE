"use client"
import { useRouter } from "next/navigation";
export default function HomePage(){
    const router = useRouter();
    const gotosignup = () => {
    router.push("../page")
    }
    return (
        <div className="container-fluid ">
      <div className="row bg-white">
        <div className="col-8 p-3"></div>
        <div className="col-2 ps-3 pe-3 pt-2 pb-2 m-2">
          <button className="p-2 text-white bg-dark" type="button">
            Home
          </button>
          <button
            className="col-4 ps-3 pe-3 pt-2 pb-2 m-2 text-white bg-dark"
            type="button"
          >
            Reports
          </button>
          <button
            className="ps-3 pe-3 pt-2 pb-2 m-2 text-white bg-primary"
            type="button"
          >
            New
          </button>
        </div>
      </div>
      </div>
    );
    
}