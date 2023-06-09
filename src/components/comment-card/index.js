import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from "../../utils/format-date";
import { Link } from "react-router-dom";

function CommentCard({addComment, comment, exists, idUser, newComment, setNewComment}) {
  const cn = bem('CommentCard');
  const [text, setText] = useState('');
  const submit = (id) => {
    addComment(text, {_id: id, _type:'comment'});
    setNewComment('');
  };
  const hasChildren = comment.children.length > 0;

  return (
    <div className={cn()}>
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
      {newComment !== comment._id ?
        <button className={cn('btn-answer')} onClick={() => setNewComment(comment._id)}>
          Ответить
        </button> : <>{
        exists ?
          <>
            <textarea className={cn('textarea')} type='text' placeholder='Текст' 
                      onChange={(e) => setText(e.target.value)}/>
            <div className={cn('btn-wrapper')}>
              <button className={cn('btn')} onClick={() => submit(comment._id)}>
                Отправить
              </button>
              <button className={cn('btn')} onClick={() => setNewComment('')}>
                Отмена
              </button>
            </div>
          </>
            : 
          <>
            <button className={cn('btn-answer')} onClick={() => setNewComment(comment._id)}>
              Ответить
            </button>
            <div className={cn('wrapper')}>
              <div className={cn('login')}>
                <Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать. 
              </div>
              <button className={cn('btn-cansel')} onClick={() => setNewComment('')}>
                Отмена
              </button>
            </div>
            </>
          }
        </>
        }
      {hasChildren && (
        <div className={cn('reply')}>
          {comment.children.map((comment) => (
            <CommentCard
              addComment={addComment}
              comment={comment}
              exists={exists}
              idUser={idUser}
              key={comment._id}
              newComment={newComment}
              setNewComment={setNewComment}
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
  setNewComment: PropTypes.func
};

CommentCard.defaultProps = {
  addComment: () => {},
}

export default memo(CommentCard);
