import React, { Fragment, useRef } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const cancelButtonRef = useRef();
  return (
    <Transition show={modalOpen} as={Fragment} appear>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 over-flow-y-auto text-center"
        initialFocus={cancelButtonRef}
        onClose={() => setModalOpen(false)}
      >
        <div className="min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            arial-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0  scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>
          <div className="absolute right-5 top-5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className=" transitions  w-10 h-10 flex-colo text-base text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
            >
              <IoClose />
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MainModal;
