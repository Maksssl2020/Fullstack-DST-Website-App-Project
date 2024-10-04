import { useQuery } from "react-query";
import { fetchAllDiscountCodes } from "../../helpers/api-integration/DiscountCodesHandling.js";

function UseDiscountCodes() {
  const { data: discountCodes, isLoading: fetchingDiscountCodes } = useQuery(
    ["discountCodesData"],
    () => fetchAllDiscountCodes(),
  );

  return { discountCodes, fetchingDiscountCodes };
}

export default UseDiscountCodes;
