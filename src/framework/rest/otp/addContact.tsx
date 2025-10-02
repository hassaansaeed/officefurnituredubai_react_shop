import Button from "@components/ui/button";
import {
  useSendOtpCodeMutation,
  useVerifyOtpCodeMutation,
  useAddContactMutation,
} from "@framework/auth/auth.query";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Alert from "@components/ui/alert";
import MobileOtpInput from "react-otp-input";
import Label from "@components/ui/label";
import { useTranslation } from "next-i18next";
import "react-phone-input-2/lib/bootstrap.css";
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";
interface OTPProps {
  defaultValue: string | undefined;
  onVerify: (phoneNumber: string) => void;
}
export const OTP: React.FC<OTPProps> = ({ defaultValue, onVerify }) => {
  const { t } = useTranslation("common");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [number, setNumber] = useState(defaultValue ?? "");
  const [otp, setOtp] = useState("");
  const [hasOTP, setHasOTP] = useState(false);
  const [otpId, setOtpId] = useState("");

  const router = useRouter();
  const dir = getDirection(router.locale);

  const { mutate: verifyOtpCode, isLoading: otpVerifyLoading } =
    useVerifyOtpCodeMutation();
  const { mutate: addContact, isLoading: addContactLoading } =
    useAddContactMutation();
  const { mutate: sendOtpCode, isLoading: loading } = useSendOtpCodeMutation();

  function saveCustomerContact() {
    addContact(
      {
        user_id: localStorage.getItem("user_id"),
        phone_number: number,
      },
      {
        onSuccess: (data: any) => {
          if (data?.success) {
            setErrorMessage(data.message);
            setErrorMessage(null);
            onVerify(number);
            setHasOTP(true);
            setOtpId(data?.sendOtpCode?.id!);
          }
          if (!data?.success) {
            setErrorMessage(data?.message);
          }
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  function onVerifyCodeSubmission() {
    verifyOtpCode(
      {
        phone_number: number,
        code: otp,
        otp_id: otpId,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setErrorMessage(null);
            onVerify(number);
          } else {
            setErrorMessage(data?.message);
          }
          setHasOTP(false);
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  return (
    <>
      <div
        className={`flex items-center ${
          dir === "rtl" ? "rtl-view" : "ltr-view"
        }`}
      >
        <PhoneInput
          country={"pk"}
          value={number}
          onChange={(phone) => setNumber(`+${phone}`)}
          inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-gray-300 ltr:!border-r-0 rtl:!border-l-0 !rounded ltr:rounded-r-none rtl:rounded-l-none focus:!border-black !h-12"
          dropdownClass="focus:!ring-0 !border !border-gray-300 !shadow-350"
        />
        <Button
          loading={addContactLoading}
          disabled={addContactLoading}
          onClick={saveCustomerContact}
          className="ltr:rounded-l-none rtl:rounded-r-none flex-shrink-0 capitalize !h-12 !px-6"
        >
          {/* {t("text-send-otp")} */}
          Save
        </Button>
      </div>

      {errorMessage && (
        <Alert
          variant="error"
          message={t(errorMessage)}
          className="mt-4"
          closeable={true}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
};
