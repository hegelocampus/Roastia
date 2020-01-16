import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import SplashFooter from './SplashFooter';
import SplashIntro from './SplashIntro';

const backgroundImage = 'https://roastia.s3.us-east-2.amazonaws.com/roastia-home.jpeg';

const SplashContainer = styled.div`
  display: grid;
  grid-template-rows: 60% auto;
  justify-content: space-between;
`;

const SplashSection = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  .splash-backdrop {
    position: absolute;
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1930px auto;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    max-height: 100%;
    height: 500px;
    width: 100%;
    min-width: 100%;
  }
`;

const SplashMain = styled.div`
  height: 500px;
  width: 60%;
  margin: 0 auto;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .splash-backdrop-blur {
    z-index: 1;
    position: absolute;
    background-image: url(${backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    background-size: 1930px auto;
    height: 200px;
    width: 60%;
    max-width: 75%;
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 40px;
  }
  .splash-inner {
    z-index: 2;
    display: block;
    width: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 4px 30px 4px;
    h1 {
      display: block;
      color: white;
      font-size: 40px;
      text-align: center;
      margin-bottom: 30px;
      border-radius: 20px;
    }
  }
`;

export default () => (
  <SplashContainer>
    <SplashSection>
      <div className="splash-backdrop"></div>
      <SplashMain>
        <div className="splash-backdrop-blur" />
        <div className="splash-inner">
          <h1>Discover a coffee shop where you'll love to code</h1>
          <Search />
        </div>
      </SplashMain>
      <SplashIntro />
    </SplashSection>
    <SplashFooter />
  </SplashContainer>
);

