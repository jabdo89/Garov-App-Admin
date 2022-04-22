import styled from 'styled-components/native';
import { Layout } from '@ui-kitten/components';

const Container = styled(Layout)`
  padding-top: ${(props) => (props.pt || 0) + 20}px;
  flex-grow: 1;
`;

export { Container };
