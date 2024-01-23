"use client";

import { useState } from "react";
import { Input } from "@repo/ui";
import styles from "../style";

export default function UpdatesForm() {
  const [first, setfirst] = useState(0);

  return (
    <>
      <div className={` mx-auto ${styles.boxWidth} ${styles.paddingX}`}>
        <h1>Hellooo</h1>
        <Input type="email" placeholder="Email" />
      </div>
    </>
  );
}
