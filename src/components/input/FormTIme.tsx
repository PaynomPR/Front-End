import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  name?: string;
  patters?: string;

  disabled?: boolean;
  class?: string;
  value?: any;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>, time: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "",
  class: "",
  disabled: false,
};

const TimeInput = (props: Props) => {
  const onBlur = (event: any) => {
    const value = event.target.value;
    const minutes = Math.max(0, getMinutesFromHHMM(value));

    const time: any = toHHMM(minutes);
    props.onBlur(event, time);
  };

  const getMinutesFromHHMM = (value: any) => {
    const [str1, str2] = value.split(":");
    const hours = Number(str1);
    const minutes = Number(str2);

    if (!isNaN(hours) && !isNaN(minutes)) {
      return hours * 60 + minutes;
    }

    return 0;
  };

  const toHHMM = (mins: any) => {
    const minutes = mins % 60;
    const hours = (mins - minutes) / 60;

    return [hours, minutes]
      .map((val) => (val < 10 ? `0${val}` : val))
      .join(":");
  };
  return (
    <label className={` block mb-2  font-medium text-gray-700 ${props.class} `}>
      <span>{props.label}</span>
      <input
        name={props.name}
        className={` bg-gray-50 text-center text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 ${props.inputCss} `}
        type="text"
        onChange={props.onChange}
        onBlur={(e) => onBlur(e)}
        value={props.value}
      />
    </label>
  );
};
TimeInput.defaultProps = defaultProps;

export default TimeInput;
