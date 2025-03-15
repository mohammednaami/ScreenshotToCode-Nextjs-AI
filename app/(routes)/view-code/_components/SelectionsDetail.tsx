import Image from "next/image";
import { Record } from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface SelectionsDetailProps {
    record?: Record;
    regenerateCode: () => void;
    isReady: boolean;
  }

  
function SelectionsDetail({ record, regenerateCode,isReady }: SelectionsDetailProps) {
  return (
    record && (
      <div className="p-5 bg-gray-100 h-[80vh] rounded-lg">
        <h2 className="font-bold my-2">Screenshot</h2>
        <Image
          src={record?.imageUrl}
          alt="Screenshot"
          width={300}
          height={400}
          className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
        />
        <h2 className="font-bold my-4 mb-2"> AI Model</h2>
        <Input
          defaultValue={record?.model}
          disabled={true}
          className="bg-white"
        />

        <h2 className="font-bold my-4 mb-2">Description</h2>
        <Textarea
          defaultValue={record?.description}
          disabled={true}
          className="bg-white h-[180px]"
        />
        <Button className="mt-7 w-full rounded-md" disabled={!isReady} onClick={regenerateCode}>
          <RefreshCcw /> Regenerate Code
        </Button>
      </div>
    )
  );
}

export default SelectionsDetail;
