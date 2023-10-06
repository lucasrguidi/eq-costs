import React from 'react';
import { FooterContainer, FooterContent, IconsContainer, TextContainer } from './styles';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <IconsContainer>
          <AiFillGithub style={{ fontSize: '2em', color: 'white' }} />
          <AiFillLinkedin style={{ fontSize: '2em', color: 'white' }} />
        </IconsContainer>
        <TextContainer>
          <span>Desenvolvido por</span>
          <span>Lucas Guidi</span>
        </TextContainer>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
