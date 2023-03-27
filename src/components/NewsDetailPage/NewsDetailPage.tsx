import { useState, useEffect } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  List,
  Grid,
  Button,
} from "@material-ui/core";
import { NewsItem } from "../../types/types";
import {
  durationFromPostingTime,
  getNewsItem,
  removeHtmlSymbols,
} from "../../utils/utils";
import Comment from "../Comment/Comment";
import useThrottle from "../../hooks/useThrottle";

import styles from "./NewsDetailPage.module.less";

function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const onBackButtonClick = () => navigate(-1);

  const throttledRefresh = useThrottle(id, 60000);
  const [forceRefreshFlag, setForceRefreshFlag] = useState(false);

  const onRefreshCommentsClick = () => {
    setForceRefreshFlag((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);

    async function fetchNewsItem() {
      const fetchedNewsItem = await getNewsItem({
        id: parseInt(id as string),
        hasToFetchComments: true,
      });
      setNewsItem(fetchedNewsItem);
      setLoading(false);
    }

    fetchNewsItem();
  }, [throttledRefresh, forceRefreshFlag]);

  return (
    <Container maxWidth="md" className={styles.container}>
      <Button
        className={styles.backButton}
        variant="contained"
        onClick={onBackButtonClick}
      >
        Back to all news
      </Button>

      <Button
        className={styles.refreshButton}
        variant="contained"
        onClick={onRefreshCommentsClick}
      >
        refresh comments
      </Button>
      {loading ? (
        <Box>
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        </Box>
      ) : newsItem ? (
        <>
          <Box className={styles.container}>
            <Typography variant="h1" className={styles.title}>
              {newsItem.title}
            </Typography>
            <Typography variant="caption" className={styles.meta}>
              {`${newsItem.score} points by ${
                newsItem.by
              } ${durationFromPostingTime(newsItem.time * 1000)} | ${
                newsItem.descendants
              } comments`}
            </Typography>
            <Typography variant="caption" className={styles.limk}>
              <a href={newsItem.url} target="_blank" rel="noreferrer">
                {newsItem.url}
              </a>
            </Typography>
            {newsItem.text && (
              <Typography variant="caption" className={styles.content}>
                {removeHtmlSymbols(newsItem.text)}
              </Typography>
            )}
          </Box>

          {newsItem.comments && newsItem.comments.length > 0 && (
            <List>
              <Typography>Comments:</Typography>
              {newsItem.comments.map((comment) => (
                <Grid item xs={12} key={comment.id}>
                  <Comment comment={comment} level={0} />
                </Grid>
              ))}
            </List>
          )}
        </>
      ) : (
        <Typography variant="h1" className={styles.title}>
          News item not found
        </Typography>
      )}
    </Container>
  );
}

export default NewsDetailPage;
