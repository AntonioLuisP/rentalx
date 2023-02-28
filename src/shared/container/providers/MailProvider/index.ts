import { container } from "tsyringe";

import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { EtherialMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherialMailProvider";
import { SESMailProvider } from "@shared/container/providers/MailProvider/implementations/SESMailProvider";

const mailProvider = {
  etherial: container.resolve(EtherialMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);
