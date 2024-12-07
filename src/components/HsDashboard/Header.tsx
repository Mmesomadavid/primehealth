import { Bell, Search, ArrowLeft } from 'lucide-react'
import { Input } from '../UI/Input'
import { Button } from '../UI/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../UI/Avatar'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault()
      ;(e.target as HTMLInputElement).select()
    }
  }

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search... (Ctrl+L)"
            className="pl-10 w-full"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header

