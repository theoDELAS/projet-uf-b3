import React from 'react';
import { Text, SafeAreaView, ScrollView  } from 'react-native';
import { Col, Row, Grid } from "react-native-paper-grid";
import { Card, Paragraph, Searchbar, Title, Button, Subheading, TouchableRipple } from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const searchbarCSS = {
    bar: {
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10
    },
    color: {

    }
  };

  const cardCSS = {
    element: {
      borderWidth: 1,
      borderColor: "green" // Remplacer couleur par celle récupérée par l'objet correspondant?
    },
    image: {
      height: 150
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Searchbar placeholder="Rechercher" onChangeText={onChangeSearch} value={searchQuery} style={searchbarCSS.bar} />
        <Grid>
        <Row>
            <Col>
              <Card style={cardCSS.element}>
                {/* <Card.Title title="Test de card tavu" subtitle="????????" /> */}
                <Card.Cover source={{uri: 'https://steamcommunity-a.akamaihd.net/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh31CIyHz2GZ-KuFpPsrTzBG0pO-CI3r-Zj3FYSeJGA44TOJfYW7YqjD2sOXHQjrKQO0uRAAHK6tR-mEdPsvbO0Zo3YUVu2u_0UdyEhk6f9BKZAarxm1OM-xxzHUWWq7CJYs'}} style={cardCSS.image} />
                <Card.Content>
                  <Title>Skin de ouf et ouais</Title>
                  <Paragraph>Description de l'arme et du skin</Paragraph>
                </Card.Content>
              </Card>
            </Col>
            <Col>
              <Card style={cardCSS.element}>
                {/* <Card.Title title="Test de card tavu" subtitle="????????" /> */}
                <Card.Cover source={{uri: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJenAWu-OmnIGFg_j5DL_YhXlE-NF-mNbN_Iv9nGu4qgE7NnegJYLDIVNsNFnXq1XtwL_qhZ_p6M7MwHUxuSN2ti3UzRDj0kwdbec9m7XAHkqGBcP1'}} style={cardCSS.image} />
                <Card.Content>
                  <Title>AK de malade tavu</Title>
                  <Paragraph>Ratatata headshot mec </Paragraph>
                </Card.Content>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <TouchableRipple onPress={console.log("PRESSED")} rippleColor="rgba(0,0,0, .32)"> */}
              <Card style={cardCSS.element} onPress={console.log("PRESS")}>
                {/* <Card.Title title="Test de card tavu" subtitle="????????" /> */}
                <Card.Cover source={{uri: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJF7dC_mIGZqOf1Ia_YlWdU-_p9g-7J4cKt3wfmrUVoN2zwcNTGe1Q-Ml_T-Fe6wOjqgMK46pTAyHBn7ihxtCyOgVXp1nGGEdIU'}} style={cardCSS.image} />
                <Card.Content>
                  <Title>Pas ouf mais stylée</Title>
                  <Paragraph>Description de l'arme et du skin</Paragraph>
                </Card.Content>
              </Card>
              {/* </TouchableRipple> */}
            </Col>
            <Col>
              <Card style={cardCSS.element}>
                {/* <Card.Title title="Test de card tavu" subtitle="????????" /> */}
                <Card.Cover source={{uri: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09m7hIWZmOXLPr7Vn35cppVy0rCXodyj2QS28kVvYW6ldo-Tew84YA6C-1m7xuzu0ZW56MzLnyB9-n51H0vrrBM'}} style={cardCSS.image} />
                <Card.Content>
                  <Title>M'a couté cher celle là</Title>
                  <Paragraph>Ratatata headshot mec </Paragraph>
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;
