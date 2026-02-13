"use client";
import { useRouter } from "next/navigation";

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
      <button onClick={gotoHomePage}>HomePage</button>
      <button onClick={gotoSignUp}>Go to Sign Up</button>
    </>
  );
}
