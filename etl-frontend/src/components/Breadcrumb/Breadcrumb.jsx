import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {

  const location = useLocation();
  const allPathnameTokens = location.pathname.split("/");

  const pathnameTokens = allPathnameTokens.slice(1, allPathnameTokens.length);

  const transformToken = (token) => {
    return token.split("-").map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
  }

  const getUrlFromToken = (token) => {
    const tokenIndex = allPathnameTokens.findIndex(t => t === token) + 1;
    return allPathnameTokens.slice(0, tokenIndex).join("/");
  }

  const getCurrentPageName = () => {
    const lastToken = pathnameTokens[pathnameTokens.length-1];
    return lastToken === "" ? "Dashboard" : transformToken(lastToken);
  }

  return (
    <div className="header pb-3">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-7 col-md-10 col-sm-12">
              <h6 className="h2 text-white d-inline-block mb-0">{getCurrentPageName()}</h6>
              <nav aria-label="breadcrumb" className="d-none d-block ml-md-4">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark bg-dark">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white">
                      <i className="fas fa-home"></i>
                    </Link>
                  </li>
                  {pathnameTokens.map((token, i) => 
                    <li key={i} className="breadcrumb-item text-white">
                      <Link to={getUrlFromToken(token)} className="text-white">
                        {transformToken(token)}
                      </Link>
                    </li>
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};