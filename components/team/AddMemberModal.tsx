import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AddMemberForm from './AddMemberForm';
import { Project, ToolType } from '@/types';
import XMark from '../tasks/XMark/XMark';
import { Quiz } from '@/types/quiz';

type AddMemberModalProps = {
    toolId: Project["_id"] | Quiz["_id"]
    queryKey: string
    tool: ToolType
}

export default function AddMemberModal({toolId, queryKey, tool}: AddMemberModalProps) {

    const path = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const addMember = searchParams.get('addMember')
    const show = addMember ? true : false

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => router.push(path)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <span className='absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer' onClick={() => router.push(path)}>
                                        <XMark/>
                                    </span>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Agregar Integrante al equipo
                                    </DialogTitle>
                                    <p className="text-xl font-bold">Busca el nuevo integrante por email {''}
                                        <span className="text-accent-300">para agregarlo al equipo</span>
                                    </p>

                                    <AddMemberForm toolId={toolId} tool={tool} queryKey={queryKey}/>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}