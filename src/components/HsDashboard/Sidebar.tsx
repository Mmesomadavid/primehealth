import { Home, Inbox, BarChart2, HelpCircle, Settings, User, BoxIcon, Database, Plus, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../UI/Button'
import Logo from '../../assets/logo-black.svg'

interface SidebarProps {
  isOpen?: boolean
}

const Sidebar = ({ isOpen = true }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard/hospital/home' },
    { icon: Inbox, label: 'Inbox', path: '/dashboard/hospital/inbox' },
    { icon: BarChart2, label: 'Reporting', path: '/dashboard/hospital/reporting' },
    { icon: Database, label: 'Database', path: '/dashboard/hospital/database' },
    { icon: BoxIcon, label: 'Inventory', path: '/dashboard/hospital/inventory' },
    { icon: User, label: 'Profile', path: 'profile' },
  ]

  const bottomMenuItems = [
    { icon: HelpCircle, label: 'Help', path: '/dashboard/hospital/help' },
    { icon: Settings, label: 'Settings', path: '/dashboard/hospital/settings' },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white transition-transform duration-300 ease-in-out',
        !isOpen && '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <img src={Logo} alt="Logo" className="h-8" />
      </div>
      
      <div className="flex flex-col h-[calc(100vh-4rem)] p-4">
        <Button
          variant="outline"
          className="w-full justify-start mb-4 border-gray-400"
        >
          <Plus className="mr-3 h-5 w-5" />
          Create New
        </Button>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          {bottomMenuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <Button
            variant="default"
            className="w-full justify-start mt-2 border-2 border-gray-300"
          >
            <Zap className="mr-3 h-5 w-5" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

