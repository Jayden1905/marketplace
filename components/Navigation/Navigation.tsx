'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ThemeModeToggle } from '../Theme/ThemeModeToggle'
import { ThemeColorToggle } from '../Theme/ThemeColorToggle'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

const menu: {
  title: string
  subLinks: { title: string; href: string; description: string }[]
}[] = [
  {
    title: 'Home',
    subLinks: components,
  },
  {
    title: 'Research',
    subLinks: components,
  },
  {
    title: 'Technology',
    subLinks: components,
  },
  {
    title: 'Innovation',
    subLinks: components,
  },
]

const singleMenu: { title: string; href: string }[] = [
  { title: 'FAQs', href: '/faqs' },
  { title: 'Contact Us', href: '/contact-us' },
]

export default function NavigationMenuBar() {
  return (
    <nav className='w-full p-4 z-30 bg-white dark:bg-background'>
      <div className='container mx-auto px-4'>
        <div className='sm:px-4 flex justify-between items-center mb-3'>
          <Link
            href={'/'}
            className='text-primary tracking-wide text-xl font-bold uppercase'
          >
            MarketPlace
          </Link>
          <div className='flex gap-2'>
            <div className='hidden md:block'>
              <ThemeColorToggle />
            </div>
            <div className='block md:hidden'>
              <MobileMenu />
            </div>
            <ThemeModeToggle />
          </div>
        </div>
        <NavigationMenu className='hidden md:block'>
          <NavigationMenuList className='flex-wrap'>
            {menu.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className='text-lg'>
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {item.subLinks.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {singleMenu.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={`${item.href}`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${cn(navigationMenuTriggerStyle(), 'text-lg')}`}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Menu className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        <ScrollArea className='h-72 w-48 rounded-md'>
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
              <ul>
                {item.subLinks.map((component) => (
                  <DropdownMenuItem key={component.title}>
                    <Link href={component.href} passHref>
                      {component.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </ul>
              <DropdownMenuSeparator />
            </React.Fragment>
          ))}
          {singleMenu.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link href={`${item.href}`}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ListItem = React.forwardRef<
  React.Ref<HTMLAnchorElement>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline
            outline-none transition-colors hover:bg-accent hover:text-accent-foreground
            focus:bg-accent focus:text-accent-foreground`,
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
