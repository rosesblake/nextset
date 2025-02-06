const InputField = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = "text",
  inputName,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {inputName || placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nextsetButton focus:border-nextsetPrimary"
      />
    </div>
  );
};

export { InputField };
