module.exports = function(source) {
return function(h) {

// var rows = require('./template/rows')(h, this)
// var normalFilter = require('/node_modules/vue-tables-2/compiled/template/normal-filter')(h, this)
// var dropdownPagination = require('/node_modules/vue-tables-2/compiled/dropdown-pagination')(h, this)
// var columnFilters = require('/node_modules/vue-tables-2/compiled/template/column-filters')(h, this);
// var footerHeadings = require('/node_modules/vue-tables-2/compiled/footer-headings')(h, this);
// var noResults = require('/node_modules/vue-tables-2/compiled/no-results')(h, this);
// var pagination = require('/node_modules/vue-tables-2/compiled/pagination')(h, this);
// var dropdownPaginationCount = require('/node_modules/vue-tables-2/compiled/dropdown-pagination-count')(h, this);
// var headings = require('/node_modules/vue-tables-2/compiled/template/headings')(h, this);
// var perPage = require('/node_modules/vue-tables-2/compiled/template/per-page')(h, this);


    var rows = require('./template/rows')(h, this);
    var normalFilter = require('./template/normal-filter')(h, this);
    var dropdownPagination = require('./template/dropdown-pagination')(h, this);
    var columnFilters = require('./template/column-filters')(h, this);
    var footerHeadings = require('./template/footer-headings')(h, this);
    var noResults = require('./template/no-results')(h, this);
    var pagination = require('./template/pagination')(h, this);
    var dropdownPaginationCount = require('./template/dropdown-pagination-count')(h, this);
    var headings = require('./template/headings')(h, this);
    var perPage = require('./template/per-page')(h, this);


return <div class={"w-75 VueTables VueTables--" + this.source}>
  <div class="row">
    <div class="col-md-6">
      {/*{normalFilter}*/}
    </div>
    <div class="col-md-6">
      {dropdownPagination}
      {perPage}
    </div>
  </div>
  <table class={'VueTables__table table ' + this.opts.skin}>
    <thead class="thead-inverse">
      <tr>
        {headings}
      </tr>
      {columnFilters}
    </thead>
    {footerHeadings}
    <tbody>
      {noResults}
      {rows}
     </tbody>
  </table>
  {pagination}
  {dropdownPaginationCount}
</div>
}
}
