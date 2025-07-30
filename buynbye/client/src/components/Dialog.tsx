'use client';

import {
  DialogBackdrop,
  Dialog as DialogHeadless,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

interface DialogProps {
  opened: boolean;
  onClose(): void;
  children: React.JSX.Element;
  footer: React.JSX.Element;
  title: string;
}

export default function Dialog({
  opened,
  onClose,
  children,
  footer,
  title,
}: DialogProps) {
  return (
    <div>
      <DialogHeadless open={opened} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-[#242424] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-[#242424] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      {title}
                    </DialogTitle>
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
              </div>
              <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {footer}
              </div>
            </DialogPanel>
          </div>
        </div>
      </DialogHeadless>
    </div>
  );
}
