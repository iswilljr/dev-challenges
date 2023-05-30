import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '../button/button'

interface ModalProps extends React.PropsWithChildren {
  cancelLabel?: string
  confirm?: boolean
  confirmLabel?: string
  opened: boolean
  title?: string
  variant?: 'default' | 'danger'
  onCancel?: () => void
  onClose: () => void
  onConfirm?: () => void
}

export function Modal({
  cancelLabel,
  children,
  confirm,
  confirmLabel,
  opened,
  title,
  variant,
  onCancel,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform space-y-2 overflow-hidden rounded-2xl bg-zinc-700 p-6 text-left align-middle shadow-xl transition-all'>
                {title && (
                  <Dialog.Title id='title' as='h3' className='text-xl font-bold leading-6 text-gray-200'>
                    {title}
                  </Dialog.Title>
                )}

                <div id='content'>{children}</div>

                {confirm && (
                  <div className='flex flex-col items-center justify-end gap-2 pt-2 md:flex-row'>
                    <Button
                      className='w-full md:w-auto'
                      variant='secondary'
                      onClick={() => {
                        onCancel?.()
                        onClose()
                      }}
                    >
                      {cancelLabel ?? 'Cancel'}
                    </Button>
                    <Button
                      className='w-full md:w-auto'
                      variant={variant === 'danger' ? 'danger' : 'primary'}
                      onClick={() => {
                        onConfirm?.()
                        onClose()
                      }}
                    >
                      {confirmLabel ?? 'Confirm'}
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
