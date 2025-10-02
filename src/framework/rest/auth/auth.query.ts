import { useMutation, UseMutationOptions } from "react-query";
import {
  AuthService,
  ChangePasswordInputType,
  ForgetPasswordInputType,
  LoginInputType,
  OtpLoginInputType,
  TwoFactor,
  RegisterUserInputType,
  ResetPasswordInputType,
  EmailVerificationType,
  SendOtpCodeInputType,
  SocialLoginInputType,
  UpdateContactInput,
  VerifyOtpInputType,
  VerifyPasswordInputType,
  SendContactOtpCodeInputType,
} from "./auth.service";

export const useChangePasswordMutation = () => {
  return useMutation((input: ChangePasswordInputType) =>
    AuthService.changePassword(input)
  );
};

export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordInputType) =>
    AuthService.forgetPassword(input)
  );
};

export const useLoginMutation = () => {
  return useMutation((input: LoginInputType) => AuthService.login(input));
};

export const useLogoutMutation = () => {
  return useMutation(() => AuthService.logout());
};

export const useOtpLoginMutation = () => {
  return useMutation((input: OtpLoginInputType) => AuthService.otpLogin(input));
};

export const useTwoFactorMutation = () => {
  return useMutation((input: TwoFactor) => AuthService.twoFactor(input));
};

export const useRegisterMutation = () => {
  return useMutation((input: RegisterUserInputType) =>
    AuthService.register(input)
  );
};

export const useResetPasswordMutation = () => {
  return useMutation((input: ResetPasswordInputType) =>
    AuthService.resetPassword(input)
  );
};

export const useContactSendOtpCodeMutation = () => {
  return useMutation((input: SendContactOtpCodeInputType) =>
    AuthService.contactSendOtpCode(input)
  );
};

export const useSendOtpCodeMutation = () => {
  return useMutation((input: SendOtpCodeInputType) =>
    AuthService.sendOtpCode(input)
  );
};

export const useAddContactMutation = () => {
  return useMutation((input: SendOtpCodeInputType) =>
    AuthService.addContact(input)
  );
};

export const useSocialLoginMutation = (
  options: UseMutationOptions<any, unknown, SocialLoginInputType, unknown>
) => {
  return useMutation(
    (input: SocialLoginInputType) => AuthService.socialLogin(input),
    {
      onError: (error: any) => {
        console.log(error.message);
      },
      ...options,
    }
  );
};

export const useUpdateContactMutation = () => {
  return useMutation((input: UpdateContactInput) =>
    AuthService.updateContact(input)
  );
};

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation((input: VerifyPasswordInputType) =>
    AuthService.verifyForgetPassword(input)
  );
};

export const useVerifyOtpCodeMutation = () => {
  return useMutation((input: VerifyOtpInputType) =>
    AuthService.verifyOtpCode(input)
  );
};

export const useEmailVerificationMutation = () => {
  return useMutation((input: EmailVerificationType) =>
    AuthService.emailVerification(input)
  );
};
