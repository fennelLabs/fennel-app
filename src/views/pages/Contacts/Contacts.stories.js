import React from 'react';
import AddContact from '.';

export default {
  title: 'AddContact',
  component: AddContact
};

const Template = (args) => <AddContact {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
