import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import CommentCard from "../comment-card";

function CommentList({addComment, comments, count, exists, idArticle, idUser, setReply, t}) {
  const cn = bem('CommentList');
  const [text, setText] = useState('');
  const [newComment, setNewComment] = useState('');
  const submit = (parent) => {
    addComment(text, parent);
    setText('');
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('comment.comments')} ({count})</div>{
        comments.map(item => 
          <CommentCard addComment={addComment} comment={item} exists={exists} idUser={idUser} key={item._id} 
                       newComment={newComment} setNewComment={setNewComment} setReply={setReply} t={t}/>
        )
      }
      {newComment === '' ?
        <div className={cn('wrapper')}>
          {exists ?
            <>
              <div className={cn('subtitle')}>{t('comment.comment')}</div>
              <textarea className={cn('text')} type='text' value={text} onChange={(e) => setText(e.target.value)}/>
              <button className={cn('btn')} onClick={() => {if(text.trim() !== '') submit({_id: idArticle, _type: 'article'})}}>
                {t('comment.send')}
              </button>
            </>
          : <p className={cn('login')}>
              <Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать
            </p>
          }
        </div> : ''
      }
    </div>
  );
}

CommentList.propTypes = {
  addComment: PropTypes.func,
  comment: PropTypes.object,
  count: PropTypes.number,
  exists: PropTypes.bool,
  idArticle: PropTypes.string,
  idUSer: PropTypes.string,
  setReply: PropTypes.func,
  t: PropTypes.func
};

CommentList.defaultProps = {
  addComment: () => {},
  t: (text) => text
}

export default memo(CommentList);
