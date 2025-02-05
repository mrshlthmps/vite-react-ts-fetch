import { FC, Fragment } from 'react';
import type { Character } from '../types';

type Props = {
    characters: Array<Character>;
    onCharacterSelect: (c: Character) => void;
};

// Component defined with FC
const CharacterGrid: FC<Props> = (props: Props) => {
    const { characters, onCharacterSelect } = props;
    return (
        <div className="grid">
            <span style={{ fontWeight: 'bold' }}>Name</span>
            <span style={{ fontWeight: 'bold' }}>Wiki URL</span>
            <span style={{ fontWeight: 'bold' }}>Species</span>
            {characters.length &&
                characters.map((character, index) => {
                    return <Fragment key={character._id}>
                        <span style={index % 2 === 0 ? { backgroundColor: 'lightgrey' } : {}}>
                            <button className="name" onClick={() => onCharacterSelect(character)}>
                                {character.name}
                            </button>
                        </span>
                        <span style={index % 2 === 0 ? { backgroundColor: 'lightgrey' } : {}}>
                            {character.wikiUrl}
                        </span>
                        <span style={index % 2 === 0 ? { backgroundColor: 'lightgrey' } : {}}>
                            {character.race}
                        </span>
                    </Fragment>
                })
            }
        </div>
    );
};

export default CharacterGrid
