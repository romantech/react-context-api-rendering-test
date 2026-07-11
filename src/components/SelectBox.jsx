export default function SelectBox({ onChange, options, defaultValue }) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={({ target }) => onChange(target.value)}
      className="mb-10"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
