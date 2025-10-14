import React from "react";
import "./styles.scss";

type Item = { name: string; value: string; label?: string }

type RadioItem = {
    name: string;
    value: string;       // usa string para cuadrar con checked
    label?: string;
  };

type RenderArgs = {
    radio: RadioItem;
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  };

type RadioTabsProps = {
  info: Item[];
  selectedMode: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: (args: RenderArgs) => React.ReactNode;
};

export default function RadioTabs({
    info,
    selectedMode,
    handleChange,
    children,
  }: RadioTabsProps) {
    return (
      <div className="marco-eos">
        {info.map((radio, index) => {
          const id = `${radio.name}-${index}`;
          const node = children({
            radio,
            labelProps: { htmlFor: id },
            inputProps: {
              id,
              name: "mode",
              type: "radio",
              value: radio.value,                 // ya es string
              checked: selectedMode === radio.value,
              onChange: handleChange,
            },
          });
          return <React.Fragment key={id}>{node}</React.Fragment>; // key va aquí
        })}
      </div>
    );
  }

