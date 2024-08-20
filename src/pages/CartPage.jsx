import React, { useContext, useState } from "react";
import AnimatedPage from "../animation/AnimatedPage";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import { useParams } from "react-router-dom";
import CartItemsTable from "../components/table/CartItemsTable";
import ButtonWithLink from "../components/universal/ButtonWithLink";
import CheckIcon from "../icons/CheckIcon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAllProductsFromCart,
  fetchShoppingCartByIdentifier,
} from "../helpers/api-integration/ShoppingCartHandling";
import toast from "react-hot-toast";
import Spinner from "../components/universal/Spinner";
import { AuthContext } from "../helpers/provider/AuthProvider";
import { formatCurrency } from "../helpers/CurrencyFormatter";
import { useForm } from "react-hook-form";
import { fetchDiscountCode } from "../helpers/api-integration/DiscountCodesHandling";
import { handleApplyingDiscountCode } from "../helpers/ApplyDiscountCodes";

const CartPage = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { identifier } = useParams();
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const [orderValueWithDiscount, setOrderValueWithDiscount] = useState();

  const { data: cartData, isLoading: fetchingCartData } = useQuery(
    ["userCartData", identifier, isAuthenticated],
    () => fetchShoppingCartByIdentifier(identifier, isAuthenticated),
  );

  const {
    mutate: deleteAllItemsFromCart,
    isLoading: deletingAllItemsFromCart,
  } = useMutation({
    mutationKey: ["deleteAllItemsFromCart", cartData?.id],
    mutationFn: () => deleteAllProductsFromCart(cartData?.id),
    onSuccess: () => {
      queryClient.invalidateQueries("cartPageItems");
      queryClient.invalidateQueries("amountOfItemsInCart");
      toast.success("Usunięto wszystkie produkty z koszyka!");
    },
    onError: (error) => console.log(error),
  });

  const { mutate: applyDiscountCode, isLoading: applyingDiscountCode } =
    useMutation({
      mutationKey: ["applyDiscountCode", getValues().discountCode],
      mutationFn: async () => {
        if (!errors?.discountCode) {
          const discountCodeData = await fetchDiscountCode(
            getValues().discountCode,
          );

          return handleApplyingDiscountCode(
            discountCodeData,
            cartData.totalPrice,
            userId,
          );
        }
      },
      onSuccess: (value) => {
        setOrderValueWithDiscount(value);
        toast.success(`Zastosowano kod zniżkowy: ${getValues().discountCode}!`);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  if (fetchingCartData || deletingAllItemsFromCart || applyingDiscountCode) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full gap-8 h-auto font-lato flex py-8 flex-col items-center bg-custom-gray-400">
        <MainBannerWithoutLogo bannerTitle={"Koszyk"} />
        <div className="w-[1350px] h-auto flex flex-col gap-4 items-center py-8 px-12 bg-custom-gray-100 rounded-2xl">
          <div className="w-[90%] h-[100px] relative px-8 bg-custom-gray-300 rounded-2xl text-2xl flex justify-center items-center">
            <div className="absolute left-4 flex items-center rounded-full bg-custom-orange-200">
              <CheckIcon size={"size-10 text-white"} />
            </div>
            <p>Strefa wysyłkowa dopasowana do klienta: &nbsp; "Polska"</p>
          </div>
          <CartItemsTable cartId={cartData?.id} />
          <div className="w-[90%] mt-12 flex justify-between">
            <ButtonWithLink
              link={"/rainbow-shop"}
              title={"Kontynuuj zakupy"}
              className={
                "h-[75px] rounded-2xl flex items-center justify-center w-[350px] uppercase font-bold text-2xl bg-custom-gray-300 hover:bg-custom-orange-200 hover:text-white"
              }
            />
            <div className="w-[550px] h-[75px] flex justify-between text-white text-xl">
              <button
                onClick={deleteAllItemsFromCart}
                className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200"
              >
                wyczyść
              </button>
              <button className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200">
                odśwież
              </button>
            </div>
          </div>
          <div className="mt-6 flex w-[90%]">
            <div className="flex flex-col w-[35%] h-auto mr-auto gap-3">
              <h3 className="font-bold text-2xl">Kod rabatowy</h3>
              <p className="text-xl">Masz kod rabatowy? Wpisz go tutaj.</p>
              <input
                placeholder={"Wpisz kod rabatowy"}
                className={
                  "w-full h-[50px] rounded-2xl focus:outline-custom-orange-200  border-2 border-black px-4 placeholder:text-black text-black"
                }
                {...register("discountCode", {
                  required: true,
                })}
              />
              <button
                onClick={handleSubmit(applyDiscountCode)}
                className="ml-auto font-bold text-xl border-b-2 border-custom-orange-200"
              >
                Aktywuj kod
              </button>
              <h3 className="font-bold text-2xl">Karta podarunkowa</h3>
              <p className="text-xl">
                Posiadasz kartę podarunkową? Podaj jej numer.
              </p>
              <input
                placeholder={"Numer karty podarunkowej"}
                className="w-full h-[50px] rounded-2xl border-2 focus:outline-custom-orange-200 border-black px-4 placeholder:text-black text-black"
              />
              <button className="ml-auto font-bold text-xl border-b-2 border-custom-orange-200">
                Zastosuj
              </button>
            </div>
            <div className="ml-auto w-[42%]">
              <h3 className="font-bold text-2xl">Podsumowanie koszyka</h3>
              <div className="w-full h-auto p-4 bg-custom-gray-300 text-xl rounded-2xl grid grid-cols-2">
                <div className="col-span-1 uppercase grid grid-rows-5 gap-8">
                  <p className="row-span-1">Suma:</p>
                  <p className="row-span-3">Wysyłka:</p>
                  <p className="row-span-1">Łącznie:</p>
                </div>
                <div className="col-span-1 uppercase grid grid-rows-5 gap-8">
                  <p className="row-span-1">
                    {orderValueWithDiscount
                      ? orderValueWithDiscount
                      : formatCurrency(cartData.totalPrice)}
                  </p>
                  <div className="row-span-3">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <p className="row-span-1">265,50 zł</p>
                </div>
              </div>
              <ButtonWithLink
                link={`/rainbow-shop/order/${identifier}`}
                title={"Przejdź do płatności"}
                className={
                  "h-[75px] ml-auto mt-8 rounded-2xl flex items-center justify-center w-[350px] uppercase font-bold text-2xl bg-custom-gray-300 hover:bg-custom-orange-200 hover:text-white"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CartPage;
