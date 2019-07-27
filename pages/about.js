import Link from "next/link";
import Layout from "../components/Layout";
import { Component } from "react";

import fetch from "isomorphic-unfetch";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render = () => {
    return (
      <Layout>
        <p>This is the about page</p>
        <p>{this.state.messege}</p>
        <p>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </p>
      </Layout>
    );
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.name != this.state.name) {
      const res = await fetch(
        `http://localhost:3000/api/set-name?name=${this.state.name}`
      );
      const data = await res.json();
      console.log(data);
    }
  }

  static async getInitialProps({ req, ctx }) {
    let headers = req && req.headers;
    const res = await fetch("http://localhost:3000/api/photos/", {
      headers: headers
    });
    const data = await res.json();

    return data;
  }
}

export default About;
