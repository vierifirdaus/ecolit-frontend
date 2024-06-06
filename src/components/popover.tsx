import { ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { X } from 'phosphor-react';

type PopoverProps = {
    children: ReactNode
    trigger: ReactNode
}

const Popover = ({children, trigger}: PopoverProps) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger asChild>
      {
        trigger
      }
    </RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content
        className="rounded-lg p-5 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        {
            children
        }
        <RadixPopover.Arrow className="fill-white" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);

export default Popover;