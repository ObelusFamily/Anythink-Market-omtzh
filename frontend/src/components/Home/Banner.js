import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import { connect } from "react-redux";
import { CHANGE_TITLE } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.itemList,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTitle: (title, payload, pager) =>
    dispatch({ type: CHANGE_TITLE, title, pager, payload }),
});

const Banner = (props) => {
  const notFound =
    props.title && props.title?.length > 2 && props.items?.length === 0;

  function handleChange(e) {
    const title = e.target.value;
    props.onChangeTitle(
      title,
      agent.Items.byName(title, 0),
      agent.Items.byName
    );
  }

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
              onChange={handleChange}
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
