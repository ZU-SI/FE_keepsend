

interface TextFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  variant?: 'default' | 'light';
}

export default function TextField({
  id,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  variant = 'default',
}: TextFieldProps) {
  const classNames = `input input--${variant}`;

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={classNames}
    />
  );
}