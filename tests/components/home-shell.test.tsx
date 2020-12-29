import { render } from "@testing-library/react"
import { useSession, Session } from "@lib/auth0"
import { HomeShell } from "@components/shell"
import { fakeUser } from "../fixtures/session"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe(`Home shell`, () => {
  beforeEach(() => {
    mockUseSession.mockClear()
  })

  describe(`when loading the user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: true,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getByTestId } = render(<HomeShell />)
      const logo = getByTestId("logo-with-name")
      expect(logo).toBeInTheDocument()
      expect(logo.parentNode).toHaveAttribute("href", "/")
    })

    it(`does not render login link`, () => {
      const { queryAllByText } = render(<HomeShell />)
      const links = queryAllByText("Login")
      expect(links).toHaveLength(0)
    })

    it(`does not render signup link`, () => {
      const { queryAllByText } = render(<HomeShell />)
      const links = queryAllByText("Signup")
      expect(links).toHaveLength(0)
    })
  })

  describe(`without a user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: null,
            isLoading: false,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getByTestId } = render(<HomeShell />)
      const logo = getByTestId("logo-with-name")
      expect(logo).toBeInTheDocument()
      expect(logo.parentNode).toHaveAttribute("href", "/")
    })

    it(`renders login link`, () => {
      const { getAllByText } = render(<HomeShell />)
      const links = getAllByText("Login")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/login?redirectTo=%2Fapp")
      }
    })

    it(`renders signup link`, () => {
      const { getAllByText } = render(<HomeShell />)
      const links = getAllByText("Signup")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/login?signup=true&redirectTo=%2Fapp")
      }
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<HomeShell />)

      const githubLink = getByText("GitHub")
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute("href", "https://github.com/gitreads")
      expect(githubLink).toHaveAttribute("target", "_blank")
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")

      const aboutLink = getByText("About")
      expect(aboutLink).toBeInTheDocument()
      expect(aboutLink).toHaveAttribute("href", "https://danillouz.dev")
      expect(aboutLink).toHaveAttribute("target", "_blank")
      expect(aboutLink).toHaveAttribute("rel", "noopener noreferrer")

      const copyright = getByTestId("copyright")
      expect(copyright).toBeInTheDocument()
      expect(copyright).toHaveTextContent(`© ${new Date().getFullYear()} GitReads`)
    })
  })

  describe(`with a user session`, () => {
    beforeEach(() => {
      mockUseSession.mockImplementation(
        (): Session => {
          return {
            user: fakeUser,
            isLoading: false,
          }
        }
      )
    })

    afterEach(() => {
      expect(mockUseSession).toBeCalledTimes(1)
    })

    it(`renders logo`, () => {
      const { getByTestId } = render(<HomeShell />)
      const logo = getByTestId("logo-with-name")
      expect(logo).toBeInTheDocument()
      expect(logo.parentNode).toHaveAttribute("href", "/")
    })

    it(`renders app link`, () => {
      const { getAllByText } = render(<HomeShell />)
      const links = getAllByText("App")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/app")
      }
    })

    it(`renders user's avatar`, () => {
      const { getAllByTestId } = render(<HomeShell />)
      const avatars = getAllByTestId("avatar")
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("src", fakeUser.avatar)
      }
    })

    it(`renders user's full name`, () => {
      const { getAllByText } = render(<HomeShell />)
      const avatars = getAllByText(fakeUser.name)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders user's email`, () => {
      const { getAllByText } = render(<HomeShell />)
      const avatars = getAllByText(fakeUser.email)
      expect(avatars).toHaveLength(2)

      for (const link of avatars) {
        expect(link).toBeInTheDocument()
      }
    })

    it(`renders logout link`, () => {
      const { getAllByText } = render(<HomeShell />)
      const links = getAllByText("Logout")
      expect(links).toHaveLength(2)

      for (const link of links) {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/api/auth/logout")
      }
    })

    it(`renders footer`, () => {
      const { getByText, getByTestId } = render(<HomeShell />)

      const githubLink = getByText("GitHub")
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute("href", "https://github.com/gitreads")
      expect(githubLink).toHaveAttribute("target", "_blank")
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")

      const aboutLink = getByText("About")
      expect(aboutLink).toBeInTheDocument()
      expect(aboutLink).toHaveAttribute("href", "https://danillouz.dev")
      expect(aboutLink).toHaveAttribute("target", "_blank")
      expect(aboutLink).toHaveAttribute("rel", "noopener noreferrer")

      const copyright = getByTestId("copyright")
      expect(copyright).toBeInTheDocument()
      expect(copyright).toHaveTextContent(`© ${new Date().getFullYear()} GitReads`)
    })
  })
})