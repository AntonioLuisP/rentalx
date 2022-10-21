import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConection from "../index";

async function create() {
  const connecton = await createConection("localhost");

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connecton.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxx-xxx')`
  );

  await connecton.close;
}

create().then(() => console.log("User admin Created"));
