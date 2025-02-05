import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { getCharacters } from './api/characters';
import ActionBar from './components/actionBar';
import CharacterGrid from './components/characterGrid';
import DetailModal from './components/detailModal';
import type { Character, CharactersResponse } from './types';

function App() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    async function fetchData() {
      const charactersResponse: CharactersResponse = await getCharacters(1);
      setCharacters(charactersResponse.docs);
      setPage(1);
      setPages(charactersResponse.pages);
    };
    fetchData();
  }, []);  // Runs once

  const handleSelection = async (c: Character) => {
    setSelectedCharacter(c);
  };

  const closeDialog = () => {
    setSelectedCharacter(null);
  };

  const handleNextPage = useCallback(async () => {
    if (page < pages) {
      const nextPage = page + 1;
      const charactersResponse: CharactersResponse = await getCharacters(nextPage);
      setCharacters(charactersResponse.docs);
      setPage(nextPage);
    }
  }, [page, pages]);

  const handlePrevPage = useCallback(async () => {
    if (page > 1) {
      const prevPage = page - 1;
      const charactersResponse = await getCharacters(prevPage);
      setCharacters(charactersResponse.docs);
      setPage(prevPage);
    }
  }, [page]);

  const handlePage = useCallback(async (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pages) {
      setPage(pageNumber);
      const charactersResponse: CharactersResponse = await getCharacters(pageNumber);
      setCharacters(charactersResponse.docs);
    }
  }, [pages]);

  return (
    <>
      <h3>Lord of the Rings Characters</h3>
      {
        characters.length === 0 ?
          <p>Loading...</p> :
          <CharacterGrid characters={characters} onCharacterSelect={handleSelection} />
      }
      <ActionBar
        page={page}
        pages={pages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePage={handlePage}
      />
      {selectedCharacter && (
        <DetailModal
          selectedCharacter={selectedCharacter}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default App
