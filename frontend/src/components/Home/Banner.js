import React from "react";
import logo from "../../imgs/logo.png";
import { connect } from "react-redux";
import { CHANGE_TITLE } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.home,
  ...state.itemList,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTitle: (title) => dispatch({ type: CHANGE_TITLE, payload: title }),
});

const Banner = (props) => {
  const notFound =
    props.title && props.title?.length > 2 && props.items?.length === 0;

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to get</span>
          <span className="search-container">
            <input
              id="search-box"
              placeholder="What is it that you truly desire?"
              value={notFound ? "" : props.title}
              onChange={(e) => props.onChangeTitle(e.target.value)}
            />
            <i className="bi bi-search" />
          </span>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
