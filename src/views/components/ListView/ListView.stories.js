import React from 'react';

import { ListView } from './ListView';

export default {
  title: 'ListView',
  component: ListView
};

const Template = (args) => <ListView {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  itemList: [
    { id: 1, name: 'message1' },
    { id: 2, name: 'message2' },
    { id: 3, name: 'message3' },
    { id: 4, name: 'message4' },
    { id: 5, name: 'message5' }
  ]
};
