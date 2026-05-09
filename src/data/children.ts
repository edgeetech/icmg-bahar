import type { Child } from '../domain/types';

const base = import.meta.env.BASE_URL;

const sharedAsset = (file: string) => `${base}characters/shared/${file}`;
const childAsset = (slot: string, state: string) => `${base}characters/${slot}/${state}.png`;

const createSharedAssets = () => ({
  neutral: sharedAsset('neutral.png'),
  happy: sharedAsset('happy.png'),
  proud: sharedAsset('withMedal.png'),
  excited: sharedAsset('approver.png'),
});

const childAssets = (slot: string) => ({
  neutral: childAsset(slot, 'neutral'),
  happy: childAsset(slot, 'happy'),
  proud: childAsset(slot, 'proud'),
  excited: childAsset(slot, 'excited'),
});

export const children: Child[] = [
  {
    id: 'yusufEymen',
    name: 'Yusuf Eymen',
    avatarAlt: 'Illustrated boy character named Yusuf Eymen',
    gender: 'boy',
    assets: childAssets('c01'),
    badgeColor: '#7cc868',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'tahaGul',
    name: 'Taha',
    avatarAlt: 'Illustrated boy character named Taha',
    gender: 'boy',
    assets: childAssets('c02'),
    badgeColor: '#ffb63d',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'yahyaGeden',
    name: 'Yahya',
    avatarAlt: 'Illustrated boy character named Yahya',
    gender: 'boy',
    assets: childAssets('c03'),
    badgeColor: '#ffd257',
    badgeTextColor: '#714f00',
  },
  {
    id: 'omerGul',
    name: 'Ömer',
    avatarAlt: 'Illustrated boy character named Ömer',
    gender: 'boy',
    assets: childAssets('c04'),
    badgeColor: '#ad87ff',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'ahmetBashan',
    name: 'Ahmet',
    avatarAlt: 'Illustrated boy character named Ahmet',
    gender: 'boy',
    assets: childAssets('c05'),
    badgeColor: '#98d67f',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'idris',
    name: 'Idris',
    avatarAlt: 'Illustrated boy character named Idris',
    gender: 'boy',
    assets: childAssets('c06'),
    badgeColor: '#6fa9ff',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'muhammedEmir',
    name: 'Emir',
    avatarAlt: 'Illustrated boy character named Emir',
    gender: 'boy',
    assets: childAssets('c07'),
    badgeColor: '#ff996f',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'mehmetAkif',
    name: 'Mehmet Akif',
    avatarAlt: 'Illustrated boy character named Mehmet Akif',
    gender: 'boy',
    assets: childAssets('c08'),
    badgeColor: '#f97b72',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'mustafaBashan',
    name: 'Mustafa B.',
    avatarAlt: 'Illustrated boy character named Mustafa B.',
    gender: 'boy',
    assets: childAssets('c09'),
    badgeColor: '#5ec4b6',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'aliTasdemir',
    name: 'Ali',
    avatarAlt: 'Illustrated boy character named Ali',
    gender: 'boy',
    assets: childAssets('c10'),
    badgeColor: '#c47de0',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'muhammetCetin',
    name: 'Muhammet',
    avatarAlt: 'Illustrated boy character named Muhammet',
    gender: 'boy',
    assets: childAssets('c11'),
    badgeColor: '#f0a500',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'mustafaCetin',
    name: 'Mustafa Ç.',
    avatarAlt: 'Illustrated boy character named Mustafa Ç.',
    gender: 'boy',
    assets: childAssets('c12'),
    badgeColor: '#70b8e8',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'alican',
    name: 'Alican',
    avatarAlt: 'Illustrated boy character named Alican',
    gender: 'boy',
    assets: childAssets('c13'),
    badgeColor: '#ff85a4',
    badgeTextColor: '#ffffff',
  },
  {
    id: 'mehmetEfe',
    name: 'Mehmet Efe',
    avatarAlt: 'Illustrated boy character named Mehmet Efe',
    gender: 'boy',
    assets: childAssets('c14'),
    badgeColor: '#68b8ff',
    badgeTextColor: '#ffffff',
  },
];

