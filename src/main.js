/* eslint-disable no-undef */
import "font-awesome/scss/font-awesome.scss";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vis/dist/vis.min.css';

import App from "./App.vue";
import {ClientTable} from "vue-tables-2";

Vue.use(BootstrapVue);
Vue.use(VueResource);

let STORAGE_KEY = 'reestrius_app';

let reestriusStorage = {
    fetch() {
        let settings = JSON.parse(localStorage(STORAGE_KEY) || '[]');
        settings.forEach(function (setting, index) {
            setting.id = index
        });
        reestriusStorage.uid = settings.length;
        return settings
    },
    save(settings) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
};

let DataProperty = function (data) {
    this.id = data.id;
    this.properties = {
        main: [
            {
                id: 'name',
                name: 'Наименование',
                value: data.name
            },
            {
                id: 'code',
                name: 'Код',
                value: data.code
            },
            {
                id: 'type',
                name: 'Тип',
                value: data.type
            }
        ]
    }
};

let getProperties = function() {
    return Object.keys(this.properties).map(prop => this.properties[prop])
};

DataProperty.prototype.getProperties = getProperties;

let DataObject = function (data) {
    this.id = data.id;
    this.links = [];
    this.properties = []
};

DataObject.prototype.addProperty = function(propData) {
    this.properties.push(propData)
};
DataObject.prototype.getProperties = getProperties;

let Data = function(type, data = {}) {
    switch (type) {
        case 'objects':
            return new DataObject(data);
        case 'properties':
            return new DataProperty(data);
        case 'users':
            break;
    }
};

let appData = [];
appData.tableData = [
    {id: '1', ius: 'MODES-Terminal', service: 'Host', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '2', ius: 'MODES-Terminal', service: 'MPPM', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '3', ius: 'MODES-Terminal', service: 'MMC', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '4', ius: 'MODES-Terminal', service: 'Transfer ZVK', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '5', ius: 'Прогноз Потребления', service: 'App Server', server: 'prognoz-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '6', ius: 'Прогноз Потребления', service: 'SQL Server', server: 'prognoz-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '7', ius: 'ОИК СК-2007', service: 'Основная группа', server: 'condor1', admin: 'Татарников', ip: 'xxx'},
    {id: '8', ius: 'ОИК СК-2007', service: 'Основная группа', server: 'condor2', admin: 'Татарников', ip: 'xxx'},
    {id: '9', ius: 'ОИК СК-2007', service: 'Резервная группа', server: 'condor3', admin: 'Татарников', ip: 'xxx'},
    {id: '10', ius: 'MODES-Terminal', service: 'Host', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '11', ius: 'MODES-Terminal', service: 'MPPM', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '12', ius: 'MODES-Terminal', service: 'MMC', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '13', ius: 'MODES-Terminal', service: 'Transfer ZVK', server: 'modes-sql-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '14', ius: 'Прогноз Потребления', service: 'App Server', server: 'prognoz-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '15', ius: 'Прогноз Потребления', service: 'SQL Server', server: 'prognoz-odusb', admin: 'Мосин', ip: 'xxx'},
    {id: '16', ius: 'ОИК СК-2007', service: 'Основная группа', server: 'condor1', admin: 'Татарников', ip: 'xxx'},
    {id: '17', ius: 'ОИК СК-2007', service: 'Основная группа', server: 'condor2', admin: 'Татарников', ip: 'xxx'},
    {id: '18', ius: 'ОИК СК-2007', service: 'Резервная группа', server: 'condor3', admin: 'Татарников', ip: 'xxx'},
];

