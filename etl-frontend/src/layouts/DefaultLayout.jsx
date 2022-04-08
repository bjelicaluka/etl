import React from "react";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { MainContentContainer } from "../components/Containers/MainContentContainer";
import { Navbar } from "../components/Navbar/Navbar";
import { Routes } from "../components/Routes/Routes";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { PageContentContainer } from "../components/Containers/PageContentContainer";

export const DefaultLayout = () => {

  return (
    <>
      <Sidebar />
      <MainContentContainer>
        <Navbar />
        <Breadcrumb />
        <PageContentContainer>
          <Routes />
        </PageContentContainer>
      </MainContentContainer>
    </>
  );
};