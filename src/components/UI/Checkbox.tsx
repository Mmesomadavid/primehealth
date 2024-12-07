import React from 'react';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void; // Define this in the props
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
  onCheckedChange, // Include this in destructuring
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => {
        const isChecked = e.target.checked;
        onChange?.(isChecked); // Call onChange if provided
        onCheckedChange?.(isChecked); // Call onCheckedChange if provided
      }}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
    />
  );
};
