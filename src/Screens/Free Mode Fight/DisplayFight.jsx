import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { handicaps, weapons, fields } from '../../algorithms/bonusmalus/BonusMalus';
import CombatAlgorithm from '../../algorithms/CombatAlgorithm';
import Fighter from '../../algorithms/CharacterClass';

import FighterContext from '../../contexts/FighterContext';
// import FighterCard from '../../components/Fighter card/FighterCard';
import FigthtingReport from '../../components/Figthing Report/FightingReport';

import styles from './DisplayFight.module.css';

export default function DisplayFight() {
  const { playerA, playerB, resetGame, options } = useContext(FighterContext);

  const FighterA = new Fighter(playerA);
  const FighterB = new Fighter(playerB);

  if (options != '') {
    let modifA = [];
    let modifB = [];
    let handicapA = handicaps[Number(options.optionA[0])];
    let handicapB = handicaps[Number(options.optionB[0])];
    let weaponA = weapons[Number(options.optionA[1])];
    let weaponB = weapons[Number(options.optionB[1])];
    let field = fields[Number(options.field)];

    modifA.push(handicapA);
    modifA.push(weaponA);
    modifA.push(field);
    modifB.push(handicapB);
    modifB.push(weaponB);
    modifB.push(field);

    FighterA.updateGear(modifA);
    FighterB.updateGear(modifB);
  }

  let report = CombatAlgorithm(FighterA, FighterB);

  return (
    <div className={styles.fightingComponent}>
      {/* <div className={styles.heroesDisplay}>
        {FighterA && <FighterCard {...FighterA} />}
        {FighterB && <FighterCard {...FighterB} />}
      </div> */}
      {report && <FigthtingReport report={report} />}

      <div className={styles.endgameChoice}>
        <Link to="/freemode">
          <button onClick={resetGame}>Another battle</button>
        </Link>
        <Link to="/">
          <button onClick={resetGame}>Main menu</button>
        </Link>
      </div>
    </div>
  );
}
