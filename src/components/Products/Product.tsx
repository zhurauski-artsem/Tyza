import React from "react";

import { ProductItemFragment } from "generated/graphql";
import TestImage from "images/icons/logo.svg";
import { H5 } from "ui/Title";

import ProductControls from "./ProductControls";
import * as Styled from "./Products.styled";

type Props = {
  short?: boolean;
  product: ProductItemFragment;
};

const Product = ({ product, short }: Props) => {
  const { id, name, description, costPer, price, images, stock } = product;
  const image = images[images.length - 1]?.uri;
  const imageUrl = image ? `${image}` : TestImage;

  return (
    <Styled.ProductWrapper>
      <Styled.ProductImage className="mb-2">
        <img src={imageUrl} alt={name} />
      </Styled.ProductImage>
      <Styled.ProductTitle>
        <H5>{name}</H5>
      </Styled.ProductTitle>
      {!!description && !short && (
        <Styled.ProductText className="mb-2 flex-grow-1">
          {description}
        </Styled.ProductText>
      )}
      <Styled.ProductText className="mb-2 mt-auto">
        Стоимость за {costPer}
        {short && <b>&nbsp;{price} руб</b>}
      </Styled.ProductText>
      {!short && (
        <Styled.ProductPrice className="mb-2">
          {!stock ? "Нет в наличии" : `${price} руб.`}
        </Styled.ProductPrice>
      )}
      {!!stock && <ProductControls id={id} column={short} />}
    </Styled.ProductWrapper>
  );
};

export default Product;
