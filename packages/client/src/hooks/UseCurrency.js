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

  const getPrice = (amount) => {
    const currentPrice = amount * state.multiplier.toFixed()
    return `${state.currencySymbol} ${currentPrice}`
  }

  return (
    <CurrencyContext.Provider
      value={{ currencySymbol: state.currencySymbol, currentCurrency, getPrice }}
      {...props}
    />
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error(`useCurrency must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext = ({ children }) => (
  <CurrencyProvider>{children}</CurrencyProvider>
)
