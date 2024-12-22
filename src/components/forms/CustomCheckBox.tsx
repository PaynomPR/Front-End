import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  name?: string;
  patters?: string;
  error?: string; // Add the error prop.

  disabled?: boolean;
  class?: string;
  value?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "",
  class: "",
  disabled: false,
};

const CustomCheckBox = (props: Props) => {
  return (
    <div className={` block mb-2 text-sm font-medium text-gray-700 ${props.class} `}>
    <label
      className={` text-sm font-medium text-gray-700 `}
    >
      <span> {props.label}</span>

      <input
        className={` bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        tabIndex={0}
        pattern={props.patters}
        type={props.type}
        name={props.name}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        placeholder={props.placeholder}
        checked={props.value}
        disabled={props.disabled}
      />
    </label>
    <span className="text-red-500 text-xs mt-1">{props.error && props.error}</span> 

    </div>
  );
};
CustomCheckBox.defaultProps = defaultProps;

export default CustomCheckBox;
