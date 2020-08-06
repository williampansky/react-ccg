import React from 'react';
import { Homepage, PlayPage } from './pages';

const ROUTES = [
  {
    path: '/',
    name: 'Home',
    disabled: false,
    visible: false,
    key: 'ROOT',
    exact: true,
    component: props => <Homepage {...props} />
  },
  {
    path: '/news',
    name: 'News',
    disabled: true,
    visible: true,
    key: 'NEWS',
    exact: true,
    component: () => <h1>News</h1>
  },
  {
    path: '/store',
    name: 'Store',
    disabled: true,
    visible: true,
    key: 'STORE',
    exact: true,
    component: () => <h1>Store</h1>
  },
  {
    path: '/play',
    name: 'Play',
    disabled: false,
    visible: true,
    key: 'PLAY',
    component: props => <PlayPage {...props} />,
    routes: [
      {
        path: '/play/singleplayer',
        name: 'Singleplayer',
        disabled: false,
        visible: true,
        key: 'PLAY_SINGLEPLAYER',
        exact: true,
        component: () => <h1>Play Singleplayer</h1>
      },
      {
        path: '/play/multiplayer',
        name: 'Multiplayer',
        disabled: false,
        visible: true,
        key: 'PLAY_MULTIPLAYER',
        exact: true,
        component: () => <h1>Play Multiplayer</h1>
      }
    ]
  },
  {
    path: '/collection',
    name: 'My Collection',
    disabled: true,
    visible: true,
    key: 'COLLECTION',
    component: () => <h1>My Collection</h1>,
    routes: [
      {
        path: '/collection/library',
        name: 'Card Library',
        disabled: true,
        visible: true,
        key: 'COLLECTION_CARDS',
        exact: true,
        component: () => <h1>Card Library</h1>
      },
      {
        path: '/collection/decks',
        name: 'My Decks',
        disabled: true,
        visible: true,
        key: 'COLLECTION_DECKS',
        exact: true,
        component: () => <h1>My Decks</h1>
      },
      {
        path: '/collection/heros',
        name: 'My Heros',
        disabled: true,
        visible: true,
        key: 'COLLECTION_HEROS',
        exact: true,
        component: () => <h1>My Heros</h1>
      }
    ]
  },
  {
    path: '*',
    name: '404',
    disabled: false,
    visible: false,
    key: '404',
    exact: false,
    component: () => <h1>404</h1>
  }
];

export default ROUTES;
