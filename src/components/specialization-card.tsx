interface SpecializationCardProps {
    title: string
    description: string
    selected?: boolean
    onClick?: () => void
  }
  
  export function SpecializationCard({
    title,
    description,
    selected,
    onClick
  }: SpecializationCardProps) {
    return (
      <div
        onClick={onClick}
        className={`
          p-4 rounded-lg border-2 cursor-pointer transition-all
          ${selected 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    )
  }
  
  