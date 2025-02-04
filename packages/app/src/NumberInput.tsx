import { useState } from "react";

export const NumberInput: React.FC<{
  setValue: (val: number | null) => void;
  label?: string;
}> = ({ setValue, label }) => {
  const [innerValue, setInnerValue] = useState<string>("");

  return (
    <div className="flex flex-col">
      <input
        id={label}
        className="appearance-none border border-px border-accent text-accent rounded outline-none bg-transparent h-5 w-28 p-2 py-3 text-sm"
        value={innerValue}
        placeholder={label?.toLocaleLowerCase()}
        onChange={(event) => {
          let val = Number(event.target.value);

          if (event.target.value === "") {
            setInnerValue("");
            setValue(null);
          } else if (Number.isNaN(val)) return;
          else {
            setInnerValue(event.target.value);
            setValue(val);
          }
        }}
      />
    </div>
  );
};
