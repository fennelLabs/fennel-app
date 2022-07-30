import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';

import BackupKey from './index';

describe('BackupKey', () => {
  it('should...', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<BackupKey />);
    const output = renderer.getRenderOutput();
    expect(output.type).toBe('div');
  });
});
