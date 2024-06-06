import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { ReactNode } from "react";

type DropDownProps = {
  trigger: ReactNode;
  options: ReactNode[];
  className?: string;
  handleClick: (val: any) => void;
};

function DropDown({ trigger, options, className, handleClick }: DropDownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            className,
            "bg-white p-2 rounded-lg border border-slate-300",
          )}
        >
          {options.length == 0 ? (
            <DropdownMenu.Item className="py-1 outline-none cursor-default">
              No Option
            </DropdownMenu.Item>
          ) : (
            options.map((e) => (
              <DropdownMenu.Item
                className="py-1 outline-none cursor-pointer"
              >
                {e}
              </DropdownMenu.Item>
            ))
          )}
          <DropdownMenu.Arrow className="fill-none" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropDown;
