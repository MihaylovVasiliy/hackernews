import { Box, List, ListItem, Typography } from "@material-ui/core";
import { useState } from "react";
import { NewsComment, NewsItem } from "../../types/types";
import { durationFromPostingTime, removeHtmlSymbols } from "../../utils/utils";
import cn from "classnames";

import styles from "./Comments.module.less";

interface CommentProps {
  comment: NewsComment;
  level: number;
}

const Comment = ({ comment, level }: CommentProps) => {
  const [isVisible, setVisible] = useState(false);

  const handleChangeCommentsTreeVisibility = () => {
    setVisible(!isVisible);
  };

  return (
    <Box
      className={cn(level === 0 ? styles.root : styles.nested)}
      key={comment.time}
    >
      <Box onClick={handleChangeCommentsTreeVisibility}>
        <Typography variant="body2" className={styles.author}>
          by : {comment.by} id: {comment.id} kids: {comment.kids?.join("+")}
        </Typography>
        <Typography variant="body2" className={styles.time}>
          {durationFromPostingTime(comment.time * 1000 || 0)}
        </Typography>
        <Typography variant="body2" className={styles.text}>
          {removeHtmlSymbols(comment.text)}
        </Typography>
      </Box>

      {comment.kids && (
        <Typography
          variant="body2"
          className={cn(styles.mark, { [styles.opened]: isVisible })}
        >
          ▶
        </Typography>
      )}

      {comment.kids && isVisible && (
        <List>
          {comment.comments?.map((comment) => (
            <ListItem>
              <Comment key={comment.id} comment={comment} level={level + 1} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Comment;
