import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import { CaretDown, Check } from "phosphor-react";

type SelectProps = {
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
  invalid?: boolean;
  required?: boolean;
};

const Select = ({
  className,
  options,
  placeholder,
  label,
  value,
  error,
  invalid,
  required,
  onChange,
}: SelectProps) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className={clsx(invalid && "text-red-500", "text-sm", "pl-1")}>
          {label}
          {required && "*"}
        </label>
      )}
      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger
          className={clsx(
            className,
            invalid && "border-red-500",
            !value && "text-slate-400",
            "h-10 flex justify-between px-2 items-center bg-white border border-gray-300 rounded-md text-slate-700 outline-none",
          )}
          aria-label="Food"
        >
          <RadixSelect.Value placeholder={placeholder || "Select"} />
          <div className="w-4 h-4 ml-2">
            <RadixSelect.Icon>
              <CaretDown />
            </RadixSelect.Icon>
          </div>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="bg-white px-2 py-1 rounded-md border border-primary-300 text-slate-700">
            <RadixSelect.Viewport className="padding-3">
              <RadixSelect.Group>
                {options.map((option) => (
                  <RadixSelect.Item
                    className="flex items-center hover:outline-none cursor-pointer"
                    key={option.label}
                    value={option.value}
                  >
                    <div className="w-4 h-4 mr-2">
                      <RadixSelect.ItemIndicator className="SelectItemIndicator">
                        <Check />
                      </RadixSelect.ItemIndicator>
                    </div>
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Group>
              <RadixSelect.Separator className="SelectSeparator" />
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      <p className="pl-2 text-red-500 text-xs">{error}</p>
    </div>
  );
};

export default Select;
