import Link from "next/link";
import Layout from "../components/Layout";

import fetch from "isomorphic-unfetch";

const About = props => {
  return (
    <Layout>
      <p>This is the about page</p>
      <p>{props.messege}</p>
      <p>
        <input type="text" value={props.name} />
      </p>
    </Layout>
  );
};

About.getInitialProps = async ({ req, ctx }) => {
  let headers = req && req.headers;
  const res = await fetch("http://localhost:3000/api/photos/", {
    headers: headers
  });
  const data = await res.json();

  return data;
};

export default About;
