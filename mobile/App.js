import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider, Avatar, Button, Card, Text, Modal, Portal, } from 'react-native-paper';
import { name as appName } from './app.json';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


export default function App() {

  const base_url = "https://vr4s1c1r-3000.brs.devtunnels.ms";
  const [posts, setPosts] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const getPosts = async () => {
    try {
      const response = await fetch(`${base_url}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  const getComments = async () => {
    try {
      const response = await fetch(`${base_url}/comments`);
      const data = await response.json();
      setComments(data);
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  }


  const deletePost = async (id) => {
    comments.map(async (comment) => {
      if(comment.postId === selectedPost){
        const res = await fetch(`${base_url}/comments/${comment.id}`,{
          method:"DELETE"
        })
      }
    })
    const res = await fetch(`${base_url}/posts/${id}`, {
      method: "DELETE"
    });
    getPosts();
  }

  useEffect(() => {
    getPosts();
    getComments();
  }, []);


  if (!posts) return (<View style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><Text>Cargando...</Text></View>)


  return (

    <PaperProvider>
      <ScrollView>
        <View style={{ padding: 10, gap: 15 }}>
          {posts.map((post) => {
            return (
              <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                  <Text variant="titleLarge">{post.title}</Text>
                  <Text variant="bodyMedium">{post.author}</Text>
                </Card.Content>
                <Card.Cover source={{ uri: post.image }} />
                <View>

                  {comments && (
                    comments.map((comment) => {
                      if (comment.postId == post.id) {
                        return (<>
                          <View style={{padding:10}}>
                          <Text>{comment.body}</Text>
                          </View>
                        </>)
                      }
                    })
                  )}


                </View>
                <Card.Actions>
                  <Button onPress={() => {
                    setSelectedPost(post.id);
                    showModal();

                  }}>Eliminar</Button>
                  <Button>Ok</Button>
                </Card.Actions>
              </Card>
            )
          })}
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>¿Seguro que desea borrar el post?</Text>
            <Button onPress={async () => {
              deletePost(selectedPost);
              //setSelectedPost(null);
              hideModal();

            }}>Si</Button>
            <Button onPress={hideModal}>Cancelar</Button>
          </Modal>
        </Portal>
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
