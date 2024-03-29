import { DELIVERY_PRICE, PRICE_FOR_FREE_DELIVERY } from "modals/BasketModal";
import React, { ReactNode, useContext, useMemo, useState } from "react";

import { DataContext } from "./DataProvider";

type Props = {
  children: ReactNode;
};

export type BasketValue = { [key in ID]: number };

type BasketContext = {
  totalPrice: number;
  deliveryPrice: number;
  basketValues: BasketValue;
  clearBasket: () => void;
  deleteBasketValue: (id: ID) => void;
  addBasketValue: (basketValue: BasketValue) => void;
};

export const BasketContext = React.createContext<BasketContext>({
  totalPrice: 0,
  deliveryPrice: 0,
  basketValues: {},
  clearBasket: () => {},
  addBasketValue: () => {},
  deleteBasketValue: () => {},
});

const BasketProvider = ({ children }: Props) => {
  const { products } = useContext(DataContext);
  const [basketValues, setBasketValues] = useState<BasketValue>({});

  const addBasketValue = (basketValue: BasketValue) => {
    setBasketValues((pV) => ({ ...pV, ...basketValue }));
  };

  const deleteBasketValue = (id: ID) => {
    if (basketValues[id]) {
      const copyBasketValues = { ...basketValues };
      delete copyBasketValues[id];
      setBasketValues(copyBasketValues);
    }
  };

  const totalPrice: number = useMemo(() => {
    const basketProductsIds = Object.keys(basketValues);
    const hasBasketItems: boolean = !!basketProductsIds.length;
    let price = 0;
    if (hasBasketItems) {
      basketProductsIds.forEach((key) => {
        const product = products.find(({ id }) => id === key);
        if (product) {
          price += product.price * basketValues[key];
        }
      });
    }
    return +price.toFixed(2);
  }, [basketValues, products]);

  const deliveryPrice: number = useMemo(() => {
    if (totalPrice >= PRICE_FOR_FREE_DELIVERY) {
      return 0;
    } else {
      return DELIVERY_PRICE;
    }
  }, [totalPrice]);

  const clearBasket = () => {
    setBasketValues({});
  };

  return (
    <BasketContext.Provider
      value={{
        totalPrice,
        clearBasket,
        basketValues,
        deliveryPrice,
        addBasketValue,
        deleteBasketValue,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
