import { Button } from "./Button";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: JSX.Element;
}

interface CustomRadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomRadioGroup({
  options,
  value,
  onChange,
  className,
}: CustomRadioGroupProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? "default" : "outline"}
          className={cn(
            "flex items-center justify-start border border-gray-400 space-x-4 p-4 h-auto",
            "transition-colors duration-200 ease-in-out",
            value === option.value && "bg-blue-50 border-blue-400" // Highlight selected button
          )}
          onClick={() => onChange(option.value)}
        >
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          <div className="flex-grow text-left space-y-1">
            <div className="font-medium">{option.label}</div>
            {option.description && (
              <p className="text-sm text-muted-foreground">{option.description}</p>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
}
