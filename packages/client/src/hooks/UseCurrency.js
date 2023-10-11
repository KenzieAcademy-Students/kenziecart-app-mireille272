import { createContext } from "react"
import { useReducer, useContext } from "react"

const initialState = {
  currencySymbol: "$",
  multiplier: 1,
}

const CurrencyContext = createContext(initialState)

function currencyReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENCY": {
      return {
        ...state,
        currencySymbol: state.currencySymbol === "$" ? "€" : "$",
        multiplier: state.multiplier === 1 ? 0.8 : 1,
      }
    }
    default:
      return state
  }
}


export const CurrencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState)

  const currentCurrency = () => dispatch({ type: "SET_CURRENCY" })
//   const euros = () => dispatch({ type: "SET_CURRENCY" })
//   const toggleSidebar = () =>
//     state.displaySidebar
//       ? dispatch({ type: "CLOSE_SIDEBAR" })
//       : dispatch({ type: "OPEN_SIDEBAR" })
//   const closeSidebarIfPresent = () =>
//     state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" })

//   const value = useMemo(
//     () => ({
//       ...state,
//       dollars,
//       euros,
//       toggleSidebar,
//       closeSidebarIfPresent,
//     }),
//     [state]
//   )

  return <CurrencyContext.Provider value={value} {...props} />
}

const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error(`useCurrency must be used within a UIProvider`)
  }
  return context
}

const getPrice = (amount) =>{
    const currentPrice = state.cartTotal * state.multiplier
    return `${state.currencySymbol} ${currentPrice}`
}

export const ManagedUIContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
)
