import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import ApplicationLayout from "./layout/ApplicationLayout.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account";
import SupportUs from "./pages/SupportUs";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import RainbowShop from "./pages/RainbowShop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Forum from "./pages/Forum";
import ForumPostForm from "./pages/ForumPostForm";
import ContactUs from "./pages/ContactUs";
import ShopProductPage from "./pages/ShopProductPage";
import NewsPostForm from "./pages/NewsPostForm";
import HomeNewsPostForm from "./pages/HomeNewsPostForm";
import ProductForm from "./pages/ProductForm";
import { AnimatePresence } from "framer-motion";
import Article from "./pages/Article";
import ArticleForm from "./pages/ArticleForm";

function App() {
  const router = createBrowserRouter([
    {
      element: <ApplicationLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home-news/add-post",
          element: <HomeNewsPostForm />,
        },
        {
          path: "/home-news/edit-post/:id",
          element: <HomeNewsPostForm />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/support-us",
          element: <SupportUs />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/news/add-post",
          element: <NewsPostForm />,
        },
        {
          path: "/news/edit-post/:id",
          element: <NewsPostForm />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/rainbow-shop",
          element: <RainbowShop />,
        },
        {
          path: `/rainbow-shop/products/:title`,
          element: <ShopProductPage />,
        },
        {
          path: "/rainbow-shop/products/:category/:type",
          element: <ProductForm />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/forum",
          element: <Forum />,
        },
        {
          path: "/forum/create-post",
          element: <ForumPostForm />,
        },
        {
          path: "/forum/edit-post/:id",
          element: <ForumPostForm />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/article/:id",
          element: <Article />,
        },
        {
          path: "/article/add-article",
          element: <ArticleForm />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode={"wait"}>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
