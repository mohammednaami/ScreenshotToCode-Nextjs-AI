"use client";

import { useAuthContext } from "@/app/provider";
import { redirect } from "next/navigation";

export async function requireUser(){
    const { user } = useAuthContext();
    if (!user) {
      redirect("/");
    };

    return user;
}