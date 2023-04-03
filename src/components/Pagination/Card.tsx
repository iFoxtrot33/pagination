import React, { forwardRef } from "react";

import styles from "./Pagination.module.scss";

interface ICard {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface CardProps {
  card: ICard;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ card }, ref) => {
  console.log(card);
  const cardBody = (
    <>
      <div className={styles.title}>
        {card.id} {card.title}
      </div>
      <img src={card.thumbnailUrl} alt={`Photo No ${card.id}`} />
    </>
  );

  const content = ref ? (
    <div ref={ref as React.Ref<HTMLDivElement>}>{cardBody}</div>
  ) : (
    <div>{cardBody}</div>
  );
  return content;
});

export default Card;
