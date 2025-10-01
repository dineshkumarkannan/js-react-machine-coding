import { useCallback, useState } from "react";
import InfiniteScroll from "./Infinite_scroll";

function App() {
  const [listItems, setListItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const renderItem = useCallback((item: any, id: number, ref: any) => {
    return (
      <div
        style={{
          width: "100%",
          height: "2rem",
          border: "1px solid gray",
          margin: "4px 0",
          padding: "4px",
        }}
        key={id}
        ref={ref}
      >
        {item}
      </div>
    );
  }, []);

  const fetchItems = useCallback(async (page: number) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=30&skip=${page * 30 - 30}`
      );
      if (!response.ok) {
        throw new Error("Api error");
      }
      const data = await response.json();
      setTotalItems(data.total);
      setListItems((prev) => [...prev, ...data.posts]);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  return (
    <InfiniteScroll
      listItems={listItems}
      renderItem={renderItem}
      fetchListItems={fetchItems}
      limit={30}
      total={totalItems}
    />
  );
}

export default App;
