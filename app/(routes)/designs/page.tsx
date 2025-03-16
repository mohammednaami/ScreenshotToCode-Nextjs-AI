"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Record } from "@/app/(routes)/view-code/types";
import DesignCard from "./_components/DesignCard";
import { Loader2 } from "lucide-react";
import { requireUser } from "../utils/Auth";

async function DesignPage() {

  const user = await requireUser();
  const [screenshotList, setScreenshotList] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    user && getAllUserDesigns();
  }, [user]);

  const getAllUserDesigns = async () => {
    setLoading(true);
    const result = await axios.get(
      "/api/screenshot-to-code?email=" + user?.email
    );
    setLoading(false);
    setScreenshotList(result.data);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Screenshots & Codes</h2>
      {loading ? (
        <div>
          <h2 className="font-bold text-2xl text-center p-20 flex items-center justify-center bg-gray-100 h-[80vh] rounded-xl">
            <Loader2 className="animate-spin" /> Wait ...
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
          {screenshotList?.map((item: Record) => (
            <DesignCard key={item.uid} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DesignPage;
