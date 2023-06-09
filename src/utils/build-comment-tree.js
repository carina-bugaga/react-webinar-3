export default function buildCommentTree(comments) {
    const root = { _id: null, children: [] };
    const commentsById = {};
    
    // Заполнение таблицы с ссылками на все объекты в массиве комментариев
    comments.forEach(comment => {
      commentsById[comment._id] = comment;
      comment.children = [];
    });
    
    // Построение иерархии
    comments.forEach(comment => {
      const parent = commentsById[comment.parent?._id] || root;
      parent.children.push(comment);
    });
    
    return root.children;
  }