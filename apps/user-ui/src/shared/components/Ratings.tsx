import React from "react";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

interface RatingProps {
  rating: number;
  size?: number;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  size = 20,
  color = "#fadb14",
}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarFilled key={i} style={{ color, fontSize: size }} />);
    } else if (i - rating <= 0.5 && i > rating) {
      stars.push(
        <StarTwoTone key={i} twoToneColor={color} style={{ fontSize: size }} />
      );
    } else {
      stars.push(<StarOutlined key={i} style={{ color, fontSize: size }} />);
    }
  }

  return <div style={{ display: "flex", gap: 2 }}>{stars}</div>;
};

export default Rating;
