import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from "../../utils/format-date";
import { Link } from "react-router-dom";

function CommentCard({addComment, comment, exists, idUser, newComment, setNewComment, setReply, t}) {
  const cn = bem('CommentCard');
  // Scroll к новому ответу
  useEffect(() => {
    if (document.getElementById("reply")) {
      document.getElementById("reply").scrollIntoView({ block: 'center', behavior: 'smooth' });
  }}, [setReply]);
  const [text, setText] = useState('');
  const submit = (id) => {
    const success = addComment(text, {_id: id, _type:'comment'});
    if (success) {
      setNewComment('');
    }
  };
  const hasChildren = comment.children.length > 0;
  const limitChildren = comment.parent._tree && comment.parent._tree.length < 8;

  return (
    <div className={cn()}>
      {comment._type != 'comment' ?
      <>
        {exists ?
          <div className={cn('wrapper-child')}>
            <div className={cn('subtitle')}>{t('comment.newReply')}</div>
            <textarea className={cn('textarea')} type='text' onChange={(e) => setText(e.target.value)}/>
            <div className={cn('btn-wrapper')}>
              <button className={cn('btn')}  id="reply" onClick={() => {if(text.trim() !== '') {setReply("delete");
                submit(comment.parent._id);}}}>
                {t('comment.send')}
              </button>
              <button className={cn('btn')} onClick={() => {setNewComment('');
                setReply("delete");
            }}>
                {t('comment.cancel')}
              </button>
            </div>
          </div>
          : 
          <>
            <div className={cn('wrapper-child-login')}>
              <div className={cn('login')} id="reply">
                <Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать. 
              </div>
              <button className={cn('btn-cancel')} onClick={() => setNewComment('')}>
                {t('comment.cancel')}
              </button>
            </div>
          </>
          }
      </> :
      <>
        <div className={cn('wrapper')}>
          <div className={idUser !== comment.author._id ? cn('user') : cn('user-active')}>
            {comment.author.profile.name}
          </div>
          <div className={cn('date')}>
            {formatDate(comment.dateCreate)}
          </div>
        </div>
        <div className={cn('text')}>
          {comment.text}
        </div>
        <button className={cn('btn-answer')} onClick={() => {setNewComment(comment.parent._id);
                setReply(comment._id)}}>
          {t('comment.reply')}
        </button> 
      </>
      }
      {hasChildren && (
        <div className={limitChildren ? cn('reply') : ''}>
          {comment.children.map((comment) => (
            <CommentCard
              addComment={addComment}
              comment={comment}
              exists={exists}
              idUser={idUser}
              key={comment._id}
              newComment={newComment}
              setNewComment={setNewComment}
              setReply={setReply}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

CommentCard.propTypes = {
  addComment: PropTypes.func,
  comment: PropTypes.object,
  exists: PropTypes.bool,
  idUSer: PropTypes.string,
  newComment: PropTypes.string,
  setNewComment: PropTypes.func,
  setReply: PropTypes.func,
  t: PropTypes.func
};

CommentCard.defaultProps = {
  addComment: () => {},
  t: (text) => text
}

export default memo(CommentCard);
