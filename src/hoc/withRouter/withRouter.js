import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const withRouter = Component => {
  return props => (
    <Component
      {...props}
      params={useParams()}
      navigate={useNavigate()}
      location={useLocation()}
    />
  );
};

export default withRouter;
