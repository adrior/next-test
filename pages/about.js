import Link from "next/link";
import Layout from "../components/Layout";
import { Component } from "react";

import fetch from "isomorphic-unfetch";

class About extends Component {
  state = {
    name: null
  };

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

  componentDidMount = () => {
    this.setState(this.props);
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

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
