import { Record } from "@/app/(routes)/view-code/types";
import { Button } from "@/components/ui/button";
import Constants from "@/data/Constants";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function DesignCard({ item }: { item: Record }) {
  const modelObj =
    item?.model && Constants.dataModelList.find((x) => x.name == item?.model);

  return (
    <div className="p-5 border rounded-lg">
      <Image
        src={item.imageUrl}
        alt="Screenshot"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover bg-white rounded-lg"
      />
      <div className="mt-2">
        <h2 className="line-clamp-2 text-muted-foreground">{item?.description}</h2>
        <div className="flex justify-between items-center mt-2">
        <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full gap-2">
          {typeof modelObj === "object" && (
            <>
              <Image
                src={modelObj.icon}
                alt={modelObj.name}
                width={30}
                height={30}
              />
              <h2>{modelObj.name}</h2>
            </>
          )}
        </div>
        <Link href={`/view-code/${item?.uid}`}>
        <Button><Code />View Code</Button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
