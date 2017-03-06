module.exports = function(h, that) {
    var rows = [];
    var groups = [];
    var columns;
    var rowKey = that.opts.uniqueKey;
    var parentKey = that.opts.groupBy;
    var last;      
    var rowClass;
    var data = that.source=='client'?that.filteredData:that.tableData;

    data.map(function(row, index) 
    {
      columns = [];
      
      // в массив columns вставляется ячейка для разворачивания дочерней строки
      //if (that.opts.childRow) columns.push(<td><span on-click={that.toggleChildRow.bind(that,row[rowKey])} class={`VueTables__child-row-toggler ` + that.childRowTogglerClass(row[rowKey])}></span></td>);
      if (that.opts.childRow) columns.push(<td on-click={that.toggleChildRow.bind(that,row[rowKey])} class={`VueTables__child-row-toggler ` + that.childRowTogglerClass(row[rowKey])}>&nbsp;</td>);      

      // формирование основных ячеек с данными
      that.allColumns.map(function(column) 
      {
        if (!(that.opts.group && that.opts.orderBy.column === column)){
              columns.push(<td>
                {that.render(row, column, h)}
              </td>)
        }     
      }.bind(that));
      rowClass = that.opts.rowClassCallback?that.opts.rowClassCallback(row):'';

      // формирование основных строк с данными
      if (that.opts.group){        
        if (last != row[that.opts.orderBy.column])
          rows.push(<tr class={rowClass +' VueTables__group-row'} on-click={that.rowWasClicked.bind(that, row)}><td colspan={that.allColumns.length-1}>{that.render(row, that.opts.orderBy.column, h)}</td></tr>);
        last = row[that.opts.orderBy.column];
    }
      rows.push(<tr class={rowClass} on-click={that.rowWasClicked.bind(that, row)}>{columns}</tr>);

      // рендер дочерней строки, если раскрыта
      if (that.opts.childRow && this.rowsToggleState['row_' + row[rowKey]]) 
      {
        let childRow = that.opts.childRow;
        let template = typeof childRow==='function'?
          childRow.apply(that, [h, row]):
          h(childRow,{
            attrs:{
              data: row
            }
          });
        rows.push(<tr class='VueTables__child-row'><td colspan={that.allColumns.length+1}>{template}</td></tr>);
      }
    }.bind(that))
    
    return rows;

}

