import * as SibApiV3Sdk from "@sendinblue/client";
import { htmlContent } from "./template";

const { SIB_API_KEY } = process.env;

export type sendEmailParams = {
  subject: string;
  to?: SibApiV3Sdk.SendSmtpEmailTo[];
  attachment?: SibApiV3Sdk.SendSmtpEmailAttachment[];
  templateId?: number;
  params?: {
    type: string;
    name: string;
    email: string;
    phone_number: string;
    qr_url: string;
    qr_data: string;
  };
  messageVersions?: SibApiV3Sdk.SendSmtpEmailMessageVersions[];
};

export const sendEmail = async ({
  attachment,
  subject,
  templateId,
  to,
  params,
  messageVersions,
}: sendEmailParams) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    SIB_API_KEY || ""
  );

  return apiInstance.sendTransacEmail({
    attachment,
    sender: { name: "Society of Computer Science", email: "scs@sci.sjp.ac.lk" },
    to,
    subject,
    params,
    htmlContent: htmlContent,
    messageVersions,
  });
};
