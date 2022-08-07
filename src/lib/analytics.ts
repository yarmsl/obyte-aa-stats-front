/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer: Record<string, any> | undefined;
    [key: string]: any;
  }
}

enum AnalyticsEvents {
  SEARCH_EVENT = 'searchEvent',
  HOMEPAGE_CLICK_EVENT = 'homepageClickEvent',
  EXPLORER_CLICK_EVENT = 'explorerClickEvent',
  GITHUB_CLICK_EVENT = 'githubClickEvent',
  NAVIGATION_EVENT = 'navigationEvent',
}

const sendToAnalytics = (analyticsData: {
  event: string;
  value?: string;
}): void => {
  if (window && window.dataLayer) {
    window.dataLayer.push(analyticsData);
  }
};

export const fireSearchAnalitycsEvent = (searchText: string): void =>
  sendToAnalytics({ event: AnalyticsEvents.SEARCH_EVENT, value: searchText });

export const homepageAnalyticsClickEvent = (): void =>
  sendToAnalytics({ event: AnalyticsEvents.HOMEPAGE_CLICK_EVENT });

export const explorerAnalyticsClickEvent = (): void =>
  sendToAnalytics({ event: AnalyticsEvents.EXPLORER_CLICK_EVENT });

export const githubAnalyticsClickEvent = (): void =>
  sendToAnalytics({ event: AnalyticsEvents.GITHUB_CLICK_EVENT });

export const fireNavigationAnalyticsEvent = (fullUrl: string): void =>
  sendToAnalytics({ event: AnalyticsEvents.NAVIGATION_EVENT, value: fullUrl });