appData.Nodes = [
    {id: 0, label: 'MODES-Terminal', group: 'ius'},
    {id: 1, label: 'Прогноз Потребления', group: 'ius'},
    {id: 2, label: 'ПК Заявки', group: 'ius'},
    {id: 3, label: 'ОИК СК-2007', group: 'ius'},
    {id: 4, label: 'КИТС', group: 'ius'},
    {id: 5, label: 'Сервер БД MODES', group: 'service'},
    {id: 6, label: 'MODES Host', group: 'service'},
    {id: 7, label: 'MODES MMC', group: 'service'},
    {id: 8, label: 'MODES MPPM', group: 'service'},
    {id: 9, label: 'MODES ZVK Transfer', group: 'service'},
    {id: 10, label: 'Кластер MODES-SQL', group: 'cluster'},
    {id: 11, label: 'modes1-odusb', group: 'server'},
    {id: 12, label: 'modes2-odusb', group: 'server'},
    {id: 13, label: 'Сервер БД PROGNOZ', group: 'service'},
    {id: 14, label: 'PROGNOZ CFRAS Supervisor', group: 'service'},
    {id: 15, label: 'PROGNOZ EventMess', group: 'service'},
    {id: 16, label: 'Кластер PROGNOZ-SQL', group: 'cluster'},
    {id: 17, label: 'prognoz1-odusb', group: 'server'},
    {id: 18, label: 'prognoz2-odusb', group: 'server'},
    {id: 19, label: 'Сервер БД ODU_1', group: 'service'},
    {id: 20, label: 'Сервер приложений', group: 'service'},
    {id: 21, label: 'zvkapp-odusb', group: 'server'},
    {id: 22, label: 'zvkdb-odusb', group: 'server'},
    {id: 23, label: 'ПК ДЭБ', group: 'ius'},
    {id: 24, label: 'Сервер БД DebDB', group: 'service'},
    {id: 25, label: 'Web сервер', group: 'service'},
    {id: 26, label: 'deb-odusb', group: 'server'},
    {id: 27, label: 'condor1', group: 'server'},
    {id: 28, label: 'condor2', group: 'server'},
    {id: 29, label: 'condor3', group: 'server'},
    {id: 30, label: 'Основная группа CKMAIN', group: 'cluster'},
    {id: 31, label: 'Запасная группа CKZAPAS', group: 'cluster'},
    {id: 32, label: 'ЦОД', group: 'ius'},
    {id: 33, label: 'ПАК СРТ/СРПГ', group: 'ius'},
];
appData.Edges = [
    {from: 4, to: 0, weight: 10},
    {from: 2, to: 9, weight: 10},
    {from: 3, to: 1, weight: 10},
    {from: 2, to: 3, weight: 1},
    {from: 4, to: 1, weight: 10},
    {from: 4, to: 33, weight: 10},
    {from: 5, to: 6, weight: 10},
    {from: 5, to: 7, weight: 10},
    {from: 5, to: 8, weight: 10},
    {from: 5, to: 9, weight: 10},
    {from: 6, to: 0, weight: 10},
    {from: 7, to: 0, weight: 10},
    {from: 8, to: 0, weight: 10},
    {from: 9, to: 0, weight: 10},
    {from: 10, to: 5, weight: 10},
    {from: 11, to: 10, weight: 10},
    {from: 12, to: 10, weight: 10},
    {from: 13, to: 14, weight: 10},
    {from: 13, to: 15, weight: 10},
    {from: 13, to: 1, weight: 10},
    {from: 14, to: 1, weight: 10},
    {from: 15, to: 1, weight: 10},
    {from: 16, to: 13, weight: 10},
    {from: 17, to: 16, weight: 10},
    {from: 18, to: 16, weight: 10},
    {from: 19, to: 2, weight: 10},
    {from: 20, to: 2, weight: 10},
    {from: 21, to: 20, weight: 10},
    {from: 22, to: 19, weight: 10},
    {from: 4, to: 23, weight: 10},
    {from: 26, to: 24, weight: 10},
    {from: 26, to: 25, weight: 10},
    {from: 24, to: 23, weight: 10},
    {from: 25, to: 23, weight: 10},
    {from: 27, to: 30, weight: 10},
    {from: 28, to: 30, weight: 10},
    {from: 29, to: 31, weight: 10},
    {from: 30, to: 3, weight: 10},
    {from: 31, to: 3, weight: 10},
    {from: 32, to: 17, weight: 10},
    {from: 32, to: 18, weight: 10},
    {from: 32, to: 21, weight: 10},
    {from: 32, to: 22, weight: 10},
    {from: 32, to: 4, weight: 10},
    {from: 33, to: 0, weight: 10},
    {from: 3, to: 33, weight: 10},
    {from: 32, to: 26, weight: 10},
];
appData.objects = [];
appData.users = [];
appData.properties = [];
appData.appSettings = {
    editors: {
        objects : {
            title: 'Объекты',
            tabs: ['main', 'props', 'links']
        },
        properties: {
            title: 'Свойства',
            tabs: ['main']
        }
    },
    editorTabs : {
        main :'Основные данные',
        props: 'Свойства',
        links: 'Связь с другими ИУС'
    },
    //     [
    //     {
    //         id: 'main',
    //         text: 'Основные данные',
    //     },
    //     {
    //         id: 'props',
    //         text: 'Свойства',
    //     },
    //     {
    //         id: 'links',
    //         text: 'Связь с другими ИУС',
    //     }
    // ],
    tablecolumns: ['id', 'ius', 'service', 'server', 'admin', 'ip'],
    groupby: 'ius'
};

Vue.use(ClientTable, [], false, require('./template.js')('client'));

//noinspection Eslint
let reestrius = new Vue({
    el: '#app',
    render: h => h(App),
    data: {
        appData
    },
    methods:{
        Data
    }
});