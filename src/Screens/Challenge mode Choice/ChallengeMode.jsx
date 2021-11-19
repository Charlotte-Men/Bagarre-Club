import React, { useContext, useEffect, useState } from 'react';

import ChallengeDetail from '../../components/Challenge Selected Detail/ChallengeDetail';
import CharactersList from '../../components/Characters list/CharactersList';
import LaunchChallengeButton from '../../components/Launch Challenge Button/LaunchChallengeButton';
import FighterContext from '../../contexts/FighterContext';

import styles from './ChallengeMode.module.css';

export default function ChallengeMode() {
  const { playerA, setPlayerA, setPlayerB } = useContext(FighterContext);

  const preCharacterSelection = {
    image: {
      url: '../../../assets/question.png',
    },
    name: 'Choose a fighter',
  };

  const [selectedCharacter, setSelectedCharacter] = useState(preCharacterSelection);
  const [heroesList, setHeroesList] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (playerA == '') {
      const characterIndex = Math.round(Math.random() * 731);
      fetch(`https://cors-bypass.tkzprod.dev/superheroapi.com/api/408055134055673/${characterIndex}`)
        .then((res) => res.json())
        .then((data) => setPlayerA(data));
    }

    fetch('../../fakeApi.json')
      .then((res) => res.json())
      .then((data) => setHeroesList(data));
  }, []);

  useEffect(() => {
    setPlayerB(selectedCharacter);
  }, [selectedCharacter]);

  const searchCharacters = (e) => {
    e.preventDefault();
    if (query.length < 2) {
      alert('Please write at least 2 letters to search');
    } else {
      setQuery('');
      fetch(`https://cors-bypass.tkzprod.dev/superheroapi.com/api/408055134055673/search/${query}`)
        .then((res) => res.json())
        .then((data) => setHeroesList(data.results));
    }
  };

  return (
    <div>
      <div className={styles.charactersContainer}>
        <div className={styles.challengeCharacter}>
          <h3 className={styles.characterIntro}>Your choice</h3>
          {playerA && <ChallengeDetail character={selectedCharacter} />}
        </div>
        <div className={styles.challengeCharacter}>
          <h3 className={styles.characterIntro}>Your opponent</h3>
          {playerA && <ChallengeDetail character={playerA} />}
        </div>
      </div>
      <form className={styles.searchItem} onSubmit={searchCharacters}>
        <label>
          <input className={styles.searchText} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          <input className={styles.searchButton} type="submit" value="Search" />
        </label>
      </form>
      <div className={styles.challengeContainer}>{heroesList && <CharactersList heroesList={heroesList} selected={setSelectedCharacter} />}</div>
      {selectedCharacter.name != 'Choose a fighter' && <LaunchChallengeButton />}
    </div>
  );
}
