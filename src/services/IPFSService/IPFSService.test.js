import useIpfsFactory from '../../views/hooks/useIpfsFactory';

/*describe('ipfsFactory', () => {
  it('should...', () => {
    const {ipfsService} = useIpfsFactory();
    const testfile = ipfsService.putFile('Test');
    const testfile_content = ipfsService.getFile(testfile);
    expect(testfile_content).toBe('Test');
  });
});*/

test('getting a file gets correct content back', () => {
  const {ipfsService} = useIpfsFactory();
  const testfile = ipfsService.putFile('Test');
  const testfile_content = ipfsService.getFile(testfile);
  expect(testfile_content).toBe('Test');
});

test('deleting a file succeeds', () => {
  const {ipfsService} = useIpfsFactory();
  const testfile = ipfsService.putFile('Test');
  expect(ipfsService.delFile(testfile)).toBeTruthy();
});
