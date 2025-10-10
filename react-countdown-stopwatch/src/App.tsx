import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import CountDown from "./feature/count-down/CountDown";
import StopWatch from "./feature/stop-watch/StopWatch";
import Layout from "./layouts/Layout";

function App() {
  const render = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<CountDown />} />
        <Route path="/stop-watch" element={<StopWatch />} />
      </Route>
    )
  );
  return <RouterProvider router={render}></RouterProvider>;
}

export default App;
