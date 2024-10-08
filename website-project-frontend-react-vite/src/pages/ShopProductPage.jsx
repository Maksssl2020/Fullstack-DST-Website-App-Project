import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { transformLinkTitleIntoProductTitle } from "../helpers/transformProductTitle.js";
import ShopProductSection from "../components/section/ShopProductSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

const ShopProductPage = () => {
  const location = useLocation();
  const { cardColor } = location.state;
  const { id, title } = useParams();
  const productTitle = transformLinkTitleIntoProductTitle(title);

  return (
    <AnimatedPage>
      <div className="w-full bg-custom-gray-400 h-auto flex justify-center font-lato">
        <ShopProductSection
          productId={id}
          productTitle={productTitle}
          cardColor={cardColor}
        />
      </div>
    </AnimatedPage>
  );
};

export default ShopProductPage;
