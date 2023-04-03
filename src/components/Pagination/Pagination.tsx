import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "../../api/axios";
import Card from "./Card";

import styles from "./Pagination.module.scss";
//This is a test Pagination component
//This is a test API

// This is a test interface

interface ICard {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Pagination: React.FC = (): JSX.Element => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/photos",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = React.useRef<IntersectionObserver | undefined>();
  const lastCardRef = React.useCallback(
    (card: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((cards) => {
        if (cards[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (card) intObserver.current.observe(card);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error")
    return <p className="center">Error: {(error as Error).message}</p>;

  const content = data?.pages.map((pg: ICard[]) => {
    return pg.map((card: ICard, i: number) => {
      if (pg.length === i + 1) {
        return <Card ref={lastCardRef} key={card.id} card={card} />;
      }
      return <Card key={card.id} card={card} />;
    });
  });

  return (
    <div className={styles.app}>
      {content}
      {isFetchingNextPage && <p className="center">Loading More Cards...</p>}
    </div>
  );
};

export default Pagination;
