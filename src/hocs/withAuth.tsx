import React from "react";
import { getSession } from "next-auth/react";

export default function withAuth<T>(Component: React.ComponentType<T>) {
  const withAuth = (props: any) => {
    return <Component {...props} />;
  };

  withAuth.getServerSideProps = async () => {
    const session = await getSession();
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {};
  };

  return withAuth;
}
