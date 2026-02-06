"use client"
import { useRouter } from "next/navigation";
export default function HomePage(){
    const router = useRouter();
    const gotosignup = () => {
    router.push("../page")
    }
    return (
        <div><button><h1>HELLO MF ITS COLE WORLD</h1></button>
        </div>
            
    );
    
}