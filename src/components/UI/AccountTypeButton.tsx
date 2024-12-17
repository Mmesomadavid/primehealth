import { cn } from "../../lib/utils"
import { Building2, Stethoscope } from 'lucide-react'

interface AccountTypeButtonProps {
  type: 'hospital' | 'doctor'
  selected: boolean
  onClick: () => void
}

export function AccountTypeButton({ type, selected, onClick }: AccountTypeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg border-2 transition-all duration-200",
        "flex items-center gap-3 text-left",
        selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      )}
    >
      {type === 'hospital' ? (
        <Building2 className={cn("h-5 w-5", selected ? "text-primary" : "text-muted-foreground")} />
      ) : (
        <Stethoscope className={cn("h-5 w-5", selected ? "text-primary" : "text-muted-foreground")} />
      )}
      <div>
        <h3 className="font-medium">{type === 'hospital' ? 'Hospital Account' : 'Doctor Account'}</h3>
        <p className="text-sm text-muted-foreground">
          {type === 'hospital' 
            ? 'Create an account for your hospital' 
            : 'Create an account as a medical practitioner'}
        </p>
      </div>
    </button>
  )
}
