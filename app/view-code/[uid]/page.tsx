"use client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Record {
  id: number;
  description: string;
  code: string;
  imageUrl: string;
  model: string;
  createdBy: string;
}
function ViewCode() {
  const { uid } = useParams();

  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    uid && getScreenshotInfo();
  }, [uid]);

  const getScreenshotInfo = async () => {
    setLoading(true);

    const result = await axios.get("/api/screenshot-to-code?uid=" + uid);
    console.log(result.data);
    const resp = result?.data;
    if (resp?.code === null) {
      GenerateCode(resp);
    }
    if (resp?.error) {
      console.log("No Record found");
    }
    setLoading(false);
  };

  const GenerateCode = async (resp: Record) => {
    setLoading(true);

    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: resp?.description,
        model: resp?.model,
        imageUrl: resp?.imageUrl,
      }),
    });
    if (!res.body) {
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      console.log(text);
    }
    setLoading(false);
  };

  return <div>
    {loading && <LoaderCircle className="animate-spin" />}
  </div>;
}

export default ViewCode;
