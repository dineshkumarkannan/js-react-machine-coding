import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Version1 from "./Version1";
import Layout from "./Layout";
import Version2 from "./Version2";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<Version1 />}></Route>
        <Route path="/version2" element={<Version2 />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
