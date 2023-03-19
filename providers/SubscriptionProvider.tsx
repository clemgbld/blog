"use client";
import { createContext, useContext, ReactNode } from "react";
import create from "zustand";
import { createSubscriptionStore } from "../core/frontend/subscription/use-cases/subscribe-to-news-letter";
import { notificationService } from "../infrastructure/frontend/notification/notification-service";
import { buildInMemorySubscriptionGateway } from "../infrastructure/frontend/subscription/in-memory-subscription-gateway";
import { NotificationService } from "../core/frontend/port/notification-service";
import { SubscriptionGateway } from "../core/frontend/subscription/port/subscription-gateway";

const SubscriptionContext = createContext(
  create(
    createSubscriptionStore({
      notificationService,
      subscriptionGateway: buildInMemorySubscriptionGateway({}),
    })
  )
);

export const SubscriptionProvider = ({
  children,
  notificationService,
  subscriptionGateway,
}: {
  children: ReactNode;
  notificationService: NotificationService;
  subscriptionGateway: SubscriptionGateway;
}) => {
  const subscriptionStore = create(
    createSubscriptionStore({
      notificationService,
      subscriptionGateway,
    })
  );

  return (
    <SubscriptionContext.Provider value={subscriptionStore}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionStore = () => useContext(SubscriptionContext);
