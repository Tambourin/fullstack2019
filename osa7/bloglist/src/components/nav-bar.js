import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoggedInfo from "../components/logged-info";

const Bar = styled.div`
  background: BurlyWood;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
const Li = styled.li`
  list-style: none;
  
  &:hover {
    background: #555;
  }
`;

const NavBar = () => {
  return (
    <Bar>
      <ul>
        <Li>
          <Link to="/">Blogs</Link>
        </Li>
        <Li>
          <Link to="/users">Users</Link>
        </Li>
      </ul>
      <LoggedInfo /> 
    </Bar>
      
  )
}

export default NavBar;