import { createBrowserRouter } from "react-router-dom";
import SellerLayout from "./components/sellerComponents/SellerLayout";
import AdminLayout from "./components/adminComponents/AdminLayout";
import ProductBuyNowPage from "./components/buyNow/ProductBuyNowPage";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home/Home";
import AboutUs from "./components/aboutus/AboutUs";


export const router = createBrowserRouter([
    {path:'/',element:<Home/>},{
        path: "/seller/*",
        element: <SellerLayout></SellerLayout>},
        {
            path: "/admin/*",
            element: <AdminLayout></AdminLayout>},
            {
                path: "/productDetails:productId",
                element: <ProductBuyNowPage></ProductBuyNowPage>},
                {path:'/contact',
                    element: <ContactUs/>
                },
                {path:'/about',
                    element: <AboutUs/>
                }
])