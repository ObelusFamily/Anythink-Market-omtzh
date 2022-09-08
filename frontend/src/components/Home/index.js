import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => {
  return {
    ...state.home,
    ...state.itemList,
    appName: state.common.appName,
    token: state.common.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

function Home(props) {
  let { token, tags, onLoad, onUnload, onClickTag } = props;
  React.useEffect(() => {
    const tab = "all";
    const itemsPromise = agent.Items.all;

    if (props.title.length === 0) {
      // load all items
      console.log("loading all items");
      onLoad(
        tab,
        itemsPromise,
        Promise.all([agent.Tags.getAll(), itemsPromise("", 0)])
      );
    } else {
      // search db for item
      onLoad(
        tab,
        itemsPromise,
        Promise.all([agent.Tags.getAll(), itemsPromise(props.title, 0)])
      );
    }

    return () => {
      onUnload();
    };
  }, [onLoad, onUnload, props.title, token]);

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <Tags tags={tags} onClickTag={onClickTag} />
        {props.items !== undefined &&
        props.items.length === 0 &&
        props.title.length > 2 ? (
          <div id="empty">
            <h3>No items found for {props.title}</h3>
          </div>
        ) : null}

        <MainView />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
