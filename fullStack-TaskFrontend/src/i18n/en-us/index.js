
export default {
  isoName: 'en-us',
  nativeName: 'English (US)',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh'
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'days'
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loading: 'Loading...',
    selectedRecords: function (rows) {
      return rows === 1
        ? '1 record selected.'
        : (rows === 0 ? 'No' : rows) + ' records selected.'
    },
    recordsPerPage: 'Records per page:',
    allRows: 'All',
    pagination: function (start, end, total) {
      return start + '-' + end + ' of ' + total
    },
    columns: 'Columns'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    heading5: 'Heading 5',
    heading6: 'Heading 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font',
    viewSource: 'View Source'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  },
  login : {
    "caption" : "Welcome to fullStack TaskFrontEnd",
    "email" : "Email",
    "errorEmail" :  "Please Type The Email.",
    "password" : "Password",
    "errorPassword" :  "Please Type The Password",
    "loginBtn" : "Login"
  },
  dashboard : {
    dashboard: 'Dashboard',
    title: 'FullStack Task'
  },
  mainNavigation : {
    performanceReview: {
      label: "PerformanceReview", 
      subNavigation:{
          index: "performanceReviews"
      }
    },
    feedBackRequest: {
      label: "FeedBackRequest", 
      subNavigation:{
          index: "FeedBackRequests"
      }
    },
    user: {
      label: "User", 
      subNavigation:{
          index: "Users"
      }
    }
  },
  headers:{
    create: 'Create',
    edit: 'Edit'
  },
  btns:{
    create: "Create",
    edit: "Edit",
    show: "Show",
    delete: "Delete",
    cancel: "Cancel",
    save: "Save"
  }
};
