"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteField } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import {
  getProfileData,
  updateProfileData,
  uploadCompanyLogo,
} from "@/api/profile";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import { routes } from "@/constants/routes";
import { AuthContext } from "@/providers/AuthProvider";

import DeleteAccountModal from "./components/DeleteAccoutModal";

type ProfileForm = {
  companyName: string;
  rouletteColors: string;
};

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("", { keyPrefix: "profilePage" });
  const { user, isLoadingUser } = useContext(AuthContext);
  const router = useRouter();
  const [companyLogo, setCompanyLogo] = useState<File | undefined>(undefined);
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const schema = yup.object().shape({
    companyName: yup.string().required(t("companyNameRequired")),
    rouletteColors: yup.string().required(t("rouletteColorsRequired")),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      const { data } = await getProfileData();
      if (data) {
        reset({
          companyName: data.companyName,
          rouletteColors: data.rouletteColors,
        });
        setCompanyLogoUrl(data.companyLogo);
      }
      setIsLoading(false);
    };
    fetchProfileData();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      const logoURL = companyLogo ? await uploadCompanyLogo(companyLogo) : {};
      const updateData = {
        companyName: data.companyName,
        rouletteColors: data.rouletteColors,
        ...(logoURL.data
          ? { companyLogo: logoURL.data }
          : !companyLogo && companyLogoUrl
          ? { companyLogo: deleteField() }
          : {}),
      };

      const result = await updateProfileData(updateData);

      if (result.error) throw new Error(result.error);
    } catch (error) {
      setError(t("genericErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (file: File | undefined) => {
    if (file) {
      setCompanyLogo(file);
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <ImageInput
            label={t("companyLogo")}
            onChange={handleLogoUpload}
            previewUrl={companyLogoUrl}
          />
          <Input
            {...register("companyName")}
            type="text"
            label={t("companyName")}
            error={errors.companyName?.message}
          />
          <Input
            {...register("rouletteColors")}
            type="text"
            label={t("rouletteColors")}
            error={errors.rouletteColors?.message || error}
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
