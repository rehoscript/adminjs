import BaseFilter from 'adminjs/filters/base';

var TextFilterView = BaseFilter.extend({
  classNames: ['text-filter'],
  templateName: 'filters/text'
});

export default TextFilterView;