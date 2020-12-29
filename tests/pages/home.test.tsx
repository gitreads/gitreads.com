import { render } from "@testing-library/react"
import { useSession, Session } from "@lib/auth0"
import { Home } from "@pages/index"
import { fakeUser } from "../fixtures/session"

jest.mock("@lib/auth0")

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe(`Home`, () => {
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

    it(`renders main content`, () => {
      const { getByTestId, getByText } = render(<Home />)

      const hero = getByTestId("hero")
      expect(hero).toBeInTheDocument()

      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
    })

    it(`does not render login link`, () => {
      const { queryAllByText } = render(<Home />)
      const links = queryAllByText("Login")
      expect(links).toHaveLength(0)
    })

    it(`does not render signup link`, () => {
      const { queryAllByText } = render(<Home />)
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

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
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

    it(`renders main CTA`, () => {
      const { getByText } = render(<Home />)
      const cta = getByText("Git started")
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/app")
    })
  })
})