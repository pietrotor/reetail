import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Controller, useForm } from "react-hook-form";

import { IProfileSettingsForm } from "../types";

import { FormError } from "@/components/form-error";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryOptions } from "@/lib/countries";
import { fieldError } from "@/lib/get-field-error";
import { useCurrentUserStore } from "@/store/use-current-user";

export const ProfileInformation = () => {
  const { full_name } = useCurrentUserStore();
  const [imageHasError, setImageHasError] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, formState } = useForm<IProfileSettingsForm>();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    setImageHasError(false);
  };

  const handleDelete = () => {
    setPreviewSrc(null);
    setImageHasError(true);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        {previewSrc && !imageHasError ? (
          <img
            src={previewSrc}
            alt="Preview"
            onError={() => setImageHasError(true)}
            className="w-[78px] h-[78px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[78px] h-[78px] rounded-full bg-gray-200 flex justify-center items-center">
            <p className="text-gray-500 text-3xl">
              {full_name?.split(" ")?.[0]?.[0]?.toUpperCase()}
              {full_name?.split(" ")?.[1]?.[0]?.toUpperCase()}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="font-medium">Profile picture</p>
          <div className="flex items-center gap-1">
            <Button onClick={handleUploadClick}>Upload photo</Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: "Email is required",
          }}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"Email"}
                placeholder={"Enter your email"}
                type={"email"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={"password"}
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"Password"}
                placeholder={"*******"}
                type={"password"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />
      </div>
      <div className="w-full h-[1px] bg-black/5" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Controller
          control={control}
          name={"address"}
          rules={{
            required: "Address is required",
          }}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"Address line 1"}
                placeholder={"Enter your address"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={"address"}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"Address line 2"}
                placeholder={"Enter your address 2"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={"city"}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"City"}
                placeholder={"Enter your city"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={"postalCode"}
          render={({ field }) => (
            <div className="flex flex-col">
              <FormInput
                label={"Postal Code"}
                placeholder={"Enter your postal code"}
                className="!h-10 !bg-white border"
                {...(field as any)}
              />
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />{" "}
        <Controller
          control={control}
          name={"country"}
          render={({ field }) => (
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <label>Country</label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full px-[15px] !h-[40px] bg-white border rounded-[8px] !text-black">
                    <SelectValue placeholder={"Select your country"} />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map(({ label, value }, i) => (
                      <SelectItem
                        key={i}
                        value={value}
                        className="flex items-center gap-1"
                      >
                        <ReactCountryFlag
                          countryCode={value}
                          svg
                          title={label}
                          style={{
                            width: "1.25em",
                            height: "1.25em",
                            marginRight: 8,
                          }}
                        />{" "}
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormError error={fieldError(formState.errors, field.name)} />
            </div>
          )}
        />{" "}
      </div>
      <div className="w-full h-[1px] bg-black/5" />
    </div>
  );
};
