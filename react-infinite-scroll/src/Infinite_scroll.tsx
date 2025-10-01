import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = (props: any) => {
  const { listItems, renderItem, fetchListItems, limit, total } = props;
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);
  const totalPage = useRef<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const localFetchMethodCall = useCallback(() => {
    if (totalPage.current !== null && pageRef.current > totalPage.current) {
      return;
    }

    setIsLoading(true);
    fetchListItems(pageRef.current).finally(() => {
      setIsLoading(false);
    });
  }, [fetchListItems]);

  const currentLastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          pageRef.current += 1;
          localFetchMethodCall();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, localFetchMethodCall]
  );

  const renderListItems = () =>
    listItems.map((item: any, index: number) => {
      if (index === listItems.length - 1) {
        return renderItem(item.title, item.id, currentLastItemRef);
      }
      return renderItem(item.title, item.id, null);
    });

  // First fetch (ignore total here)
  useEffect(() => {
    if (listItems.length === 0) {
      pageRef.current = 1;
      localFetchMethodCall();
    }
  }, [listItems.length, localFetchMethodCall]);

  // Once total is known, compute totalPage
  useEffect(() => {
    if (total) {
      totalPage.current = Math.ceil(total / limit);
    }
  }, [total, limit]);

  // cleanup observer
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <div>{renderListItems()}</div>
      {isLoading && "Loading..."}
    </>
  );
};

export default InfiniteScroll;
