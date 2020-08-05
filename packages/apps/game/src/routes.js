import React from 'react';

const ROUTES = [
  {
    path: '/',
    name: 'Home',
    key: 'ROOT',
    exact: true,
    component: () => <h1>Log in</h1>
  },
  {
    path: '/news',
    name: 'News',
    key: 'NEWS',
    exact: true,
    component: () => <h1>News</h1>
  },
  {
    path: '/store',
    name: 'Store',
    key: 'STORE',
    exact: true,
    component: () => <h1>Store</h1>
  },
  {
    path: '/play',
    name: 'Play',
    key: 'PLAY',
    component: () => <h1>Play</h1>,
    routes: [
      {
        path: '/play/singleplayer',
        name: 'Singleplayer',
        key: 'APP_SINGLEPLAYER',
        exact: true,
        component: () => <h1>Play SinglePlayer</h1>
      },
      {
        path: '/play/multiplayer',
        name: 'Multiplayer',
        key: 'PLAY_MULTIPLAYER',
        exact: true,
        component: () => <h1>Play Multiplayer</h1>
      }
    ]
  },
  {
    path: '/collection',
    name: 'My Collection',
    key: 'COLLECTION',
    component: () => <h1>My Collection</h1>,
    routes: [
      {
        path: '/collection/library',
        name: 'Card Library',
        key: 'COLLECTION_CARDS',
        exact: true,
        component: () => <h1>Card Library</h1>
      },
      {
        path: '/collection/decks',
        name: 'My Decks',
        key: 'COLLECTION_DECKS',
        exact: true,
        component: () => <h1>My Decks</h1>
      },
      {
        path: '/collection/heros',
        name: 'My Heros',
        key: 'COLLECTION_HEROS',
        exact: true,
        component: () => <h1>My Heros</h1>
      }
    ]
  }
];

export default ROUTES;
