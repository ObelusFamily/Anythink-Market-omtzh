import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  const [show, setShow] = React.useState(false);
  function handleChange(e) {
    e.preventDefault();
    const title = e.target.value;

    if (title.length > 0) {
      props.onTitleChange(
        title,
        (page) => agent.Items.byName(title, page),
        agent.Items.byName(title)
      );
    } else {
      props.onTitleChange(
        "",
        (page) => agent.Items.all(page),
        agent.Items.all()
      );
    }
  }

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>
            A place to{" "}
            <span id="get-part" onClick={() => setShow((show) => !show)}>
              get
            </span>
          </span>
          {show ? (
            <input
              id="search-box"
              type="text"
              placeholder="What is it that you truly desire?"
              onChange={handleChange}
            />
          ) : null}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
