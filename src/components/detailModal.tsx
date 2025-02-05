import { Fragment, useEffect, useState } from 'react';
import { Character, Quote, QuotesResponse } from '../types';
import { getCharacterQuotes } from '../api/characters';

type Props = {
    selectedCharacter: Character;
    closeDialog: () => void;
};

// Component defined with function
export default function DetailModal(props: Props) {
    const { selectedCharacter, closeDialog } = props;

    const [quotes, setQuotes] = useState<Array<Quote>>([]);

    useEffect(() => {
        async function fetchData() {
            const quotesResponse: QuotesResponse = await getCharacterQuotes(selectedCharacter._id);
            setQuotes(quotesResponse.docs);
        }
        fetchData();
    }, [selectedCharacter]);

    return (
        <dialog className="modal" open>
            <h3>{selectedCharacter.name}</h3>
            {`Id: ${selectedCharacter._id}`} <br />
            {`Race: ${selectedCharacter.race}`} <br />
            {`Wiki URL: ${selectedCharacter.wikiUrl}`}
            <h4>Quotes</h4>
            {quotes.length > 0 &&
                quotes.map(quote => (
                    <Fragment key={quote._id}>
                        <blockquote>{quote.dialog}</blockquote>
                    </Fragment>
                ))
            }
            <button onClick={() => closeDialog()} >Close</button>
        </dialog>
    );
}