import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { getNewsItem, getTopStories } from "../../utils/utils";
import { NewsItem } from "../../types/types";
import { NewsList } from "../NewsList/NewsList";
import useThrottle from "../../hooks/useThrottle";

import styles from "./NewsPage.module.less";

function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const throttledRefresh = useThrottle(newsItems, 60000);
  const [forceRefreshFlag, setForceRefreshFlag] = useState(false);

  const onRefreshNewsClick = () => {
    setForceRefreshFlag((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);

    async function fetchTopStories() {
      const topStoryIds = await getTopStories();
      const newsItems = await Promise.all(
        topStoryIds.map((storyId) =>
          getNewsItem({ id: storyId, hasToFetchComments: false })
        )
      );
      setNewsItems(newsItems);
      setLoading(false);
    }

    fetchTopStories();
  }, [throttledRefresh, forceRefreshFlag]);

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Hacker News
      </Typography>

      <Button onClick={onRefreshNewsClick} className={styles.refreshButton}>
        Refresh news
      </Button>

      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <NewsList newsItems={newsItems} loading={loading} />
      )}
    </Container>
  );
}

export default NewsPage;
