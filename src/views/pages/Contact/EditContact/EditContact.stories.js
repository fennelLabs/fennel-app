import React from 'react';
import EditContact from '.';

export default {
  title: 'EditContact',
  component: EditContact
};

const Template = (args) => <EditContact {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
