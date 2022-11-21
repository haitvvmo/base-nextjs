import React from "react";
import { NextPageWithLayout } from "types/layout.type";
import DefaultLayout from "layouts/default";

const LandingPage: NextPageWithLayout = () => {
    return <>
        <span>Landing page</span>
    </>
}

LandingPage.getLayout = function getLayout(page: React.ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default LandingPage;
