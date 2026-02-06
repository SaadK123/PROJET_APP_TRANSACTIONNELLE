"use client";
import { useRouter } from "next/navigation";

export default function NavigationButtons() {
  const router = useRouter();

  const gotoSignUp = () => {
    router.push("/SignUp");
  };

  const gotoSignUpTest = () => {
    router.push("/SignUpTest");
  };

  return (
    <>
      <button onClick={gotoSignUp}>Go to Sign Up</button>
      <button onClick={gotoSignUpTest}>Go to Sign Up Test</button>
    </>
  );
}
