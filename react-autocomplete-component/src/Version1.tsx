import AutoComplete from "./feature/auto-complete";
import RenderList from "./Render-List";

const Version1 = () => {
  const promise = (query: any, signal: any) =>
    fetch(`https://swapi.dev/api/people?search=${query}`, { signal: signal });

  return (
    <div className="main">
      <AutoComplete
        label={"Search Person Name"}
        name="search_person"
        id="search_person"
        placeholder="Search person name here..."
        autoComplete={true}
        renderList={(items: any, activeIndex: number, onClickSelect: any) => (
          <RenderList
            items={items}
            activeIndex={activeIndex}
            onClickSelect={onClickSelect}
          />
        )}
        renderNoDataFound={(msg: any) => <div>{msg}</div>}
        renderError={(error: any) => (
          <div className="error-message">{error}</div>
        )}
        promise={promise}
        parseResponse={(data: any) => {
          return data?.results;
        }}
        wait={300}
      />
    </div>
  );
};

export default Version1;
