import { renderHook } from "@testing-library/react";
import { useDraftTotalling } from "../useDraftTotalling";
import { RecoilRoot } from "recoil";

describe("useDraftTotalling", () => {
  jest.mock("recoil", () => ({ useRecoilState: jest.fn() }));

  const { result } = renderHook(() => useDraftTotalling(), {
    wrapper: RecoilRoot,
  });
  console.log(result);
});
