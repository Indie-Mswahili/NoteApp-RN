import React from 'react';
import { Text } from 'react-native';
import store from '../../utils/storeUtils';
import HeaderBar from '../../components/HeaderBar';
import Screen from '../../components/Screen';
import { ContentScrollView } from '../../components/ContentView';
import styles from './styles';

function NoteDetailsScreen(props) {
  const { navigation } = props;
  const { id } = props.navigation.state.params;
  const [note] = store.useState(s => s.note.data.find(d => d.id == id));

  styles.useLayout();

  return (
    <Screen>
      <HeaderBar onBack={navigation.goBack} title="Note Details" />
      <ContentScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>{note.title}</Text>
      </ContentScrollView>
    </Screen>
  );
}

export default NoteDetailsScreen;
