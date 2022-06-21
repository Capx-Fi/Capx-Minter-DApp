import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NotFound from "../../assets/404.svg";
import Header from "../../components/Header/Header";
import "./PageNotFound.scss";
import Level3CTA from "../../components/CTA/Level3CTA";
import { Link } from "react-router-dom";

function PageNotFound() {
  const { t } = useTranslation();
  return (
    <article
      className="pagenotfound"
    >
      <Header hiddenNav landing />
     
      <section className="pagenotfound_maincontainer">
        <div className="pagenotfound_maincontainer_herocontainer">
          <img
            className="pagenotfound_maincontainer_herocontainer_notfounfillustration"
            src={NotFound}
            alt="Not Found Illustration"
          />
          <div className="pagenotfound_maincontainer_herocontainer_subtitle">
            {t("page_not_found")}
          </div>
          <Link to="/">
          <Level3CTA
            text="Go To Homepage"
              icon={true}
              onClick={() => {}}
            />
          </Link>
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default PageNotFound;
