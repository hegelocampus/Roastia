import React from 'react';
import styled from 'styled-components';

const AboutTeamMember = styled.a`
  position: relative;
  display: inline-block;
  display: flex;
  margin: 0 5px;
  &:hover span {
    visibility: visible;
  }
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
`;

const TeamMemberImage = styled.img`
  width: 50px;
  max-width: 50px;
  min-height: 50px;
  height: 50px;
  border-radius: 100%;
  @media only screen and (min-width: 1500px) {
    width: 75px;
    max-width: 75px;
    height: 75px;
    max-height: 75px;
  }
`;

const HoverToolTip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #8c7864;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  top: 113%;
  left: 53%;
  margin-left: -67px;
  &:after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 51%;
    margin-left: -10px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #8c7864 transparent;
  }
`;

export default ({shortName, fullName, linkedIn}) => (
  <AboutTeamMember
    href={linkedIn}
    target="_blank"
    rel="noopener noreferrer"
  >
      <TeamMemberImage
        alt={shortName}
        src={`https://roastia.s3.us-east-2.amazonaws.com/${ shortName }.jpeg`}
      />
      <HoverToolTip>{fullName}</HoverToolTip>
  </AboutTeamMember>
);

