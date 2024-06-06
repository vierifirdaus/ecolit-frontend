import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
import { X } from 'phosphor-react'

type DialogProps = {
  trigger: ReactNode
  children: ReactNode
  title: string
};

function Dialog({ trigger, title, children }: DialogProps) {
  const [open, setOpen] = useState(false);

  return (
  <RadixDialog.Root open={open} onOpenChange={setOpen}>
    <RadixDialog.Trigger asChild>
      {
        trigger
      }
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] overflow-hidden focus:outline-none">
        <div className='w-full flex p-3 justify-between bg-[#967C55] text-white'>
            <h3>{title}</h3>
            <RadixDialog.Close asChild>
            <button
                aria-label="Close"
            >
                <X/>
            </button>
            </RadixDialog.Close>
        </div>
        <div className='w-full p-3'>
            {
                children
            }
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)}

export default Dialog