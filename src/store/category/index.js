import { listToTree, traverse } from "../../utils";
import StoreModule from "../module";

/**
 * Получение списка категорий
 */
class CategoryState extends StoreModule {

  initState() {
    return {
      categories: [],
    }
  }

  /**
   * Загрузка списка категорий
  */
  async loadCategoties() {

    await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    .then(response=>response.json())
    .then(data=> {
        let tree = listToTree(data.result.items);
        let result = traverse(tree); 
        result.unshift({value: '', title: 'Все'});      

      this.setState({
        ...this.getState(),
        categories: result,
      }, 'Загружен список категорий из АПИ');
    }) 
  }
}

export default CategoryState;
