class QuoteMachine extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      quote: "",
      author: "",
      backHSL: "",
      boxHSL: "" };

    this.getNewQuote = this.getNewQuote.bind(this);
    this.getNewQuote();
  }

  //MUST be async because we need to wait for the API call to return data before we can set the state.
  async getNewQuote() {
    //Using https://github.com/lukePeavey/quotable for quote generation
    let newHue = Math.random() * 360;
    let newSat = Math.random() * 100;
    let quoteRaw = await fetch('https://api.quotable.io/random');
    let quoteJSON = await quoteRaw.json();
    this.setState({
      quote: quoteJSON.content,
      author: quoteJSON.author,
      backHSL: "hsl(" + newHue + "," + newSat + "%, 35%)",
      boxHSL: "hsl(" + newHue + "," + newSat + "%, 15%)" });

  }

  render() {
    let quoteBoxStyle = {
      backgroundColor: this.state.boxHSL };

    let buttonStyle = {
      backgroundColor: this.state.backHSL };

    document.getElementById("body").style.backgroundColor = this.state.backHSL;
    let quoteChunk = this.state.quote.split(" ").join("%20");
    let twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' + quoteChunk + '"';
    return (
      React.createElement("div", { class: "row align-items-center", id: "mainRow" },
      React.createElement("div", { class: "col" }),
      React.createElement("div", { id: "quote-box", class: "col-5", style: quoteBoxStyle },
      React.createElement("p", { id: "text" }, "\"", this.state.quote, "\""),
      React.createElement("p", { id: "author" }, "- ", this.state.author),
      React.createElement("div", { class: "row", id: "buttonRow" },
      React.createElement("a", { href: twitterURL, class: "btn", id: "tweet-quote", style: buttonStyle }, React.createElement("img", { src: "https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/images/Twitter_logo_white_32.png" })),
      React.createElement("button", { class: "btn", id: "new-quote", onClick: this.getNewQuote, style: buttonStyle }, "New Quote"))),


      React.createElement("div", { class: "col" })));


  }}


//Put the QuoteMachine into the HTML, between the two margin columns
ReactDOM.render(React.createElement(QuoteMachine, null), document.getElementById("pageContainer"));