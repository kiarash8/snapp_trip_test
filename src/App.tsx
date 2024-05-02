import { useMemo, useState } from "react";
import "./App.css";
import { CharacterHook } from "@lib/services";
function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = CharacterHook.getCharacters({ page });

  const totalPage = useMemo(() => {
    if (data?.res) return data.res.info.pages;

    return page;
  }, [data, page]);

  const disableNext = useMemo(() => {
    return totalPage === page || isLoading;
  }, [totalPage, page, isLoading]);

  const disablePrevious = useMemo(() => {
    return page < 2 || isLoading;
  }, [isLoading, page]);

  return (
    <div>
      <div className="header">
        <h2>Rick and Morty characters</h2>
        {isLoading ? (
          <span>Loading please wait...</span>
        ) : (
          <button disabled={isLoading} onClick={() => refetch()}>
            Refetch
          </button>
        )}
      </div>
      <div className="grid">
        {data?.res?.results.map((item) => (
          <div key={item.id} className="grid-item">
            {item.name}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={disablePrevious}
          onClick={() => setPage((page) => page - 1)}
        >
          Previous
        </button>
        <span className="page">{page}</span>
        <button
          disabled={disableNext}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
