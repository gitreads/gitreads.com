import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { UseFetchSessionParams, useFetchSession } from "@lib/auth0"
import Page from "@components/page"
import Logo from "@components/logo"
import { Nav, MobileNav, NavItem, MenuButton, MenuContainer } from "@components/nav"
import { UserMenu, UserMenuItem, MobileUserMenu, MobileUserMenuItem } from "@components/user-menu"
import Footer from "@components/footer"

const apiBase = "/api/auth"
const logoutUrl = `${apiBase}/logout`

export const App = (): JSX.Element => {
  const router = useRouter()

  const params: UseFetchSessionParams = {
    loginIsRequired: true,
    redirectTo: router.pathname,
  }
  const { user, isLoading } = useFetchSession(params)

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return (
    <Page title="App - GitReads">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-gray-800">
          <div className="page-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-20">
                  <Logo href="/app" />
                </div>

                <Nav>
                  <NavItem href="/libraries">Libraries</NavItem>
                  <NavItem href="/books">Books</NavItem>
                </Nav>
              </div>

              <div className="flex items-center -mr-2 md:hidden">
                {!isLoading && <MenuButton isOpen={menuIsOpen} onMenuClick={handleMenuClick} />}
              </div>

              {!isLoading && (
                <div className="hidden md:block">
                  <UserMenu avatar={user.avatar} name={user.name} email={user.email}>
                    <UserMenuItem href={logoutUrl}>Logout</UserMenuItem>
                  </UserMenu>
                </div>
              )}
            </div>
          </div>
        </header>

        {!isLoading && (
          <MenuContainer isOpen={menuIsOpen}>
            <MobileNav>
              <NavItem href="/libraries">Libraries</NavItem>
              <NavItem href="/books">Books</NavItem>
            </MobileNav>

            <MobileUserMenu avatar={user.avatar} name={user.name} email={user.email}>
              <MobileUserMenuItem href={logoutUrl}>Logout</MobileUserMenuItem>
            </MobileUserMenu>
          </MenuContainer>
        )}

        <main className="flex-1">
          <div className="page-container"></div>
        </main>

        <Footer>
          <Link href="/">
            <a className="footer-link">Home</a>
          </Link>

          <a
            href="https://github.com/gitreads"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://danillouz.dev"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </Footer>
      </div>
    </Page>
  )
}

export default App
