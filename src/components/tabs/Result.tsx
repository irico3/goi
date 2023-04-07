import { useDraftTotalling } from "../../hooks/useDraftTotalling";

export const Result = () => {
  const [draftTotalling] = useDraftTotalling();
  return (
    <>
      <h1>結果</h1>
      <p>上位3件は以下になりました！</p>
      {draftTotalling.map((draft) => {
        return <div>{draft.text}</div>;
      })}
    </>
  );
};
