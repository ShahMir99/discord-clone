import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  sholudLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  sholudLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && sholudLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [sholudLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDiv = chatRef?.current;
    const topDiv = chatRef?.current;

    const sholudAutoScroll = () => {
        if(!hasInitialized && bottomDiv){
            setHasInitialized(true)
            return true
        }

        if(!topDiv){
            return false
        }

        const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

        return distanceFromBottom <= 100;
    }

    if(sholudAutoScroll()){
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({
                behavior : "smooth"
            })
        },100)
    }

  }, [bottomRef , chatRef , count , hasInitialized]);
};
