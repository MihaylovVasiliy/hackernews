import {
  Box,
  Button,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { FC, useState } from "react";
import { NewsItem } from "../../types/types";
import cn from "classnames";
import { durationFromPostingTime, removeHtmlSymbols } from "../../utils/utils";
import { NewsComment } from "./types";
import styles from "./Comments.module.less";

interface CommentProps {
  comment: NewsComment;
  level: number;
}

interface CommentsStyleProps {
  isVisible: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, level }) => {
  const [isVisible, setVisible] = useState(false);

  const handleChangeCommentsTreeVisibility = () => {
    console.log("isVis", isVisible);

    setVisible(!isVisible);
  };

  return (
    <Box className={cn(level === 0 ? styles.root : styles.nested)}>
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
        <Typography variant="body2" className={styles.mark}>
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
