function AddContact() {
  return (
    <div>
      <div>
        <h1>Add Contact</h1>
      </div>
      <div>
        <textarea name="first_name" />
        <textarea name="last_name" />
        <textarea name="blockchain_id" />
        <div style={{flexDirection: 'row'}}>
          <button name="submit" />
          <button name="cancel" />
        </div>
      </div>
    </div>
  );
}

export default AddContact;
