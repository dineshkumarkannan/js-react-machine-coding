import MultiSelect from "./feature/multi-select";
import RenderList1 from "./Render-List1";

const Version2 = () => {
  const promise = (q: string, signal: any) => {
    return fetch(`https://dummyjson.com/users/search?limit=10&q=${q}`, {
      signal: signal,
    });
  };
  return (
    <div>
      <MultiSelect
        label="Select Person"
        name="person"
        id="person"
        placeholder="Select Person here..."
        promise={promise}
        responseHandler={(response: any) => {
          console.log(response);
          return response?.users;
        }}
        renderList={(items: any, activeIndex = 0, onClickSelect) => (
          <RenderList1
            items={items}
            activeIndex={activeIndex}
            onClickSelect={onClickSelect}
          />
        )}
      />
    </div>
  );
};

export default Version2;
