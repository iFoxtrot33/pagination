import React from "react";
import axios from "axios";

import styles from "./Pagination.module.scss";
//This is a test Pagination component
//This is a test API
const API_URL = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=";
const TOTAL_COUNT_HEADER = "x-total-count";

// This is a test interface
interface ICard {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IPaginationProps {
  API_URL: string;
  TOTAL_COUNT_HEADER: string;
  dynamic: boolean;
}

const useInfiniteScroll = (scrollHandler: (e: Event) => void) => {
  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler as EventListener);

    return function () {
      document.removeEventListener("scroll", scrollHandler as EventListener);
    };
  }, [scrollHandler]);
};

const Pagination: React.FC<IPaginationProps> = ({
  API_URL,
  TOTAL_COUNT_HEADER,
  dynamic = true,
}): JSX.Element => {
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const fetchCards = async () => {
    if (fetching) {
      try {
        const response = await axios.get<ICard[]>(`${API_URL}${currentPage}`);
        setCards([...cards, ...response.data]);
        setCurrentPage((prev) => prev + 1);
        setTotalCount(response.headers[`${TOTAL_COUNT_HEADER}`]);
      } finally {
        setFetching(false);
      }
    }
  };

  React.useEffect(() => {
    fetchCards();
  }, [fetching]);

  const scrollHandler = (e: Event): void => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      cards.length < totalCount &&
      dynamic === true &&
      !fetching
    ) {
      setFetching(true);
    }
  };

  useInfiniteScroll(scrollHandler);

  const loadMore = (): void => {
    if (!fetching) {
      setFetching(true);
    }
  };

  return (
    <div className={styles.app}>
      {cards.map((card) => (
        <div className={styles.card} key={card.id}>
          <div className={styles.title}>
            {card.id} {card.title}
          </div>
          <img src={card.thumbnailUrl} alt={`Photo No ${card.id}`} />
        </div>
      ))}
      {!dynamic && (
        <button onClick={() => loadMore()}>Load 10 more cards</button>
      )}
    </div>
  );
};

export default Pagination;
