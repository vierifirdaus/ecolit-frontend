import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
import { WarningOctagon, X } from 'phosphor-react'

type ConfirmationDialogProps = {
  trigger: ReactNode
  title: string
  onConfirm: () => Promise<any>
};

function ConfirmationDialog({ trigger, title, onConfirm }: ConfirmationDialogProps) {
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
      <RadixDialog.Content className="data-[state=open]:animate-contentShow p-6 fixed top-[50%] left-[50%] w-[30vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] overflow-hidden focus:outline-none">
        <div className='w-full flex justify-end'>
            <RadixDialog.Close asChild>
              <button
                  aria-label="Close"
              >
                  <X/>
              </button>
            </RadixDialog.Close>
        </div>
        <div className='w-full p-3'>
          <div className='flex justify-center'>
            <WarningOctagon className='text-[#967C55]' size={100}/>
          </div>
          <p className='text-xl text-center my-8'>{title}</p>
          <div className='flex justify-between px-12'>
            <button className='text-white bg-[#C73225] rounded-md py-1 px-8' onClick={onConfirm}>
              Ya
            </button>
            <RadixDialog.Close>
              <button className='text-white bg-[#967C55] rounded-md py-1 px-8'>
                Tidak
              </button>
            </RadixDialog.Close>
          </div>
        </div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)}

export default ConfirmationDialog