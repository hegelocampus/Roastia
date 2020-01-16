import React from 'react';
import styled from 'styled-components';
import AboutTeamMember from './AboutTeamMember';
import { GitHubIcon } from '../../util/icons';

const teamMembers = [
  {
    shortName: "long",
    fullName: "Long McFarlin",
    linkedIn: "https://www.linkedin.com/in/long-mcfarlin-7bb60994/"
  },
  {
    shortName: "bee",
    fullName: "Bee Ellis",
    linkedIn: "https://www.linkedin.com/in/bee-ellis-2b126b185/"
  },
  {
    shortName: "john",
    fullName: "John Steen",
    linkedIn: "https://www.linkedin.com/in/johnmsteen/"
  }
];

const SplashFooter = styled.footer`
  font-size: 13px;
  width: 300px;
  height: 100px;
  margin: 20rem auto 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8c7864;
  border-radius: $border-radius;
  h3 {
    color: #8c7864;
    font-weight: 500;
  }
}
`;

const AboutTeam = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
  a {
    color: #8c7864;
    text-decoration: none;
    margin: 0 10px;
  }
`;

export default () => (
  <SplashFooter className="splash-footer">
    <h3>GITHUB AND TEAM</h3>
    <AboutTeam>
      <GitHubIcon />
      {teamMembers.map((member, i) => <AboutTeamMember key={i} {...member} />)}
    </AboutTeam>
  </SplashFooter>
)

