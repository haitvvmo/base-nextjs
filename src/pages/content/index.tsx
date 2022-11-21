import React from "react";
import { NextPageWithLayout } from "types/layout.type";
import MainLayout from "layouts";
import Content from "components/content";
import { NextPageContext } from "next";

// need for SEO (server side render) -> pre-render on each request -> render exactly page from ads
export async function getServerSideProps(context: NextPageContext) {
  // call api get detail in here for SEO
  return {
    props: {}, // will be passed to the page component as props
  };
}

// need for build time render (if need require data to render page ) -> getStaticProps
export async function getStaticProps(context: NextPageContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

// pair with getStaticProps -> static pre-render all page with paths (dynamic router) -> for SEO to match keyword
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// if has getServerSideProps -> props is result from getServerSideProps function
const ContentPage: NextPageWithLayout = (props) => {
  return <Content />;
};

ContentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

ContentPage.requireAuth = true;

export default ContentPage;
