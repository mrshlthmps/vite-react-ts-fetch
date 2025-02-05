import '../App.css'

type Props = {
    page: number;
    pages: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    handlePage: (pageNumber: number) => void;
};

// Component defined with function
export default function ActionBar(props: Props) {
    const { page, pages, handleNextPage, handlePrevPage, handlePage } = props;

    return (
        <div className="actions">
            {
                page > 1 &&
                <button className="btn" onClick={() => handlePrevPage()}>Previous</button>
            }
            {page > 0 && page < pages &&
                <button
                    className="btn"
                    onClick={() => handleNextPage()}
                >
                    Next
                </button>
            }
            {
                pages > 1 &&
                <span>
                    Page:
                    <input
                        type="number"
                        style={{ marginLeft: '8px' }}
                        min="1"
                        max={pages}
                        value={page > 0 ? page : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            handlePage(value ? parseInt(value) : 0);
                        }}
                    />
                </span>
            }
        </div>
    );
}