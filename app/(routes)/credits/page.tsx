"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CreditPage() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    user && getUserCredits();
  }, [user]);

  const getUserCredits = async () => {
    const credits = await axios.get("/api/user?email=" + user?.email);
    setUserData(credits.data);
  };

  return (
    <div>
      <h2 className="font-bol text-2xl">Credits</h2>
      <div className="p-5 bg-slate-50 rounded-xl border flex justify-between items-center mt-6">
        <div>
          <h2 className="font-bold text-xl">My Credits:</h2>
          {userData?.credit && (
            <p className="text-lg text-muted-foreground">
              {" "}
              {userData?.credit} Credits lefts
            </p>
          )}
        </div>
        <Button>Buy More Credit</Button>
      </div>
    </div>
  );
}

export default CreditPage;
