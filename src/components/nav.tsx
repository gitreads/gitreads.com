import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"

type NavProps = {
  children?: React.ReactNode
}

export const Nav = (props: NavProps): JSX.Element => {
  return (
    <nav className="hidden md:block">
      <div className="flex items-baseline space-x-4">{props.children}</div>
    </nav>
  )
}

export const MobileNav = (props: NavProps): JSX.Element => {
  return <nav className="px-3 py-5 border-b border-gray-700">{props.children}</nav>
}

type NavItemProps = {
  href: string
  children: React.ReactNode
}

export const NavItem = (props: NavItemProps): JSX.Element => {
  const { href, children } = props

  const router = useRouter()
  const isActive = router?.pathname === href

  return (
    <Link href={href}>
      <a
        className={clsx("nav-link", {
          "text-white bg-gray-900": isActive,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

type MenuButtonProps = {
  isLoading: boolean
  onMenuClick(event: React.MouseEvent<HTMLButtonElement>): void
  isOpen: boolean
}

export const MenuButton = (props: MenuButtonProps): JSX.Element => {
  return (
    <button
      disabled={props.isLoading}
      className="inline-flex items-center justify-center p-2 text-gray-400 transition-colors duration-200 rounded-lg hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:ring-2 focus:ring-fuchsia-400"
      aria-label="Open menu"
      onClick={props.onMenuClick}
    >
      <svg className="block w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {props.isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 8h16M4 16h16"
          />
        )}
      </svg>
    </button>
  )
}

type MenuContainerProps = {
  isOpen
  children?: React.ReactNode
}

export const MenuContainer = (props: MenuContainerProps): JSX.Element => {
  const { isOpen } = props

  return (
    <div
      className={clsx(
        "md:hidden sticky top-header-height z-10 bg-gray-800 border-b border-gray-700",
        {
          block: isOpen,
          hidden: !isOpen,
        }
      )}
    >
      {props.children}
    </div>
  )
}
