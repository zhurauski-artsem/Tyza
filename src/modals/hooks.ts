import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const MODAL_NAMES = {
  orderModal: "orderModal",
  basketModal: "backetModal",
  orderResult: "orderResult",
  callModal: "callModal",
} as const;

export type TModalName = typeof MODAL_NAMES[keyof typeof MODAL_NAMES];

type SearchParams = { [key: string]: any } | undefined;

const useModal = () => {
  const history = useHistory();

  const { pathname, search } = useLocation();

  const openModal = (modalName: TModalName, searchParams?: SearchParams) => {
    const parsedSearchParams = getUrlParams({
      modal: modalName,
      ...searchParams,
    });
    history.push(`${pathname}${parsedSearchParams}`, {
      modal: true,
    });
  };

  const closeModal = () => {
    history.push(pathname, {
      modal: false,
    });
  };

  const modalQueryParams = useMemo(() => {
    if (!search) return {};
    try {
      const correactedSearch = search.substring(1);
      const result = JSON.parse(
        '{"' +
          decodeURI(correactedSearch)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
      return result;
    } catch (e) {
      console.error(e);
    }
  }, [search]);

  return { openModal, closeModal, modalQueryParams };
};

const getUrlParams = (searchParams: SearchParams): string => {
  if (!searchParams || !Object.keys(searchParams).length) {
    return "";
  } else {
    const urlParams = new URLSearchParams(searchParams).toString();
    return "?" + urlParams;
  }
};

export default useModal;
