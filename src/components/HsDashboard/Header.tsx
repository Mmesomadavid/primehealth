"use client"

import { FlagIcon, InboxIcon, Search, Settings, LogOut, User, MessageCircleReply } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../UI/Button'
import { Input } from '../UI/Input'
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar"
import { contextData } from '../../context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/UI/dropdown-menu"

export default function Header() {
  const {user} = contextData()

  const shortenText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text
  }

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: MessageCircleReply, label: 'Messages', href: '/messages' },
    { icon: InboxIcon, label: 'Inbox', href: '/inbox' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <header className="flex h-14 items-center gap-4 bg-gray-50 px-8 py-10">
      <div className="relative ml-6 flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="w-full max-w-[350px] pl-8 border-gray-400"
        />
      </div>
      <Button className="ml-auto rounded-full border border-gray-500 p-2">
        <FlagIcon className='w-5'/>
      </Button>
      <Button className="ml-auto rounded-full border border-gray-500 p-2">
        <InboxIcon className='w-5'/>
      </Button>
      <div className="flex items-center  gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4 cursor-pointer">
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{shortenText(`${user.firstName} ${user.lastName}`, 16)}</p>
                <p className="text-xs text-muted-foreground">{shortenText(user.email, 12)}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <AnimatePresence>
            <DropdownMenuContent 
              className="w-60 bg-white" 
              align="end"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm text-black font-medium">{shortenText(`${user.firstName} ${user.lastName}`, 18)}</p>
                    <p className="text-xs text-gray-900 text-muted-foreground">{shortenText(user.email, 12)}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 cursor-pointer"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="h-8 w-6  rounded-full text-gray-700 " />
                      <span>{item.label}</span>
                    </motion.a>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <motion.button
                    className="flex w-full items-center gap-2 text-red-600"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </motion.button>
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </header>
  )
}

