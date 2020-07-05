import { QueryFactory } from '../services/query.service';
/**
 * Where filter
 * @usage: (DEFINITION, "id === 'a'")
 * 
 */
Pipe({
    name: 'whereFilter'
})
export function whereFilterFn() {
    this.compile = function(model, query) {
        return new QueryFactory(model).where(query);
    }
}