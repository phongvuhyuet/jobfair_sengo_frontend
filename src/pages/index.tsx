import HomeContainer from "src/containers/home-container/index";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Layout from "src/containers/app-layout/index";

const Home: NextPageWithLayout = () => {
  return <HomeContainer />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Home;
