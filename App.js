import { GlobalContextProvider } from "./src/context/GlobalContext"
import Router from "./src/routes/Router"

export default function App() {

  return (
    <GlobalContextProvider>
      <Router />
    </GlobalContextProvider>
  )
}
