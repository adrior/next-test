import Link from "next/link";
import Layout from "../components/Layout";

import fetch from "isomorphic-unfetch";

const About = props => (
  <Layout>
    <p>This is the about page</p>
    <p>{props.messege}</p>
  </Layout>
);

About.getInitialProps = async function() {
  const res = await fetch("http://localhost:3000/api/photos/");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    messege: data.messege
  };
};

export default About;
