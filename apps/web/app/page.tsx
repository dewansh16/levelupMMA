import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";

import { PrismaClient } from "@repo/db";

export default function Page(): JSX.Element {
  const client = new PrismaClient();

  return (
    <div>
      <h1>Hellooooo</h1>
    </div>
  );
}
