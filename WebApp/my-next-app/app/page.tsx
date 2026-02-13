"use client";
import { useRouter } from "next/navigation";

export default function NavigationButtons() {
  const router = useRouter();

  const gotoSignUp = () => {
    router.push("/SignUp");
  };

  return (
    <>
      <button onClick={gotoSignUp}>Go to Sign Up</button>
    </>
  );
}
