import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View, ScrollView } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider,Avatar, Button, Card, Text } from 'react-native-paper';
import { name as appName } from './app.json';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


export default function App() {
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
try{
  const response = await fetch('https://vr4s1c1r-3000.brs.devtunnels.ms/posts');
  const data = await response.json();
  setPosts(data);
  console.log(data);
}catch(e){
  console.log(e);
}
  }


  useEffect(() =>{
    getPosts();
  },[]);


  if(!posts) return (<View style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><Text>Cargando...</Text></View>)


  return (

        <PaperProvider>
          <ScrollView>
            <View >
            {posts.map((post) => {
            return (
              <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
              <Card.Content>
                <Text variant="titleLarge">{post.title}</Text>
                <Text variant="bodyMedium">{post.author}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: post.image }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
            )
          })}
            </View>
          </ScrollView>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent(appName, () => App);
