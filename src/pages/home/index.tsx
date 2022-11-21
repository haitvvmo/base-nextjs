import React from 'react';
import { NextPageWithLayout } from "types/layout.type";
import MainLayout from 'layouts';
import Home from 'components/home';

const HomePage: NextPageWithLayout = () => {
    return <Home />
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

HomePage.requireAuth = true; // if need auth to access page -> true

export default HomePage;
