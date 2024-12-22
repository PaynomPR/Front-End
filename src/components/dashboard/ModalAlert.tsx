import LoadingOverlay from "../utils/LoadingOverlay";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  show: boolean;
  action?: () => void;
  setIsOpen: () => void;
};

const defaultProps = {
  title: "",
  show: false,
  description: "",
  isOpen: false,
};

const ModalAlert = (props: Props) => {
  return (
    <>
      <LoadingOverlay show={props.show} />
      <div
        id="default-modal"
        aria-hidden="true"
        className={` transition-all overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          props.isOpen ? "visible" : "hidden"
        } `}
      >
        <div className="relative p-4 w-full mx-auto mt-[25vh] max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 ">
              <h3 className="text-xl font-semibold text-[#333160]">
                {props.title}
              </h3>
              <button
                onClick={props.setIsOpen}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <h2 className="font-bold text-black text-xl">X</h2>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4 text-[#333160]">
              {props.description}
            </div>

            <div className="flex items-center justify-end p-4 md:p-5 ">
              <button
                onClick={props.setIsOpen}
                data-modal-hide="default-modal"
                type="button"
                className="text-[#333160] px-4 py-2 border-gray-500 border rounded-lg mx-4 "
              >
                Atras
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={props.action}
                className="text-[#333160] px-4 py-2 border-[#EED102] border  rounded-lg bg-[#EED102]"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ModalAlert.defaultProps = defaultProps;
export default ModalAlert;
