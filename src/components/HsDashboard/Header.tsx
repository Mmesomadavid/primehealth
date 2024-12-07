
import { Bell, Menu } from 'lucide-react'
import { Button } from '../UI/Button'
import { Input } from '../UI/Input'
import { Avatar, AvatarFallback, AvatarImage } from '../UI/Avatar'

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <Input
          type="search"
          placeholder="Search..."
          className="w-64"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

