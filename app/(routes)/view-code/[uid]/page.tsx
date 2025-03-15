"use client";
import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectionsDetail from "../_components/SelectionsDetail";
import CodeEditor from "../_components/CodeEditor";
import { Record } from "../types";
import { Loader2 } from "lucide-react";

function ViewCode() {
  const { uid } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<Record>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      uid && getScreenshotInfo();
    }
  }, [uid]);

  const getScreenshotInfo = async (regen = false) => {
    setIsReady(false);
    setCodeResp("");
    setLoading(true);

    const result = await axios.get("/api/screenshot-to-code?uid=" + uid);
    console.log(result.data);
    const resp = result?.data;
    setRecord(result.data);
    if (resp?.code === null || regen) {
      GenerateCode(resp);
    }else {
      setCodeResp(resp?.code?.resp);
      setLoading(false);
      setIsReady(true);
  }
    if (resp?.error) {
      console.log("No Record found");
    }

    // setLoading(false);
  };

  const GenerateCode = async (resp: Record) => {
    setLoading(true);

    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: resp?.description + " " + Constants.x,
        model: resp?.model,
        imageUrl: resp?.imageUrl,
      }),
    });
    if (!res.body) {
      return;
    }
    setLoading(false);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder
        .decode(value)
        .replace("```jsx", "")
        .replace("jsx", "")
        .replace("```", "")
        .replace("```typescript", "")
        .replace("```javascript", "")
        .replace("javascript", "")
        .replace("typescript", "")
        .replace("```tsx", "")
        .replace("tsx", "");
      //console.log(text);
      setCodeResp((prev) => prev + text);
    }
    setIsReady(true);
    UpdateCodeToDb();
  };

  useEffect(() => {
    if (codeResp != "" && record?.uid && isReady && record?.code == null) {
      UpdateCodeToDb();
    }
  }, [codeResp && record && isReady]);

  const UpdateCodeToDb = async () => {
    const result = await axios.put("/api/screenshot-to-code", {
      uid: record?.uid,
      codeResp: { resp: codeResp },
    });

    console.log(result);
  };

  return (
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        {/*  Selection Details */}

        <div>
          <SelectionsDetail
            isReady={isReady}
            record={record}
            regenerateCode={() => {
              getScreenshotInfo(true);
            }}
          />
        </div>

        {/* Code Edito */}

        <div className="col-span-4">
          {loading ? (
            <div>
              <h2 className="font-bold text-2xl text-center p-20 flex items-center justify-center bg-gray-100 h-[80vh] rounded-xl">
                <Loader2 className="animate-spin" /> Analyzing the Schreenshot
              </h2>
            </div>
          ) : (
            <CodeEditor codeRes={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
  );
}

export default ViewCode;
