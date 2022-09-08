import { connect } from "react-redux";
import { TITLE_CHANGE } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state.itemList,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeItem: (title) => dispatch({ type: TITLE_CHANGE, payload: title }),
});

function SearchBox(props) {
  const notFound =
    props.title && props.title.length > 1 && props.items.length === 0;
  return (
    <span className="search-container">
      <input
        id="search-box"
        placeholder="What is it that you truly desire?"
        value={notFound ? "" : props.title}
        onChange={(e) => {
          props.onChangeItem(e.target.value);
        }}
      />
      <i className="bi bi-search" />
    </span>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
