import { Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { NewsItem } from "../../types/types";
import { durationFromPostingTime } from "../../utils/utils";

import styles from "./NewsList.module.less";
import useWindowSize from "../../hooks/useWindowSize";

export function NewsList({
  newsItems,
  loading,
}: {
  newsItems: NewsItem[];
  loading: boolean;
}) {
  const { width } = useWindowSize();

  return (
    <Box className={styles.root}>
      {loading ? (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      ) : (
        <List className={styles.list}>
          {newsItems.map((item) => (
            <Link to={`/${item.id}`} key={item.id} className={styles.link}>
              <ListItem button className={styles.listItem}>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Typography variant="caption" className={styles.meta}>
                      {`${item.score} points by ${
                        item.by
                      } ${durationFromPostingTime(item.time * 1000)} | ${
                        item.descendants
                      } comments`}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );
}
