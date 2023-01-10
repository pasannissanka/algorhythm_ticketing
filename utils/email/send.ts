import * as SibApiV3Sdk from "@sendinblue/client";

const { SIB_API_KEY } = process.env;

type sendEmailParams = {
  subject: string;
  to: SibApiV3Sdk.SendSmtpEmailTo[];
  attachment?: SibApiV3Sdk.SendSmtpEmailAttachment[];
  templateId?: number;
  params: {
    bodyMessage: string;
    qr_url: string;
  };
};

export const sendEmail = async ({
  attachment,
  subject,
  templateId,
  to,
  params,
}: sendEmailParams) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    SIB_API_KEY || ""
  );

  return apiInstance.sendTransacEmail({
    attachment,
    sender: {name: "Test",email: "pasannissanka@gmail.com"},
    to,
    subject,
    params,
    htmlContent: `
    <html><body><h1>This is a transactional email {{params.bodyMessage}}</h1> <img src="data:image/png;base64,${params.qr_url}" alt="QR Code" width="100" height="100">
    </body></html>
    `,
  });
};
