"use client";
import { useRouter } from "next/navigation";
import HomePage from "./HomePage/page";

export default function NavigationButtons() {
  const router = useRouter();

  const gotoHomePage = () =>{
    router.push("/HomePage")
  };

  const gotoSignUp = () => {
    router.push("/SignUp");
  };

  return (
    <> 
      <HomePage></HomePage>
    </>
  );
}

