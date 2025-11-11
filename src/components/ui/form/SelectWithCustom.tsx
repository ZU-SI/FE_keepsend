import Select from './Select';
import TextField from './TextField';

interface SelectWithCustomProps {
  value: string;
  customValue: string;
  onSelectChange: (value: string) => void;
  onCustomChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  variant?: 'default' | 'light';
}

export default function SelectWithCustom({
  value,
  customValue,
  onSelectChange,
  onCustomChange,
  options,
  placeholder = '선택해주세요',
  variant = 'default',
}: SelectWithCustomProps) {
  const showCustomInput = value === '직접 입력';

  return (
    <div className={'select-group'}>
      <Select
        value={value}
        onChange={onSelectChange}
        options={options}
        placeholder={placeholder}
        variant={variant}
      />
      {showCustomInput && (
        <TextField
          value={customValue}
          onChange={onCustomChange}
          placeholder="입력"
          variant={variant}
        />
      )}
    </div>
  );
}