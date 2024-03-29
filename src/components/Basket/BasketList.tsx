import React, { useContext } from "react";
import styled from "styled-components";

import { BasketProduct } from "hooks/useBasketProduct";
import { BasketContext } from "providers/BasketProvider";
import { colors } from "ui/colors";
import { device } from "ui/media";

import BasketItemC from "./BasketItem";

type Props = {
  data: BasketProduct[];
};

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
  td:not(:first-child) {
    padding-left: 15px;
  }

  tr:not(:last-child) {
    td {
      padding-bottom: 10px;
    }
  }

  @media ${device.tablet} {
    table-layout: auto;
  }
  @media ${device.mobile} {
    tbody {
      tr {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;

        :not(:last-child) {
          border-bottom: 1px solid ${colors.ebb};
        }

        td {
          :nth-child(1) {
            flex-basis: 30%;
            padding-bottom: 8px;
          }
          :nth-child(2) {
            flex-basis: 70%;
            padding-bottom: 8px;
          }
          :nth-child(3) {
            padding-left: 0;
            flex-basis: 30%;
          }
          :nth-child(4) {
            flex-basis: 50%;
          }
        }
      }
    }
  }
`;

const BasketList = ({ data }: Props) => {
  const { deleteBasketValue, addBasketValue, totalPrice } = useContext(
    BasketContext
  );
  if (!data.length) return null;
  return (
    <Table>
      <tbody>
        {data.map((baketItem) => (
          <BasketItemC
            key={baketItem.id}
            data={baketItem}
            onChange={addBasketValue}
            onDelete={deleteBasketValue}
          />
        ))}
        <tr>
          <td className="p-0"></td>
          <td className="p-0"></td>
          <td>
            <span className="font-weight-bold">Всего</span>
          </td>
          <td colSpan={2}>
            <span className="font-weight-bold">{totalPrice} руб</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default BasketList;
