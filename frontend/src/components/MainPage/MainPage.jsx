import React from 'react'
import List from '../List/List';
import { ContainerMain, ContainerTitle } from './styles';

import {
  Text
} from '@chakra-ui/react';

import { DiDatabase } from "react-icons/di";

export default function MainPage() {
  return (
    <ContainerMain>
      <ContainerTitle>
        <Text fontSize='4xl' as='b'>Questions Database</Text>
        <DiDatabase className="icon-database" />
      </ContainerTitle>
      <List />
    </ContainerMain>
  );
}
