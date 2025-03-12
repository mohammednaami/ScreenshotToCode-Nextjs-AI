"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import geminiIcound from "@/public/google.png"

export default function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const dataModelList = [
    {
        name: "OpenAi 4o"

    },
    {
        name: "Gemini Google",
        icoun: geminiIcound

    },
    {
        name: "OpenAi 4o"
    },
    {
        name: "OpenAi 4o"
    }
  ];

  const onScreenSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {previewUrl ? (
          <div className="p-5 border border-dashed ">
            <Image
              src={previewUrl}
              alt="Screenshots"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain"
            />
            <X
              className="flex justify-normal w-full cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            />
          </div>
        ) : (
          <div className="p-7 border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Screenshot</h2>
            <p className="text-muted-foreground mt-1">
              Click Button to Select Screenshot
            </p>
            <div className="p-5 border border-dashed w-full flex items-center justify-center mt-7">
              <label
                className="p-2 bg-green-300 font-sans text-black rounded-md px-4 cursor-pointer"
                htmlFor="screenSelect">
                Select Screenshot
              </label>
            </div>
            <input
              type="file"
              id="screenSelect"
              className="hidden"
              multiple={false}
              onChange={onScreenSelect}
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2>Select AI Model</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your screenshot
          </h2>
          <Textarea
            className="mt-3 h-[200px]"
            placeholder="Write about your code"
          />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button>
          <WandSparkles /> Convert to Code
        </Button>
      </div>
    </div>
  );
}
