interface SelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  variant?: 'default' | 'light';
}

export default function Select({
  id,
  value,
  onChange,
  options,
  placeholder = '선택해주세요',
  variant = 'default',
}: SelectProps) {
  const classNames = `select select--${variant}`;

  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}