"use client";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const gotoSignUp = () => {
    router.push("/SignUp");
  };
  return <button onClick={gotoSignUp}></button>;
}
