import { connect } from "react-redux";
import { TITLE_CHANGE } from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
    ...state.itemList,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    onChangeItem: (title) =>
      dispatch({ type: TITLE_CHANGE, payload: title }),
  });
  

function SearchBox(props) {
    return (
        <span className="search-container">
        <input
          id="search-box"
          placeholder="What is it that you truly desire?"
          value={props.title}
          onChange={(e) => {
            props.onChangeItem(e.target.value)
          }}
        />
        <i className="bi bi-search" />
      </span>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
