class ExpandableContainer extends HTMLElement {

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.state = { open: false, closedHeight : null }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    var el = this;
    console.log("attribute changed callback:", name, oldValue, newValue);

    el.addEventListener("transitionend", function() {
      if (el.state.open) {
        el.style.height = "auto";
      }
    });

    if (name == "open") {
      if (newValue == "true") {
        el.state.fullHeight = el.scrollHeight;
        el.state.closedHeight = el.clientHeight;
        el.style.height = el.state.closedHeight;
        el.style.maxHeight = "none";
        el.state.open = true
        requestAnimationFrame(function() {
          el.style.height = el.state.fullHeight;
        });
      } else {
        el.state.open = false
        el.state.fullHeight = el.clientHeight;
        el.style.height = el.state.fullHeight;
        requestAnimationFrame(function() {
          el.style.height = el.state.closedHeight;
        });
      }
    }
  }
}

customElements.define('expandable-container', ExpandableContainer);



var elmNode = document.getElementById('main');
var app = Elm.Main.embed(elmNode);
