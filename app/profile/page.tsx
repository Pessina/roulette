"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { getProfileData, updateProfileData, uploadLogo } from "@/api/profile";
import { ProfileData } from "@/api/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ColorPicker from "@/components/Forms/ColorPicker";
import ImageInput from "@/components/Forms/ImageInput";
import Input from "@/components/Forms/Input";
import { routes } from "@/constants/routes";
import { AuthContext } from "@/providers/AuthProvider";

import DeleteAccountModal from "./components/DeleteAccountModal";

type ProfileForm = {
  companyName: string;
  rouletteColors: { hex: string }[];
  fileInput?: File;
};

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("", { keyPrefix: "profilePage" });
  const { user, isLoadingUser } = useContext(AuthContext);
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const schema = useMemo(() => {
    return yup.object().shape({
      companyName: yup.string().required(t("companyNameRequired")),
      rouletteColors: yup
        .array()
        .of(
          yup.object({
            hex: yup.string().required(),
          })
        )
        .min(1)
        .required(),
    });
  }, [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      const result = await getProfileData();
      if (result.data) {
        reset({
          companyName: result.data.companyName,
          rouletteColors: result.data.rouletteColors,
        });
        setLogoUrl(result.data.logo);
      }
      setIsLoading(false);
    };
    fetchProfileData();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      const logoURL = data.fileInput ? await uploadLogo(data.fileInput) : {};
      const baseData: ProfileData = {
        companyName: data.companyName,
        rouletteColors: data.rouletteColors,
        logo: logoURL.data ?? "",
      };

      const result = await updateProfileData(baseData);
      if (result.error) throw new Error(result.error);
    } catch (error) {
      setError(t("genericErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoadingUser && !user) {
    router.push(routes.LOGIN);
    return undefined;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-900">
      <Card className="bg-background-500 flex flex-col gap-4 w-[40%] p-4">
        <h1 className="text-2xl mb-4 text-center">{t("profileSettings")}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="flex flex-col gap-4"
        >
          <Controller
            name="fileInput"
            control={control}
            render={({ field }) => (
              <ImageInput
                label={t("companyLogo")}
                onChange={(file) => field.onChange(file)}
                previewUrl={logoUrl}
              />
            )}
          />
          <Input
            {...register("companyName")}
            type="text"
            label={t("companyName")}
            error={errors.companyName?.message}
          />
          <Controller
            control={control}
            name="rouletteColors"
            render={({ field }) => (
              <ColorPicker
                label={t("rouletteColors")}
                onChange={(colors) =>
                  field.onChange(colors.map((c) => ({ hex: c })))
                }
              />
            )}
          />
          <div className="flex gap-2 justify-between">
            <Button
              type="button"
              theme="danger"
              onClick={() => setShowModal(true)}
            >
              {t("deleteAccount")}
            </Button>
            <Button
              type="submit"
              theme="primary"
              disabled={isLoading}
              loading={isLoading}
            >
              {t("saveChanges")}
            </Button>
          </div>
        </form>
      </Card>
      <DeleteAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
