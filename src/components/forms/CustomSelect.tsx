type Props = {
  label: string;
  placeholder?: string;
  type: string;
  inputCss?: string;
  options: any;
  name?: string;
  error?: string; // Add the error prop.
  disabled?: boolean;
  class?: string;
  value?: any;
  all?: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  inputCss: "text-sm",
  class: "",
  options: [{ id: 0, name: "" }],
  disabled: false,
  all: false,
};

const CustomSelect = (props: Props) => {
  return (
    <div className={` block text-sm font-medium text-gray-700 ${props.class} `}>
    <label
      className={` text-sm font-medium text-gray-700 `}
    >
      <span> {props.label}</span>
</label>
      <select
        className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-3 ${props.inputCss} `}
        tabIndex={0}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        {props.all == false && <option value={0}>Seleccione una opción</option>}
        {props.all == true && <option value={0}>Todos los Empleados</option>}
        {props.options.map((item: any, i: number) => (
          <option key={i} value={item.id}>
            {item.name}
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>
      <span className="text-red-500 text-xs mt-1">{props.error && props.error}</span> 
     </div>
  );
};
CustomSelect.defaultProps = defaultProps;

export default CustomSelect;
