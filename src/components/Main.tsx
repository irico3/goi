import * as React from "react";
import { Tab } from "./tabs/Tab";
import { RecoilRoot } from "recoil";

export const Main: React.FC = () => {
  return (
    <RecoilRoot>
      <Tab />
    </RecoilRoot>
  );
};
