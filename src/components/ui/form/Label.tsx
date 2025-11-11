

interface LabelProps {
  htmlFor?: string;
  text: string;
  required?: boolean;
  variant?: 'default' | 'light';
}

export default function Label({
  htmlFor,
  text,
  required = false,
  variant = 'default',
}: LabelProps) {
  const classNames = `label label--${variant}`;

  return (
    <label htmlFor={htmlFor} className={classNames}>
      {text}
      {required && <span className={'label-required'}>*</span>}
    </label>
  );
}
