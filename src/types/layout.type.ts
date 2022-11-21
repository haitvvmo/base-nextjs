import { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  requireAuth?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
