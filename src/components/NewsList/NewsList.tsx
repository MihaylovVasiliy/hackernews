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

export function NewsList({
  newsItems,
  loading,
}: {
  newsItems: NewsItem[];
  loading: boolean;
}) {
  return (
    <Box className={styles.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {newsItems.map((item) => (
            <Link to={`/${item.id}`} key={item.id} className={styles.link}>
              <ListItem button className={styles.listItem}>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Typography variant="caption">{`${item.score} points by ${
                      item.by
                    } ${durationFromPostingTime(item.time * 1000)} | ${
                      item.descendants
                    } comments`}</Typography>
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
