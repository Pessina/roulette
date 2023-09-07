"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

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

  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const schema = yup.object().shape({
    companyName: yup.string().required(t("companyNameRequired")),
    rouletteColors: yup.string().required(t("rouletteColorsRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ProfileForm) => {
    console.log(data, companyLogo);
  };

  const handleLogoUpload = (file: File | null) => {
    if (file) {
      setCompanyLogo(file);
    }
  };

  if (!isLoadingUser && !user) {
    router.push(routes.LOGIN);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-900">
      <Card className="bg-background-500 flex flex-col gap-4 w-[40%] p-4">
        <h1 className="text-2xl mb-4 text-center">{t("profileSettings")}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <ImageInput label={t("companyLogo")} onChange={handleLogoUpload} />
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
            error={errors.rouletteColors?.message}
          />
          <div className="flex gap-2 justify-between">
            <Button type="submit" theme="primary">
              {t("saveChanges")}
            </Button>
            <Button
              type="button"
              theme="danger"
              onClick={() => setShowModal(true)}
            >
              {t("deleteAccount")}
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
