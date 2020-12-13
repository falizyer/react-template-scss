import React from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("rts__overlay");

class Overlay extends React.Component<{top: number, left: number, className?: string}> {
  container;
  
  constructor(props) {
    super(props);
    this.container = document.createElement("section");
    this.container.classList.add("rts__overlay__item");
    this.container.style.marginTop = `${props.top}px`;
    this.container.style.marginLeft = `${props.left}px`;
    if (props.className) {
      this.container.classList.add(...props.className.split(" "));
    }
  }

  componentDidMount() {
    portalRoot?.appendChild(this.container);
  }

  componentWillUnmount() {
    portalRoot?.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.container
    );
  }
}

export default Overlay;
