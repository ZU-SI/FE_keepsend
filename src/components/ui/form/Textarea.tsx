interface TextareaProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  variant?: 'default' | 'light';
}

export default function Textarea({
  id,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  variant = 'default',
}: TextareaProps) {
  const classNames = `texarea textarea--${variant}`;

  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={classNames}
    />
  );
}