import React from "react";
interface CardItem {
    title: string;
    organization: string;
    imageUrl: string;
    link?: string;
    date: string;
    description: string;
}
interface InfiniteMovingCardsProps {
    items: CardItem[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}
export declare const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps>;
export {};
