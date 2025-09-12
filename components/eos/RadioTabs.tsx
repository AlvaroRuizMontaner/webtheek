import "./styles.scss";

// RadioTabs.tsx
type Item = { name: string; value: string; label?: string }

type RadioTabsProps = {
  info: Item[];
  selectedMode: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: (args: {
    radio: Item;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  }) => React.ReactNode;
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
        return children({
          radio,
          labelProps: { htmlFor: id, className: `flex items-center panel-button relative cursor-pointer ${selectedMode === radio.value ? "!bg-accent-300/60" : ""}` },
          inputProps: {
            id,
            name: "mode",
            type: "radio",
            value: String(radio.value),
            checked: selectedMode === radio.value,
            onChange: handleChange,
            className: "opacity-0 absolute",
          },
        });
      })}
    </div>
  );
}

