import * as React from "react";
import { useState } from "react";

export const Tab: React.FC = () => {
  const [tabPage, setTabPage] = useState(0);
  switch (tabPage) {
    case 0:
      return <div>aaa</div>;
    default:
      throw new Error("タブの切り替えが不正です");
  }
};
