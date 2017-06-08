import {PropertiesResource} from './resources'

export default {
    getPropertiesTable() {
        const items = PropertiesResource.get()
        const headers = items.shift();
        return {headers, items}
    }
}