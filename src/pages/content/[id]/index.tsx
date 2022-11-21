import React from 'react';
import { NextPageWithLayout } from "types/layout.type";
import CustomLayout from 'layouts/custom';
import ContentDetail from 'components/content/detail';

const ContentDetailPage: NextPageWithLayout = () => {
    return <ContentDetail />
};

ContentDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <CustomLayout>{page}</CustomLayout>;
};

ContentDetailPage.requireAuth = true;

export default ContentDetailPage;
