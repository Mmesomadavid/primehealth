import React from 'react'
import { useState } from 'react'
import { Home, Inbox, BarChart, FolderKanban, Target, HelpCircle, Settings, Plus, Zap } from 'lucide-react'
import { cn } from "../../lib/utils"
import { Button } from '../UI/Button'
import Logo from '../../assets/logo-black.svg'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  icon: React.ReactNode
  label: string
  badge?: number
  variant?: "default" | "secondary" | "ghost" | "outline"
}

export function Sidebar({ className, isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const topItems: SidebarItem[] = [
    { icon: <Plus className="h-4 w-4" />, label: "Create New", variant: "default" },
    { icon: <Home className="h-4 w-4" />, label: "Home", variant: "secondary" },
    { icon: <Inbox className="h-4 w-4" />, label: "Inbox", badge: 15 },
    { icon: <BarChart className="h-4 w-4" />, label: "Reporting" },
    { icon: <FolderKanban className="h-4 w-4" />, label: "Portfolios" },
    { icon: <Target className="h-4 w-4" />, label: "Goals", badge: 8 },
  ]

  const settingsItems: SidebarItem[] = [
    { icon: <HelpCircle className="h-4 w-4" />, label: "Get Help" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ]

  const renderSidebarItem = (item: SidebarItem) => (
    <Button
      key={item.label}
      variant={item.variant || "ghost"}
      className={cn(
        "w-full justify-start",
        "hover:bg-accent hover:text-accent-foreground",
        "active:bg-accent active:text-accent-foreground",
        activeItem === item.label && "bg-accent text-accent-foreground",
        "shadow-sm transition-colors duration-200"
      )}
      onClick={() => setActiveItem(item.label)}
    >
      {item.icon}
      <span className="ml-2">{item.label}</span>
      {item.badge && (
        <span className="ml-auto text-xs bg-primary/10 rounded-full px-2">
          {item.badge}
        </span>
      )}
    </Button>
  )

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4">
          <img src={Logo} alt="logo" draggable="false" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-semibold">PrimeHealth</h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {topItems.map(renderSidebarItem)}
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t">
          <div className="space-y-1">
            {settingsItems.map(renderSidebarItem)}
          </div>
          <Button
            variant="outline"
            className="w-full justify-start mt-4 hover:bg-accent hover:text-accent-foreground shadow-sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  )
}

