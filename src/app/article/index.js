import {memo, useCallback, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentList from '../../components/comment-list';
import listToTree from '../../utils/list-to-tree';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);
  const [reply, setReply] = useState(null);
  const user = useSelector(state => state.session.user);
  const exists = useSelector(state => state.session.exists);
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    waitingComment: state.comments.waiting,
    count: state.comments.count,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Добавление комментария
    addComment: useCallback((text, parent) => dispatch(commentsActions.addComment(text, parent)), [dispatch]),
  }
  // Удаление промежуточного элемента с ответом
  if (select.comments.items && reply == 'delete') {
    select.comments.items = select.comments.items.filter((item)=>item._type !='reply');
  }
  // Добавление промежуточного элемента с ответом
  if (select.comments.items && reply) { 
    select.comments.items = select.comments.items.filter((item)=>item._type !='reply');
    select.comments.items.push({_id: null, _type: 'reply', children: [], parent: {_id: reply, _tree: 0}});
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
        <Spinner active={select.waitingComment}>
        {select.comments.items && <CommentList addComment={callbacks.addComment} comments={listToTree(select.comments.items, 'article')} count={select.count} 
                       exists={exists} idArticle={params.id} idUser={user._id} setReply={setReply}/>}
        </Spinner>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
