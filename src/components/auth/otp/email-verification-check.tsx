import Button from "@components/ui/button";
import {
  useOtpLoginMutation,
  useSendOtpCodeMutation,
} from "@framework/auth/auth.query";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Alert from "@components/ui/alert";
import MobileOtpInput from "react-otp-input";
import Label from "@components/ui/label";
import { useTranslation } from "next-i18next";
import "react-phone-input-2/lib/bootstrap.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "@components/ui/input";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
import { Controller } from "react-hook-form";
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@framework/utils/endpoints";
import { ROUTES } from "@lib/routes";
import { toast } from "react-toastify";

import { useEmailVerificationMutation } from "@framework/auth/auth.query";

interface OTPProps {
  onLoginSuccess: (token: string) => void;
}

export const EmailVerificationCheck: React.FC<OTPProps> = ({
  onLoginSuccess,
}) => {
  const { t } = useTranslation("common");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOTP, setHasOTP] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [number, setNumber] = useState("");
  const [isContactExist, setIsContactExist] = useState(false);
  const { mutate: sendOtpCode, isLoading: loading } = useSendOtpCodeMutation();
  const [_, authorize] = useAtom(authorizationAtom);
  const { mutate: emailVerification, isLoading: emailVerificationLoading } =
    useEmailVerificationMutation();

  const router = useRouter();
  const dir = getDirection(router.locale);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  function emailVerificationHandler(values: any) {
    emailVerification(
      {
        ...values,
        user_id: localStorage.getItem("user_id"),
      },
      {
        onSuccess: (data: any) => {
          // if (data?.token && data?.permissions?.length) {
          toast.dark("plz check your inbox to verify the email");
          onLoginSuccess(data?.token);
          // }
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }
  return (
    <>
      {errorMessage && (
        <Alert
          variant="error"
          message={t(errorMessage)}
          className="mb-4"
          closeable={true}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-5">
        <form onSubmit={handleSubmit(emailVerificationHandler)}>
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="mb-5">Email not Verified</h1>
              <Button
                type="submit"
                loading={emailVerificationLoading}
                disabled={emailVerificationLoading}
                className="mr-auto"
              >
                {/* {t("form:button-label-resend")} */}
                Resend
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
