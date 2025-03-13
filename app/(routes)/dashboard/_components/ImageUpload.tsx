"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storage } from "@/configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
//@ts-ignore
import uuid4 from "uuid4";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import  Constants  from "@/data/Constants";

export default function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);


  const onScreenSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  const onConvertToCodeClick = async () => {
    if (!file || !model || !description) {
      console.log("Something went wrong, please verified all the information");
      return;
    }
    setLoading(true);
    const fileName = Date.now().toString();
    const imageRef = ref(storage, "screenshots/" + fileName);
    await uploadBytes(imageRef, file).then((response) => {
      console.log("Screenshot Uploaded");
    });

    const imageUrl = await getDownloadURL(imageRef);
    var id = uuid4();

    const result = await axios.post("/api/screenshot-to-code", {
      description: description,
      imageUrl: imageUrl,
      model: model,
      uid: id,
      email: user?.email,
    });
    console.log(result);
    setLoading(false);
    router.push("/view-code/" + id);
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

            {/* <UploadDropzone
  endpoint="imageUploader"
  onClientUploadComplete={(res) => {
    console.log("✅ Upload Response:", res);
    if (res.length > 0) {
      setPreviewUrl(res[0].ufsUrl); // Make sure `url` is correct
    } else {
      console.warn("⚠️ No files uploaded.");
    }
  }}
  onUploadError={(error) => {
    console.error("❌ Upload Failed:", error);
  }}
  onUploadProgress={(progress) => {
    console.log("📊 Upload Progress:", progress);
  }}
  className="border-primary w-full ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground"
/> */}
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2>Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.dataModelList.map((aimodel, index) => (
                <SelectItem key={index} value={aimodel.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={aimodel.icon}
                      alt={aimodel.name}
                      width={25}
                      height={25}
                    />
                    <h2>{aimodel.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your screenshot
          </h2>
          <Textarea
            onChange={(event) => setDescription(event?.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your code"
          />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button onClick={onConvertToCodeClick} disabled={loading}>
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <WandSparkles />
          )}
          Convert to Code
        </Button>
      </div>
    </div>
  );
}
