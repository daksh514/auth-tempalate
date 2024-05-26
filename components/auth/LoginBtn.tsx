"use client";

import React from "react";

import { useRouter } from "next/navigation";

interface LogInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton=({ children, mode="redirect", asChild }: LogInButtonProps)=> {

    const router = useRouter();

    const onClick = ()=> {
        router.push('/auth/login');
    }

    if(mode==="modal"){
        return(
            <span>
                TODO: Implement modal
            </span>
        )
    }
  return (
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
  )
};
